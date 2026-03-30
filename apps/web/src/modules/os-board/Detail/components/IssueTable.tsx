import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Popover, Tabs } from 'antd';
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
  useOsBoardIssuesDetailList,
  useOsBoardIssuesOverview,
  useOsBoardRepositoryList,
  IssueDetail,
  FilterOptionInput,
  SortOptionInput,
} from '../../api/tableData';
import {
  getLastPathSegment,
  getRepoOrigin,
  getRepoPath,
  toFixed,
} from '@common/utils';
import { toUnderline } from '@common/utils/format';

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

const STATE_OPTIONS = [
  { value: 'open', text: 'analyze:metric_detail:open' },
  { value: 'closed', text: 'analyze:metric_detail:closed' },
];

const TITLE_COLUMN_WIDTH = 280;
const TITLE_TEXT_MAX_WIDTH = 248;
const REPOSITORY_COLUMN_WIDTH = 220;
const REPOSITORY_TEXT_MAX_WIDTH = 188;

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

const IssueTable: React.FC<IssueTableProps> = ({
  dashboardType,
  origin,
  projects,
  competitorProjects = [],
}) => {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<string>(
    projects[0] || ''
  );
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

  const {
    data: issuesDetailData,
    isLoading: repoLoading,
    isFetching: repoFetching,
  } = useOsBoardIssuesDetailList({
    project: selectedProject,
    dashboardType,
    page: tableParams.pagination?.current,
    per: tableParams.pagination?.pageSize,
    filterOpts: tableParams.filterOpts,
    sortOpts: tableParams.sortOpts || undefined,
    enabled: !!selectedProject,
  });

  React.useEffect(() => {
    if (issuesDetailData) {
      setTableParams((prev) => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          total: issuesDetailData.count,
        },
      }));
    }
  }, [issuesDetailData]);

  const {
    data: repositoryListData,
    isLoading: repositoryListLoading,
    isFetching: repositoryListFetching,
  } = useOsBoardRepositoryList({
    project: selectedProject,
    level: 'community',
    enabled: dashboardType === 'community' && !!selectedProject,
  });

  const { data: issuesOverview, isLoading: statsLoading } =
    useOsBoardIssuesOverview({
      project: selectedProject,
      level: dashboardType,
      enabled: !!selectedProject,
    });

  const statsData = {
    issueCount: issuesOverview?.new_issue_count,
    issueCompletionRatio: issuesOverview?.issue_resolution_percentage
      ? parseFloat(
          issuesOverview.issue_resolution_percentage.replace('%', '')
        ) / 100
      : null,
    issueUnresponsiveCount: issuesOverview?.unresponsive_issue_count,
    issueCommentFrequencyMean: issuesOverview?.avg_comments,
  };

  const tableData = issuesDetailData?.items || [];

  const repositoryFilters = useMemo(() => {
    if (dashboardType !== 'community') {
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
  }, [dashboardType, repositoryListData]);

  React.useEffect(() => {
    if (dashboardType !== 'community') {
      return;
    }

    setTableParams((prev) => {
      const nextFilterOpts =
        prev.filterOpts?.filter((item) => item.type !== 'repository') || [];

      if (nextFilterOpts.length === (prev.filterOpts?.length || 0)) {
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
  }, [dashboardType, selectedProject]);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<IssueDetail>
  ) => {
    let sortOpts: SortOptionInput | null = null;
    const filterOpts: FilterOptionInput[] = [];

    if (sorter.field) {
      sortOpts = {
        type: toUnderline(sorter.field as string),
        direction: sorter.order === 'ascend' ? 'asc' : 'desc',
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

  const columns = useMemo<ColumnsType<IssueDetail>>(() => {
    const baseColumns: ColumnsType<IssueDetail> = [
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
        filters: STATE_OPTIONS.map((s) => ({
          text: t(s.text),
          value: s.value,
        })),
        filteredValue: getFilteredValues(tableParams.filterOpts, 'state'),
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

    if (dashboardType === 'community') {
      baseColumns.splice(2, 0, {
        title: t('os_board:issue_table.repo_name'),
        dataIndex: 'repository',
        key: 'repository',
        align: 'left',
        width: REPOSITORY_COLUMN_WIDTH,
        fixed: 'left',
        filters: repositoryFilters,
        filterSearch: true,
        filteredValue: getFilteredValues(tableParams.filterOpts, 'repository'),
        render: (text: string | null, record) => {
          const repositoryName = getRepositoryDisplayName(text);
          return repositoryName && record.url ? (
            <a
              href={record.url}
              target="_blank"
              rel="noreferrer"
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
      });
    }

    return baseColumns;
  }, [dashboardType, repositoryFilters, t, tableParams.filterOpts]);

  const isTableLoading =
    repoLoading ||
    repoFetching ||
    (dashboardType === 'community' &&
      (repositoryListLoading || repositoryListFetching));

  return (
    <BaseCard
      id="issue_table"
      title={String(t('metrics_models_v2:model_999.metrics.metric_063.title'))}
      bodyClass=""
      className="!p-4 [&_h3]:!mb-1"
    >
      <Tabs
        activeKey={selectedProject}
        onChange={setSelectedProject}
        items={tabItems}
        className="mb-2 [&_.ant-tabs-nav]:mb-0"
      />

      <div className="mb-3 grid grid-cols-4 gap-3 md:grid-cols-2">
        <div className="rounded-lg border border-gray-100 bg-white p-3 shadow-sm">
          <div className="flex items-center text-lg font-medium">
            <div className="mr-2 text-[#3A5BEF]">
              <GoIssueOpened />
            </div>
            <div className="line-clamp-1">{statsData.issueCount ?? '-'}</div>
          </div>
          <div className="text-xs text-[#585858]">
            {t('analyze:metric_detail:newly_created_issues')}
          </div>
        </div>

        <div className="rounded-lg border border-gray-100 bg-white p-3 shadow-sm">
          <div className="flex items-center text-lg font-medium">
            <div className="mr-2 text-[#3A5BEF]">
              <AiOutlineIssuesClose />
            </div>
            <div className="line-clamp-1">
              {statsData.issueCompletionRatio != null
                ? `${toFixed(statsData.issueCompletionRatio * 100, 1)}%`
                : '-'}
            </div>
          </div>
          <div className="text-xs text-[#585858]">
            {t('analyze:metric_detail:issue_completion_rate')}
          </div>
        </div>

        <div className="rounded-lg border border-gray-100 bg-white p-3 shadow-sm">
          <div className="flex items-center text-lg font-medium">
            <div className="mr-2 text-[#3A5BEF]">
              <AiFillClockCircle />
            </div>
            <div className="line-clamp-1">
              {statsData.issueUnresponsiveCount ?? '-'}
            </div>
          </div>
          <div className="text-xs text-[#585858]">
            {t('analyze:metric_detail:unanswered_issue_count')}
          </div>
        </div>

        <div className="rounded-lg border border-gray-100 bg-white p-3 shadow-sm">
          <div className="flex items-center text-lg font-medium">
            <div className="mr-2 text-[#3A5BEF]">
              <BiChat />
            </div>
            <div className="line-clamp-1">
              {statsData.issueCommentFrequencyMean != null
                ? toFixed(statsData.issueCommentFrequencyMean, 2)
                : '-'}
            </div>
          </div>
          <div className="text-xs text-[#585858]">
            {t('analyze:metric_detail:average_comments_count')}
          </div>
        </div>
      </div>

      <div className="flex h-[420px] flex-col">
        <div className="min-h-0 flex-1">
          <MyTable
            columns={columns}
            dataSource={tableData}
            rowKey="url"
            tableLayout="fixed"
            loading={isTableLoading || statsLoading}
            onChange={handleTableChange}
            pagination={tableParams.pagination}
            scroll={{ x: 'max-content', y: 320 }}
            className="h-full [&_.ant-pagination]:flex-shrink-0 [&_.ant-pagination]:py-1 [&_.ant-spin-container]:flex [&_.ant-spin-container]:h-full [&_.ant-spin-container]:flex-col [&_.ant-spin-nested-loading]:h-full [&_.ant-table-body]:min-h-0 [&_.ant-table-body]:flex-1 [&_.ant-table-container]:min-h-0 [&_.ant-table-container]:flex-1 [&_.ant-table-thead_th]:whitespace-nowrap [&_.ant-table-wrapper]:min-h-0 [&_.ant-table-wrapper]:flex-1 [&_.ant-table]:flex [&_.ant-table]:h-full [&_.ant-table]:flex-col"
          />
        </div>
      </div>
    </BaseCard>
  );
};

export default IssueTable;
