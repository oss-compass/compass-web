import { useMemo } from 'react';
import { compareIdsSplit } from '@common/utils/links';

const useExtractShortIds = () => {
  const searchParams = useMemo(() => {
    const url = new URL(window.location.href.replace('#', ''));
    const projectId = url.searchParams.get('projectId');
    const taskId = url.searchParams.get('taskId');
    return { shortIds: compareIdsSplit(projectId), taskId };
  }, [window.location.href]);
  return searchParams;
};

const useLabelData = () => {
  const { shortIds, taskId } = useExtractShortIds();

  const reportItems = shortIds.map((shortCode) => {
    return { shortCode };
  });
  return { reportItems: reportItems, taskId };
};

export default useLabelData;
