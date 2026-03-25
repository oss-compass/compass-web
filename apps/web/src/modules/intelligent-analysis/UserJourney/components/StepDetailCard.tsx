import React from 'react';
import { Card, Popover, Tooltip, Typography } from 'antd';
import { ArrowRightOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import KeyActionsSection from './KeyActionsSection';
import MetricTrendChart from './MetricTrendChart';
import PainGuidePopoverContent from './PainGuidePopoverContent';
import { ActionDetailRecord, JourneyStep, StepMetric } from '../types';
import { getPainClasses } from '../helpers';

const { Text, Title } = Typography;

type StepDetailCardProps = {
  currentStep: JourneyStep;
  keyMetrics: StepMetric[];
  painNarrative: string;
  executionPathItems: ActionDetailRecord[];
  keyTools: string[];
  detailReportUrl?: string;
  agentVersion: string;
};

const StepDetailCard: React.FC<StepDetailCardProps> = ({
  currentStep,
  keyMetrics,
  painNarrative,
  executionPathItems,
  keyTools,
  detailReportUrl,
  agentVersion,
}) => {
  return (
    <Card
      bordered={false}
      className="h-full w-full min-w-0 rounded-3xl border border-white/80 bg-white/90 shadow-[0_24px_70px_rgba(15,23,42,0.08)]"
      bodyStyle={{ padding: 24 }}
    >
      <div className="mb-5">
        <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
          <div className="text-xl font-semibold text-slate-900">开发旅程</div>
          {detailReportUrl ? (
            <a
              href={detailReportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 inline-flex items-center gap-1 text-sm font-semibold text-[#1677ff] hover:underline"
            >
              查看详细报告
              <ArrowRightOutlined />
            </a>
          ) : null}
        </div>
      </div>

      <div className="rounded-[28px] border border-slate-200/80 bg-[linear-gradient(180deg,#fbfdff_0%,#f8fbff_100%)] p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)]">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div className="flex items-start gap-4">
            <div
              className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl text-xl"
              style={{
                color: currentStep.color,
                background: `${currentStep.color}12`,
              }}
            >
              {currentStep.icon}
            </div>
            <div>
              <Title level={4} style={{ marginTop: 0, marginBottom: 0 }}>
                {currentStep.title}
              </Title>
              <Text className="text-sm leading-6 text-slate-500">
                {currentStep.description}
              </Text>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-fuchsia-300 bg-[linear-gradient(180deg,#fdf4ff_0%,#fae8ff_100%)] px-3.5 py-1.5 text-sm font-semibold text-fuchsia-700">
              <span className="text-fuchsia-700">得分</span>
              <span className="text-base leading-none text-fuchsia-900">
                {currentStep.score}
              </span>
            </span>
            <Popover
              title={
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    痛点等级说明
                  </div>
                </div>
              }
              content={
                <PainGuidePopoverContent
                  currentPainLevel={currentStep.painLevel}
                  currentColor={currentStep.color}
                />
              }
              placement="bottomRight"
              trigger="hover"
              overlayStyle={{
                maxWidth: 'min(760px, calc(100vw - 32px))',
              }}
            >
              <button
                type="button"
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-semibold ${getPainClasses(
                  currentStep.painLevel
                )}`}
                aria-label="查看痛点等级说明"
              >
                <span>
                  {currentStep.painLevel} · {currentStep.painLabel}
                </span>
                <QuestionCircleOutlined className="text-[13px]" />
              </button>
            </Popover>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-600">
              耗时占比 {currentStep.timeShare}
            </span>
          </div>
        </div>

        <div className="mt-6">
          <div className="text-base font-semibold text-slate-900">痛点分析</div>
          <div className="mt-4 rounded-[24px] border border-amber-200/70 bg-[linear-gradient(180deg,#fffdf7_0%,#fff7ed_100%)] px-5 py-4 shadow-[0_10px_24px_rgba(245,158,11,0.08)]">
            <div className="text-[15px] font-medium leading-7 text-slate-700">
              {painNarrative || currentStep.painSummary}
            </div>
          </div>
        </div>

        <KeyActionsSection
          currentStepKey={currentStep.key}
          currentStepColor={currentStep.color}
          executionPathItems={executionPathItems}
        />

        <div className="mt-6">
          <div className="text-base font-semibold text-slate-900">
            典型命令 / 工具
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {keyTools.map((tool) => (
              <span
                key={tool}
                className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 shadow-[0_8px_16px_rgba(15,23,42,0.03)]"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <div className="text-base font-semibold text-slate-900">关键指标</div>
          <div className="mt-3 flex items-stretch gap-3 overflow-x-auto pb-1">
            {keyMetrics.map((metric) => (
              <div
                key={`${currentStep.key}-${metric.label}`}
                className="min-w-[280px] flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-[0_10px_20px_rgba(15,23,42,0.04)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0 text-[15px] font-semibold text-slate-800">
                    {metric.label}
                  </div>
                  <div className="flex-shrink-0 text-[15px] font-semibold leading-none text-slate-900">
                    {metric.value}
                  </div>
                </div>
                {metric.trend ? (
                  <MetricTrendChart trend={metric.trend} tone={metric.tone} />
                ) : (
                  <div className="mt-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 px-3 py-4 text-center text-xs text-slate-400">
                    趋势数据待补充
                  </div>
                )}
                <Tooltip title={metric.note}>
                  <div className="mt-3 truncate text-[13px] leading-5 text-slate-500">
                    {metric.note}
                  </div>
                </Tooltip>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-400">
          <span>Powered by</span>
          <img
            src="/images/logos/compass-logo.svg"
            alt=""
            aria-hidden="true"
            className="h-4 w-auto shrink-0"
          />
          <span>{agentVersion}</span>
        </div>
      </div>
    </Card>
  );
};

export default StepDetailCard;
