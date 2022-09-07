import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import uniq from 'lodash/uniq';
import qs, { ParsedQuery } from 'query-string';
import { parseUrl } from '@common/utils/url';

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

const ContrastItems = () => {
  useRouter();
  const query = qs.parse(location.search);
  const contrastItems = getContrastItemsFormUrl(query);

  return (
    <div className="flex">
      {contrastItems.map((item, index) => {
        return (
          <React.Fragment key={item}>
            <div>{item}</div>
            {index < contrastItems.length - 1 ? (
              <div className="px-2 text-slate-300">vs</div>
            ) : null}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ContrastItems;
