import { useContext } from 'react';
import { useSnapshot } from 'valtio';
import { ChartsDataContext } from '@modules/developer/context/ChartsDataProvider';

const useMetricQueryData = () => {
  const state = useContext(ChartsDataContext);
  const { loading, items, summary } = useSnapshot(state);
  return { loading, items, summary };
};

export default useMetricQueryData;
