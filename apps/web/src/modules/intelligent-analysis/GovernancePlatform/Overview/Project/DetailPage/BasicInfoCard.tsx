import React from 'react';
import { Card, Typography, Space, Statistic, Descriptions, Tag } from 'antd';
import {
  EnvironmentOutlined,
  TrophyOutlined,
  GlobalOutlined,
  CodeOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'next-i18next';
import { DeveloperData } from '../../types';
import { translateByLocale, countryMapping } from '../utils/countryMapping';
import { getDisplayUserId } from '../utils/getDisplayUserId';

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

// 渲染技术栈
const renderTechStack = (techStack?: string | string[]) => {
  if (!techStack) {
    return <Tag color="default">算子库</Tag>;
  }

  if (Array.isArray(techStack)) {
    return techStack.length > 0 ? (
      <>
        {techStack.map((tech, index) => (
          <Tag key={index} color="blue">
            {tech}
          </Tag>
        ))}
      </>
    ) : (
      <Tag color="default">算子库</Tag>
    );
  }

  return <Tag color="blue">{techStack}</Tag>;
};

const BasicInfoCard: React.FC<BasicInfoCardProps> = ({ data, totalScore }) => {
  const { t, i18n } = useTranslation('intelligent_analysis');
  const isDeveloper = data.用户类型 === '开发者';
  const displayId = getDisplayUserId(data);

  return (
    <Card className="mb-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <Title level={2} className="mb-2">
            {isDeveloper ? (
              <a
                href={`/developer/${encodeURIComponent(displayId)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {displayId}
              </a>
            ) : (
              displayId
            )}
          </Title>
          <Space size="middle">{renderUserTypeTag(data.用户类型, t)}</Space>
        </div>
        <div className="text-right">
          <Statistic
            title={t('project_detail.basic_info.total_score')}
            value={totalScore || data.总得分}
            precision={2}
            valueStyle={{
              color: '#cf1322',
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
            <Text strong>
              {t('project_detail.basic_info.rank_position', {
                rank: data.排名,
              })}
            </Text>
          </Space>
        </Descriptions.Item>
        {/* 空占位，强制技术栈换行 */}
        <Descriptions.Item label={null} className="!border-0 !p-0">
          {''}
        </Descriptions.Item>
        <Descriptions.Item label="参与技术栈" span={3}>
          <Space>
            <CodeOutlined />
            <div className="flex flex-wrap gap-1">
              {renderTechStack(data.技术栈)}
            </div>
          </Space>
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default BasicInfoCard;
