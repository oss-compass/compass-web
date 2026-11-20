import React from 'react';
import Link from 'next/link';
import { FilterFilled } from '@ant-design/icons';
import { Descriptions, Modal, Table, Tag, Tooltip } from 'antd';
import type { TableProps } from 'antd';
import type { CiPri } from '../../types';
import { CI_OVERVIEW_STATUS_META } from './statusPresentation';
import type { CiTopIssue } from './communityMetrics';

export type CiReportHref = (repo: string, day?: string) => string;
export const CiPriorityTag: React.FC<{ pri: CiPri }> = ({ pri }) => (
  <Tag
    className="!mr-0"
    color={pri === 'P0' ? 'red' : pri === 'P1' ? 'orange' : 'default'}
  >
    {pri}
  </Tag>
);

const issueName = (issue: CiTopIssue) => issue.kb || issue.title;
const issueParty = (issue: CiTopIssue) =>
  issue.responsible_party?.trim() || '—';
const issuePerson = (issue: CiTopIssue) =>
  issue.responsible_person?.trim() || '—';
const issueStages = (issue: CiTopIssue) =>
  issue.journeyStages.length ? issue.journeyStages : ['跨段/未映射'];
const statusLabel = (status: string) =>
  CI_OVERVIEW_STATUS_META[status as CiTopIssue['status']].label;

