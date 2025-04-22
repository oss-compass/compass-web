const qs = require('query-string');

export const removeSearchValue = (value: string): string => {
  const { pathname, search } = window.location;
  const result = qs.parse(search);

  if (Array.isArray(result['label'])) {
    result.label = result['label'].filter((i: string) => !i.includes(value));
    const newSearch = qs.stringify(result);
    return `${pathname}?${newSearch}`;
  }
  return '';
};
