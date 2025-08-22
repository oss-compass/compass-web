import React from 'react';
import { Card, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'next-i18next';
import { translateByLocale, ecosystemMapping } from '../utils/countryMapping';

const { Text } = Typography;

// 生态得分类型
interface EcosystemScore {
  生态: string;
  生态年均分: number;
  '2024 年得分': number;
  '2025 年得分': number;
}

interface EcosystemOverviewProps {
  data: EcosystemScore[];
}

const EcosystemOverview: React.FC<EcosystemOverviewProps> = ({ data }) => {
  const { t, i18n } = useTranslation('intelligent_analysis');

  // 生态得分表格列定义
  const columns: ColumnsType<EcosystemScore> = [
    {
      title: t('project_detail.ecosystem.ecosystem'),
      dataIndex: '生态',
      key: '生态',
      render: (text: string) => (
        <Text strong>{translateByLocale(text, ecosystemMapping, i18n.language)}</Text>
      ),
    },
    {
      title: t('project_detail.ecosystem.annual_average_score'),
      dataIndex: '生态年均分',
      key: '生态年均分',
      render: (score: number) => (
        <Text
          type={score >= 70 ? 'success' : score >= 50 ? 'warning' : 'danger'}
        >
          {score?.toFixed(2) || '0.00'}
        </Text>
      ),
      sorter: (a, b) => a.生态年均分 - b.生态年均分,
    },
    {
      title: t('project_detail.ecosystem.score_2024'),
      dataIndex: '2024 年得分',
      key: '2024 年得分',
      render: (score: number) =>
        score > 0 ? (
          <Text
            type={score >= 70 ? 'success' : score >= 50 ? 'warning' : 'danger'}
          >
            {score?.toFixed(2) || '0.00'}
          </Text>
        ) : (
          <Text type="secondary">-</Text>
        ),
    },
    {
      title: t('project_detail.ecosystem.score_2025'),
      dataIndex: '2025 年得分',
      key: '2025 年得分',
      render: (score: number) =>
        score > 0 ? (
          <Text
            type={score >= 70 ? 'success' : score >= 50 ? 'warning' : 'danger'}
          >
            {score?.toFixed(2) || '0.00'}
          </Text>
        ) : (
          <Text type="secondary">-</Text>
        ),
    },
  ];

  return (
    <Card title={t('project_detail.ecosystem.title')} className="mb-6">
      <Table
        columns={columns}
        dataSource={data}
        rowKey="生态"
        pagination={false}
        size="middle"
      />
    </Card>
  );
};

export default EcosystemOverview;
