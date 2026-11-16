import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';

import type { NextApiRequest, NextApiResponse } from 'next';

const DATA_ROOT = path.join('public', 'test', 'intelligent-analysis-new');

const created: string[] = [];

async function writeBackup(dataset: string, payload: string) {
  const file = path.join(DATA_ROOT, `${dataset}_backup.json`);
  await fs.writeFile(file, payload, 'utf8');
  // Guarantee a distinct mtime so size/mtime based invalidation can observe it
  // even on filesystems with coarse timestamp resolution.
  const future = new Date(Date.now() + created.length * 2000 + 2000);
  fsSync.utimesSync(file, future, future);
  created.push(file);
  return file;
}

function makeRes() {
  const res: {
    statusCode: number;
    body: unknown;
    status: (c: number) => unknown;
    json: (p: unknown) => unknown;
    setHeader: (k: string, v: string) => unknown;
    end: () => unknown;
  } = {
    statusCode: 0,
    body: undefined,
    status(c) {
      res.statusCode = c;
      return res;
    },
    json(p) {
      res.body = p;
      return res;
    },
    setHeader() {
      return res;
    },
    end() {
      return res;
    },
  };
  return res as unknown as NextApiResponse & typeof res;
}

async function call(dataset: string, userId: string) {
  const handler = (await import('./user-detail')).default;
  const res = makeRes();
  await handler(
    {
      method: 'GET',
      query: { dataset, userId },
    } as unknown as NextApiRequest,
    res
  );
  return res;
}

afterAll(async () => {
  for (const f of created) {
    await fs.unlink(f).catch(() => undefined);
  }
});

describe('GET /api/intelligent-analysis/projects/[dataset]/user-detail (backup lookup)', () => {
  it('serves data from a regenerated backup file instead of a stale cache entry', async () => {
    const dataset = '__jest_ud_refresh';

    await writeBackup(dataset, JSON.stringify([{ 用户ID: 'u1', 分数: 1 }]));
    const first = await call(dataset, 'u1');
    expect(first.statusCode).toBe(200);
    expect(first.body).toEqual({ u1: { 用户ID: 'u1', 分数: 1 } });

    // The analysis pipeline regenerates the backup file with different content.
    await writeBackup(
      dataset,
      JSON.stringify([{ 用户ID: 'u1', 分数: 2, 仓库: 'compass-web' }])
    );

    const second = await call(dataset, 'u1');
    expect(second.statusCode).toBe(200);
    expect(second.body).toEqual({
      u1: { 用户ID: 'u1', 分数: 2, 仓库: 'compass-web' },
    });
  });

  it('returns 500 when the backup file exists but cannot be parsed', async () => {
    const dataset = '__jest_ud_corrupt';
    await writeBackup(dataset, '{ this is not valid json');

    const res = await call(dataset, 'nobody');
    expect(res.statusCode).toBe(500);
    expect(res.body).toMatchObject({ message: 'Failed to load user detail' });
  });

  it('returns 404 when the backup file is simply absent', async () => {
    const res = await call('__jest_ud_absent', 'nobody');
    expect(res.statusCode).toBe(404);
    expect(res.body).toMatchObject({ message: 'User detail not found' });
  });

  it('keeps the cache bounded by evicting the least recently used dataset', async () => {
    const handler = (await import('./user-detail')).default;
    const { BACKUP_CACHE_MAX_ENTRIES } = await import('./user-detail');
    expect(BACKUP_CACHE_MAX_ENTRIES).toBeGreaterThan(0);

    const datasets = Array.from(
      { length: BACKUP_CACHE_MAX_ENTRIES + 1 },
      (_, i) => `__jest_ud_cap_${i}`
    );
    for (const d of datasets) {
      await writeBackup(d, JSON.stringify([{ 用户ID: 'u1', dataset: d }]));
    }

    // Fill the cache with one request per dataset.
    for (const d of datasets) {
      const res = await call(d, 'u1');
      expect(res.statusCode).toBe(200);
    }

    const readSpy = jest.spyOn(fs, 'readFile');
    try {
      // The first dataset was evicted while filling, so it must be re-read.
      const res = makeRes();
      await handler(
        {
          method: 'GET',
          query: { dataset: datasets[0], userId: 'u1' },
        } as unknown as NextApiRequest,
        res
      );
      expect(res.statusCode).toBe(200);
      expect(readSpy).toHaveBeenCalled();
    } finally {
      readSpy.mockRestore();
    }
  });
});
