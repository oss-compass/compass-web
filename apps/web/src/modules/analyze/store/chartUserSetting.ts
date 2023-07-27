import { proxy, subscribe } from 'valtio';
import { CommunityRepoType } from '@common/constant';
import isBrowser from '@common/utils/isBrowser';

const KEY = 'analyze.setting.chart';

const localSet = (content: string) => {
  return localStorage.setItem(KEY, content);
};

const localGet = () => {
  try {
    if (!isBrowser()) return null;

    const str = localStorage.getItem(KEY);
    return JSON.parse(str!);
  } catch (e) {
    console.log(e);
    return null;
  }
};

type UserSettingProps = {
  showAvg: boolean;
  showMedian: boolean;
  onePointSys: boolean;
  repoType: CommunityRepoType;
  // https://echarts.apache.org/en/option.html#yAxis.scale
  yAxisScale: boolean;
};

export const chartUserSettingState = proxy<UserSettingProps>(
  localGet() || {
    showAvg: false,
    showMedian: false,
    onePointSys: false,
    repoType: 'software-artifact',
    yAxisScale: true,
  }
);

subscribe(chartUserSettingState, () => {
  localSet(JSON.stringify(chartUserSettingState));
});
