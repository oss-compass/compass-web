import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs } from 'antd';
import { GoIssueOpened } from 'react-icons/go';
import { AiFillClockCircle, AiOutlineIssuesClose } from 'react-icons/ai';
import { BiChat } from 'react-icons/bi';
import { SiGitee, SiGithub } from 'react-icons/si';
import Image from 'next/image';
import BaseCard from '@common/components/BaseCard';
import MyTable from '@common/components/Table';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import { format, parseJSON } from 'date-fns';
import {
  useIssuesDetailListQuery,
  IssueDetail,
  FilterOptionInput,
  SortOptionInput,
} from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { useOsBoardMetricDashboard } from '../../hooks';
import useOsBoardDateRange from '../../hooks/useOsBoardDateRange';
import { toFixed } from '@common/utils';
import { toUnderline } from '@common/utils/format';

interface IssueTableProps {
  dashboardId: string;
  dashboardType: 'repo' | 'community';
  projects: readonly string[];
  competitorProjects?: readonly string[];
}

// 社区维度表格数据接口
interface CommunityIssueRecord {
  id: string;
  repoName: string;
  repoUrl: string;
  issueTotal: number;
  issueOpen: number;
  issueCompletionRatio: number;
  issueUnresponsiveCount: number;
  issueFirstResponseTime: number;
  issueCommentMean: number;
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
  { value: 'closed', text: 'analyze:metric_detail:closed' },
  { value: 'progressing', text: 'analyze:metric_detail:progressing' },
];

// Mock 数据
const MOCK_ISSUE_DATA: IssueDetail[] = [
  {
    title: '修复登录页面样式问题',
    url: 'https://gitcode.com/cann/cann/issues/101',
    state: 'open',
    createdAt: '2024-01-15T10:30:00Z',
    closedAt: null,
    timeToCloseDays: null,
    timeToFirstAttentionWithoutBot: 1.5,
    numOfCommentsWithoutBot: 3,
    labels: ['bug', 'ui'],
    userLogin: 'zhangsan',
    assigneeLogin: 'lisi',
  },
  {
    title: '添加国际化支持',
    url: 'https://gitcode.com/cann/cann/issues/102',
    state: 'closed',
    createdAt: '2024-01-10T08:00:00Z',
    closedAt: '2024-01-20T16:00:00Z',
    timeToCloseDays: 10.3,
    timeToFirstAttentionWithoutBot: 0.5,
    numOfCommentsWithoutBot: 8,
    labels: ['feature', 'i18n'],
    userLogin: 'wangwu',
    assigneeLogin: 'zhaoliu',
  },
  {
    title: '优化数据库查询性能',
    url: 'https://gitcode.com/cann/cann/issues/103',
    state: 'progressing',
    createdAt: '2024-01-18T14:00:00Z',
    closedAt: null,
    timeToCloseDays: null,
    timeToFirstAttentionWithoutBot: 2.1,
    numOfCommentsWithoutBot: 5,
    labels: ['performance', 'database'],
    userLogin: 'sunqi',
    assigneeLogin: null,
  },
  {
    title: '更新文档说明',
    url: 'https://gitcode.com/cann/cann/issues/104',
    state: 'closed',
    createdAt: '2024-01-05T09:00:00Z',
    closedAt: '2024-01-06T11:00:00Z',
    timeToCloseDays: 1.1,
    timeToFirstAttentionWithoutBot: 0.2,
    numOfCommentsWithoutBot: 2,
    labels: ['documentation'],
    userLogin: 'lisi',
    assigneeLogin: 'lisi',
  },
  {
    title: '修复移动端适配问题',
    url: 'https://gitcode.com/cann/cann/issues/105',
    state: 'open',
    createdAt: '2024-01-22T11:00:00Z',
    closedAt: null,
    timeToCloseDays: null,
    timeToFirstAttentionWithoutBot: null,
    numOfCommentsWithoutBot: 0,
    labels: ['bug', 'mobile'],
    userLogin: 'zhaoliu',
    assigneeLogin: null,
  },
] as unknown as IssueDetail[];

const MOCK_ISSUE_STATS = {
  issueCount: 45,
  issueCompletionRatio: 0.756,
  issueCompletionCount: 34,
  issueUnresponsiveCount: 3,
  issueCommentFrequencyMean: 4.2,
};

