import { proxy } from 'valtio';
import { CommunityRepoType } from '@common/constant';

export const avgAndScoreState = proxy<{
  showAvg: boolean;
  showMedian: boolean;
  onePointSys: boolean;
  repoType: CommunityRepoType;
}>({
  showAvg: false,
  showMedian: false,
  onePointSys: false,
  repoType: 'software-artifact',
});
