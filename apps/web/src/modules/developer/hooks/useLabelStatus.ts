import axios from 'axios';
import { useQueries, UseQueryResult } from '@tanstack/react-query';
import useContributorName from './useContributorName';
import useQueryDateRange from '@modules/developer/hooks/useQueryDateRange';
import { ContributorOverviewData } from '@modules/developer/context/StatusContext';

// API 请求体
interface ApiRequestBody {
  contributor: string;
  begin_date: string; // 日期通常作为 ISO 字符串发送
  end_date: string; // 日期通常作为 ISO 字符串发送
}

const API_URL = '/api/v2/contributor_portrait/contributor_overview';

// React Query fetcher 函数
const fetchContributorOverview = async (
  contributor: string,
  begin_date: string,
  end_date: string
): Promise<ContributorOverviewData> => {
  const { data } = await axios.post<ContributorOverviewData>(API_URL, {
    contributor,
    begin_date,
    end_date,
  } as ApiRequestBody);
  return data; // 假设 API 直接返回 { data: { ... } }
};

// Hook 的新名称可能更合适，例如 useContributorOverviews
const useContributorOverviews = () => {
  const { contributorName } = useContributorName();
  const { timeStart, timeEnd } = useQueryDateRange();

  // 将 Date 对象格式化为 ISO 字符串，如果 API 需要特定格式，请调整
  const beginDateStr = timeStart ? timeStart.toISOString().split('T')[0] : '';
  const endDateStr = timeEnd ? timeEnd.toISOString().split('T')[0] : '';

  const queries = useQueries({
    queries: [contributorName].map((contributorId) => {
      return {
        // 更新 queryKey 以反映新的数据和参数
        queryKey: [
          'contributorOverview',
          contributorId,
          beginDateStr,
          endDateStr,
        ],
        queryFn: () =>
          fetchContributorOverview(
            contributorId as string,
            beginDateStr,
            endDateStr
          ),
        enabled: !!contributorId && !!beginDateStr && !!endDateStr, // 只有当所有参数都有效时才执行查询
      };
    }),
  }) as UseQueryResult<ContributorOverviewData, Error>[];

  const isLoading = queries.some((query) => query.isLoading);
  const isError = queries.some((query) => query.isError);

  // 提取所有成功获取到的贡献者概览数据
  const contributorDataList = queries
    .filter((query) => query.isSuccess && query.data) // 确保查询成功且 data.data 存在
    .map((query) => query.data);
  return {
    status: contributorDataList[0] ? 'success' : '',
    isLoading,
    isError,
    notFound: isError, // 根据实际情况设置 notFound
    verifiedItems: [
      { ...contributorDataList[0], contributor: contributorName },
    ], // 返回一个包含所有获取到的数据的列表
    // 如果还需要区分单个和比较视图，这里的逻辑需要重写
    // 例如，如果只有一个 shortId，可以直接返回 data[0]?.overview
  };
};

export default useContributorOverviews; // 重命名 Hook
