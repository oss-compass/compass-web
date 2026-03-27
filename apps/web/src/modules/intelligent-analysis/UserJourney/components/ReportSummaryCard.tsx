import React from 'react';
import { Card, Descriptions, Popover, Tooltip, Typography } from 'antd';
import { InfoCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import ExperienceGradePopoverContent from './ExperienceGradePopoverContent';
import JourneyPanoramaSection from './JourneyPanoramaSection';
import {
  getExperienceGradeFromScore,
  getExperienceGradeGuideItem,
} from '../helpers';
import {
  JourneyRecommendation,
  JourneyStep,
  OverviewMetric,
  ReportMetadataItem,
} from '../types';

const { Text } = Typography;

const isOverallScoreMetric = (metric: OverviewMetric) =>
  metric.key === 'overall-score' || metric.key === 'overall-composite-score';

const renderMetricRecentValue = (metric: OverviewMetric) => {
  if (!metric.recentValues) {
    return null;
  }

  if (!isOverallScoreMetric(metric)) {
    return (
      <span className="shrink-0 text-right text-[11px] leading-5 text-slate-400">
        {metric.recentValues}
      </span>
    );
  }

  const score = Number(metric.value);

  if (!Number.isFinite(score)) {
    return (
      <span className="shrink-0 text-right text-[11px] leading-5 text-slate-400">
        {metric.recentValues}
      </span>
    );
  }

  const currentGrade = getExperienceGradeFromScore(score);
  const currentGradeItem = getExperienceGradeGuideItem(currentGrade);

  return (
    <Popover
      title={
        <div className="text-sm font-semibold text-slate-900">
          综合体验评级说明
        </div>
      }
      content={<ExperienceGradePopoverContent currentGrade={currentGrade} />}
      placement="bottomRight"
      trigger="hover"
      overlayStyle={{
        maxWidth: 'min(960px, calc(100vw - 32px))',
      }}
    >
      <button
        type="button"
        className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[11px] font-medium leading-4 transition-colors ${currentGradeItem.badgeClassName}`}
        aria-label="查看综合体验评级说明"
      >
        <span>{metric.recentValues}</span>
        <QuestionCircleOutlined className="text-[12px]" />
      </button>
    </Popover>
  );
};

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
      <div className="flex flex-col gap-5 >lg:flex-row >lg:items-stretch">
        {/* ── 左侧：指标概览（50%）── */}
        <div className="flex w-full flex-col >lg:w-1/2">
          <div className="mb-2 text-base font-semibold text-slate-800">
            报告概览
          </div>
          <div className="grid flex-1 grid-cols-2 gap-4">
            {overviewMetrics.map((metric) => (
              <div
                key={metric.key}
                className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-3 shadow-[0_12px_32px_rgba(15,23,42,0.05)]"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-1.5 text-sm font-medium text-slate-500">
                    <span className="truncate">{metric.title}</span>
                    <Tooltip title={metric.description}>
                      <InfoCircleOutlined className="shrink-0 cursor-help text-slate-400" />
                    </Tooltip>
                  </div>
                  {renderMetricRecentValue(metric)}
                </div>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <div className="text-2xl font-semibold leading-none text-slate-900">
                    {metric.value}
                  </div>
                  {metric.suffix ? (
                    <div className="text-sm font-medium text-slate-500">
                      {metric.suffix}
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 右侧：报告元数据（50%）── */}
        <div className="flex w-full flex-col >lg:w-1/2">
          {/* 标题行 */}
          <div className="mb-2 flex items-center justify-between">
            <div className="text-base font-semibold text-slate-800">
              报告元数据
            </div>
            <Text className="whitespace-nowrap text-xs text-slate-400">
              更新于：{reportUpdatedAt}
            </Text>
          </div>
          {/* 内容区 */}
          <div className="flex flex-1 flex-col rounded-2xl border border-slate-200/80 bg-white/90 px-6 py-6 shadow-[0_12px_32px_rgba(15,23,42,0.05)]">
            <Descriptions
              size="small"
              column={2}
              colon
              labelStyle={{ whiteSpace: 'nowrap', flexShrink: 0 }}
              className="[&_.ant-descriptions-item-content]:!overflow-hidden [&_.ant-descriptions-item-content]:!whitespace-nowrap [&_.ant-descriptions-item-content]:!align-middle [&_.ant-descriptions-item-content]:!text-[15px] [&_.ant-descriptions-item-content]:!leading-10 [&_.ant-descriptions-item-content]:!text-slate-700 [&_.ant-descriptions-item-label]:!align-middle [&_.ant-descriptions-item-label]:!text-sm [&_.ant-descriptions-item-label]:!font-medium [&_.ant-descriptions-item-label]:!leading-10 [&_.ant-descriptions-item-label]:!text-slate-400 [&_.ant-descriptions-item]:!pb-1"
              items={metadataItems.map((item) => ({
                key: item.key,
                label: item.label,
                children: item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block truncate text-[15px] leading-10 text-[#1677ff] hover:underline ${
                      item.tone === 'mono' ? 'font-mono' : 'font-medium'
                    }`}
                  >
                    {item.value}
                  </a>
                ) : (
                  <Tooltip title={item.value}>
                    <span
                      className={`block truncate text-[15px] leading-10 ${
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
