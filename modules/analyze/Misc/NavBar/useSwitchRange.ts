import qs from 'query-string';
import { useRouter } from 'next/router';

const useSwitchRange = () => {
  const route = useRouter();

  const switchRange = async (t: string) => {
    const hash = window.location.hash;
    const result = qs.parse(window.location.search);
    result.range = t;

    let url = `/analyze?${qs.stringify(result)}`;
    // if (hash) url += hash;
    await route.replace(url, undefined, { scroll: false });
  };

  return { switchRange };
};

export default useSwitchRange;
