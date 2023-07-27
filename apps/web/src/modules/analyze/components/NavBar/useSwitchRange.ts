import qs from 'query-string';
import { useRouter } from 'next/router';

const useSwitchRange = () => {
  const route = useRouter();

  const switchRange = async (t: string) => {
    const pathname = window.location.pathname;
    const hash = window.location.hash;

    const searchResult = qs.parse(window.location.search) || {};
    searchResult.range = t;
    const newSearch = qs.stringify(searchResult);

    const url = `${pathname}?${newSearch}${hash}`;
    await route.replace(url, undefined, { scroll: false });
  };

  return { switchRange };
};

export default useSwitchRange;
