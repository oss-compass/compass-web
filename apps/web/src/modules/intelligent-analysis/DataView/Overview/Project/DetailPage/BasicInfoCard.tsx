import React from 'react';
import { Card, Typography, Space, Statistic, Descriptions, Tag } from 'antd';
import {
  EnvironmentOutlined,
  TrophyOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'next-i18next';
import { DeveloperData } from '../../types';
import { translateByLocale, countryMapping } from '../utils/countryMapping';

const { Title, Text } = Typography;

interface BasicInfoCardProps {
  data: DeveloperData;
  totalScore?: number;
}

// 渲染用户类型标签
const renderUserTypeTag = (type: string, t: (key: string) => string) => {
  return type === '组织' ? (
    <Tag color="blue" icon={<GlobalOutlined />}>
      {t('project_detail.basic_info.organization')}
    </Tag>
  ) : (
    <Tag color="green" icon={<EnvironmentOutlined />}>
      {t('project_detail.basic_info.developer')}
    </Tag>
  );
};

const BasicInfoCard: React.FC<BasicInfoCardProps> = ({ data, totalScore }) => {
  const { t, i18n } = useTranslation('intelligent_analysis');

  return (
    <Card className="mb-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <Title level={2} className="mb-2">
            {data.用户ID}
          </Title>
          <Space size="middle">{renderUserTypeTag(data.用户类型, t)}</Space>
        </div>
        <div className="text-right">
          <Statistic
            title={t('project_detail.basic_info.total_score')}
            value={totalScore || data.总得分}
            precision={2}
            valueStyle={{
              color:
                (totalScore || data.总得分) >= 70
                  ? '#3f8600'
                  : (totalScore || data.总得分) >= 50
                    ? '#cf1322'
                    : '#8c8c8c',
            }}
          />
        </div>
      </div>

      <Descriptions bordered column={3}>
        <Descriptions.Item label={t('project_detail.basic_info.location')}>
          <Space>
            <EnvironmentOutlined />
            <Text>
              {translateByLocale(data.国家, countryMapping, i18n.language)}
            </Text>
          </Space>
        </Descriptions.Item>
        <Descriptions.Item label={t('project_detail.basic_info.global_rank')}>
          <Space>
            <TrophyOutlined style={{ color: '#1890ff' }} />
            <Text strong>{t('project_detail.basic_info.rank_position', { rank: data.排名 })}</Text>
          </Space>
        </Descriptions.Item>
        {/* <Descriptions.Item label={t('project_detail.basic_info.country_rank', { country: translateByLocale(data.国家, countryMapping, i18n.language) })}>
          <Space>
            <TrophyOutlined style={{ color: '#52c41a' }} />
            <Text strong>{t('project_detail.basic_info.rank_position', { rank: data.排名 })}</Text>
          </Space>
        </Descriptions.Item> */}
      </Descriptions>
    </Card>
  );
};

export default BasicInfoCard;
