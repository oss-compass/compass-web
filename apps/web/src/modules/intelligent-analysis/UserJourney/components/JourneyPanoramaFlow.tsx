import React from 'react';
import {
  ArrowRightOutlined,
  CheckCircleFilled,
  ExclamationCircleFilled,
  SmileFilled,
} from '@ant-design/icons';
import { Popover, Tooltip } from 'antd';
import { getPainGuideItem, getPainLevelFromScore } from '../helpers';
import { JourneyStep } from '../types';
import PainGuidePopoverContent from './PainGuidePopoverContent';

const getStarText = (score: number) => {
  const filled = Math.max(0, Math.min(5, Math.round(score / 20)));
  return `${'★'.repeat(filled)}${'☆'.repeat(5 - filled)}`;
};

const getCompactResult = (step: JourneyStep) => {
  return (
    step.summary ||
    step.painPoints?.[0] ||
    step.painSummary ||
    step.description ||
    ''
  );
};

type StepNodeProps = {
  step: JourneyStep;
  recCount: number;
  isActive: boolean;
  onRecTagClick: (stepCode: string) => void;
  compact?: boolean;
};

const StepNode: React.FC<StepNodeProps> = ({
  step,
  recCount,
  isActive,
  onRecTagClick,
  compact = false,
}) => {
  const panoramaScore = step.panoramaScore;
  const painLevel = getPainLevelFromScore(panoramaScore);
  const guideItem = getPainGuideItem(painLevel);
  const icon =
    guideItem.iconType === 'check' ? (
      <CheckCircleFilled style={{ color: guideItem.accentColor }} />
    ) : guideItem.iconType === 'smile' ? (
      <SmileFilled style={{ color: guideItem.accentColor }} />
    ) : (
      <ExclamationCircleFilled style={{ color: guideItem.accentColor }} />
    );

  return (
    <div className="flex w-[208px] flex-none flex-col items-center">
      <div
        className={`flex ${
          compact ? 'h-[256px]' : 'h-[296px]'
        } w-full flex-col rounded-[20px] border px-4 pb-4 pt-4 shadow-[0_4px_12px_rgba(15,23,42,0.06)] transition-all duration-200 ${
          guideItem.cardClassName
        } ${isActive ? 'ring-2 ring-violet-400' : ''}`}
      >
        <div className="flex min-h-[40px] items-center justify-center gap-3">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-xl text-base"
            style={{ color: step.color, background: `${step.color}14` }}
          >
            {step.icon}
          </span>
          <div className="min-w-0 text-left">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
              {step.code}
            </div>
            <div className="truncate text-[17px] font-semibold text-slate-900">
              {step.title}
            </div>
          </div>
        </div>

        <div className="mt-5 text-center text-[19px] font-semibold leading-none tracking-[0.18em] text-amber-500">
          {getStarText(panoramaScore)}
        </div>

        <div className="mt-2 text-center">
          <span className="text-[28px] font-semibold leading-none text-slate-900">
            {panoramaScore}
          </span>
          <span className="ml-1 text-xs font-medium text-slate-500">分</span>
        </div>

        <div className="mt-4 flex flex-1 flex-col rounded-2xl border border-slate-200/70 bg-white/80 px-2 py-1.5">
          <div className="flex items-center justify-center gap-1.5 text-[14px] font-semibold text-slate-500">
            {icon}
            <Popover
              title={
                <div className="text-sm font-semibold text-slate-900">
                  痛点等级说明
                </div>
              }
              content={
                <PainGuidePopoverContent
                  currentPainLevel={step.painLevel}
                  currentColor={step.color}
                />
              }
              placement="bottom"
              trigger="hover"
              overlayStyle={{ maxWidth: 'min(760px, calc(100vw - 32px))' }}
            >
              <span className="cursor-pointer transition-colors hover:text-slate-700 hover:underline">
                {guideItem.label}
              </span>
            </Popover>
          </div>
          <div className="mt-1 min-h-[40px] cursor-pointer text-center">
            <Tooltip title={getCompactResult(step)} placement="bottom">
              <div className="line-clamp-3 text-[12px] leading-4 text-slate-700">
                {getCompactResult(step)}
              </div>
            </Tooltip>
          </div>
        </div>

        {/* 改进建议 tag */}
        {recCount > 0 && (
          <button
            type="button"
            onClick={() => onRecTagClick(step.code)}
            className={`mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-xl border px-2 py-1.5 text-[11px] font-medium transition-all duration-150 ${
              isActive
                ? 'border-slate-300 bg-slate-100 text-slate-600'
                : 'border-slate-200 bg-white/60 text-slate-500 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            改进点
            <span
              className={`flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[10px] font-semibold leading-none ${
                isActive ? 'bg-slate-500 text-white' : 'bg-slate-400 text-white'
              }`}
            >
              {recCount}
            </span>
            {isActive && (
              <svg
                className="ml-0.5 h-2.5 w-2.5 shrink-0"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.5 2.5L7.5 7.5M7.5 2.5L2.5 7.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

type JourneyPanoramaFlowProps = {
  steps: JourneyStep[];
  className?: string;
  recCountMap?: Record<string, number>;
  activeStepCode?: string;
  onStepRecClick?: (stepCode: string) => void;
  compact?: boolean;
};

const JourneyPanoramaFlow: React.FC<JourneyPanoramaFlowProps> = ({
  steps,
  className = '',
  recCountMap = {},
  activeStepCode,
  onStepRecClick,
  compact = false,
}) => {
  return (
    <div className={`overflow-x-auto pb-2 pt-1 ${className}`.trim()}>
      <div className="flex w-max min-w-full items-start justify-center gap-1 px-2">
        {steps.map((step, index) => (
          <React.Fragment key={step.key}>
            <StepNode
              step={step}
              recCount={recCountMap[step.code] ?? 0}
              isActive={activeStepCode === step.code}
              compact={compact}
              onRecTagClick={(code) => {
                if (activeStepCode === code) {
                  onStepRecClick?.('');
                } else {
                  onStepRecClick?.(code);
                }
              }}
            />
            {index < steps.length - 1 ? (
              <div
                className={`flex ${
                  compact ? 'h-[256px]' : 'h-[296px]'
                } flex-shrink-0 items-center text-slate-300`}
              >
                <ArrowRightOutlined className="text-base" />
              </div>
            ) : null}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default JourneyPanoramaFlow;
