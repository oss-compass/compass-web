import { useRouter } from 'next/router';

// 修改或新增查询参数
export const useHandleQueryParams = () => {
  const router = useRouter();
  const handleQueryParams = (newParams) => {
    const { pathname, query } = router;
    const newQueryParams = { ...query, ...newParams };
    router.push({
      pathname,
      query: newQueryParams,
    });
  };
  return { handleQueryParams };
};
