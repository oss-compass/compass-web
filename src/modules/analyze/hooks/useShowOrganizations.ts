import { useContext } from 'react';
import { useSnapshot } from 'valtio';
import { ChartsDataContext } from '@modules/analyze/context/ChartsDataProvider';

const useShowOrganizations = () => {
  const state = useContext(ChartsDataContext);
  const { showOrganizations } = useSnapshot(state);
  return showOrganizations;
};
export default useShowOrganizations;
