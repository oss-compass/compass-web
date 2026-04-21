import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Popover, Select, Tabs, Radio } from 'antd';
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
  useOsBoardCommunityIssueSummaryList,
  useOsBoardIssuesDetailList,
  useOsBoardIssuesOverview,
  useOsBoardOrganizationList,
  useOsBoardRepositoryList,
  CommunityIssueSummaryItem,
  IssueDetail,
  FilterOptionInput,
  SortOptionInput,
  IssueLabelFilter,
} from '../../api/tableData';
import {
  getLastPathSegment,
  getRepoOrigin,
  getRepoPath,
  toFixed,
} from '@common/utils';
import { toUnderline } from '@common/utils/format';
import ContributorOrganizationCell from './ContributorOrganizationCell';
import IssuePriorityCell from './IssuePriorityCell';
import IssueResponsibleCell from './IssueResponsibleCell';
import { useDashboardContext } from '../../context';
import { useAuthorizedUsers } from '../../api/dashboard';

interface IssueTableProps {
  dashboardId: string;
  dashboardType: 'repo' | 'community';
  origin?: string | null;
  projects: readonly string[];
  competitorProjects?: readonly string[];
}

interface TableParams {
  pagination?: TablePaginationConfig;
  filterOpts?: FilterOptionInput[];
  sortOpts?: SortOptionInput | null;
}

type IssueTableRecord = IssueDetail | CommunityIssueSummaryItem;

const TABLE_CARD_CLASS =
  '!p-4 [&_h3]:!mb-1 flex h-[890px] flex-col overflow-visible';
const TABLE_CARD_BODY_CLASS = 'flex flex-1 flex-col';
const TABLE_SCROLL_HEIGHT = 540;

const STATE_OPTIONS = [
  { value: 'open', text: 'analyze:metric_detail:open' },
  { value: 'closed', text: 'analyze:metric_detail:closed' },
];

const PRIORITY_OPTIONS = [
  { value: 'fatal', text: 'os_board:issue_table.priority_fatal' },
  { value: 'serious', text: 'os_board:issue_table.priority_serious' },
  { value: 'medium', text: 'os_board:issue_table.priority_medium' },
  { value: 'info', text: 'os_board:issue_table.priority_info' },
];

const LABEL_FILTER_OPTIONS: {
  value: IssueLabelFilter;
  label: string;
}[] = [
  { value: 'bug', label: 'Bug' },
  { value: 'feature', label: 'New Feature/Requirement' },
  { value: 'question', label: '咨询类' },
  { value: 'other', label: 'Others' },
];

const TITLE_COLUMN_WIDTH = 280;
const TITLE_TEXT_MAX_WIDTH = 248;
const REPOSITORY_COLUMN_WIDTH = 220;
const REPOSITORY_TEXT_MAX_WIDTH = 188;

const getDefaultSortOption = (
  dashboardType: 'repo' | 'community'
): SortOptionInput | null => {
  if (dashboardType === 'community') {
    return null;
  }

  return {
    type: 'state',
    direction: 'desc',
  };
};

const RingChart: React.FC<{ percentage: number; size?: number }> = ({
  percentage,
  size = 24,
}) => {
  const safePercentage = Math.max(0, Math.min(percentage, 100));
  const radius = (size - 4) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - safePercentage / 100);

  const getColor = (value: number) => {
    if (value >= 90) {
      return '#52c41a';
    }
    if (value >= 60) {
      return '#faad14';
    }
    return '#ff4d4f';
  };

  const color = getColor(safePercentage);

  return (
    <div className="inline-flex items-center gap-2">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#f0f0f0"
          strokeWidth="3"
        />
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
        {toFixed(safePercentage, 1)}%
      </span>
    </div>
  );
};

const getProjectPlatform = (project: string, fallbackOrigin = 'github') =>
  getRepoOrigin(project, fallbackOrigin);

const getProjectDisplayName = (project: string) =>
  getRepoPath(project) || project;

const getRepositoryDisplayName = (repository?: string | null) => {
  const repositoryPath = getRepoPath(repository || '') || repository || '';
  return getLastPathSegment(repositoryPath);
};

const getFilteredValues = (
  filterOpts: FilterOptionInput[] | undefined,
  type: string
) => {
  const values = filterOpts?.find((item) => item.type === type)?.values;
  return values && values.length > 0 ? values : null;
};

const formatResponseTime = (
  value: number | null | undefined,
  unitLabel: string,
  emptyLabel: string,
  digits = 1
) => (value != null ? `${toFixed(value, digits)} ${unitLabel}` : emptyLabel);

