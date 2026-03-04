import fs from 'fs/promises';
import path from 'path';

import { classifyOrganization } from '@modules/intelligent-analysis/GovernancePlatform/Overview/Project/utils/orgClassifier';

type RawRow = Record<string, any>;

export type OrganizationRow = RawRow & {
  用户ID?: string;
  中文用户ID?: string;
  总得分?: number;
  国家?: string;
  排名?: number;
  用户类型?: string;
};

export type DeveloperRow = RawRow & {
  用户ID?: string;
  中文用户ID?: string;
  总得分?: number;
  国家?: string;
  所属组织?: string;
  排名?: number;
  用户类型?: string;
};

export type RegionMetric = 'all' | 'individual' | 'org_devs' | 'org_count';

export type RegionData = {
  key: string;
  country: string;
  userCount: number;
};

type DatasetCacheValue = {
  organizations: OrganizationRow[];
  orgRegions: string[];
  orgByRegion: Map<string, number[]>;
  orgByOrgType: Map<string, number[]>;
  developers: DeveloperRow[];
  devRegions: string[];
  devByRegion: Map<string, number[]>;
  devByRole: Map<'individual' | 'org', number[]>;
  stats: {
    all: number;
    individual: number;
    orgDevs: number;
    orgCount: number;
  };
  regionMetrics: Record<RegionMetric, RegionData[]>;
};

