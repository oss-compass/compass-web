import type { NextApiRequest, NextApiResponse } from 'next';

import {
  getRustLeaderboardPage,
  isRustLeaderboardType,
  parseRegionList,
  type RustDataset,
} from '@modules/intelligent-analysis/Rust/server/rustDataset';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const type = req.query.type;
  if (!isRustLeaderboardType(type)) {
    res.status(400).json({ message: 'Invalid leaderboard type' });
    return;
  }

  const queryKeyword = Array.isArray(req.query.q)
    ? req.query.q[0]
    : req.query.q;

  const datasetParam = Array.isArray(req.query.dataset)
    ? req.query.dataset[0]
    : req.query.dataset;
  const dataset: RustDataset =
    datasetParam === 'creatio' ? 'creatio' : 'global';

  try {
    const data = await getRustLeaderboardPage(
      type,
      {
        q: queryKeyword,
        regions: parseRegionList(req.query.regions),
        page: Number(req.query.page || 1),
        pageSize: Number(req.query.pageSize || 10),
      },
      dataset
    );

    res.setHeader('Cache-Control', 'public, max-age=300');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load Rust leaderboard data' });
  }
}
