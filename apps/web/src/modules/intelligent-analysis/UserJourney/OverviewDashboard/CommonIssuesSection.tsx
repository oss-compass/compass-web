import React from 'react';
import { Button, Table, Tag, Tooltip, Typography } from 'antd';
import type { TableProps } from 'antd';
import { STATUS_CFG } from './constants';
import { SeverityBadge } from './Badges';
import type { CommonIssueGroup } from './types';

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
      title: '阶段',
      dataIndex: 'journeyStage',
      key: 'journeyStage',
      width: 120,
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
      title: '类型',
      dataIndex: 'issueType',
      key: 'issueType',
      width: 120,
      ellipsis: true,
    },
    {
      title: '涉及仓库',
      key: 'repoCount',
      width: 120,
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
      width: 120,
      render: (_value, record) => <SeverityBadge severity={record.severity} />,
    },
    {
      title: '状态',
      key: 'status',
      width: 120,
      render: (_value, record) => (
        <Tag
          className="overview-ant-tag nowrap-tag"
          style={{
            background: STATUS_CFG[record.status].tagBg,
            color: STATUS_CFG[record.status].tagColor,
            borderColor: STATUS_CFG[record.status].tagBorder,
          }}
        >
          {STATUS_CFG[record.status].label}
        </Tag>
      ),
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
          scroll={{ x: 1050, y: 550 }}
          locale={{ emptyText: '暂无共性问题' }}
        />
      </div>
    </>
  );
};

export default CommonIssuesSection;
