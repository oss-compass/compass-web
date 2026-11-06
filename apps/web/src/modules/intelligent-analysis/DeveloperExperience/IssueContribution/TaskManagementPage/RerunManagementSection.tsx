import React, { useState } from 'react';
import { Alert, Button, Select, Table, Tooltip } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import type { TableProps } from 'antd';
import { fetchManagedIssueReruns } from '../data';
import type { ManagedIssueRerunJob } from '../data';
import styles from './RerunManagementSection.module.scss';
import { RerunResultTable } from '../components/RerunJobListModal';
import {
  RERUN_STATUS_OPTIONS,
  RERUN_STATUS_META,
  getRerunStatusKey,
  formatRerunDateTime,
} from '../components/rerunJobPresentation';

const RerunManagementSection: React.FC<{
  token: string;
  userKey: string;
  org?: string;
  repositories: string[];
}> = ({ token, userKey, org, repositories }) => {
  const [community, setCommunity] = useState<string>();
  const [status, setStatus] = useState<string>();
  const [page, setPage] = useState(1);
  const query = useQuery({
    queryKey: [
      'issue-managed-reruns',
      userKey,
      repositories,
      org,
      community,
      status,
      page,
    ],
    queryFn: ({ signal }) =>
      fetchManagedIssueReruns(token, { org, community, status, page }, signal),
    refetchInterval: 30000,
    refetchIntervalInBackground: false,
    retry: false,
  });
  const columns: TableProps<ManagedIssueRerunJob>['columns'] = [
    {
      title: '仓库 / 报告周期',
      key: 'repo',
      width: '27%',
      render: (_, job) => (
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2 font-semibold text-slate-700">
            <span className="break-all">{job.community}</span>
          </div>
          <div className="flex flex-wrap items-center gap-1 text-xs text-slate-500">
            {job.period.replace('_to_', ' ~ ')}
          </div>
        </div>
      ),
    },
    {
      title: '涉及 Issue',
      key: 'issues',
      width: '24%',
      render: (_, job) => (
        <Tooltip title={job.issueNumbers.map((n) => `#${n}`).join('、')}>
          <div>
            <div className="mb-1 text-xs text-slate-600">
              {job.issueNumbers.length} 个 Issue
            </div>
            <div className="truncate text-xs text-slate-500">
              {job.issueNumbers
                .slice(0, 6)
                .map((n) => `#${n}`)
                .join('、')}
              {job.issueNumbers.length > 6
                ? ` 等 ${job.issueNumbers.length} 个`
                : ''}
            </div>
          </div>
        </Tooltip>
      ),
    },
    {
      title: '任务状态',
      key: 'status',
      width: '16%',
      render: (_, job) => {
        const meta = RERUN_STATUS_META[getRerunStatusKey(job)];
        return (
          <div>
            <span className={`${styles.status} ${meta.color}`}>
              <span className={styles.statusDot} />
              {meta.label}
            </span>
            {job.error ? (
              <Tooltip title={job.error}>
                <div className="mt-1 truncate text-xs text-rose-500">
                  {job.error}
                </div>
              </Tooltip>
            ) : null}
          </div>
        );
      },
    },
    { title: '提交人', dataIndex: 'operator', width: '10%', ellipsis: true },
    {
      title: '发起时间',
      key: 'createdAt',
      width: '14%',
      render: (_, job) => formatRerunDateTime(job.createdAt),
    },
    {
      title: '操作',
      key: 'action',
      width: '9%',
      render: (_, job) => (
        <a
          className={styles.reportLink}
          href={`/intelligent-analysis/experience/issue-contribution?${new URLSearchParams(
            {
              repo: job.community,
              period: job.period,
              platform: job.platform,
              ...(job.version ? { version: job.version } : {}),
            }
          )}`}
          target="_blank"
          rel="noreferrer"
        >
          查看报告
        </a>
      ),
    },
  ];
  return (
    <div className={`${styles.section} space-y-3`}>
      <div className={styles.toolbar}>
        <Select
          showSearch
          allowClear
          placeholder="全部可见仓库"
          aria-label="筛选仓库"
          className={styles.repoFilter}
          options={repositories.map((repo) => ({ label: repo, value: repo }))}
          value={community}
          onChange={(value) => {
            setCommunity(value);
            setPage(1);
          }}
        />
        <Select
          allowClear
          placeholder="全部状态"
          aria-label="筛选任务状态"
          className={styles.statusFilter}
          options={[...RERUN_STATUS_OPTIONS]}
          value={status}
          onChange={(value) => {
            setStatus(value);
            setPage(1);
          }}
        />
        <Button
          icon={<ReloadOutlined />}
          className={styles.refreshButton}
          loading={query.isFetching}
          onClick={() => void query.refetch()}
        >
          刷新
        </Button>
        <span className={styles.refreshHint}>
          优先展示各仓库最新报告的任务 · 每 30 秒刷新
        </span>
      </div>
      {query.error ? (
        <Alert
          type="error"
          showIcon
          message={
            query.error instanceof Error ? query.error.message : '任务加载失败'
          }
        />
      ) : null}
      <Table<ManagedIssueRerunJob>
        className={`overview-ant-table ${styles.taskTable}`}
        tableLayout="fixed"
        rowKey="jobId"
        columns={columns}
        dataSource={query.data?.items ?? []}
        loading={query.isLoading}
        size="small"
        pagination={{
          current: page,
          pageSize: 20,
          total: query.data?.total ?? 0,
          showSizeChanger: false,
          hideOnSinglePage: true,
          onChange: setPage,
        }}
        expandable={{
          columnWidth: 36,
          rowExpandable: (job) =>
            job.applyStatus === 'applied' && job.results.length > 0,
          expandedRowRender: (job) => (
            <div className={styles.expandedResults}>
              <RerunResultTable job={job} />
            </div>
          ),
        }}
      />
    </div>
  );
};
export default RerunManagementSection;
