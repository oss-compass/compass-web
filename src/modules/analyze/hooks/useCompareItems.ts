import { useSnapshot } from 'valtio';
import { verifiedLabels } from '@modules/analyze/store';
import { getPathname } from '@common/utils';
import { Level } from '@modules/analyze/constant';

const useCompareItems = () => {
  const labels = useSnapshot(verifiedLabels);

  const items = labels.values.map(({ label, level }) => {
    return {
      label,
      level,
      name: level === Level.REPO ? getPathname(label) : label,
    };
  });

  return { compareItems: items };
};

export default useCompareItems;
