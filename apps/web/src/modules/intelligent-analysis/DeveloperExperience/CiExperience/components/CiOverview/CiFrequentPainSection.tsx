import React from 'react';
import { Modal, Segmented, Table, Tooltip, Typography } from 'antd';
import type { TableProps } from 'antd';
import IssuePriorityTag from '../../../IssueContribution/components/IssueOverview/IssuePriorityTag';
import dynamic from 'next/dynamic';
import type { CiReportHref } from './CiIssueTable';
import type { CiTopIssue } from './communityMetrics';
import {
  buildCiFrequentPains,
  type CiFrequentPain,
  type CiPainView,
} from './frequentPainGroups';

const CiIssueTable = dynamic(() => import('./CiIssueTable'));

const CiFrequentPainSection: React.FC<{
  issues: CiTopIssue[];
  reportHref: CiReportHref;
}> = ({ issues, reportHref }) => {
  const [view, setView] = React.useState<CiPainView>('all');
  const [detailKey, setDetailKey] = React.useState<string | null>(null);
  const groups = React.useMemo(
    () => buildCiFrequentPains(issues, view),
    [issues, view]
  );
  const detail = groups.find((group) => group.key === detailKey);
  const countTitle =
    view === 'open'
      ? '未闭环问题数'
      : view === 'done'
      ? '已闭环问题数'
      : '问题数';
  const columns: TableProps<CiFrequentPain>['columns'] = [
    {
      title: '序号',
      width: '5%',
      align: 'center',
      render: (_value, _record, index) => (
        <span className="row-num">{index + 1}</span>
      ),
    },
    {
      title: '问题',
      dataIndex: 'title',
      width: '25%',
      align: 'center',
      ellipsis: true,
      render: (title: string, row) => (
        <Tooltip title={title} placement="topLeft">
          <button
            type="button"
            className="max-w-full truncate font-semibold text-[var(--overview-slateDark)] hover:text-[var(--overview-blue)]"
            onClick={() => setDetailKey(row.key)}
          >
            {title}
          </button>
        </Tooltip>
      ),
    },
    {
      title: '步骤',
      dataIndex: 'stages',
      width: '20%',
      ellipsis: true,
      render: (stages: string[]) => {
        const label = stages.join('、') || '跨段/未映射';
        return (
          <Tooltip title={label}>
            <span>{label}</span>
          </Tooltip>
        );
      },
    },
    {
      title: '维度',
      dataIndex: 'dimension',
      width: '12%',
      align: 'center',
      render: (dimension: string | null) => dimension || '—',
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      width: '13%',
      render: (priority: string) => <IssuePriorityTag priority={priority} />,
    },
    { title: '覆盖仓数', dataIndex: 'repoCount', width: '10%', align: 'right' },
    {
      title: countTitle,
      width: '15%',
      align: 'center',
      render: (_value, row) => (
        <button
          type="button"
          className="overview-table-link overview-table-link-strong"
          aria-label={`查看${row.title}的${countTitle}，${row.issues.length}项`}
          onClick={() => setDetailKey(row.key)}
        >
          {row.issues.length}
        </button>
      ),
    },
  ];
  return (
    <>
      <Typography.Title level={4} className="oj-section-title">
        TOP 问题
      </Typography.Title>
      <section
        id="ci-overview-issues"
        aria-label="高频问题 TOP5"
        className="section-card scroll-mt-5"
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-[16px] font-extrabold leading-6 text-[var(--overview-text)]">
            高频问题 TOP5
          </h3>
          <Segmented<CiPainView>
            className="overview-segmented"
            aria-label="高频问题处理状态"
            value={view}
            options={[
              { label: '全部', value: 'all' },
              { label: '未闭环', value: 'open' },
              { label: '已闭环', value: 'done' },
            ]}
            onChange={(next) => {
              setView(next);
              setDetailKey(null);
            }}
          />
        </div>
        <Table<CiFrequentPain>
          key={view}
          className="overview-ant-table"
          rowKey="key"
          columns={columns}
          dataSource={groups.slice(0, 5)}
          tableLayout="fixed"
          pagination={false}
          scroll={{ x: 970 }}
          locale={{ emptyText: '暂无匹配问题' }}
        />
      </section>
      <Modal
        open={!!detail}
        title={detail?.title || '问题详情'}
        footer={null}
        width={1080}
        destroyOnHidden
        onCancel={() => setDetailKey(null)}
      >
        {detail && (
          <CiIssueTable
            key={`${view}:${detail.key}`}
            issues={detail.issues}
            reportHref={reportHref}
          />
        )}
      </Modal>
    </>
  );
};

export default CiFrequentPainSection;
