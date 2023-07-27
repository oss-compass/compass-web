import { useMemo } from 'react';
import { useRouter } from 'next/router';
import head from 'lodash/head';
import { compareIdsSplit } from '@common/utils/links';

const useExtractShortIds = () => {
  const router = useRouter();
  const slugs = router.query.slugs!;
  const shortIds = useMemo(() => {
    const idString = Array.isArray(slugs) ? head(slugs) : slugs;
    return compareIdsSplit(idString);
  }, [slugs]);

  return { shortIds };
};

export default useExtractShortIds;
