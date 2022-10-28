import React from 'react';
import Analyze from '@modules/analyze';
import { ConfigContextProvider, ColorProvider } from '@modules/analyze/context';
import { useStatusQuery } from '@graphql/generated';
import client from '@graphql/client';
import useCompareItems from '@modules/analyze/hooks/useCompareItems';

const AnalyzePage = () => {
  const { compareItems } = useCompareItems();
  const label = React.useMemo(() => {
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

  return (
    <ConfigContextProvider value={{ status, loading: isLoading }}>
      <ColorProvider>
        <Analyze />
      </ColorProvider>
    </ConfigContextProvider>
  );
};

export default AnalyzePage;
