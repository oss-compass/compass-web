import type { NextApiRequest, NextApiResponse } from 'next';

import fs from 'fs/promises';
import path from 'path';

type ParticipantTableRow = {
  key: string;
  具体人员: string;
  贡献仓库: string;
  '2024年角色承担': string;
  '2024年目标生态占个人总活跃量比值': number;
  '2024年个人代码贡献量': number;
  '2024年个人Issue贡献量': number;
  '2024年个人社区核心度': string;
  '2024年个人协作影响力': string;
  '2024年个人联通控制力': string;
  '2024年个人PageRank': string;
  '2025年角色承担': string;
  '2025年目标生态占个人总活跃量比值': number;
  '2025年个人代码贡献量': number;
  '2025年个人Issue贡献量': number;
  '2025年个人社区核心度': string;
  '2025年个人协作影响力': string;
  '2025年个人联通控制力': string;
  '2025年个人PageRank': string;
};

type EcosystemMeta = {
  '2024-2025组织代码贡献总量': number;
  '2024-2025组织Issue贡献总量': number;
  '2024组织网络影响力(社区核心度/协作影响力/联通控制力/PageRank)': string;
  '2025组织网络影响力(社区核心度/协作影响力/联通控制力/PageRank)': string;
  totalItems: number;
};

type CachedEntry = {
  size: number;
  mtimeMs: number;
  ecosystems: string[];
  metaByEcosystem: Record<string, EcosystemMeta>;
  rawOrganizationData: Record<string, any>;
  flattenedByEcosystem: Map<string, ParticipantTableRow[]>;
};

const CACHE_THRESHOLD_BYTES = 500 * 1024;
const cache = new Map<string, CachedEntry>();

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

function parsePage(value: unknown) {
  const num = Number(value);
  if (!Number.isFinite(num) || num <= 0) return 1;
  return Math.floor(num);
}

function parsePageSize(value: unknown) {
  const num = Number(value);
  if (!Number.isFinite(num) || num <= 0) return 10;
  return Math.min(100, Math.floor(num));
}

function buildMetaByEcosystem(organizationData: Record<string, any>) {
  const metaByEcosystem: Record<string, EcosystemMeta> = {};
  for (const [ecosystemName, ecosystemData] of Object.entries(
    organizationData
  )) {
    if (!ecosystemData || typeof ecosystemData !== 'object') continue;
    const participants =
      (ecosystemData as any)?.['人员参与项目清单'] &&
        typeof (ecosystemData as any)['人员参与项目清单'] === 'object'
        ? (ecosystemData as any)['人员参与项目清单']
        : {};
    let totalItems = 0;
    for (const userData of Object.values(participants as any)) {
      if (!userData || typeof userData !== 'object') continue;
      totalItems += Object.keys(userData as any).length;
    }

    const codeTotal =
      Number(
        (ecosystemData as any)['2024-2025组织代码贡献总量'] ??
        (ecosystemData as any)['2025-2026组织代码贡献总量'] ??
        0
      ) || 0;
    const issueTotal =
      Number(
        (ecosystemData as any)['2024-2025组织Issue贡献总量'] ??
        (ecosystemData as any)['2025-2026组织Issue贡献总量'] ??
        0
      ) || 0;

    metaByEcosystem[ecosystemName] = {
      '2024-2025组织代码贡献总量': codeTotal,
      '2024-2025组织Issue贡献总量': issueTotal,
      '2024组织网络影响力(社区核心度/协作影响力/联通控制力/PageRank)': String(
        (ecosystemData as any)[
        '2024组织网络影响力(社区核心度/协作影响力/联通控制力/PageRank)'
        ] || ''
      ),
      '2025组织网络影响力(社区核心度/协作影响力/联通控制力/PageRank)': String(
        (ecosystemData as any)[
        '2025组织网络影响力(社区核心度/协作影响力/联通控制力/PageRank)'
        ] || ''
      ),
      totalItems,
    };
  }
  return metaByEcosystem;
}

function pickStr(obj: any, key: string): string {
  const v = obj && typeof obj === 'object' ? (obj as any)[key] : undefined;
  return String(v || '');
}