// 社区维度 Mock 数据
const MOCK_COMMUNITY_ISSUE_DATA: CommunityIssueRecord[] = [
  {
    id: '1',
    repoName: 'cann/cann',
    repoUrl: 'https://gitcode.com/cann/cann',
    issueTotal: 128,
    issueOpen: 23,
    issueCompletionRatio: 82,
    issueUnresponsiveCount: 5,
    issueFirstResponseTime: 1.2,
    issueCommentMean: 4.5,
  },
  {
    id: '2',
    repoName: 'cann/metadef',
    repoUrl: 'https://gitcode.com/cann/metadef',
    issueTotal: 86,
    issueOpen: 12,
    issueCompletionRatio: 86,
    issueUnresponsiveCount: 2,
    issueFirstResponseTime: 0.8,
    issueCommentMean: 3.2,
  },
  {
    id: '3',
    repoName: 'cann/graphengine',
    repoUrl: 'https://gitcode.com/cann/graphengine',
    issueTotal: 45,
    issueOpen: 8,
    issueCompletionRatio: 78,
    issueUnresponsiveCount: 3,
    issueFirstResponseTime: 2.1,
    issueCommentMean: 2.8,
  },
  {
    id: '4',
    repoName: 'cann/parser',
    repoUrl: 'https://gitcode.com/cann/parser',
    issueTotal: 32,
    issueOpen: 5,
    issueCompletionRatio: 84,
    issueUnresponsiveCount: 1,
    issueFirstResponseTime: 1.5,
    issueCommentMean: 5.1,
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

const IssueTable: React.FC<IssueTableProps> = ({
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
      showTotal: (total) => t('analyze:total_issues', { total }),
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

  // 调用 Issue 列表 API (仅仓库维度)
  const [repoTableData, setRepoTableData] = useState<IssueDetail[]>([]);

  const { isLoading: repoLoading, isFetching: repoFetching } =
    useIssuesDetailListQuery(client, query, {
      enabled: !!selectedProject,
      onSuccess: (data) => {
        const items = data.issuesDetailList.items;
        setRepoTableData(items);
        setTableParams((prev) => ({
          ...prev,
          pagination: {
            ...prev.pagination,
            total: data.issuesDetailList.count,
          },
        }));
      },
    });

  // ============ 社区维度数据 (接口开发中，预留) ============
  // TODO: 替换为真实的社区 Issue 汇总 API
  // const { data: communityData, isLoading: communityLoading } = useCommunityIssueStats({
  //   dashboardId,
  //   projects,
  //   beginDate: timeStart,
  //   endDate: timeEnd,
  //   enabled: dashboardType === 'community',
  // });
  const communityTableData: CommunityIssueRecord[] = [];
  const communityLoading = false;

  // 使用真实 API 获取统计数据
  const { issuesOverview, isLoading: statsLoading } = useOsBoardMetricDashboard(
    {
      project: selectedProject,
      level: dashboardType,
      enabled: !!selectedProject,
    }
  );

  // 统计卡片数据（API 无有效数据时使用 mock）
  const hasValidStats =
    issuesOverview &&
    issuesOverview.issueCount != null &&
    issuesOverview.issueCount > 0;
  const statsData = hasValidStats
    ? {
        issueCount: issuesOverview.issueCount,
        issueCompletionRatio: issuesOverview.issueCompletionRatio,
        issueCompletionCount: issuesOverview.issueCompletionCount,
        issueUnresponsiveCount: issuesOverview.issueUnresponsiveCount,
        issueCommentFrequencyMean: issuesOverview.issueCommentFrequencyMean,
      }
    : MOCK_ISSUE_STATS;

  // 表格数据（API 无数据时使用 mock）
  const displayTableData =
    dashboardType === 'community'
      ? communityTableData.length > 0
        ? communityTableData
        : MOCK_COMMUNITY_ISSUE_DATA
      : repoTableData.length > 0
      ? repoTableData
      : MOCK_ISSUE_DATA;

  // 处理表格变更
  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<IssueDetail>
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
  const repoColumns: ColumnsType<IssueDetail> = [
    {
      title: t('analyze:metric_detail:issue_title'),
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
      dataIndex: 'numOfCommentsWithoutBot',
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
      title: t('analyze:metric_detail:assignee'),
      dataIndex: 'assigneeLogin',
      align: 'left',
      width: 120,
      render: (val: string | null) => val || '-',
    },
  ];

  // 社区维度表格列定义
  const communityColumns: ColumnsType<CommunityIssueRecord> = [
    {
      title: t('os_board:issue_table.repo_name'),
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
      title: t('os_board:issue_table.issue_total'),
      dataIndex: 'issueTotal',
      align: 'center',
      width: 100,
      sorter: (a, b) => a.issueTotal - b.issueTotal,
    },
    {
      title: t('os_board:issue_table.issue_open'),
      dataIndex: 'issueOpen',
      align: 'center',
      width: 120,
      sorter: (a, b) => a.issueOpen - b.issueOpen,
    },
    {
      title: t('os_board:issue_table.issue_completion_ratio'),
      dataIndex: 'issueCompletionRatio',
      align: 'center',
      width: 140,
      sorter: (a, b) => a.issueCompletionRatio - b.issueCompletionRatio,
      render: (val: number) => <RingChart percentage={val} />,
    },
    {
      title: t('os_board:issue_table.issue_unresponsive'),
      dataIndex: 'issueUnresponsiveCount',
      align: 'center',
      width: 130,
      sorter: (a, b) => a.issueUnresponsiveCount - b.issueUnresponsiveCount,
    },
    {
      title: t('os_board:issue_table.issue_first_response'),
      dataIndex: 'issueFirstResponseTime',
      align: 'center',
      width: 150,
      sorter: (a, b) => a.issueFirstResponseTime - b.issueFirstResponseTime,
      render: (val: number) =>
        val != null ? `${toFixed(val, 1)} ${t('analyze:unit_day')}` : '-',
    },
    {
      title: t('os_board:issue_table.issue_comment_mean'),
      dataIndex: 'issueCommentMean',
      align: 'center',
      width: 120,
      sorter: (a, b) => a.issueCommentMean - b.issueCommentMean,
      render: (val: number) => (val != null ? toFixed(val, 2) : '-'),
    },
  ];

  // 根据维度选择列配置
  const displayColumns =
    dashboardType === 'community' ? communityColumns : repoColumns;

  const isTableLoading = repoLoading || repoFetching;

  return (
    <BaseCard
      id="issue_table"
      title={String(t('metrics_models_v2:model_999.metrics.metric_063.title'))}
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

      {/* Issue 统计卡片 */}
      <div className="mb-3 grid grid-cols-4 gap-3 md:grid-cols-2">
        {/* 新建 Issue 数量 */}
        <div className="rounded-lg border border-gray-100 bg-white p-3 shadow-sm">
          <div className="flex items-center text-lg font-medium">
            <div className="mr-2 text-[#3A5BEF]">
              <GoIssueOpened />
            </div>
            <div className="line-clamp-1">{statsData?.issueCount ?? '-'}</div>
          </div>
          <div className="text-xs text-[#585858]">
            {t('analyze:metric_detail:newly_created_issues')}
          </div>
        </div>

        {/* Issue 解决百分比 */}
        <div className="rounded-lg border border-gray-100 bg-white p-3 shadow-sm">
          <div className="flex items-center text-lg font-medium">
            <div className="mr-2 text-[#3A5BEF]">
              <AiOutlineIssuesClose />
            </div>
            <div className="line-clamp-1">
              {statsData?.issueCompletionRatio != null
                ? `${toFixed(statsData.issueCompletionRatio * 100, 1)}% (${
                    statsData.issueCompletionCount ?? 0
                  })`
                : '-'}
            </div>
          </div>
          <div className="text-xs text-[#585858]">
            {t('analyze:metric_detail:issue_completion_rate')}
          </div>
        </div>

        {/* 未响应 Issue 数量 */}
        <div className="rounded-lg border border-gray-100 bg-white p-3 shadow-sm">
          <div className="flex items-center text-lg font-medium">
            <div className="mr-2 text-[#3A5BEF]">
              <AiFillClockCircle />
            </div>
            <div className="line-clamp-1">
              {statsData?.issueUnresponsiveCount ?? '-'}
            </div>
          </div>
          <div className="text-xs text-[#585858]">
            {t('analyze:metric_detail:unanswered_issue_count')}
          </div>
        </div>

        {/* 平均评论数量 */}
        <div className="rounded-lg border border-gray-100 bg-white p-3 shadow-sm">
          <div className="flex items-center text-lg font-medium">
            <div className="mr-2 text-[#3A5BEF]">
              <BiChat />
            </div>
            <div className="line-clamp-1">
              {statsData?.issueCommentFrequencyMean != null
                ? toFixed(statsData.issueCommentFrequencyMean, 2)
                : '-'}
            </div>
          </div>
          <div className="text-xs text-[#585858]">
            {t('analyze:metric_detail:average_comments_count')}
          </div>
        </div>
      </div>

      {/* 表格区域：根据类型切换 */}
      <div className="flex h-[420px] flex-col">
        <div className="min-h-0 flex-1">
          <MyTable
            columns={
              displayColumns as ColumnsType<IssueDetail | CommunityIssueRecord>
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

export default IssueTable;