const CiIssueTable: React.FC<{
  issues: CiTopIssue[];
  reportHref: CiReportHref;
}> = ({ issues, reportHref }) => {
  const [detail, setDetail] = React.useState<CiTopIssue | null>(null);
  const [activeFilters, setActiveFilters] = React.useState<
    Record<string, unknown[] | null>
  >({});
  const columnFilter = (
    key: string,
    title: string,
    getValues: (issue: CiTopIssue) => string[],
    label: (value: string) => string = (value) => value
  ) => ({
    key,
    title,
    filters: Array.from(new Set(issues.flatMap(getValues)))
      .sort((a, b) => a.localeCompare(b, 'zh-CN'))
      .map((value) => ({ text: label(value), value })),
    filterSearch: true,
    onFilter: (value: React.Key | boolean, issue: CiTopIssue) =>
      getValues(issue).includes(String(value)),
    filterDropdownProps: {
      children: (
        <button
          type="button"
          aria-label={`筛选${title}`}
          title={`筛选${title}`}
          aria-pressed={Boolean(activeFilters[key]?.length)}
          className="ml-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-200 hover:text-slate-700 aria-pressed:bg-blue-50 aria-pressed:text-blue-600"
        >
          <FilterFilled className="text-xs" />
        </button>
      ),
    },
  });
  const columns: TableProps<CiTopIssue>['columns'] = [
    {
      ...columnFilter('pri', '优先级', (issue) => [issue.pri]),
      dataIndex: 'pri',
      width: '10%',
      render: (pri: CiPri) => <CiPriorityTag pri={pri} />,
    },
    {
      ...columnFilter('problem', '问题', (issue) => [issueName(issue)]),
      render: (_value, issue) => (
        <Tooltip title={issue.title}>
          <button
            type="button"
            className="max-w-full break-words rounded-lg text-left text-sm font-medium text-slate-800 hover:text-blue-600"
            onClick={() => setDetail(issue)}
          >
            {issueName(issue)}
          </button>
        </Tooltip>
      ),
    },
    {
      ...columnFilter('slug', '仓库', (issue) => [issue.slug]),
      dataIndex: 'slug',
      width: '13%',
      render: (slug: string) => <span className="break-words">{slug}</span>,
    },
    {
      ...columnFilter('stages', '步骤', issueStages),
      width: '15%',
      render: (_value, issue) => issueStages(issue).join('、'),
    },
    {
      ...columnFilter('responsible_party', '责任方', (issue) => [
        issueParty(issue),
      ]),
      width: '13%',
      render: (_value, issue) => (
        <span className="break-words">{issueParty(issue)}</span>
      ),
    },
    {
      ...columnFilter('responsible_person', '责任人', (issue) => [
        issuePerson(issue),
      ]),
      width: '11%',
      render: (_value, issue) => (
        <span className="break-words">{issuePerson(issue)}</span>
      ),
    },
    {
      ...columnFilter(
        'status',
        '处理状态',
        (issue) => [issue.status],
        statusLabel
      ),
      dataIndex: 'status',
      width: '13%',
      render: (status: CiTopIssue['status']) => (
        <Tag color={CI_OVERVIEW_STATUS_META[status].color}>
          {CI_OVERVIEW_STATUS_META[status].label}
        </Tag>
      ),
    },
    {
      title: '报告',
      key: 'report',
      width: '10%',
      render: (_value, issue) => (
        <Link
          href={reportHref(issue.repo, issue.day)}
          className="overview-table-link"
        >
          查看报告
        </Link>
      ),
    },
  ];
  return (
    <>
      <Table<CiTopIssue>
        className="overview-ant-table ci-issue-table"
        rowKey="key"
        tableLayout="fixed"
        columns={columns}
        dataSource={issues}
        onChange={(_pagination, filters) => setActiveFilters(filters)}
        pagination={{
          pageSize: 12,
          showSizeChanger: false,
          hideOnSinglePage: true,
          showTotal: (total) => `共 ${total} 项`,
        }}
        scroll={{
          x: 760,
          y: 'min(calc(100dvh - 176px), 800px)',
          scrollToFirstRowOnChange: true,
        }}
        locale={{
          emptyText: '暂无匹配的痛点问题',
          filterConfirm: '确定',
          filterReset: '重置',
          filterEmptyText: '暂无筛选项',
          filterSearchPlaceholder: '搜索筛选项',
        }}
      />
      <Modal
        open={!!detail}
        title={detail?.kb || '痛点详情'}
        onCancel={() => setDetail(null)}
        footer={null}
        width={760}
        destroyOnClose
      >
        {detail && (
          <div className="space-y-5 pt-2 text-sm text-slate-700">
            <p className="whitespace-pre-wrap break-words leading-7">
              {detail.title}
            </p>
            <Descriptions column={2} size="small">
              <Descriptions.Item label="仓库">{detail.slug}</Descriptions.Item>
              <Descriptions.Item label="报告日期">
                {detail.day}
              </Descriptions.Item>
              <Descriptions.Item label="优先级">
                <CiPriorityTag pri={detail.pri} />
              </Descriptions.Item>
              <Descriptions.Item label="处理状态">
                {CI_OVERVIEW_STATUS_META[detail.status].label}
              </Descriptions.Item>
              <Descriptions.Item label="维度">
                {detail.dim || '—'}
              </Descriptions.Item>
              <Descriptions.Item label="步骤">
                {issueStages(detail).join('、')}
              </Descriptions.Item>
              <Descriptions.Item label="责任方">
                {issueParty(detail)}
              </Descriptions.Item>
              <Descriptions.Item label="责任人">
                {issuePerson(detail)}
              </Descriptions.Item>
              <Descriptions.Item label="涉及 run">
                {detail.impact.runs ?? '—'}
              </Descriptions.Item>
              <Descriptions.Item label="涉及 PR">
                {detail.impact.prs ?? '—'}
              </Descriptions.Item>
            </Descriptions>
            <Link
              href={reportHref(detail.repo, detail.day)}
              className="overview-table-link"
            >
              查看报告及处理记录
            </Link>
          </div>
        )}
      </Modal>
    </>
  );
};

export const CiIssueListModal: React.FC<{
  title?: string;
  issues?: CiTopIssue[];
  reportHref: CiReportHref;
  onClose: () => void;
}> = ({ title, issues, reportHref, onClose }) => (
  <Modal
    open={Boolean(issues)}
    title={title}
    onCancel={onClose}
    footer={null}
    width="min(96vw, 1480px)"
    centered
    destroyOnHidden
  >
    {issues && <CiIssueTable issues={issues} reportHref={reportHref} />}
  </Modal>
);
