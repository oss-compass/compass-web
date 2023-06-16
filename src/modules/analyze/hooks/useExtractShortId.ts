import { useMemo } from 'react';
import uniq from 'lodash/uniq';
import { useRouter } from 'next/router';
import { Level } from '@modules/analyze/constant';
import { getPathname } from '@common/utils';

function formatToArray(value: undefined | string | string[]) {
  if (!value) return [];
  if (typeof value === 'string') {
    return [value];
  }
  return Array.isArray(value) ? uniq(value) : [];
}

const useExtractShortId = () => {
  const router = useRouter();
  const shortId = router.query.shortId;

  const result = useMemo(() => {
    return formatToArray(shortId);
  }, [shortId]);

  return { shortIds: result };
};

export default useExtractShortId;
