import memoize from 'lodash/memoize';

import collectionsMenu from '@public/data/collections—menus.json';
import collections from '@public/data/collections.json';

export const getFirstIdentName = memoize((ident: string, lang: string) => {
  const nameKey = lang === 'en' ? 'name' : 'name_cn';
  const item = collectionsMenu.find((i) => i.ident === ident);
  if (item && item[nameKey]) return item[nameKey];
  return ident;
});

export const getSecondIdentName = memoize((ident: string, lang: string) => {
  const nameKey = lang === 'en' ? 'name' : 'name_cn';
  const item = collections[ident];
  if (item && item[nameKey]) return item[nameKey];
  return ident;
});
