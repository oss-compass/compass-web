import React from 'react';
import { useStatusQuery } from '@graphql/generated';
import client from '@graphql/client';
import useCompareItems from '@modules/analyze/hooks/useCompareItems';

const useLabelStatus = () => {
  const { compareItems } = useCompareItems();
  const label = React.useMemo(() => {
    // todo check all compare items status
    if (compareItems.length >= 1) {
      return compareItems[0].label;
    }
    return '';
  }, [compareItems]);

  const { data, isLoading } = useStatusQuery(
    client,
    { label },
    { enabled: Boolean(label) }
  );
  const status = data?.analysisStatus || 'pending';
  return {
    isLoading,
    status,
  };
};

export default useLabelStatus;