interface StatsCardProps {
  icon: React.ReactNode;
  value: React.ReactNode;
  label: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon, value, label }) => (
  <div className="rounded-lg border border-gray-100 bg-white p-3 shadow-sm">
    <div className="flex items-center text-lg font-medium">
      <div className="mr-2 text-[#3A5BEF]">{icon}</div>
      <div className="line-clamp-1">{value}</div>
    </div>
    <div className="text-xs text-[#585858]">{label}</div>
  </div>
);

interface IssueStatsBarProps {
  statsData: {
    issueCount?: number | null;
    issueCompletionRatio?: string | number | null;
    issueResolutionNumerator?: number | null;
    issueResolutionDenominator?: number | null;
    issueUnresponsiveCount?: number | null;
    issueAverageResponseTime?: number | null;
  };
  dayUnitText: string;
  noResponseText: string;
  t: (key: string) => string;
}

const IssueStatsBar: React.FC<IssueStatsBarProps> = ({
  statsData,
  dayUnitText,
  noResponseText,
  t,
}) => {
  const completionDisplay =
    statsData.issueCompletionRatio != null
      ? `${statsData.issueCompletionRatio}${
          statsData.issueResolutionNumerator != null &&
          statsData.issueResolutionDenominator != null
            ? ` (${statsData.issueResolutionNumerator}/${statsData.issueResolutionDenominator})`
            : ''
        }`
      : '-';

  return (
    <div className="mb-3 grid grid-cols-4 gap-3 md:grid-cols-2">
      <StatsCard
        icon={<GoIssueOpened />}
        value={statsData.issueCount ?? '-'}
        label={t('analyze:metric_detail:newly_created_issues')}
      />
      <StatsCard
        icon={<AiOutlineIssuesClose />}
        value={completionDisplay}
        label={t('analyze:metric_detail:issue_completion_rate')}
      />
      <StatsCard
        icon={<AiFillClockCircle />}
        value={statsData.issueUnresponsiveCount ?? '-'}
        label={t('analyze:metric_detail:unanswered_issue_count')}
      />
      <StatsCard
        icon={<BiChat />}
        value={formatResponseTime(
          statsData.issueAverageResponseTime,
          dayUnitText,
          noResponseText,
          2
        )}
        label={t('analyze:metric_detail:average_response_time')}
      />
    </div>
  );
};

