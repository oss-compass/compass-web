import uniq from 'lodash/uniq';
import { ParsedUrlQuery, stringify as stringifyQueryString } from 'querystring';

export const parseUrl = (url: string): URL | null => {
  try {
    return new URL(url);
  } catch (e) {
    return null;
  }
};

//https://github.com/cli/cli =>  cli/cli
export const getPathname = (url: string): string => {
  const u = parseUrl(url);
  return u?.pathname.slice(1) || '';
};

export const getAllPathname = (urls: string[]) => {
  const pathName = urls.map((v) => getPathname(v)).filter(Boolean);
  return uniq(pathName);
};

//  gg/cli => gg
export function getFirstPathSegment(path: string) {
  if (!path) return '';
  return path.split('/').shift() || '';
}

//  cli/cli => cli
export function getLastPathSegment(path: string) {
  if (!path) return '';
  return path.split('/').pop() || '';
}

export function getNameSpace(path: string) {
  if (!path) return '';
  //  https://jex.im/regulex/#!flags=&re=(.%2B%3F)%5C%2F.%2B%3F%5C%2F%3F%24
  return getPathname(path).match(/(.+?)\/.+?\/?$/)?.[1] || '';
}

export function getRepoName(path: string) {
  if (!path) return '';
  // https://jex.im/regulex/#!flags=&re=.%2B%3F%5C%2F(.%2B%3F)%5C%2F%3F%24
  return getPathname(path).match(/.+?\/(.+?)\/?$/)?.[1] || '';
}

//https://github.com/  =>  github
export function getProvider(url: string) {
  if (!url) return '';
  const result = url.match(/^https:\/\/(.+?)\..+$/i);
  if (result && result.length >= 2) {
    return result[1];
  }
  return url;
}

//github.com/cli/cli  => https://github.com/cli/cli
export function fillHttps(url?: string): string {
  if (!url) return '';
  if (url.indexOf('https') === -1) {
    return `https://${url}`;
  }
  return url;
}

//https://github.com/cli/cli  => github.com/cli/cli
export function removeHttps(url: string | undefined) {
  if (!url) return '';
  return url.replace(/^https:\/\//, '');
}

// https://github.com/cli/cli.git => https://github.com/cli/cli
export function removeExtname(url: string | undefined, ext: string) {
  if (!url) return '';
  if (url.endsWith(ext)) {
    return url.replace(new RegExp('\\' + ext + '$'), '');
  }
  return url;
}

// It would be perfect if Next had generatePath function like react-router. (https://v5.reactrouter.com/core/api/generatePath)
// https://github.com/vercel/next.js/discussions/40790
// https://github.com/scottrippey/next-router-mock/blob/fbe8950695369c1d46de6c3cc9202187ef3d0ac0/src/MemoryRouter.tsx#L11
export function getRouteAsPath(
  pathname: string,
  query: ParsedUrlQuery,
  hash?: string | null | undefined
) {
  const remainingQuery = { ...query };

  // Replace slugs, and remove them from the `query`
  let asPath = pathname.replace(/\[{1,2}(.+?)]{1,2}/g, ($0, slug: string) => {
    if (slug.startsWith('...')) slug = slug.replace('...', '');

    const value = remainingQuery[slug]!;
    delete remainingQuery[slug];
    if (Array.isArray(value)) {
      return value.map((v) => encodeURIComponent(v)).join('/');
    }
    return value !== undefined ? encodeURIComponent(String(value)) : '';
  });

  // Remove any trailing slashes; this can occur if there is no match for a catch-all slug ([[...slug]])
  asPath = removeTrailingSlash(asPath);

  // Append remaining query as a querystring, if needed:
  const qs = stringifyQueryString(remainingQuery);

  if (qs) asPath += `?${qs}`;
  if (hash) asPath += hash;

  return asPath;
}

export function removeTrailingSlash(path: string) {
  if (!path) return '';
  return path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path;
}

export function getNameSpacePng(url: string) {
  if (!url) return '/images/default.png';
  return url.replace(/\/[^\/]+$/, '.png');
}
