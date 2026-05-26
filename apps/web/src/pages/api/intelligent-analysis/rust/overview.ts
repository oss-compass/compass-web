import type { NextApiRequest, NextApiResponse } from 'next';

import { getRustOverviewData } from '@modules/intelligent-analysis/Rust/server/rustDataset';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  try {
    const data = await getRustOverviewData();
    res.setHeader('Cache-Control', 'public, max-age=300');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load Rust overview data' });
  }
}
