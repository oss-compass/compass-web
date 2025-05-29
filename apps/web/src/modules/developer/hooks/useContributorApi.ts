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
    UseQueryOptions<TData, Error, TData, (string | number)[]>,
    'queryKey' | 'queryFn'
  >,
  year?: number // 新增可选的年份参数
) {
  const { contributorName } = useContributorName();
  const { timeStart, timeEnd } = useQueryDateRange();

  // 根据是否提供年份参数来确定日期范围
  const begin_date = year ? `${year}-01-01` : timeStart;
  const end_date = year ? `${year}-12-31` : timeEnd;

  const params = {
    contributor: contributorName,
    begin_date: begin_date,
    end_date: end_date,
  };

  const fetchData = async () => {
    const response = await axios.post(url, {
      ...params,
    });
    return response.data as TData;
  };

  return useQuery<TData, Error>(
    // 将年份添加到 queryKey 中，以便在年份变化时重新获取数据
    [queryKey, contributorName, begin_date, end_date, year].filter(Boolean),
    fetchData,
    {
      enabled: !!contributorName, // 只有当 contributorName 存在时才启用查询
      ...options,
    }
  );
}
