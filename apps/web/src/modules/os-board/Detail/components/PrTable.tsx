import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs } from 'antd';
import { GoGitPullRequest, GoGitPullRequestClosed } from 'react-icons/go';
import { AiFillClockCircle } from 'react-icons/ai';
import { BiGitCommit } from 'react-icons/bi';
import { SiGitee, SiGithub } from 'react-icons/si';
import Image from 'next/image';
import BaseCard from '@common/components/BaseCard';
import MyTable from '@common/components/Table';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import { format, parseJSON } from 'date-fns';
import {
  usePullsDetailListQuery,
  PullDetail,
  FilterOptionInput,
  SortOptionInput,
} from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { useOsBoardMetricDashboard } from '../../hooks';
import useOsBoardDateRange from '../../hooks/useOsBoardDateRange';
import { toFixed } from '@common/utils';
import { toUnderline } from '@common/utils/format';

interface PrTableProps {
  dashboardId: string;
  dashboardType: 'repo' | 'community';
  projects: readonly string[];
  competitorProjects?: readonly string[];
}

// 社区维度表格数据接口
interface CommunityPrRecord {
  id: string;
  repoName: string;
  repoUrl: string;
  prTotal: number;
  prOpen: number;
  prCompletionRatio: number;
  prUnresponsiveCount: number;
  prFirstResponseTime: number;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  filterOpts?: FilterOptionInput[];
  sortOpts?: SortOptionInput;
}

