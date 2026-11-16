import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import path from 'path';
import handler from './user-detail';

function response() {
  return {
    setHeader: jest.fn(),
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
}

async function request(dataset: string, userId: string) {
  const req = { method: 'GET', query: { dataset, userId } };
  const res = response();
  await handler(
    req as unknown as NextApiRequest,
    res as unknown as NextApiResponse
  );
  expect(res.status).toHaveBeenCalledWith(200);
  return res.json.mock.calls[0][0];
}

it('indexes backup rows once while preserving the first duplicate user', async () => {
  let idReads = 0;
  const row = (userId: string, value: string) => ({
    get 用户ID() {
      idReads += 1;
      return userId;
    },
    value,
  });
  const rows = [
    row('github:duplicate', 'first'),
    row('github:other', 'other'),
    row('github:duplicate', 'later'),
  ];
  const parse = JSON.parse;
  const parseSpy = jest
    .spyOn(JSON, 'parse')
    .mockImplementation((raw) =>
      raw === 'synthetic backup' ? rows : parse(raw)
    );
  const dataset = `backup-index-${Date.now()}`;
  const backupPath = path.resolve(
    process.cwd(),
    'public/test/intelligent-analysis-new',
    `${dataset}_backup.json`
  );

  try {
    await fs.writeFile(backupPath, 'synthetic backup');
    expect(await request(dataset, 'github:duplicate')).toMatchObject({
      'github:duplicate': { value: 'first' },
    });
    idReads = 0;
    expect(await request(dataset, 'github:other')).toMatchObject({
      'github:other': { value: 'other' },
    });
    expect(idReads).toBe(0);
  } finally {
    parseSpy.mockRestore();
    await fs.unlink(backupPath);
  }
});
