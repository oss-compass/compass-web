const qs = require('query-string');

export const removeUrlValue = (value: string): string => {
  const { pathname, search } = window.location;
  const result = qs.parse(search);

  if (Array.isArray(result['url'])) {
    const filtered = result['url'].filter((i) => !i.includes(value));
    const newSearch = qs.stringify({ url: filtered });
    return `${pathname}?${newSearch}`;
  }
  return '';
};
