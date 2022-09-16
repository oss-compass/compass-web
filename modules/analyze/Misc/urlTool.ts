const qs = require('query-string');

export const removeSearchValue = (key: string, value: string): string => {
  const { pathname, search } = window.location;
  const result = qs.parse(search);

  if (Array.isArray(result[key])) {
    const filtered = result[key].filter((i: string) => !i.includes(value));
    const newSearch = qs.stringify({ [key]: filtered });
    return `${pathname}?${newSearch}`;
  }
  return '';
};
