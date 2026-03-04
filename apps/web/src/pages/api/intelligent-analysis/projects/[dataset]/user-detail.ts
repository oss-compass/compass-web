import type { NextApiRequest, NextApiResponse } from 'next';

import fs from 'fs/promises';
import path from 'path';

const backupCache = new Map<string, unknown[]>();

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
  if (!backupCache.has(dataset)) {
    const filePath = await resolveBackupFilePath(dataset);
    if (!(await fileExists(filePath))) return null;
    const raw = await fs.readFile(filePath, 'utf8');
    const parsed = JSON.parse(raw);
    const rows: unknown[] = Array.isArray(parsed) ? parsed : [];
    backupCache.set(dataset, rows);
  }

  const rows = backupCache.get(dataset) || [];
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

  const datasetDir = await resolveDatasetDir(dataset);
  const fileBase = normalizeUserFileBase(userId);
  const mainFilePath = path.resolve(datasetDir, `${fileBase}_main.json`);
  const fallbackFilePath = path.resolve(datasetDir, `${fileBase}.json`);

  const filePath = (await fileExists(mainFilePath))
    ? mainFilePath
    : (await fileExists(fallbackFilePath))
      ? fallbackFilePath
      : null;

  if (!filePath) {
    try {
      const row = await findUserFromBackup(dataset, userId);
      if (row) {
        res.setHeader('Cache-Control', 'public, max-age=300');
        res.status(200).json({ [userId]: row });
        return;
      }
    } catch { }

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
