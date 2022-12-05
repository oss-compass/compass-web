import uniq from 'lodash/uniq';

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
  return getPathname(path).split('/').shift() || '';
}

export function getRepoName(path: string) {
  if (!path) return '';
  return getPathname(path).split('/').pop() || '';
}

//https://github.com/  =>  github
export function getProvider(url: string) {
  const result = url.match(/^https:\/\/(.+?)\..+$/i);
  if (result && result.length >= 2) {
    return result[1];
  }
  return url;
}

//github.com/cli/cli  => https://github.com/cli/cli
export function fillHttps(url: string): string {
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
