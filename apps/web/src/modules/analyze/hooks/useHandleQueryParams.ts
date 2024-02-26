import { useRouter } from 'next/router';

// 修改或新增查询参数
const clearEmptyProperties = (obj) => {
  Object.keys(obj).forEach(function (key) {
    if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
      delete obj[key];
    }
  });
};
export const useHandleQueryParams = () => {
  const router = useRouter();
  const handleQueryParams = (newParams) => {
    const { pathname, query } = router;
    const newQueryParams = { ...query, ...newParams };
    clearEmptyProperties(newQueryParams);
    router.push({
      pathname,
      query: newQueryParams,
    });
  };
  return { handleQueryParams };
};
