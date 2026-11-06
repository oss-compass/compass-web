import React from 'react';
import Link from 'next/link';
import { Descriptions, Modal, Table, Tag, Tooltip } from 'antd';
import type { TableProps } from 'antd';
import type { CiPri } from '../../types';
import { STATUS_META } from '../PainTracking/model';
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

const CiIssueTable: React.FC<{
  issues: CiTopIssue[];
  reportHref: CiReportHref;
}> = ({ issues, reportHref }) => {
  const [detail, setDetail] = React.useState<CiTopIssue | null>(null);
  const columns: TableProps<CiTopIssue>['columns'] = [
    {
      title: '优先级',
      dataIndex: 'pri',
      width: 88,
      render: (pri: CiPri) => <CiPriorityTag pri={pri} />,
    },
    {
      title: '问题',
      key: 'problem',
      render: (_value, issue) => (
        <Tooltip title={issue.title}>
          <button
            type="button"
            className="text-left text-sm font-medium text-slate-800 hover:text-blue-600"
            onClick={() => setDetail(issue)}
          >
            {issue.kb || issue.title}
          </button>
        </Tooltip>
      ),
    },
    { title: '仓库', dataIndex: 'slug', width: 140, ellipsis: true },
    {
      title: '步骤',
      key: 'stages',
      width: 170,
      render: (_value, issue) => issue.journeyStages.join('、'),
    },
    {
      title: '处理状态',
      dataIndex: 'status',
      width: 155,
      render: (status: CiTopIssue['status']) => (
        <Tag color={STATUS_META[status].color}>{STATUS_META[status].label}</Tag>
      ),
    },
    {
      title: '报告',
      key: 'report',
      width: 100,
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
        columns={columns}
        dataSource={issues}
        pagination={{
          pageSize: 10,
          showSizeChanger: false,
          hideOnSinglePage: true,
          showTotal: (total) => `共 ${total} 项`,
        }}
        scroll={{ x: 930 }}
        locale={{ emptyText: '暂无匹配的痛点问题' }}
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
                {STATUS_META[detail.status].label}
              </Descriptions.Item>
              <Descriptions.Item label="维度">
                {detail.dim || '—'}
              </Descriptions.Item>
              <Descriptions.Item label="步骤">
                {detail.journeyStages.join('、')}
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
export default CiIssueTable;
