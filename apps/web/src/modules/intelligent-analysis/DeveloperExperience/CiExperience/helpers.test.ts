import {
  CI_REPOS,
  normalizeRepoKey,
  prURL,
  repoKeyToQuery,
  repoSlug,
  runURL,
} from './helpers';
import type { CiRepoKey } from './types';

/**
 * 仓库注册表 · 回归测试
 *
 * 背景：runURL / prURL 用仓库键拼 GitCode 外链，但仓库键与真实项目名并不总是一致
 * （如 ascdevkit → asc-devkit）。这套映射曾被复制到多个文件各自维护，漏改的仓库
 * 会把 run/PR 外链指向不存在的 https://gitcode.com/cann/<key>/... 并 404；
 * 同一份别名表也决定 ?repo=<slug> 能否解析回仓库键，否则静默回退 runtime。
 * 因此这里同时锁定「键 → slug」的完整性与 query 往返。
 */

/** types.ts 的 CiRepoKey 全集及其对外顺序（runtime 优先，与选择器/看板一致） */
const EXPECTED_KEYS: CiRepoKey[] = [
  'runtime',
  'opsnn',
  'opscv',
  'graphaf',
  'opstransformer',
  'hcomm',
  'pypto',
  'ascdevkit',
  'hccl',
  'hixl',
  'ptoisa',
  'oamtools',
  'amct',
  'opbase',
  'pyasc',
  'metadef',
  'asctools',
];

describe('CI repo registry', () => {
  it('covers every repo key exactly once, in page order', () => {
    const keys = CI_REPOS.map((r) => r.key);
    expect(keys).toEqual(EXPECTED_KEYS);
    expect(new Set(keys).size).toBe(EXPECTED_KEYS.length);
  });

  it('uses a unique GitCode-safe project slug for every repo', () => {
    const slugs = CI_REPOS.map((r) => r.slug);
    slugs.forEach((slug) => expect(slug).toMatch(/^[a-z0-9-]+$/));
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('falls back to the key itself for an unregistered repo', () => {
    expect(repoSlug('brand-new-repo' as CiRepoKey)).toBe('brand-new-repo');
  });
});

describe('GitCode run / PR links', () => {
  it('derives both links from the registry slug for every repo', () => {
    CI_REPOS.forEach(({ key, slug }) => {
      expect(runURL(key, '123456')).toBe(
        `https://gitcode.com/cann/${slug}/actions/runs/123456`
      );
      expect(prURL(key, 42)).toBe(
        `https://gitcode.com/cann/${slug}/merge_requests/42`
      );
    });
  });

  it('spells out every repo whose project name differs', () => {
    const renamed: [CiRepoKey, string][] = [
      ['opsnn', 'ops-nn'],
      ['opscv', 'ops-cv'],
      ['graphaf', 'graph-autofusion'],
      ['opstransformer', 'ops-transformer'],
      ['ascdevkit', 'asc-devkit'],
      ['oamtools', 'oam-tools'],
      ['asctools', 'asc-tools'],
    ];
    renamed.forEach(([key, slug]) => {
      expect(runURL(key, '1')).toBe(
        `https://gitcode.com/cann/${slug}/actions/runs/1`
      );
      expect(prURL(key, '7')).toBe(
        `https://gitcode.com/cann/${slug}/merge_requests/7`
      );
    });
  });

  it('keeps the project name identical to the key when unrenamed', () => {
    expect(runURL('runtime', '9')).toBe(
      'https://gitcode.com/cann/runtime/actions/runs/9'
    );
    expect(prURL('hccl', 9)).toBe(
      'https://gitcode.com/cann/hccl/merge_requests/9'
    );
  });
});

describe('repo query normalization', () => {
  it('emits the GitCode slug as the query value', () => {
    CI_REPOS.forEach(({ key, slug }) => {
      expect(repoKeyToQuery(key)).toBe(slug);
    });
  });

  it('round-trips every key through key -> query -> key', () => {
    CI_REPOS.forEach(({ key }) => {
      expect(normalizeRepoKey(repoKeyToQuery(key))).toBe(key);
    });
  });

  it('resolves key and slug spellings, case-insensitively', () => {
    CI_REPOS.forEach(({ key, slug }) => {
      expect(normalizeRepoKey(key)).toBe(key);
      expect(normalizeRepoKey(slug)).toBe(key);
      expect(normalizeRepoKey(slug.toUpperCase())).toBe(key);
    });
  });

  it('resolves the slugs that used to fall back to runtime', () => {
    expect(normalizeRepoKey('ops-transformer')).toBe('opstransformer');
    expect(normalizeRepoKey('asc-devkit')).toBe('ascdevkit');
    expect(normalizeRepoKey('oam-tools')).toBe('oamtools');
    expect(normalizeRepoKey('asc-tools')).toBe('asctools');
    expect(normalizeRepoKey('asc-devkit')).not.toBe('runtime');
  });

  it('takes the first value when the query param is repeated', () => {
    expect(normalizeRepoKey(['asc-devkit', 'runtime'])).toBe('ascdevkit');
  });

  it('trims and lowercases the incoming value', () => {
    expect(normalizeRepoKey('  Asc-DevKit  ')).toBe('ascdevkit');
  });

  it('falls back to runtime for unknown, empty and missing values', () => {
    expect(normalizeRepoKey('no-such-repo')).toBe('runtime');
    expect(normalizeRepoKey('')).toBe('runtime');
    expect(normalizeRepoKey('   ')).toBe('runtime');
    expect(normalizeRepoKey(undefined)).toBe('runtime');
    expect(normalizeRepoKey([] as string[])).toBe('runtime');
  });
});