const datasetCache = new Map<string, DatasetCacheValue>();

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function resolveDataFilePath(dataset: string, mode: 'backup' | 'detail') {
  const fileName =
    mode === 'detail' ? `${dataset}_detail.json` : `${dataset}_backup.json`;

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

function normalizeScore(value: unknown): number {
  const score = Number(value);
  return Number.isFinite(score) ? score : 0;
}

function getUserTypeFromRow(row: Record<string, any>): string {
  const t = typeof row['用户类型'] === 'string' ? row['用户类型'].trim() : '';
  return t || '未知';
}

function normalizeOrgId(value: unknown): string {
  const raw = typeof value === 'string' ? value.trim() : '';
  if (!raw) return '未知';
  const lower = raw.toLowerCase();
  if (lower.startsWith('org:')) return raw.slice(4).trim().toLowerCase();
  if (lower.startsWith('org.')) return raw.slice(4).trim().toLowerCase();
  return raw.toLowerCase();
}

function getAffiliatedOrgFromRow(row: Record<string, any>): string {
  const org = typeof row['所属组织'] === 'string' ? row['所属组织'].trim() : '';
  return org || '未知';
}

function isIndividualDeveloper(row: Record<string, any>): boolean {
  return getAffiliatedOrgFromRow(row) === '未知';
}

function sortRegionData(result: RegionData[]): RegionData[] {
  const specialCountries = ['未知', '东八区'];
  return result.sort((a, b) => {
    const aIsSpecial = specialCountries.includes(a.country);
    const bIsSpecial = specialCountries.includes(b.country);
    if (aIsSpecial && !bIsSpecial) return 1;
    if (!aIsSpecial && bIsSpecial) return -1;
    return b.userCount - a.userCount;
  });
}

function splitRows(list: any[]) {
  const organizations: OrganizationRow[] = [];
  const developers: DeveloperRow[] = [];
  const orgRegionsSet = new Set<string>();
  const devRegionsSet = new Set<string>();

  for (const item of list) {
    const userId = item?.['用户ID'];
    if (typeof userId !== 'string') continue;

    const score = normalizeScore(item?.['总得分']);
    const country = item?.['国家'];
    const userType = getUserTypeFromRow(item);

    const isOrg =
      userType === '组织' ||
      userId.toLowerCase().startsWith('org:') ||
      userId.toLowerCase().startsWith('org.');

    if (isOrg) {
      const record: OrganizationRow = { ...item, 总得分: score };
      if (country) orgRegionsSet.add(country);
      organizations.push(record);
      continue;
    }

    const record: DeveloperRow = { ...item, 总得分: score };
    if (country) devRegionsSet.add(country);
    developers.push(record);
  }

  organizations.sort((a, b) => (b.总得分 || 0) - (a.总得分 || 0));
  developers.sort((a, b) => (b.总得分 || 0) - (a.总得分 || 0));

  return { organizations, developers, orgRegionsSet, devRegionsSet };
}

function buildOrganizationIndexes(organizations: OrganizationRow[]) {
  const orgByRegion = new Map<string, number[]>();
  const orgByOrgType = new Map<string, number[]>();

  for (let i = 0; i < organizations.length; i += 1) {
    const record = organizations[i];

    const region = record?.国家;
    if (region) {
      const arr = orgByRegion.get(region) || [];
      arr.push(i);
      orgByRegion.set(region, arr);
    }

    const orgType = classifyOrganization(record?.用户ID || '');
    if (orgType) {
      const arr = orgByOrgType.get(orgType) || [];
      arr.push(i);
      orgByOrgType.set(orgType, arr);
    }
  }

  return { orgByRegion, orgByOrgType };
}

function buildDeveloperIndexes(developers: DeveloperRow[]) {
  const devByRegion = new Map<string, number[]>();
  const devByRole = new Map<'individual' | 'org', number[]>();

  for (let i = 0; i < developers.length; i += 1) {
    const record = developers[i];
    const country = record?.国家;

    if (country) {
      const arr = devByRegion.get(country) || [];
      arr.push(i);
      devByRegion.set(country, arr);
    }

    const role: 'individual' | 'org' = isIndividualDeveloper(record)
      ? 'individual'
      : 'org';
    const arr = devByRole.get(role) || [];
    arr.push(i);
    devByRole.set(role, arr);
  }

  return { devByRegion, devByRole };
}

function computeRegionMetrics(input: {
  developers: DeveloperRow[];
  organizations: OrganizationRow[];
}) {
  const regionAllMap = new Map<string, number>();
  const regionIndividualMap = new Map<string, number>();
  const regionOrgDevsMap = new Map<string, number>();
  const regionOrgCountMap = new Map<string, number>();

  for (const record of input.developers) {
    if (getUserTypeFromRow(record) !== '个人') continue;
    const country = record?.国家;
    if (!country) continue;

    regionAllMap.set(country, (regionAllMap.get(country) || 0) + 1);

    const affiliatedOrg = getAffiliatedOrgFromRow(record);
    if (affiliatedOrg === '未知') {
      regionIndividualMap.set(
        country,
        (regionIndividualMap.get(country) || 0) + 1
      );
      continue;
    }

    regionOrgDevsMap.set(country, (regionOrgDevsMap.get(country) || 0) + 1);
  }

  for (const record of input.organizations) {
    if (getUserTypeFromRow(record) !== '组织') continue;
    const country = record?.国家;
    if (!country) continue;
    regionOrgCountMap.set(country, (regionOrgCountMap.get(country) || 0) + 1);
  }

  const toRegionDataArray = (m: Map<string, number>): RegionData[] => {
    const result: RegionData[] = [];
    m.forEach((count, country) => {
      result.push({ key: country, country, userCount: count });
    });
    return sortRegionData(result);
  };

  const regionOrgCountData: RegionData[] = toRegionDataArray(regionOrgCountMap);

  const stats = {
    all: Array.from(regionAllMap.values()).reduce((acc, v) => acc + v, 0),
    individual: Array.from(regionIndividualMap.values()).reduce(
      (acc, v) => acc + v,
      0
    ),
    orgDevs: Array.from(regionOrgDevsMap.values()).reduce(
      (acc, v) => acc + v,
      0
    ),
    orgCount: input.organizations.filter((r) => getUserTypeFromRow(r) === '组织')
      .length,
  };

  const regionMetrics: Record<RegionMetric, RegionData[]> = {
    all: toRegionDataArray(regionAllMap),
    individual: toRegionDataArray(regionIndividualMap),
    org_devs: toRegionDataArray(regionOrgDevsMap),
    org_count: regionOrgCountData,
  };

  return { stats, regionMetrics };
}

export async function getDatasetCacheValue(
  dataset: string,
  mode: 'backup' | 'detail'
): Promise<DatasetCacheValue> {
  const cacheKey = `${dataset}__${mode}`;
  const cached = datasetCache.get(cacheKey);
  if (cached) return cached;

  const filePath = await resolveDataFilePath(dataset, mode);
  const raw = await fs.readFile(filePath, 'utf8');
  const parsed = JSON.parse(raw);
  const list: any[] = Array.isArray(parsed) ? parsed : [];

  const { organizations, developers, orgRegionsSet, devRegionsSet } =
    splitRows(list);
  const { orgByRegion, orgByOrgType } = buildOrganizationIndexes(organizations);
  const { devByRegion, devByRole } = buildDeveloperIndexes(developers);
  const { stats, regionMetrics } = computeRegionMetrics({
    developers,
    organizations,
  });

  const value: DatasetCacheValue = {
    organizations,
    orgRegions: Array.from(orgRegionsSet),
    orgByRegion,
    orgByOrgType,
    developers,
    devRegions: Array.from(devRegionsSet),
    devByRegion,
    devByRole,
    stats,
    regionMetrics,
  };

  datasetCache.set(cacheKey, value);
  return value;
}
