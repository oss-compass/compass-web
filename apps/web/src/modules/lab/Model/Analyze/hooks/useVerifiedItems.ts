import { getPathname, compareIdsJoin } from '@common/utils';
import { Level } from '@common/constant';
import { useSlugsVerifyContext } from '../context/StatusContext';

const useVerifiedItems = () => {
  const { verifiedItems } = useSlugsVerifyContext();

  const items = verifiedItems.map(({ label, level, shortCode }) => {
    const name = level === Level.REPO ? getPathname(label) : label;
    return { label, level, shortCode, name };
  });

  const ids = items.map((i) => i.shortCode);

  return { compareItems: items, slugs: compareIdsJoin(ids) };
};

export default useVerifiedItems;
