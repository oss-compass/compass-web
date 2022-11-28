import { useMemo } from 'react';
import uniq from 'lodash/uniq';
import { useRouter } from 'next/router';
import { Level } from '@modules/analyze/constant';
import { getPathname } from '@common/utils';

function matchUrl(label: string) {
  // const reg =
  //   /(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
  if (label && new RegExp(/^\S*$/).test(label)) {
    return label;
  }
  return false;
}
function formatToArray(value: string | string[]) {
  if (typeof value === 'string') {
    return [value].filter(matchUrl);
  }
  return Array.isArray(value) ? uniq(value).filter(matchUrl) : [];
}

const useCompareItems = () => {
  const router = useRouter();
  const level = router.query.level as Level;
  const labels = useMemo(() => {
    const values = router.query.label;
    return formatToArray(values!);
  }, [router.query.label]);

  const items = useMemo(() => {
    return [
      ...labels.map((label) => ({
        name: level === Level.REPO ? getPathname(label) : label,
        label,
        level,
      })),
    ];
  }, [level, labels]);

  return { compareItems: items };
};

export default useCompareItems;
