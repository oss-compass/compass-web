import { useMemo, useEffect, useState } from 'react';
import { compareIdsSplit } from '@common/utils/links';

const useExtractShortIds = () => {
  const [href, setHref] = useState('');

  useEffect(() => {
    // Ensure window is defined (client-side)
    if (typeof window !== 'undefined') {
      setHref(window.location.href.replace('#', ''));
    }
  }, []); // Empty dependency array ensures this runs once on mount

  const searchParams = useMemo(() => {
    if (!href) return { shortIds: [], taskId: null }; // Return default if href is not set
    const url = new URL(href);
    const projectId = url.searchParams.get('projectId');
    const taskId = url.searchParams.get('taskId');
    return { shortIds: compareIdsSplit(projectId), taskId };
  }, [href]);
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
