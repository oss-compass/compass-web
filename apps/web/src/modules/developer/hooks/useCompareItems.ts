import { getPathname, compareIdsJoin } from '@common/utils';
import { useStatusContext } from '@modules/developer/context';
import { Level } from '@modules/developer/constant';

const useCompareItems = () => {
  const { verifiedItems } = useStatusContext();

  const items = verifiedItems.map(
    ({ label, level, shortCode, collections }) => {
      const name = level === Level.REPO ? getPathname(label) : label;
      return { label, level, shortCode, name, collections };
    }
  );

  const ids = items.map((i) => i.shortCode);

  return { compareItems: items, compareSlugs: compareIdsJoin(ids) };
};

export default useCompareItems;