// 圆环饼图组件
const RingChart: React.FC<{ percentage: number; size?: number }> = ({
  percentage,
  size = 24,
}) => {
  const radius = (size - 4) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - percentage / 100);

  // 根据百分比确定颜色
  const getColor = (pct: number) => {
    if (pct >= 90) return '#52c41a'; // 绿色
    if (pct >= 60) return '#faad14'; // 黄色
    return '#ff4d4f'; // 红色
  };

  const color = getColor(percentage);

  return (
    <div className="inline-flex items-center gap-2">
      <svg width={size} height={size} className="-rotate-90">
        {/* 背景圆环 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#f0f0f0"
          strokeWidth="3"
        />
        {/* 进度圆环 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <span className="text-sm font-medium" style={{ color }}>
        {percentage}%
      </span>
    </div>
  );
};

const STATE_OPTIONS = [
  { value: 'open', text: 'analyze:metric_detail:open' },
  { value: 'merged', text: 'analyze:metric_detail:merged' },
  { value: 'rejected', text: 'analyze:metric_detail:rejected' },
];

// Mock 数据
const MOCK_PR_DATA: PullDetail[] = [
  {
    title: '重构用户认证模块',
    url: 'https://gitcode.com/cann/cann/pulls/201',
    state: 'merged',
    createdAt: '2024-01-12T09:00:00Z',
    closedAt: '2024-01-15T14:00:00Z',
    timeToCloseDays: 3.2,
    timeToFirstAttentionWithoutBot: 0.5,
    numReviewComments: 12,
    labels: ['enhancement', 'auth'],
    userLogin: 'zhangsan',
    reviewersLogin: ['lisi', 'wangwu'],
    mergeAuthorLogin: 'lisi',
  },
  {
    title: '添加单元测试覆盖',
    url: 'https://gitcode.com/cann/cann/pulls/202',
    state: 'open',
    createdAt: '2024-01-20T10:00:00Z',
    closedAt: null,
    timeToCloseDays: null,
    timeToFirstAttentionWithoutBot: 1.2,
    numReviewComments: 5,
    labels: ['test'],
    userLogin: 'wangwu',
    reviewersLogin: ['zhaoliu'],
    mergeAuthorLogin: null,
  },
  {
    title: '修复内存泄漏问题',
    url: 'https://gitcode.com/cann/cann/pulls/203',
    state: 'merged',
    createdAt: '2024-01-08T15:00:00Z',
    closedAt: '2024-01-09T10:00:00Z',
    timeToCloseDays: 0.8,
    timeToFirstAttentionWithoutBot: 0.3,
    numReviewComments: 8,
    labels: ['bug', 'critical'],
    userLogin: 'sunqi',
    reviewersLogin: ['zhangsan', 'lisi'],
    mergeAuthorLogin: 'zhangsan',
  },
  {
    title: '优化前端构建配置',
    url: 'https://gitcode.com/cann/cann/pulls/204',
    state: 'rejected',
    createdAt: '2024-01-16T11:00:00Z',
    closedAt: '2024-01-18T09:00:00Z',
    timeToCloseDays: 1.9,
    timeToFirstAttentionWithoutBot: 0.8,
    numReviewComments: 15,
    labels: ['build', 'frontend'],
    userLogin: 'lisi',
    reviewersLogin: ['wangwu'],
    mergeAuthorLogin: null,
  },
  {
    title: '更新依赖版本',
    url: 'https://gitcode.com/cann/cann/pulls/205',
    state: 'open',
    createdAt: '2024-01-22T08:00:00Z',
    closedAt: null,
    timeToCloseDays: null,
    timeToFirstAttentionWithoutBot: null,
    numReviewComments: 0,
    labels: ['dependencies'],
    userLogin: 'zhaoliu',
    reviewersLogin: [],
    mergeAuthorLogin: null,
  },
] as unknown as PullDetail[];

const MOCK_PR_STATS = {
  pullCount: 38,
  pullCompletionRatio: 0.842,
  pullCompletionCount: 32,
  pullUnresponsiveCount: 2,
  commitCount: 156,
};

// 社区维度 Mock 数据
const MOCK_COMMUNITY_PR_DATA: CommunityPrRecord[] = [
  {
    id: '1',
    repoName: 'cann/cann',
    repoUrl: 'https://gitcode.com/cann/cann',
    prTotal: 156,
    prOpen: 18,
    prCompletionRatio: 88,
    prUnresponsiveCount: 3,
    prFirstResponseTime: 0.8,
  },
  {
    id: '2',
    repoName: 'cann/metadef',
    repoUrl: 'https://gitcode.com/cann/metadef',
    prTotal: 92,
    prOpen: 8,
    prCompletionRatio: 91,
    prUnresponsiveCount: 1,
    prFirstResponseTime: 0.5,
  },
  {
    id: '3',
    repoName: 'cann/graphengine',
    repoUrl: 'https://gitcode.com/cann/graphengine',
    prTotal: 38,
    prOpen: 5,
    prCompletionRatio: 87,
    prUnresponsiveCount: 2,
    prFirstResponseTime: 1.2,
  },
  {
    id: '4',
    repoName: 'cann/parser',
    repoUrl: 'https://gitcode.com/cann/parser',
    prTotal: 45,
    prOpen: 6,
    prCompletionRatio: 87,
    prUnresponsiveCount: 1,
    prFirstResponseTime: 0.9,
  },
];

// 将项目 URL 转换为 API 所需的 label 格式
const formatProjectLabel = (project: string): string => {
  if (
    project.startsWith('github:') ||
    project.startsWith('gitee:') ||
    project.startsWith('gitcode:')
  ) {
    return project;
  }
  return project.replace(/^https?:\/\//, '');
};

// 获取项目平台类型
const getProjectPlatform = (project: string) => {
  if (project.includes('gitee')) return 'gitee';
  if (project.includes('gitcode')) return 'gitcode';
  return 'github';
};

// 获取项目显示名称
const getProjectDisplayName = (project: string) => {
  return project.replace(
    /^(github:|https?:\/\/(github|gitee|gitcode)\.com\/)/,
    ''
  );
};

const PrTable: React.FC<PrTableProps> = ({
  dashboardId,
  dashboardType,
  projects,
  competitorProjects = [],
}) => {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<string>(
    projects[0] || ''
  );
  const { timeStart, timeEnd } = useOsBoardDateRange();

  // ============ 仓库维度数据 ============
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      showSizeChanger: true,
      position: ['bottomCenter'],
      showTotal: (total) => t('analyze:total_prs', { total }),
    },
    filterOpts: [],
    sortOpts: {
      type: 'state',
      direction: 'desc',
    },
  });

  // 构建查询参数
  const label = formatProjectLabel(selectedProject);
  const query = {
    page: tableParams.pagination?.current,
    per: tableParams.pagination?.pageSize,
    filterOpts: tableParams.filterOpts || [],
    sortOpts: tableParams.sortOpts,
    label,
    level: 'repo',
    beginDate: timeStart,
    endDate: timeEnd,
  };

  // 调用 PR 列表 API (仅仓库维度)
  const [repoTableData, setRepoTableData] = useState<PullDetail[]>([]);

  const { isLoading: repoLoading, isFetching: repoFetching } =
    usePullsDetailListQuery(client, query, {
      enabled: !!selectedProject,
      onSuccess: (data) => {
        const items = data.pullsDetailList.items;
        setRepoTableData(items);
        setTableParams((prev) => ({
          ...prev,
          pagination: {
            ...prev.pagination,
            total: data.pullsDetailList.count,
          },
        }));
      },
    });

  // ============ 社区维度数据 (接口开发中，预留) ============
  // TODO: 替换为真实的社区 PR 汇总 API
  // const { data: communityData, isLoading: communityLoading } = useCommunityPrStats({
  //   dashboardId,
  //   projects,
  //   beginDate: timeStart,
  //   endDate: timeEnd,
  //   enabled: dashboardType === 'community',
  // });
  const communityTableData: CommunityPrRecord[] = [];
  const communityLoading = false;

  // 使用真实 API 获取统计数据
  const { pullsOverview, isLoading: statsLoading } = useOsBoardMetricDashboard({
    project: selectedProject,
    level: dashboardType,
    enabled: !!selectedProject,
  });

  // 统计卡片数据（API 无有效数据时使用 mock）
  const hasValidStats =
    pullsOverview &&
    pullsOverview.pullCount != null &&
    pullsOverview.pullCount > 0;
  const statsData = hasValidStats
    ? {
        pullCount: pullsOverview.pullCount,
        pullCompletionRatio: pullsOverview.pullCompletionRatio,
        pullCompletionCount: pullsOverview.pullCompletionCount,
        pullUnresponsiveCount: pullsOverview.pullUnresponsiveCount,
        commitCount: pullsOverview.commitCount,
      }
    : MOCK_PR_STATS;

  // 表格数据（API 无数据时使用 mock）
  const displayTableData =
    dashboardType === 'community'
      ? communityTableData.length > 0
        ? communityTableData
        : MOCK_COMMUNITY_PR_DATA
      : repoTableData.length > 0
      ? repoTableData
      : MOCK_PR_DATA;

  // 处理表格变更
  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<PullDetail>
  ) => {
    let sortOpts = null;
    const filterOpts: FilterOptionInput[] = [];

    if (sorter.field) {
      sortOpts = {
        type: toUnderline(sorter.field as string),
        direction: sorter.order === 'ascend' ? 'asc' : 'desc',
      };
    }

    for (const key in filters) {
      if (filters.hasOwnProperty(key) && filters[key]) {
        filterOpts.push({
          type: key,
          values: filters[key] as string[],
        });
      }
    }

    setTableParams({
      pagination: {
        ...tableParams.pagination,
        ...pagination,
      },
      sortOpts,
      filterOpts,
    });
  };

  // 项目 Tab 配置（仅仓库维度使用）
  const tabItems = useMemo(() => {
    const mainItems = projects.map((project) => {
      const platform = getProjectPlatform(project);
      const displayName = getProjectDisplayName(project);
      return {
        key: project,
        label: (
          <div className="flex items-center gap-1.5">
            {platform === 'github' && <SiGithub color="#171516" size={14} />}
            {platform === 'gitee' && <SiGitee color="#c71c27" size={14} />}
            {platform === 'gitcode' && (
              <Image
                src="/images/logos/gitcode.png"
                alt="gitcode"
                width={14}
                height={14}
              />
            )}
            <span>{displayName}</span>
          </div>
        ),
      };
    });

    const competitorItems = competitorProjects.map((project) => {
      const platform = getProjectPlatform(project);
      const displayName = getProjectDisplayName(project);
      return {
        key: project,
        label: (
          <div className="flex items-center gap-1.5">
            {platform === 'github' && <SiGithub color="#171516" size={14} />}
            {platform === 'gitee' && <SiGitee color="#c71c27" size={14} />}
            {platform === 'gitcode' && (
              <Image
                src="/images/logos/gitcode.png"
                alt="gitcode"
                width={14}
                height={14}
              />
            )}
            <span>{displayName}</span>
            <span className="rounded bg-orange-100 px-1.5 py-0.5 text-[10px] text-orange-600">
              {t('os_board:detail.competitors')}
            </span>
          </div>
        ),
      };
    });

    return [...mainItems, ...competitorItems];
  }, [projects, competitorProjects, t]);

  // 仓库维度表格列定义
  const repoColumns: ColumnsType<PullDetail> = [
    {
      title: t('analyze:metric_detail:pr_title'),
      dataIndex: 'title',
      align: 'left',
      width: 200,
      fixed: 'left',
      sorter: true,
      render: (text: string, record) => (
        <a
          href={record.url}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-gray-900 hover:text-blue-600 hover:underline"
        >
          {text}
        </a>
      ),
    },
    {
      title: t('analyze:metric_detail:state'),
      dataIndex: 'state',
      align: 'left',
      width: 100,
      sorter: true,
      filters: STATE_OPTIONS.map((s) => ({ text: t(s.text), value: s.value })),
      render: (val: string) => {
        const item = STATE_OPTIONS.find((s) => s.value === val);
        return item ? t(item.text) : val;
      },
    },
    {
      title: t('analyze:metric_detail:created_time'),
      dataIndex: 'createdAt',
      align: 'left',
      width: 120,
      sorter: true,
      render: (time: string) =>
        time ? format(parseJSON(time)!, 'yyyy-MM-dd') : '-',
    },
    {
      title: t('analyze:metric_detail:close_time'),
      dataIndex: 'closedAt',
      align: 'left',
      width: 120,
      sorter: true,
      render: (time: string | null) =>
        time ? format(parseJSON(time)!, 'yyyy-MM-dd') : '-',
    },
    {
      title: t('analyze:metric_detail:processing_time'),
      dataIndex: 'timeToCloseDays',
      align: 'left',
      width: 120,
      sorter: true,
      render: (val: number | null) =>
        val != null ? `${toFixed(val, 1)} ${t('analyze:unit_day')}` : '-',
    },
    {
      title: t('analyze:metric_detail:first_response_time'),
      dataIndex: 'timeToFirstAttentionWithoutBot',
      align: 'left',
      width: 150,
      sorter: true,
      render: (val: number | null) =>
        val != null ? `${toFixed(val, 1)} ${t('analyze:unit_day')}` : '-',
    },
    {
      title: t('analyze:metric_detail:comments_count'),
      dataIndex: 'numReviewComments',
      align: 'left',
      width: 100,
      sorter: true,
    },
    {
      title: t('analyze:metric_detail:tags'),
      dataIndex: 'labels',
      align: 'left',
      width: 150,
      render: (list: string[]) => list?.join(', ') || '-',
    },
    {
      title: t('analyze:metric_detail:creator'),
      dataIndex: 'userLogin',
      align: 'left',
      width: 120,
    },
    {
      title: t('analyze:metric_detail:reviewer'),
      dataIndex: 'reviewersLogin',
      align: 'left',
      width: 120,
      render: (list: string[]) => list?.join(', ') || '-',
    },
    {
      title: t('analyze:metric_detail:merge_author'),
      dataIndex: 'mergeAuthorLogin',
      align: 'left',
      width: 120,
      render: (val: string | null) => val || '-',
    },
  ];

  // 社区维度表格列定义
  const communityColumns: ColumnsType<CommunityPrRecord> = [
    {
      title: t('os_board:pr_table.repo_name'),
      dataIndex: 'repoName',
      align: 'left',
      width: 200,
      fixed: 'left',
      render: (text: string, record) => (
        <a
          href={record.repoUrl}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-gray-900 hover:text-blue-600 hover:underline"
        >
          {text}
        </a>
      ),
    },
    {
      title: t('os_board:pr_table.pr_total'),
      dataIndex: 'prTotal',
      align: 'center',
      width: 100,
      sorter: (a, b) => a.prTotal - b.prTotal,
    },
    {
      title: t('os_board:pr_table.pr_open'),
      dataIndex: 'prOpen',
      align: 'center',
      width: 120,
      sorter: (a, b) => a.prOpen - b.prOpen,
    },
    {
      title: t('os_board:pr_table.pr_completion_ratio'),
      dataIndex: 'prCompletionRatio',
      align: 'center',
      width: 140,
      sorter: (a, b) => a.prCompletionRatio - b.prCompletionRatio,
      render: (val: number) => <RingChart percentage={val} />,
    },
    {
      title: t('os_board:pr_table.pr_unresponsive'),
      dataIndex: 'prUnresponsiveCount',
      align: 'center',
      width: 130,
      sorter: (a, b) => a.prUnresponsiveCount - b.prUnresponsiveCount,
    },
    {
      title: t('os_board:pr_table.pr_first_response'),
      dataIndex: 'prFirstResponseTime',
      align: 'center',
      width: 150,
      sorter: (a, b) => a.prFirstResponseTime - b.prFirstResponseTime,
      render: (val: number) =>
        val != null ? `${toFixed(val, 1)} ${t('analyze:unit_day')}` : '-',
    },
  ];

  // 根据维度选择列配置
  const displayColumns =
    dashboardType === 'community' ? communityColumns : repoColumns;

  const isTableLoading = repoLoading || repoFetching;

  return (
    <BaseCard
      id="pr_table"
      title={String(t('metrics_models_v2:model_999.metrics.metric_064.title'))}
      bodyClass=""
      className="!p-4 [&_h3]:!mb-1"
    >
      {/* 项目切换 Tabs */}
      <Tabs
        activeKey={selectedProject}
        onChange={setSelectedProject}
        items={tabItems}
        className="mb-2 [&_.ant-tabs-nav]:mb-0"
      />

      {/* PR 统计卡片 */}
      <div className="mb-3 grid grid-cols-4 gap-3 md:grid-cols-2">
        {/* 新建 PR 数量 */}
        <div className="rounded-lg border border-gray-100 bg-white p-3 shadow-sm">
          <div className="flex items-center text-lg font-medium">
            <div className="mr-2 text-[#3A5BEF]">
              <GoGitPullRequest />
            </div>
            <div className="line-clamp-1">{statsData?.pullCount ?? '-'}</div>
          </div>
          <div className="text-xs text-[#585858]">
            {t('analyze:metric_detail:newly_created_pr_count')}
          </div>
        </div>

        {/* PR 解决百分比 */}
        <div className="rounded-lg border border-gray-100 bg-white p-3 shadow-sm">
          <div className="flex items-center text-lg font-medium">
            <div className="mr-2 text-[#3A5BEF]">
              <GoGitPullRequestClosed />
            </div>
            <div className="line-clamp-1">
              {statsData?.pullCompletionRatio != null
                ? `${toFixed(statsData.pullCompletionRatio * 100, 1)}% (${
                    statsData.pullCompletionCount ?? 0
                  })`
                : '-'}
            </div>
          </div>
          <div className="text-xs text-[#585858]">
            {t('analyze:metric_detail:pr_completion_rate')}
          </div>
        </div>

        {/* 未响应 PR 数量 */}
        <div className="rounded-lg border border-gray-100 bg-white p-3 shadow-sm">
          <div className="flex items-center text-lg font-medium">
            <div className="mr-2 text-[#3A5BEF]">
              <AiFillClockCircle />
            </div>
            <div className="line-clamp-1">
              {statsData?.pullUnresponsiveCount ?? '-'}
            </div>
          </div>
          <div className="text-xs text-[#585858]">
            {t('analyze:metric_detail:unanswered_pr_count')}
          </div>
        </div>

        {/* 代码提交数量 */}
        <div className="rounded-lg border border-gray-100 bg-white p-3 shadow-sm">
          <div className="flex items-center text-lg font-medium">
            <div className="mr-2 text-[#3A5BEF]">
              <BiGitCommit />
            </div>
            <div className="line-clamp-1">{statsData?.commitCount ?? '-'}</div>
          </div>
          <div className="text-xs text-[#585858]">
            {t('analyze:metric_detail:commit_count')}
          </div>
        </div>
      </div>

      {/* 表格区域：根据类型切换 */}
      <div className="flex h-[420px] flex-col">
        <div className="min-h-0 flex-1">
          <MyTable
            columns={
              displayColumns as ColumnsType<PullDetail | CommunityPrRecord>
            }
            dataSource={displayTableData}
            rowKey={dashboardType === 'community' ? 'id' : 'url'}
            loading={isTableLoading || statsLoading}
            onChange={handleTableChange}
            pagination={tableParams.pagination}
            scroll={{ x: 'max-content', y: 320 }}
            className="h-full [&_.ant-pagination]:flex-shrink-0 [&_.ant-pagination]:py-2 [&_.ant-spin-container]:flex [&_.ant-spin-container]:h-full [&_.ant-spin-container]:flex-col [&_.ant-spin-nested-loading]:h-full [&_.ant-table-body]:min-h-0 [&_.ant-table-body]:flex-1 [&_.ant-table-container]:min-h-0 [&_.ant-table-container]:flex-1 [&_.ant-table-thead_th]:whitespace-nowrap [&_.ant-table-wrapper]:min-h-0 [&_.ant-table-wrapper]:flex-1 [&_.ant-table]:flex [&_.ant-table]:h-full [&_.ant-table]:flex-col"
          />
        </div>
      </div>
    </BaseCard>
  );
};

export default PrTable;
