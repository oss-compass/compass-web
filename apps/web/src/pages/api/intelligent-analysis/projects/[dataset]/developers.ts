import type { NextApiRequest, NextApiResponse } from 'next';

import {
  getDatasetCacheValue,
  type DeveloperRow,
} from '@modules/intelligent-analysis/server/intelligentAnalysisNewDatasetCache';

function parseCsvList(value: unknown): string[] {
  if (!value) return [];
  return String(value)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

function normalizeSearchText(value: unknown): string {
  return String(value || '')
    .trim()
    .toLowerCase();
}

function normalizeGithubIdForSearch(userId: unknown): string {
  const raw = String(userId || '');
  return raw.replace(/^github:/i, '');
}

function getAffiliatedOrg(org?: unknown): string {
  const v = typeof org === 'string' ? org.trim() : '';
  return v || '未知';
}

function buildIndexSetFromMap(
  indexMap: Map<string, number[]>,
  keys: string[]
): Set<number> | null {
  if (!Array.isArray(keys) || keys.length === 0) return null;

  const set = new Set<number>();
  for (const key of keys) {
    const indices = indexMap.get(key);
    if (!indices) continue;
    for (const idx of indices) set.add(idx);
  }
  return set;
}

function buildIndexSetFromIndices(indices: number[]) {
  if (!Array.isArray(indices) || indices.length === 0) return null;
  const set = new Set<number>();
  for (const idx of indices) set.add(idx);
  return set;
}

function intersectSets(a: Set<number> | null, b: Set<number> | null) {
  if (!a) return b;
  if (!b) return a;

  const result = new Set<number>();
  a.forEach((idx) => {
    if (b.has(idx)) result.add(idx);
  });
  return result;
}

function buildDeveloperCandidateIndices(input: {
  all: DeveloperRow[];
  byRegion: Map<string, number[]>;
  byRole: Map<'individual' | 'org', number[]>;
  regions: string[];
  role: 'all' | 'individual' | 'org';
  q: string;
  orgQ: string;
  sort: string;
}) {
  const hasKeyword = input.q.length > 0;
  const hasOrgKeyword = input.orgQ.length > 0;
  const roleKey =
    input.role === 'individual'
      ? 'individual'
      : input.role === 'org'
      ? 'org'
      : null;

  const regionSet = buildIndexSetFromMap(input.byRegion, input.regions);
  const roleSet = roleKey
    ? buildIndexSetFromIndices(input.byRole.get(roleKey) || [])
    : null;

  const candidateIndexSet = intersectSets(regionSet, roleSet);

  let candidateIndices = candidateIndexSet
    ? Array.from(candidateIndexSet).sort((a, b) => a - b)
    : input.all.map((_, i) => i);

  if (input.sort === 'score_asc') {
    candidateIndices = candidateIndices.reverse();
  }

  if (hasKeyword || hasOrgKeyword) {
    const keyword = input.q;
    const orgKeyword = input.orgQ;
    candidateIndices = candidateIndices.filter((idx) => {
      const r = input.all[idx];
      const userIdText = normalizeSearchText(
        normalizeGithubIdForSearch(r?.用户ID)
      );
      const orgText = normalizeSearchText(getAffiliatedOrg(r?.所属组织));

      const matchUserId = !hasKeyword ? true : userIdText.includes(keyword);
      const matchOrg = !hasOrgKeyword ? true : orgText.includes(orgKeyword);

      return matchUserId && matchOrg;
    });
  }

  return candidateIndices;
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

  const mode: 'backup' | 'detail' =
    req.query.mode === 'detail' ? 'detail' : 'backup';

  const page = Math.max(1, Number(req.query.page || 1));
  const pageSize = Math.min(100, Math.max(1, Number(req.query.pageSize || 10)));

  const q = normalizeSearchText(req.query.q);
  const orgQ = normalizeSearchText(req.query.orgQ);
  const regions = parseCsvList(req.query.regions);
  const role = String(req.query.role || 'all') as 'all' | 'individual' | 'org';
  const sort = String(req.query.sort || 'score_desc');

  try {
    const datasetValue = await getDatasetCacheValue(dataset, mode);
    const all = datasetValue.developers;
    const candidateIndices = buildDeveloperCandidateIndices({
      all,
      byRegion: datasetValue.devByRegion,
      byRole: datasetValue.devByRole,
      regions,
      role,
      q,
      orgQ,
      sort,
    });

    const total = candidateIndices.length;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const pageIndices = candidateIndices.slice(start, end);
    const items = pageIndices.map((idx, localIndex) => ({
      ...all[idx],
      排名: start + localIndex + 1,
    }));

    res.setHeader('Cache-Control', 'public, max-age=300');
    res.status(200).json({
      dataset,
      mode,
      page,
      pageSize,
      total,
      availableRegions: datasetValue.devRegions,
      items,
    });
  } catch (e) {
    res.status(500).json({
      message: 'Failed to load developers data',
      dataset,
      mode,
    });
  }
}
