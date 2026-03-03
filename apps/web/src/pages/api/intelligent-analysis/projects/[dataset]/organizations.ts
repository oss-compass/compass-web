import type { NextApiRequest, NextApiResponse } from 'next';
import {
  getDatasetCacheValue,
  type OrganizationRow,
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

function normalizeOrgIdForSearch(userId: unknown): string {
  const raw = String(userId || '');
  if (raw.toLowerCase().startsWith('org:')) return raw.slice(4);
  return raw;
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

function intersectSets(a: Set<number> | null, b: Set<number> | null) {
  if (!a) return b;
  if (!b) return a;

  const result = new Set<number>();
  a.forEach((idx) => {
    if (b.has(idx)) result.add(idx);
  });
  return result;
}

function buildOrganizationCandidateIndices(input: {
  all: OrganizationRow[];
  byRegion: Map<string, number[]>;
  byOrgType: Map<string, number[]>;
  regions: string[];
  orgTypes: string[];
  q: string;
  sort: string;
}) {
  const hasKeyword = input.q.length > 0;
  const regionSet = buildIndexSetFromMap(input.byRegion, input.regions);
  const orgTypeSet = buildIndexSetFromMap(input.byOrgType, input.orgTypes);
  const candidateIndexSet = intersectSets(regionSet, orgTypeSet);

  let candidateIndices = candidateIndexSet
    ? Array.from(candidateIndexSet).sort((a, b) => a - b)
    : input.all.map((_, i) => i);

  if (input.sort === 'score_asc') {
    candidateIndices = candidateIndices.reverse();
  }

  if (hasKeyword) {
    const keyword = input.q;
    candidateIndices = candidateIndices.filter((idx) => {
      const r = input.all[idx];
      const idText = normalizeSearchText(normalizeOrgIdForSearch(r?.用户ID));
      const cnText = normalizeSearchText(r?.中文用户ID);
      return idText.includes(keyword) || cnText.includes(keyword);
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
  const regions = parseCsvList(req.query.regions);
  const orgTypes = parseCsvList(req.query.orgTypes);
  const sort = String(req.query.sort || 'score_desc');

  try {
    const datasetValue = await getDatasetCacheValue(dataset, mode);
    const all = datasetValue.organizations;
    const candidateIndices = buildOrganizationCandidateIndices({
      all,
      byRegion: datasetValue.orgByRegion,
      byOrgType: datasetValue.orgByOrgType,
      regions,
      orgTypes,
      q,
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
      availableRegions: datasetValue.orgRegions,
      items,
    });
  } catch (e) {
    res.status(500).json({
      message: 'Failed to load organizations data',
      dataset,
      mode,
    });
  }
}