const IssueTable: React.FC<IssueTableProps> = ({
  dashboardType,
  origin,
  projects,
  competitorProjects = [],
}) => {
  const { t } = useTranslation();
  const { dashboard: dashboardCtx } = useDashboardContext();
  const userRole = dashboardCtx?.current_user_role?.role;
  const canManage = userRole === 'editor' || userRole === 'admin';
  // 看板标识符，如 DASH-FE3323，用于修改优先级接口的 identifier 参数
  const dashboardIdentifier = dashboardCtx?.identifier ?? null;
  const noResponseText = t('analyze:metric_detail:no_response');
  const dayUnitText = t('analyze:unit_day');
  const [selectedProject, setSelectedProject] = useState<string>(
    projects[0] || ''
  );
  const isCommunityDashboard = dashboardType === 'community';
  const [labelFilter, setLabelFilter] = useState<IssueLabelFilter | null>(null);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      showSizeChanger: true,
      position: ['bottomCenter'],
      showTotal: (total) => t('analyze:total_people', { total }),
    },
    filterOpts: [],
    sortOpts: getDefaultSortOption(dashboardType),
  });

  // 社区模式下加载授权用户列表，作为责任人筛选选项
  const { data: authorizedUsersData } = useAuthorizedUsers(
    { identifier: dashboardIdentifier! },
    { enabled: isCommunityDashboard && !!dashboardIdentifier }
  );

  // 社区模式：责任人独立筛选状态（user_id，null 表示全部）
  const [selectedResponsiblePerson, setSelectedResponsiblePerson] = useState<
    number | null
  >(null);

  const {
    data: issuesDetailData,
    isLoading: repoLoading,
    isFetching: repoFetching,
    refetch: refetchIssuesDetail,
  } = useOsBoardIssuesDetailList({
    project: selectedProject,
    dashboardType,
    page: tableParams.pagination?.current,
    per: tableParams.pagination?.pageSize,
    filterOpts: tableParams.filterOpts,
    sortOpts: tableParams.sortOpts || undefined,
    enabled: !isCommunityDashboard && !!selectedProject,
    identifier: dashboardIdentifier,
    labelFilter,
    priority: null,
  });

  const {
    data: communityIssueSummaryData,
    isLoading: communityLoading,
    isFetching: communityFetching,
    refetch: refetchCommunityIssueSummary,
  } = useOsBoardCommunityIssueSummaryList({
    project: selectedProject,
    page: tableParams.pagination?.current,
    per: tableParams.pagination?.pageSize,
    filterOpts: tableParams.filterOpts,
    sortOpts: tableParams.sortOpts || undefined,
    enabled: isCommunityDashboard && !!selectedProject,
    identifier: dashboardIdentifier,
    responsiblePerson: isCommunityDashboard ? selectedResponsiblePerson : null,
  });

  const {
    data: repositoryListData,
    isLoading: repositoryListLoading,
    isFetching: repositoryListFetching,
  } = useOsBoardRepositoryList({
    project: selectedProject,
    level: 'community',
    enabled: isCommunityDashboard && !!selectedProject,
  });

  const { data: organizationListData, refetch: refetchOrganizationList } =
    useOsBoardOrganizationList({
      project: selectedProject,
      enabled: !isCommunityDashboard && !!selectedProject,
    });

  const { data: issuesOverview, isLoading: statsLoading } =
    useOsBoardIssuesOverview({
      project: selectedProject,
      level: dashboardType,
      enabled: !!selectedProject,
      identifier: dashboardIdentifier,
      responsiblePerson: isCommunityDashboard
        ? selectedResponsiblePerson
        : null,
      priority: null,
      labelFilter: !isCommunityDashboard ? labelFilter : null,
    });

  const statsData = {
    issueCount: issuesOverview?.new_issue_count,
    issueCompletionRatio: issuesOverview?.issue_resolution_percentage,
    issueResolutionNumerator: issuesOverview?.issue_resolution_numerator,
    issueResolutionDenominator: issuesOverview?.issue_resolution_denominator,
    issueUnresponsiveCount: issuesOverview?.unresponsive_issue_count,
    issueAverageResponseTime: issuesOverview?.avg_response_time,
  };

  const activeTotalCount = isCommunityDashboard
    ? communityIssueSummaryData?.count
    : issuesDetailData?.count;

  React.useEffect(() => {
    if (activeTotalCount == null) {
      return;
    }

    setTableParams((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        total: activeTotalCount,
      },
    }));
  }, [activeTotalCount]);

  const repositoryFilters = useMemo(() => {
    if (!isCommunityDashboard) {
      return [];
    }

    return (repositoryListData?.items || [])
      .map((repository) => {
        const repositoryName = getRepositoryDisplayName(repository);
        return repositoryName
          ? {
              text: repositoryName,
              value: repository,
            }
          : null;
      })
      .filter(
        (
          item
        ): item is {
          text: string;
          value: string;
        } => !!item
      );
  }, [isCommunityDashboard, repositoryListData]);

  const organizationFilters = useMemo(
    () =>
      (organizationListData?.organizations || []).map((organization) => ({
        text: organization,
        value: organization,
      })),
    [organizationListData]
  );

  React.useEffect(() => {
    setTableParams((prev) => {
      const removableFilterType = isCommunityDashboard
        ? 'repository'
        : 'organization';
      const nextFilterOpts =
        prev.filterOpts?.filter((item) => item.type !== removableFilterType) ||
        [];

      if (
        nextFilterOpts.length === (prev.filterOpts?.length || 0) &&
        prev.pagination?.current === 1
      ) {
        return prev;
      }

      return {
        ...prev,
        pagination: {
          ...prev.pagination,
          current: 1,
        },
        filterOpts: nextFilterOpts,
      };
    });
  }, [isCommunityDashboard, selectedProject]);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<IssueTableRecord> | SorterResult<IssueTableRecord>[]
  ) => {
    let sortOpts: SortOptionInput | null = null;
    const filterOpts: FilterOptionInput[] = [];
    const activeSorter = Array.isArray(sorter) ? sorter[0] : sorter;

    if (
      activeSorter?.field &&
      typeof activeSorter.field === 'string' &&
      activeSorter.order
    ) {
      sortOpts = {
        type: toUnderline(activeSorter.field),
        direction: activeSorter.order === 'ascend' ? 'asc' : 'desc',
      };
    }

    for (const key in filters) {
      const values = Array.isArray(filters[key])
        ? filters[key].filter(
            (value): value is string =>
              typeof value === 'string' && value.length > 0
          )
        : [];

      if (Object.prototype.hasOwnProperty.call(filters, key) && values.length) {
        filterOpts.push({
          type: key,
          values,
        });
      }
    }

    setTableParams((prev) => ({
      pagination: {
        ...prev.pagination,
        ...pagination,
      },
      sortOpts,
      filterOpts,
    }));
  };

  const tabItems = useMemo(() => {
    const fallbackOrigin = origin?.toLowerCase() || 'github';
    const buildTabItem = (project: string, isCompetitor?: boolean) => {
      const platform = getProjectPlatform(project, fallbackOrigin);
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
            {isCompetitor && (
              <span className="rounded bg-orange-100 px-1.5 py-0.5 text-[10px] text-orange-600">
                {t('os_board:detail.competitors')}
              </span>
            )}
          </div>
        ),
      };
    };

    return [
      ...projects.map((project) => buildTabItem(project)),
      ...competitorProjects.map((project) => buildTabItem(project, true)),
    ];
  }, [projects, competitorProjects, origin, t]);

  const currentPlatform = useMemo(
    () =>
      getProjectPlatform(selectedProject, origin?.toLowerCase() || 'github'),
    [origin, selectedProject]
  );

  const repoColumns = useMemo<ColumnsType<IssueDetail>>(
    () => [
      {
        title: 'ID',
        dataIndex: 'idInRepo',
        align: 'left',
        width: 90,
        fixed: 'left',
        render: (id: number | null, record) =>
          id != null && record.url ? (
            <a
              href={record.url}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
            >
              #{id}
            </a>
          ) : (
            '-'
          ),
      },
      {
        title: t('analyze:metric_detail:issue_title'),
        dataIndex: 'title',
        align: 'left',
        width: TITLE_COLUMN_WIDTH,
        fixed: 'left',
        sorter: true,
        render: (text: string, record) => (
          <Popover
            content={<div className="max-w-[520px] break-words">{text}</div>}
            trigger="hover"
            placement="topLeft"
          >
            <a
              href={record.url}
              target="_blank"
              rel="noreferrer"
              className="block overflow-hidden text-ellipsis whitespace-nowrap font-medium text-gray-900 hover:text-blue-600 hover:underline"
              style={{ maxWidth: TITLE_TEXT_MAX_WIDTH }}
            >
              {text}
            </a>
          </Popover>
        ),
      },
      {
        title: t('analyze:metric_detail:state'),
        dataIndex: 'state',
        align: 'left',
        width: 100,
        sorter: true,
        filters: STATE_OPTIONS.map((item) => ({
          text: t(item.text),
          value: item.value,
        })),
        filteredValue: getFilteredValues(tableParams.filterOpts, 'state'),
        render: (value: string) => {
          const item = STATE_OPTIONS.find((state) => state.value === value);
          return item ? t(item.text) : value;
        },
      },
      {
        title: t('os_board:issue_table.priority', '优先级'),
        dataIndex: 'priority',
        key: 'priority',
        align: 'left',
        width: 120,
        filters: PRIORITY_OPTIONS.map((item) => ({
          text: t(item.text),
          value: item.value,
        })),
        filteredValue: getFilteredValues(tableParams.filterOpts, 'priority'),
        render: (_: unknown, record: IssueDetail) => (
          <IssuePriorityCell
            priority={record.priority}
            label={selectedProject}
            url={record.url}
            identifier={dashboardIdentifier}
            hasEditPermission={canManage}
            onUpdated={refetchIssuesDetail}
          />
        ),
      },
      {
        title: t('analyze:metric_detail:created_time'),
        dataIndex: 'createdAt',
        align: 'left',
        width: 120,
        sorter: true,
        render: (time: string) =>
          time ? format(parseJSON(time), 'yyyy-MM-dd') : '-',
      },
      {
        title: t('analyze:metric_detail:creator'),
        dataIndex: 'userLogin',
        align: 'left',
        width: 120,
      },
      {
        title: t('analyze:metric_detail:organization'),
        key: 'organization',
        dataIndex: ['contributor', 'organization'],
        align: 'left',
        width: 120,
        filters: organizationFilters,
        filterSearch: true,
        filteredValue: getFilteredValues(
          tableParams.filterOpts,
          'organization'
        ),
        render: (_: string | null, record) => (
          <ContributorOrganizationCell
            contributor={record.userLogin}
            organization={record.contributor?.organization}
            label={selectedProject}
            level={dashboardType}
            platform={currentPlatform}
            onUpdated={async () => {
              await Promise.all([
                refetchIssuesDetail(),
                refetchOrganizationList(),
              ]);
            }}
          />
        ),
      },
      {
        title: t('analyze:metric_detail:close_time'),
        dataIndex: 'closedAt',
        align: 'left',
        width: 120,
        sorter: true,
        render: (time: string | null) =>
          time ? format(parseJSON(time), 'yyyy-MM-dd') : '-',
      },
      {
        title: t('analyze:metric_detail:processing_time'),
        dataIndex: 'timeToCloseDays',
        align: 'left',
        width: 120,
        sorter: true,
        render: (value: number | null) =>
          value != null ? `${toFixed(value, 1)} ${t('analyze:unit_day')}` : '-',
      },
      {
        title: t('analyze:metric_detail:first_response_time'),
        dataIndex: 'timeToFirstAttentionWithoutBot',
        align: 'left',
        width: 150,
        sorter: true,
        render: (value: number | null) =>
          formatResponseTime(value, dayUnitText, noResponseText),
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
    ],
    [
      currentPlatform,
      dashboardType,
      dayUnitText,
      noResponseText,
      organizationFilters,
      refetchOrganizationList,
      refetchIssuesDetail,
      selectedProject,
      t,
      tableParams.filterOpts,
    ]
  );

  const communityColumns = useMemo<ColumnsType<CommunityIssueSummaryItem>>(
    () => [
      {
        title: t('os_board:issue_table.repo_name'),
        dataIndex: 'repoUrl',
        key: 'repository',
        align: 'left',
        width: REPOSITORY_COLUMN_WIDTH,
        fixed: 'left',
        filters: repositoryFilters,
        filterSearch: true,
        filteredValue: getFilteredValues(tableParams.filterOpts, 'repository'),
        render: (repoUrl: string | null, record) => {
          const repositoryName = getRepositoryDisplayName(repoUrl);
          const href = record.identifier
            ? `/os-board/dashboard/${encodeURIComponent(record.identifier)}`
            : repoUrl;

          return repositoryName && href ? (
            <a
              href={href}
              target={'_blank'}
              rel={'noreferrer'}
              title={repositoryName}
              className="block overflow-hidden text-ellipsis whitespace-nowrap font-medium text-gray-900 hover:text-blue-600 hover:underline"
              style={{ maxWidth: REPOSITORY_TEXT_MAX_WIDTH }}
            >
              {repositoryName}
            </a>
          ) : (
            '-'
          );
        },
      },
      {
        title: t('os_board:issue_table.issue_total'),
        dataIndex: 'issueTotalCount',
        align: 'center',
        width: 110,
        sorter: true,
        render: (value: number | null) => value ?? '-',
      },
      {
        title: t('os_board:issue_table.issue_open'),
        dataIndex: 'issueOpenCount',
        align: 'center',
        width: 110,
        sorter: true,
        render: (value: number | null) => value ?? '-',
      },
      {
        title: t('os_board:issue_table.issue_completion_ratio'),
        dataIndex: 'closedLoopRate',
        align: 'center',
        width: 150,
        sorter: true,
        render: (value: number | null) =>
          value != null ? <RingChart percentage={value} /> : '-',
      },
      {
        title: t('os_board:issue_table.avg_closed_loop_time'),
        dataIndex: 'avgClosedLoopTime',
        align: 'center',
        width: 160,
        sorter: true,
        render: (value: number | null) =>
          value != null ? `${toFixed(value, 1)} ${t('analyze:unit_day')}` : '-',
      },
      {
        title: t('os_board:issue_table.issue_first_response'),
        dataIndex: 'avgFirstResponseTime',
        align: 'center',
        width: 160,
        sorter: true,
        render: (value: number | null) =>
          formatResponseTime(value, dayUnitText, noResponseText),
      },
      {
        title: t('os_board:issue_table.issue_unresponsive'),
        dataIndex: 'openUnresponsiveCount',
        align: 'center',
        width: 150,
        sorter: true,
        render: (value: number | null) => value ?? '-',
      },
      {
        title: t('analyze:metric_detail:assignee'),
        dataIndex: 'responsiblePerson',
        key: 'responsible_person',
        align: 'left',
        width: 160,
        render: (_: unknown, record: CommunityIssueSummaryItem) => (
          <IssueResponsibleCell
            assigneeLogin={record.responsiblePerson?.user_name ?? null}
            repoUrl={record.repoUrl ?? ''}
            identifier={dashboardIdentifier}
            hasEditPermission={canManage}
            onUpdated={refetchCommunityIssueSummary}
          />
        ),
      },
    ],
    [
      canManage,
      dashboardIdentifier,
      dayUnitText,
      noResponseText,
      refetchCommunityIssueSummary,
      repositoryFilters,
      t,
      tableParams.filterOpts,
    ]
  );

  const columns = (
    isCommunityDashboard ? communityColumns : repoColumns
  ) as ColumnsType<IssueTableRecord>;

  const tableData = (
    isCommunityDashboard
      ? communityIssueSummaryData?.items || []
      : issuesDetailData?.items || []
  ) as IssueTableRecord[];

  const isTableLoading = isCommunityDashboard
    ? communityLoading ||
      communityFetching ||
      repositoryListLoading ||
      repositoryListFetching
    : repoLoading || repoFetching;

  return (
    <BaseCard
      id="issue_table"
      title={String(t('metrics_models_v2:model_999.metrics.metric_063.title'))}
      bodyClass={TABLE_CARD_BODY_CLASS}
      className={TABLE_CARD_CLASS}
    >
      <Tabs
        activeKey={selectedProject}
        onChange={(key) => {
          setSelectedProject(key);
          setLabelFilter(null);
        }}
        items={tabItems}
        className="mb-2 [&_.ant-tabs-nav]:mb-0"
      />

      {isCommunityDashboard && (
        <div className="mb-3 flex items-center gap-2">
          <span className="shrink-0 text-sm text-gray-500">
            {t('analyze:metric_detail:assignee')}：
          </span>
          <Select
            allowClear
            style={{ minWidth: 160 }}
            placeholder={t('common:all')}
            value={selectedResponsiblePerson ?? undefined}
            onChange={(val: number | undefined) =>
              setSelectedResponsiblePerson(val ?? null)
            }
            options={(authorizedUsersData?.data ?? []).map((user) => ({
              label: user.name,
              value: user.id,
            }))}
          />
        </div>
      )}

      {!isCommunityDashboard && (
        <div className="mb-3 mt-1 flex items-center gap-2">
          <span className="shrink-0 text-sm text-gray-500">
            {t('os_board:issue_table.label_filter', '标签筛选')}：
          </span>
          <Radio.Group
            value={labelFilter}
            onChange={(e) => {
              setLabelFilter(e.target.value as IssueLabelFilter | null);
              setTableParams((prev) => ({
                ...prev,
                pagination: { ...prev.pagination, current: 1 },
              }));
            }}
            optionType="button"
            buttonStyle="solid"
            size="small"
          >
            <Radio.Button value={null}>
              {t('os_board:issue_table.label_all', '全部')}
            </Radio.Button>
            {LABEL_FILTER_OPTIONS.map((opt) => (
              <Radio.Button key={opt.value} value={opt.value}>
                {opt.label}
              </Radio.Button>
            ))}
          </Radio.Group>
        </div>
      )}

      <IssueStatsBar
        statsData={statsData}
        dayUnitText={dayUnitText}
        noResponseText={noResponseText}
        t={t}
      />

      <div className="flex min-h-0 flex-1 flex-col">
        <div className="min-h-0 flex-1">
          <MyTable
            columns={columns}
            dataSource={tableData}
            rowKey={isCommunityDashboard ? 'repoUrl' : 'url'}
            tableLayout="fixed"
            loading={isTableLoading || statsLoading}
            onChange={handleTableChange}
            pagination={tableParams.pagination}
            scroll={{ x: 'max-content', y: TABLE_SCROLL_HEIGHT }}
            className="h-full [&_.ant-pagination]:flex-shrink-0 [&_.ant-pagination]:py-1 [&_.ant-spin-container]:flex [&_.ant-spin-container]:h-full [&_.ant-spin-container]:flex-col [&_.ant-spin-nested-loading]:h-full [&_.ant-table-body]:min-h-0 [&_.ant-table-body]:flex-1 [&_.ant-table-container]:min-h-0 [&_.ant-table-container]:flex-1 [&_.ant-table-thead_th]:whitespace-nowrap [&_.ant-table-wrapper]:min-h-0 [&_.ant-table-wrapper]:flex-1 [&_.ant-table]:flex [&_.ant-table]:h-full [&_.ant-table]:flex-col"
          />
        </div>
      </div>
    </BaseCard>
  );
};

export default IssueTable;
