import fs from 'fs/promises';
import path from 'path';

import type {
  RustLeaderboardType,
  RustOrganizationRow,
  RustOverviewResponse,
  RustRegionRow,
} from '../types';

type RustDatasetCacheValue = {
  developers: RustRegionRow[];
  projects: RustRegionRow[];
  organizations: RustOrganizationRow[];
  metrics: RustOverviewResponse['metrics'];
  availableRegions: string[];
};

type RustLeaderboardQuery = {
  q?: string;
  regions?: string[];
  page?: number;
  pageSize?: number;
};

let rustDatasetPromise: Promise<RustDatasetCacheValue> | null = null;

function normalizeText(value: unknown): string {
  return String(value ?? '').trim();
}

function normalizeCountry(value: unknown): string {
  const text = normalizeText(value);
  if (!text) return '未知';

  const lower = text.toLowerCase();
  if (
    lower === 'unknown' ||
    lower === 'null' ||
    lower === 'undefined' ||
    lower === 'none' ||
    lower === 'n/a' ||
    lower === 'na'
  ) {
    return '未知';
  }

  return text;
}

function normalizeShare(value: unknown): string {
  return normalizeText(value) || '0.00%';
}

function parseInteger(value: unknown): number {
  const numeric = Number(
    String(value ?? '')
      .replace(/,/g, '')
      .trim()
  );
  return Number.isFinite(numeric) ? Math.round(numeric) : 0;
}

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = '';
  let inQuotes = false;

  const normalizedText = text.replace(/^\uFEFF/, '');

  for (let index = 0; index < normalizedText.length; index += 1) {
    const char = normalizedText[index];
    const nextChar = normalizedText[index + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentCell += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === ',' && !inQuotes) {
      currentRow.push(currentCell);
      currentCell = '';
      continue;
    }

    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        index += 1;
      }
      currentRow.push(currentCell);
      if (currentRow.some((cell) => cell.trim().length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentCell = '';
      continue;
    }

    currentCell += char;
  }

  currentRow.push(currentCell);
  if (currentRow.some((cell) => cell.trim().length > 0)) {
    rows.push(currentRow);
  }

  return rows;
}

function toRecords(text: string): Record<string, string>[] {
  const rows = parseCsv(text);
  if (rows.length === 0) return [];

  const [headerRow, ...bodyRows] = rows;
  const headers = headerRow.map((header) => normalizeText(header));

  return bodyRows
    .filter((row) => row.some((cell) => normalizeText(cell).length > 0))
    .map((row) => {
      const record: Record<string, string> = {};
      headers.forEach((header, index) => {
        record[header] = normalizeText(row[index]);
      });
      return record;
    });
}

