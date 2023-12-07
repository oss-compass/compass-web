import qs from 'query-string';
import { useRouter } from 'next/router';

const useSwitchMetricType = () => {
  const route = useRouter();

  const switchMetricType = async (t: string) => {
    const pathname = window.location.pathname;
    const hash = window.location.hash;

    const searchResult = qs.parse(window.location.search) || {};
    searchResult.metricType = t;
    const newSearch = qs.stringify(searchResult);

    const url = `${pathname}?${newSearch}${hash}`;
    await route.replace(url, undefined, { scroll: false });
  };

  return { switchMetricType };
};

export default useSwitchMetricType;
