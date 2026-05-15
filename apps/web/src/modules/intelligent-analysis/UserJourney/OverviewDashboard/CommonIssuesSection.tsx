import React from 'react';
import { Button, Table, Tooltip, Typography } from 'antd';
import type { TableProps } from 'antd';
import { SeverityBadge } from './Badges';
import type { CommonIssueGroup } from './types';
import { formatPercent } from './utils';

const { Title } = Typography;

type CommonIssuesSectionProps = {
  commonIssues: CommonIssueGroup[];
  onOpenIssueModal: (title: string, items: CommonIssueGroup['items']) => void;
};

const CommonIssuesSection: React.FC<CommonIssuesSectionProps> = ({
  commonIssues,
  onOpenIssueModal,
}) => {
  const columns: TableProps<CommonIssueGroup>['columns'] = [
    {
      title: '序号',
      key: 'index',
      width: 72,
      render: (_value, _record, index) => (
        <span className="row-num">{index + 1}</span>
      ),
    },
    {
      title: '类型',
      dataIndex: 'issueType',
      key: 'issueType',
      width: 110,
      responsive: ['sm'],
      ellipsis: true,
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
      render: (value: string) => (
        <Tooltip title={value}>
          <span>{value}</span>
        </Tooltip>
      ),
    },
    {
      title: '涉及阶段',
      key: 'journeyStages',
      width: 150,
      responsive: ['lg'],
      ellipsis: true,
      render: (_value, record) => {
        const stages = record.journeyStages ?? [];
        const label = stages.length ? stages.join('、') : '--';
        return (
          <Tooltip title={label}>
            <span>{label}</span>
          </Tooltip>
        );
      },
    },
    {
      title: '涉及仓库',
      key: 'repoCount',
      width: 96,
      render: (_value, record) => (
        <Button
          type="link"
          className="overview-table-link"
          onClick={() =>
            onOpenIssueModal(`共性问题 · ${record.description}`, record.items)
          }
        >
          {record.repoCount}
        </Button>
      ),
    },
    {
      title: '严重程度',
      key: 'severity',
      width: 96,
      responsive: ['md'],
      render: (_value, record) => <SeverityBadge severity={record.severity} />,
    },
    {
      title: '闭环率',
      key: 'closeRate',
      width: 88,
      responsive: ['md'],
      render: (_value, record) => {
        const total = record.items.length;
        const resolved = record.items.filter(
          (item) =>
            item.normalizedStatus === 'resolved' ||
            item.normalizedStatus === 'na'
        ).length;
        const rate =
          total > 0 ? Number(((resolved / total) * 100).toFixed(1)) : null;
        return <span>{formatPercent(rate)}</span>;
      },
    },
  ];

  return (
    <>
      <Title level={4} className="oj-section-title">
        共性问题统计
      </Title>
      <div className="section-card">
        <Table<CommonIssueGroup>
          className="overview-ant-table"
          dataSource={commonIssues}
          columns={columns}
          rowKey="key"
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
          }}
          scroll={{ x: 860, y: 550 }}
          locale={{ emptyText: '暂无共性问题' }}
        />
      </div>
    </>
  );
};

export default CommonIssuesSection;
