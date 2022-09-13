import { useMemo } from 'react';
import uniq from 'lodash/uniq';
import { getAllPathname } from '@common/utils/url';
import { useRouter } from 'next/router';

const useCompareItemsItems = () => {
  const router = useRouter();
  const urls = useMemo(() => {
    const queryUrl = router.query.url;
    if (typeof queryUrl === 'string') {
      return [queryUrl];
    }
    return Array.isArray(queryUrl) ? uniq(queryUrl) : [];
  }, [router.query.url]);

  return {
    urls,
    compareItems: getAllPathname(urls),
  };
};

export default useCompareItemsItems;