async function fileExists(targetPath: string): Promise<boolean> {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function resolveRustDataDir(): Promise<string> {
  const candidates = [
    path.resolve(
      process.cwd(),
      'src',
      'modules',
      'intelligent-analysis',
      'Rust',
      'data'
    ),
    path.resolve(
      process.cwd(),
      'apps',
      'web',
      'src',
      'modules',
      'intelligent-analysis',
      'Rust',
      'data'
    ),
  ];

  for (const candidate of candidates) {
    if (await fileExists(candidate)) {
      return candidate;
    }
  }

  return candidates[0];
}

async function readCsvRecords(fileName: string) {
  const dataDir = await resolveRustDataDir();
  const filePath = path.join(dataDir, fileName);
  const content = await fs.readFile(filePath, 'utf8');
  return toRecords(content);
}

function buildRegionRows(
  records: Record<string, string>[],
  countKey: '开发者数量' | '项目数量'
): RustRegionRow[] {
  return records
    .map((record, index) => ({
      key: `${normalizeCountry(record.国家)}-${index + 1}`,
      排名: parseInteger(record.排名) || index + 1,
      国家: normalizeCountry(record.国家),
      数量: parseInteger(record[countKey]),
      占比: normalizeShare(record.占比),
    }))
    .sort((left, right) => left.排名 - right.排名);
}

function buildOrganizationRows(
  records: Record<string, string>[]
): RustOrganizationRow[] {
  const isUnknownOrganization = (value: string) => {
    const normalized = normalizeText(value).toLowerCase();
    return (
      !normalized ||
      normalized === 'unknown' ||
      normalized === '未知' ||
      normalized === '未知组织'
    );
  };

  const rows = records
    .map((record, index) => ({
      key: `${normalizeText(record.组织) || '未知组织'}-${index + 1}`,
      排名: parseInteger(record.排名) || index + 1,
      组织: normalizeText(record.组织) || '未知组织',
      所属国家: normalizeCountry(record.所属国家),
      开发者数量: parseInteger(record.开发者数量),
      占比: normalizeShare(record.占比),
    }))
    .sort((left, right) => {
      const leftUnknown =
        isUnknownOrganization(left.组织) &&
        normalizeCountry(left.所属国家) === '未知';
      const rightUnknown =
        isUnknownOrganization(right.组织) &&
        normalizeCountry(right.所属国家) === '未知';

      if (leftUnknown && !rightUnknown) return 1;
      if (!leftUnknown && rightUnknown) return -1;

      return left.排名 - right.排名;
    });

  return rows.map((row, index) => ({
    ...row,
    排名: index + 1,
  }));
}

function buildMetrics(input: {
  developers: RustRegionRow[];
  projects: RustRegionRow[];
  organizations: RustOrganizationRow[];
}): RustOverviewResponse['metrics'] {
  const countriesCount = new Set(
    [...input.developers, ...input.projects].map((item) => item.国家)
  ).size;

  return {
    developersTotal: input.developers.reduce((sum, item) => sum + item.数量, 0),
    projectsTotal: input.projects.reduce((sum, item) => sum + item.数量, 0),
    organizationsTotal: input.organizations.length,
    countriesCount,
  };
}

function getAvailableRegions(input: RustDatasetCacheValue) {
  return Array.from(
    new Set([
      ...input.developers.map((item) => item.国家),
      ...input.projects.map((item) => item.国家),
      ...input.organizations.map((item) => item.所属国家),
    ])
  );
}

async function createRustDatasetCache(): Promise<RustDatasetCacheValue> {
  const [developerRecords, organizationRecords, projectRecords] =
    await Promise.all([
      readCsvRecords('开发者.csv'),
      readCsvRecords('开发者组织.csv'),
      readCsvRecords('项目.csv'),
    ]);

  const developers = buildRegionRows(developerRecords, '开发者数量');
  const projects = buildRegionRows(projectRecords, '项目数量');
  const organizations = buildOrganizationRows(organizationRecords);

  const cacheValue: RustDatasetCacheValue = {
    developers,
    projects,
    organizations,
    metrics: buildMetrics({ developers, projects, organizations }),
    availableRegions: [],
  };

  cacheValue.availableRegions = getAvailableRegions(cacheValue);

  return cacheValue;
}

async function getRustDatasetCache(): Promise<RustDatasetCacheValue> {
  if (!rustDatasetPromise) {
    rustDatasetPromise = createRustDatasetCache();
  }

  return rustDatasetPromise;
}

function normalizeLeaderboardType(value: unknown): RustLeaderboardType | null {
  const type = normalizeText(value);
  if (
    type === 'developers' ||
    type === 'organizations' ||
    type === 'projects'
  ) {
    return type;
  }
  return null;
}

function filterByRegions<T>(
  rows: T[],
  regions: string[],
  getRegion: (row: T) => string
): T[] {
  if (!Array.isArray(regions) || regions.length === 0) {
    return rows;
  }

  const regionSet = new Set(regions.map((region) => normalizeCountry(region)));
  return rows.filter((row) => regionSet.has(normalizeCountry(getRegion(row))));
}

function filterByKeyword(
  type: RustLeaderboardType,
  rows: Array<RustRegionRow | RustOrganizationRow>,
  keyword: string
) {
  if (!keyword) {
    return rows;
  }

  const normalizedKeyword = keyword.toLowerCase();

  return rows.filter((row) => {
    if (type === 'organizations') {
      const organizationRow = row as RustOrganizationRow;
      return [
        organizationRow.组织,
        organizationRow.所属国家,
        String(organizationRow.排名),
      ].some((field) => field.toLowerCase().includes(normalizedKeyword));
    }

    const regionRow = row as RustRegionRow;
    return [regionRow.国家, String(regionRow.排名)].some((field) =>
      field.toLowerCase().includes(normalizedKeyword)
    );
  });
}

export async function getRustOverviewData(): Promise<RustOverviewResponse> {
  const cache = await getRustDatasetCache();

  return {
    metrics: cache.metrics,
    distributions: {
      developers: cache.developers,
      projects: cache.projects,
    },
  };
}

export async function getRustLeaderboardPage(
  type: RustLeaderboardType,
  query: RustLeaderboardQuery
) {
  const cache = await getRustDatasetCache();
  const page = Math.max(1, Number(query.page || 1));
  const pageSize = Math.min(50, Math.max(1, Number(query.pageSize || 10)));
  const keyword = normalizeText(query.q).toLowerCase();
  const regions = (query.regions || []).map((region) =>
    normalizeCountry(region)
  );

  let sourceRows: Array<RustRegionRow | RustOrganizationRow> = [];

  if (type === 'developers') {
    sourceRows = filterByRegions(cache.developers, regions, (row) => row.国家);
  } else if (type === 'projects') {
    sourceRows = filterByRegions(cache.projects, regions, (row) => row.国家);
  } else {
    sourceRows = filterByRegions(
      cache.organizations,
      regions,
      (row) => row.所属国家
    );
  }

  const filteredRows = filterByKeyword(type, sourceRows, keyword);
  const total = filteredRows.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const items = filteredRows.slice(start, end);

  return {
    type,
    page,
    pageSize,
    total,
    items,
  };
}

export function parseRegionList(value: unknown): string[] {
  if (!value) return [];
  return String(value)
    .split(',')
    .map((region) => normalizeCountry(region))
    .filter(Boolean);
}

export function isRustLeaderboardType(
  value: unknown
): value is RustLeaderboardType {
  return normalizeLeaderboardType(value) !== null;
}
