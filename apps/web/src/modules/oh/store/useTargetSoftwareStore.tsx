import { proxy, useSnapshot } from 'valtio';

export const targetSoftwareStore = proxy<{
  targetSoftware: any;
  metricItemScoreList: any;
}>({
  targetSoftware: null,
  metricItemScoreList: null,
});

export const setTargetSoftwareData = (data, metricItemScoreList) => {
  targetSoftwareStore.targetSoftware = data;
  targetSoftwareStore.metricItemScoreList = metricItemScoreList;
};

export const useGetTargetSoftwareData = () => {
  const { targetSoftware, metricItemScoreList } =
    useSnapshot(targetSoftwareStore);
  return { targetSoftware, metricItemScoreList };
};
export const resetTargetSoftwareData = () => {
  targetSoftwareStore.targetSoftware = null;
  targetSoftwareStore.metricItemScoreList = null;
};
