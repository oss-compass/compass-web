import uniq from 'lodash/uniq';

export const parseUrl = (url: string): URL | null => {
  try {
    return new URL(url);
  } catch (e) {
    return null;
  }
};

export const getPathname = (url: string): string => {
  const u = parseUrl(url);
  return u?.pathname.slice(1) || '';
};

export const getAllPathname = (urls: string[]) => {
  const pathName = urls.map((v) => getPathname(v)).filter(Boolean);
  return uniq(pathName);
};

export function getLastPathSegment(path: string) {
  return path.split('/').pop() || '';
}

//https://github.com/  =>  github
export function getHostLabel(url: string) {
  const result = url.match(/^https:\/\/(.+)\..+$/);
  if (result && result.length >= 2) {
    return result[1];
  }
  return url;
}

export function repoUrlFormatForChart(url: string) {
  return `${getHostLabel(url)} ${getPathname(url)}`;
}
