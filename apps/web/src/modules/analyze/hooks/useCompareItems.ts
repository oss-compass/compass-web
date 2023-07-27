import { getPathname, compareIdsJoin } from '@common/utils';
import { useStatusContext } from '@modules/analyze/context';
import { Level } from '@modules/analyze/constant';

const useCompareItems = () => {
  const { verifiedItems } = useStatusContext();

  const items = verifiedItems.map(({ label, level, shortCode }) => {
    const name = level === Level.REPO ? getPathname(label) : label;
    return { label, level, shortCode, name };
  });

  const ids = items.map((i) => i.shortCode);

  return { compareItems: items, compareSlugs: compareIdsJoin(ids) };
};

export default useCompareItems;