function pickNum(obj: any, key: string): number {
  const v = obj && typeof obj === 'object' ? (obj as any)[key] : undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function flattenUserRows(
  githubUser: string,
  userData: any
): ParticipantTableRow[] {
  const rows: ParticipantTableRow[] = [];
  if (!userData || typeof userData !== 'object') return rows;
  for (const [repository, repoData] of Object.entries(userData)) {
    const r = repoData as any;
    rows.push({
      key: `${githubUser}-${repository}`,
      具体人员: String(githubUser),
      贡献仓库: String(repository),
      '2024年角色承担': pickStr(r, '2024年角色承担'),
      '2024年目标生态占个人总活跃量比值': pickNum(
        r,
        '2024年目标生态占个人总活跃量比值'
      ),
      '2024年个人代码贡献量': pickNum(r, '2024年个人代码贡献量'),
      '2024年个人Issue贡献量': pickNum(r, '2024年个人Issue贡献量'),
      '2024年个人社区核心度': pickStr(r, '2024年个人社区核心度'),
      '2024年个人协作影响力': pickStr(r, '2024年个人协作影响力'),
      '2024年个人联通控制力': pickStr(r, '2024年个人联通控制力'),
      '2024年个人PageRank': pickStr(r, '2024年个人PageRank'),
      '2025年角色承担': pickStr(r, '2025年角色承担'),
      '2025年目标生态占个人总活跃量比值': pickNum(
        r,
        '2025年目标生态占个人总活跃量比值'
      ),
      '2025年个人代码贡献量': pickNum(r, '2025年个人代码贡献量'),
      '2025年个人Issue贡献量': pickNum(r, '2025年个人Issue贡献量'),
      '2025年个人社区核心度': pickStr(r, '2025年个人社区核心度'),
      '2025年个人协作影响力': pickStr(r, '2025年个人协作影响力'),
      '2025年个人联通控制力': pickStr(r, '2025年个人联通控制力'),
      '2025年个人PageRank': pickStr(r, '2025年个人PageRank'),
    });
  }
  return rows;
}

function flattenParticipantRows(ecosystemData: any): ParticipantTableRow[] {
  const participants = ecosystemData?.['人员参与项目清单'];
  if (!participants || typeof participants !== 'object') return [];
  const rows: ParticipantTableRow[] = [];
  for (const [githubUser, userData] of Object.entries(participants)) {
    rows.push(...flattenUserRows(String(githubUser), userData));
  }
  return rows;
}

async function loadEntry(dataset: string, organizationId: string) {
  const fileBase = normalizeUserFileBase(organizationId);
  const cacheKey = `${dataset}__${fileBase}`;
  const datasetDir = await resolveDatasetDir(dataset);
  const filePath = path.resolve(datasetDir, `${fileBase}.json`);
  if (!(await fileExists(filePath))) return { entry: null, filePath };

  const stat = await fs.stat(filePath);
  const shouldCache = stat.size > CACHE_THRESHOLD_BYTES;

  if (shouldCache) {
    const cached = cache.get(cacheKey);
    if (
      cached &&
      cached.size === stat.size &&
      cached.mtimeMs === stat.mtimeMs
    ) {
      return { entry: cached, filePath };
    }
  }

  const raw = await fs.readFile(filePath, 'utf8');
  const parsed = JSON.parse(raw);
  const organizationData =
    (parsed &&
      typeof parsed === 'object' &&
      Object.values(parsed as any)[0] &&
      typeof Object.values(parsed as any)[0] === 'object' &&
      (Object.values(parsed as any)[0] as any)) ||
    {};

  const ecosystems = Object.keys(organizationData);
  const metaByEcosystem = buildMetaByEcosystem(organizationData);
  const entry: CachedEntry = {
    size: stat.size,
    mtimeMs: stat.mtimeMs,
    ecosystems,
    metaByEcosystem,
    rawOrganizationData: organizationData,
    flattenedByEcosystem: new Map(),
  };

  if (shouldCache) cache.set(cacheKey, entry);

  return { entry, filePath };
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

  const organizationId = String(req.query.organizationId || '');
  if (!organizationId) {
    res.status(400).json({ message: 'Missing organizationId' });
    return;
  }

  const page = parsePage(req.query.page);
  const pageSize = parsePageSize(req.query.pageSize);
  const ecosystemName = String(req.query.ecosystemName || '').trim();

  try {
    const { entry } = await loadEntry(dataset, organizationId);
    if (!entry) {
      res.status(404).json({
        message: 'Participant detail not found',
        dataset,
        organizationId,
      });
      return;
    }

    const activeEcosystem =
      (ecosystemName && entry.ecosystems.includes(ecosystemName)
        ? ecosystemName
        : entry.ecosystems[0]) || '';

    if (!activeEcosystem) {
      res.status(200).json({
        dataset,
        organizationId,
        ecosystems: [],
        metaByEcosystem: {},
        activeEcosystem: '',
        page,
        pageSize,
        total: 0,
        items: [],
      });
      return;
    }

    let allRows = entry.flattenedByEcosystem.get(activeEcosystem);
    if (!allRows) {
      allRows = flattenParticipantRows(
        entry.rawOrganizationData[activeEcosystem]
      );
      entry.flattenedByEcosystem.set(activeEcosystem, allRows);
    }

    const total = allRows.length;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const items = allRows.slice(start, end);

    res.setHeader('Cache-Control', 'public, max-age=300');
    res.status(200).json({
      dataset,
      organizationId,
      ecosystems: entry.ecosystems,
      metaByEcosystem: entry.metaByEcosystem,
      activeEcosystem,
      page,
      pageSize,
      total,
      items,
    });
  } catch (e) {
    res.status(500).json({
      message: 'Failed to load participant detail',
      dataset,
      organizationId,
    });
  }
}
