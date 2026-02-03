import { useMetricDashboardQuery } from '@oss-compass/graphql';
import client from '@common/gqlClient';
import useOsBoardDateRange from './useOsBoardDateRange';

/**
 * 将项目 URL 转换为 API 所需的 label 格式
 * @param project 项目 URL，如 "https://github.com/owner/repo" 或 "github:owner/repo"
 * @returns 格式化后的 label
 */
const formatProjectLabel = (project: string): string => {
  // 如果已经是短格式，直接返回
  if (
    project.startsWith('github:') ||
    project.startsWith('gitee:') ||
    project.startsWith('gitcode:')
  ) {
    return project;
  }
  // 移除 https:// 前缀，保留完整路径
  return project.replace(/^https?:\/\//, '');
};

interface UseOsBoardMetricDashboardOptions {
  /** 项目 URL */
  project: string;
  /** 看板类型 */
  level?: 'repo' | 'community';
  /** 是否启用查询 */
  enabled?: boolean;
}

/**
 * os-board 模块的指标概览数据 hook
 * 复用 analyze 模块的 useMetricDashboardQuery API
 */
const useOsBoardMetricDashboard = ({
  project,
  level = 'repo',
  enabled = true,
}: UseOsBoardMetricDashboardOptions) => {
  const { timeStart, timeEnd } = useOsBoardDateRange();

  const label = formatProjectLabel(project);

  const { data, isLoading, isError, error } = useMetricDashboardQuery(
    client,
    {
      label,
      level,
      beginDate: timeStart,
      endDate: timeEnd,
    },
    {
      enabled: enabled && !!project,
    }
  );

  return {
    /** 贡献者概览数据 */
    contributorsOverview: data?.contributorsDetailOverview,
    /** Issue 概览数据 */
    issuesOverview: data?.issuesDetailOverview,
    /** PR 概览数据 */
    pullsOverview: data?.pullsDetailOverview,
    /** 原始数据 */
    data,
    /** 加载状态 */
    isLoading,
    /** 错误状态 */
    isError,
    /** 错误信息 */
    error,
  };
};

export default useOsBoardMetricDashboard;
