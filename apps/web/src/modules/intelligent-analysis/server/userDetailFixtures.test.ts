/** @jest-environment node */

import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';
import handler from '../../../pages/api/intelligent-analysis/projects/[dataset]/user-detail';

const fixtureDir = path.resolve(
  __dirname,
  '../../../../test-fixtures/intelligent-analysis/user-detail'
);

let root: string;
let dataset: string;
let sequence = 0;

beforeEach(async () => {
  root = await fs.mkdtemp(path.join(os.tmpdir(), 'compass-user-detail-'));
  dataset = `synthetic-fixture-${++sequence}`;
  jest.spyOn(process, 'cwd').mockReturnValue(root);
});

afterEach(async () => {
  jest.restoreAllMocks();
  await fs.rm(root, { recursive: true, force: true });
});

async function install(name: string, destination: string) {
  const bytes = await fs.readFile(path.join(fixtureDir, name));
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.writeFile(destination, bytes);
  return JSON.parse(bytes.toString());
}

async function request(
  userId = 'synthetic:developer-001',
  method = 'GET',
  datasetName = dataset
) {
  const req = {
    method,
    query: { dataset: datasetName, userId },
  } as unknown as NextApiRequest;
  const res = {
    setHeader: jest.fn(),
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  await handler(req, res as unknown as NextApiResponse);
  return res;
}

describe.each(['public', 'apps/web/public'])(
  'user-detail from %s',
  (publicDir) => {
    const dataDir = () =>
      path.join(root, publicDir, 'test', 'intelligent-analysis-new');

    it('prefers the main file, preserving zero, null and empty objects', async () => {
      const dir = path.join(dataDir(), dataset);
      const expected = await install(
        'main.json',
        path.join(dir, 'synthetic_developer-001_main.json')
      );
      await install(
        'fallback.json',
        path.join(dir, 'synthetic_developer-001.json')
      );
      const res = await request();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.setHeader).toHaveBeenCalledWith(
        'Cache-Control',
        'public, max-age=300'
      );
      expect(res.json).toHaveBeenCalledWith(expected);
      expect(expected['synthetic:developer-001']).toMatchObject({
        总得分: 0,
        简介: null,
        合成生态2025年角色得分拆解: {},
      });
    });

    it('reads the fallback filename when the main file is absent', async () => {
      const expected = await install(
        'fallback.json',
        path.join(dataDir(), dataset, 'synthetic_developer-002.json')
      );
      const res = await request('synthetic:developer-002');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expected);
    });

    it('wraps the matching backup row in the same API response shape', async () => {
      const rows = await install(
        'backup.json',
        path.join(dataDir(), `${dataset}_backup.json`)
      );
      const res = await request('synthetic:developer-003');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        'synthetic:developer-003': rows[0],
      });
      expect(res.setHeader).toHaveBeenCalledWith(
        'Cache-Control',
        'public, max-age=300'
      );
    });

    it('returns 404 for an identifier absent from the backup', async () => {
      await install(
        'backup.json',
        path.join(dataDir(), `${dataset}_backup.json`)
      );
      const res = await request('synthetic:unknown');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.setHeader).not.toHaveBeenCalled();
    });

    it('returns 500 for a malformed main file without caching it', async () => {
      const destination = path.join(
        dataDir(),
        dataset,
        'synthetic_developer-001_main.json'
      );
      await install('main.json', destination);
      await fs.writeFile(destination, '{invalid synthetic JSON');
      const res = await request();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.setHeader).not.toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({
        message: 'Failed to load user detail',
        dataset,
        userId: 'synthetic:developer-001',
      });
    });
  }
);

it('returns 404 when there is no dataset', async () => {
  expect((await request()).status).toHaveBeenCalledWith(404);
});

it('retains the GET-only contract', async () => {
  const res = await request('synthetic:developer-001', 'POST');
  expect(res.status).toHaveBeenCalledWith(405);
  expect(res.setHeader).toHaveBeenCalledWith('Allow', 'GET');
});

it.each([
  ['', 'synthetic:developer-001'],
  ['synthetic-dataset', ''],
  ['../synthetic-dataset', 'synthetic:developer-001'],
  ['synthetic-dataset', '../synthetic:developer-001'],
  ['synthetic-dataset', '..\\synthetic:developer-001'],
])('rejects invalid dataset/user identifiers (%s, %s)', async (name, user) => {
  const access = jest.spyOn(fs, 'access');
  const res = await request(user, 'GET', name);
  expect(res.status).toHaveBeenCalledWith(400);
  expect(access).not.toHaveBeenCalled();
});
