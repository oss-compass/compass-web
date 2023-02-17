import { proxy } from 'valtio';

export const avgAndScoreState = proxy({
  showAvg: false,
  showMedian: false,
  onePointSys: false,
});
