import { ParsedQuery } from 'query-string';
import uniq from 'lodash/uniq';
import { parseUrl } from '@common/utils/url';
import { useRouter } from 'next/router';
import qs from 'query-string';

const getPathname = (url: string): string => {
  const u = parseUrl(url);
  return u?.pathname.slice(1) || '';
};

const getContrastItemsFormUrl = (parsed: ParsedQuery) => {
  let items: string[] = [];
  if (typeof parsed.url === 'string') {
    items = [getPathname(parsed.url)];
  }
  //-----------vs---------------
  if (typeof parsed.vs === 'string') {
    items = [...items, getPathname(parsed.vs)];
  }
  if (Array.isArray(parsed.vs)) {
    const path = parsed.vs.map((v) => getPathname(v as string)).filter(Boolean);
    items = [...items, ...path];
  }
  return uniq(items);
};

const useContrastItems = () => {
  useRouter();
  const query = qs.parse(location.search);
  const contrastItems = getContrastItemsFormUrl(query);

  return {
    url: query.url,
    vs: query.vs,
    contrastItems,
  };
};

export default useContrastItems;
