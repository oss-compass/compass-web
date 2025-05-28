import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import axios from 'axios';
import useContributorName from './useContributorName';
import useQueryDateRange from './useQueryDateRange';

/**
 * 通用的贡献者API请求Hook
 * @template TData 响应数据类型
 */
export function useContributorApi<TData>(
  url: string,
  queryKey: string,
  options?: Omit<
    UseQueryOptions<TData, Error, TData, string[]>,
    'queryKey' | 'queryFn'
  >
) {
  const { contributorName } = useContributorName();
  const { timeStart, timeEnd } = useQueryDateRange();

  const params = {
    contributor: contributorName,
    begin_date: timeStart,
    end_date: timeEnd,
  };

  const fetchData = async () => {
    const response = await axios.post(url, {
      ...params,
    });
    return response.data as TData;
  };

  return useQuery<TData, Error>(
    [queryKey, contributorName, timeStart, timeEnd],
    fetchData,
    {
      enabled: !!contributorName,
      ...options,
    }
  );
}
