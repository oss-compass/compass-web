import type { NextApiRequest, NextApiResponse } from 'next';

import {
  getDatasetCacheValue,
  type RegionMetric,
} from '@modules/intelligent-analysis/server/intelligentAnalysisNewDatasetCache';

const allowedMetrics: RegionMetric[] = [
  'all',
  'individual',
  'org_devs',
  'org_count',
];

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
  const metric = String(req.query.metric || 'all') as RegionMetric;

  if (!allowedMetrics.includes(metric)) {
    res.status(400).json({ message: 'Invalid metric' });
    return;
  }

  try {
    const datasetValue = await getDatasetCacheValue(dataset, mode);
    const items = datasetValue.regionMetrics[metric] || [];

    res.setHeader('Cache-Control', 'public, max-age=300');
    res.status(200).json({
      dataset,
      mode,
      metric,
      items,
      stats: datasetValue.stats,
    });
  } catch (e) {
    res.status(500).json({
      message: 'Failed to load regions data',
      dataset,
      mode,
      metric,
    });
  }
}
