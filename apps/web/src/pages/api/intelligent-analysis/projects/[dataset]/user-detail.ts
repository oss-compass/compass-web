import type { NextApiRequest, NextApiResponse } from 'next';

import fs from 'fs/promises';
import path from 'path';

import {
  isSafePathSegment,
  resolveFileInsideDir,
} from '@modules/intelligent-analysis/server/pathSafety';

type BackupCacheEntry = {
  size: number;
  mtimeMs: number;
  rows: unknown[];
};

// The parsed backup payloads are large (several of the shipped
// <dataset>_backup.json files are >10 MB), so the cache has to stay bounded.
// Without a cap every dataset that is looked up is retained for the lifetime
// of the process.
export const BACKUP_CACHE_MAX_ENTRIES = 4;

const backupCache = new Map<string, BackupCacheEntry>();

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function normalizeUserFileBase(userId: string): string {
  return userId.replaceAll(':', '_').replaceAll(' ', '_');
}

async function resolveDatasetDir(dataset: string): Promise<string> {
  const candidates = [
    path.resolve(
      process.cwd(),
      'public',
      'test',
      'intelligent-analysis-new',
      dataset
    ),
    path.resolve(
      process.cwd(),
      'apps',
      'web',
      'public',
      'test',
      'intelligent-analysis-new',
      dataset
    ),
  ];

  for (const candidate of candidates) {
    if (await fileExists(candidate)) return candidate;
  }

  return candidates[0];
}

async function resolveBackupFilePath(dataset: string): Promise<string> {
  const fileName = `${dataset}_backup.json`;
  const candidates = [
    path.resolve(
      process.cwd(),
      'public',
      'test',
      'intelligent-analysis-new',
      fileName
    ),
    path.resolve(
      process.cwd(),
      'apps',
      'web',
      'public',
      'test',
      'intelligent-analysis-new',
      fileName
    ),
  ];

  for (const candidate of candidates) {
    if (await fileExists(candidate)) return candidate;
  }

  return candidates[0];
}

async function findUserFromBackup(dataset: string, userId: string) {
  const filePath = await resolveBackupFilePath(dataset);
  if (!(await fileExists(filePath))) return null;

  // Only reuse the cached copy while the file on disk is unchanged, otherwise a
  // regenerated backup file would keep serving stale data until the process
  // restarts.
  const stat = await fs.stat(filePath);
  const cached = backupCache.get(dataset);

  let rows: unknown[];
  if (cached && cached.size === stat.size && cached.mtimeMs === stat.mtimeMs) {
    rows = cached.rows;
    // Refresh recency so the eviction below drops the coldest entry.
    backupCache.delete(dataset);
  } else {
    const raw = await fs.readFile(filePath, 'utf8');
    const parsed = JSON.parse(raw);
    rows = Array.isArray(parsed) ? parsed : [];
  }

  if (
    !backupCache.has(dataset) &&
    backupCache.size >= BACKUP_CACHE_MAX_ENTRIES
  ) {
    const coldest = backupCache.keys().next().value;
    if (coldest !== undefined) backupCache.delete(coldest);
  }
  backupCache.set(dataset, { size: stat.size, mtimeMs: stat.mtimeMs, rows });

  for (const row of rows) {
    if (!row || typeof row !== 'object') continue;
    const candidate = (row as any)['用户ID'];
    if (candidate === userId) return row as Record<string, unknown>;
  }

  return null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const dataset = String(req.query.dataset || '');
  if (!dataset) {
    res.status(400).json({ message: 'Missing dataset' });
    return;
  }

  const userId = String(req.query.userId || '');
  if (!userId) {
    res.status(400).json({ message: 'Missing userId' });
    return;
  }

  if (!isSafePathSegment(dataset) || !isSafePathSegment(userId)) {
    res.status(400).json({ message: 'Invalid dataset or userId' });
    return;
  }

  const datasetDir = await resolveDatasetDir(dataset);
  const fileBase = normalizeUserFileBase(userId);
  const mainFilePath = resolveFileInsideDir(
    datasetDir,
    `${fileBase}_main.json`
  );
  const fallbackFilePath = resolveFileInsideDir(datasetDir, `${fileBase}.json`);

  const filePath =
    (mainFilePath && (await fileExists(mainFilePath)) ? mainFilePath : null) ??
    (fallbackFilePath && (await fileExists(fallbackFilePath))
      ? fallbackFilePath
      : null);

  if (!filePath) {
    let row: Record<string, unknown> | null = null;
    try {
      row = await findUserFromBackup(dataset, userId);
    } catch (e) {
      // The backup file exists but could not be read or parsed. Report that as a
      // server error rather than claiming the user does not exist.
      console.error(
        `[user-detail] failed to read backup for dataset=${dataset}`,
        e
      );
      res
        .status(500)
        .json({ message: 'Failed to load user detail', dataset, userId });
      return;
    }

    if (row) {
      res.setHeader('Cache-Control', 'public, max-age=300');
      res.status(200).json({ [userId]: row });
      return;
    }

    res.status(404).json({
      message: 'User detail not found',
      dataset,
      userId,
    });
    return;
  }

  try {
    const raw = await fs.readFile(filePath, 'utf8');
    const json = JSON.parse(raw);
    res.setHeader('Cache-Control', 'public, max-age=300');
    res.status(200).json(json);
  } catch {
    res
      .status(500)
      .json({ message: 'Failed to load user detail', dataset, userId });
  }
}
