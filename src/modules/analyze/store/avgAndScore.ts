import { proxy } from 'valtio';

export const avgAndScoreState = proxy({
  showAvg: true,
  showMedian: true,
  onePointSys: false,
});
