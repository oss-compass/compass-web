import React from 'react';
import { Card, Col, Descriptions, Row, Tooltip, Typography } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import JourneyPanoramaSection from './JourneyPanoramaSection';
import {
  JourneyRecommendation,
  JourneyStep,
  OverviewMetric,
  ReportMetadataItem,
} from '../types';

const { Text } = Typography;

type ReportSummaryCardProps = {
  projectName: string;
  reportMetadata: ReportMetadataItem[];
  overviewMetrics: OverviewMetric[];
  recommendations: JourneyRecommendation[];
  journeySteps: JourneyStep[];
  reportUpdatedAt: string;
  detailReportUrl?: string;
  projectVersion?: string;
};

const ReportSummaryCard: React.FC<ReportSummaryCardProps> = ({
  projectName,
  reportMetadata,
  overviewMetrics,
  recommendations,
  journeySteps,
  reportUpdatedAt,
  detailReportUrl,
  projectVersion,
}) => {
  const metadataItems =
    detailReportUrl && projectVersion
      ? [
          ...reportMetadata,
          {
            key: 'detail-report-link',
            label: '详细报告',
            value: projectVersion,
            tone: 'mono' as const,
            href: detailReportUrl,
          },
        ]
      : reportMetadata;

  return (
    <Card
      bordered={false}
      className="rounded-3xl border border-white/80 bg-white/90 shadow-[0_24px_70px_rgba(15,23,42,0.08)]"
      bodyStyle={{ padding: 24 }}
    >
      <div>
        <div className="mb-3 flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
          <div className="text-xl font-semibold text-slate-900">报告元数据</div>
          <Text className="text-xs font-medium text-slate-400">
            更新于：{reportUpdatedAt}
          </Text>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-4 py-3 shadow-[0_10px_20px_rgba(15,23,42,0.04)]">
          <Descriptions
            size="small"
            column={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 3 }}
            colon
            labelStyle={{ width: '80px' }}
            className="[&_.ant-descriptions-item-content]:!whitespace-normal [&_.ant-descriptions-item-content]:!align-top [&_.ant-descriptions-item-content]:!leading-6 [&_.ant-descriptions-item-content]:!text-slate-700 [&_.ant-descriptions-item-label]:!align-top [&_.ant-descriptions-item-label]:!text-xs [&_.ant-descriptions-item-label]:!font-medium [&_.ant-descriptions-item-label]:!leading-6 [&_.ant-descriptions-item-label]:!text-slate-400 [&_.ant-descriptions-item]:!pb-1"
            items={metadataItems.map((item) => ({
              key: item.key,
              label: item.label,
              children: item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block whitespace-normal break-words text-sm leading-6 text-[#1677ff] hover:underline ${
                    item.tone === 'mono' ? 'font-mono' : 'font-medium'
                  }`}
                >
                  {item.value}
                </a>
              ) : (
                <Tooltip title={item.value}>
                  <span
                    className={`block whitespace-normal break-words text-sm leading-6 ${
                      item.tone === 'mono' ? 'font-mono' : 'font-medium'
                    }`}
                  >
                    {item.value}
                  </span>
                </Tooltip>
              ),
            }))}
          />
        </div>
      </div>

      <div className="mt-3 border-slate-100 pt-3">
        <div className="mb-2 text-xl font-semibold text-slate-900">
          指标概览
        </div>
        <Row gutter={[16, 16]} className="mt-5">
          {overviewMetrics.map((metric) => (
            <Col xs={24} md={12} xl={6} key={metric.key}>
              <Card
                bordered
                className="h-full rounded-3xl border-slate-200 shadow-[0_18px_40px_rgba(15,23,42,0.06)]"
                bodyStyle={{ padding: 22 }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                      <span>{metric.title}</span>
                      <Tooltip title={metric.description}>
                        <InfoCircleOutlined className="cursor-help text-slate-400" />
                      </Tooltip>
                    </div>
                    <div className="mt-3 flex items-end gap-2">
                      <span className="text-[34px] font-semibold leading-none text-slate-900">
                        {metric.value}
                      </span>
                      {metric.suffix ? (
                        <span className="text-sm font-medium text-slate-500">
                          {metric.suffix}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  {metric.recentValues ? (
                    <span className="max-w-[150px] text-right text-[11px] leading-5 text-slate-400">
                      {metric.recentValues}
                    </span>
                  ) : null}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <JourneyPanoramaSection
        projectName={projectName}
        recommendations={recommendations}
        steps={journeySteps}
      />
    </Card>
  );
};

export default ReportSummaryCard;
