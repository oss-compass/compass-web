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
      <div className=">lg:flex-row >lg:items-start flex flex-col gap-5">
        {/* ── 左侧：报告元数据 ── */}
        <div className=">lg:w-[38%] >lg:shrink-0 flex flex-col">
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
          <div className="flex-1 rounded-2xl border border-slate-100 bg-slate-50/60 px-4 py-3">
            <Descriptions
              size="small"
              column={2}
              colon
              labelStyle={{ width: '70px', whiteSpace: 'nowrap' }}
              className="[&_.ant-descriptions-item-content]:!overflow-hidden [&_.ant-descriptions-item-content]:!whitespace-nowrap [&_.ant-descriptions-item-content]:!align-top [&_.ant-descriptions-item-content]:!text-sm [&_.ant-descriptions-item-content]:!leading-6 [&_.ant-descriptions-item-content]:!text-slate-700 [&_.ant-descriptions-item-label]:!align-top [&_.ant-descriptions-item-label]:!text-xs [&_.ant-descriptions-item-label]:!font-medium [&_.ant-descriptions-item-label]:!leading-6 [&_.ant-descriptions-item-label]:!text-slate-400 [&_.ant-descriptions-item]:!pb-1.5"
              items={metadataItems.map((item) => ({
                key: item.key,
                label: item.label,
                children: item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block truncate text-sm leading-6 text-[#1677ff] hover:underline ${
                      item.tone === 'mono' ? 'font-mono' : 'font-medium'
                    }`}
                  >
                    {item.value}
                  </a>
                ) : (
                  <Tooltip title={item.value}>
                    <span
                      className={`block truncate text-sm leading-6 ${
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

        {/* ── 分隔线（仅大屏竖线）── */}
        <div className=">lg:block >lg:mx-2 >lg:w-px >lg:bg-slate-100 hidden" />

        {/* ── 右侧：指标概览 ── */}
        <div className=">lg:self-start flex min-w-0 flex-1 flex-col">
          <div className="mb-2 text-base font-semibold text-slate-800">
            指标概览
          </div>
          <div className=">sm:grid-cols-4 grid grid-cols-2 gap-3">
            {overviewMetrics.map((metric) => (
              <div
                key={metric.key}
                className="flex min-h-[112px] w-full flex-col justify-between rounded-2xl border border-slate-100 bg-slate-50/60 p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-1.5 text-sm font-medium text-slate-500">
                    <span className="truncate">{metric.title}</span>
                    <Tooltip title={metric.description}>
                      <InfoCircleOutlined className="shrink-0 cursor-help text-slate-400" />
                    </Tooltip>
                  </div>
                  {renderMetricRecentValue(metric)}
                </div>
                <div className="flex items-end gap-1.5">
                  <span className="text-[28px] font-semibold leading-none text-slate-900">
                    {metric.value}
                  </span>
                  {metric.suffix ? (
                    <span className="mb-0.5 text-sm font-medium text-slate-500">
                      {metric.suffix}
                    </span>
                  ) : null}
                </div>
              </div>
            ))}
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
