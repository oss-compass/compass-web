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

export type StepStats = {
  taskCount: number;
  painCount: number;
  obsCount: number;
};

type StepNodeProps = {
  step: JourneyStep;
  isActive: boolean;
  onCardClick: (stepCode: string) => void;
  compact?: boolean;
  stats?: StepStats;
};

const StepNode: React.FC<StepNodeProps> = ({
  step,
  isActive,
  onCardClick,
  compact = false,
  stats,
}) => {
  const panoramaScore = step.panoramaScore;
  const hasScore = panoramaScore !== null && panoramaScore !== undefined;
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
        role="button"
        tabIndex={0}
        onClick={() => onCardClick(step.code)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') onCardClick(step.code);
        }}
        className={`flex ${
          compact ? 'h-[228px]' : 'h-[260px]'
        } w-full cursor-pointer flex-col rounded-[20px] border px-4 pb-3 pt-4 shadow-[0_4px_12px_rgba(15,23,42,0.06)] transition-all duration-200 ${
          guideItem.cardClassName
        } ${
          isActive
            ? 'ring-2 ring-violet-400'
            : 'hover:shadow-[0_8px_20px_rgba(15,23,42,0.10)]'
        }`}
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

        {hasScore ? (
          <>
            <div className="mt-3 text-center text-[19px] font-semibold leading-none tracking-[0.18em] text-amber-500">
              {getStarText(panoramaScore)}
            </div>
            <div className="mt-1.5 text-center">
              <span className="text-[28px] font-semibold leading-none text-slate-900">
                {panoramaScore}
              </span>
              <span className="ml-1 text-xs font-medium text-slate-500">
                分
              </span>
            </div>
          </>
        ) : (
          <div className="mt-3 flex flex-col items-center gap-1">
            <div className="flex items-center gap-1.5">
              <span className="h-px w-5 bg-slate-300" />
              <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                Not Evaluated
              </span>
              <span className="h-px w-5 bg-slate-300" />
            </div>
          </div>
        )}

        <div
          className={`mt-3 flex flex-1 flex-col rounded-2xl border px-2 py-1.5 ${
            hasScore
              ? 'border-slate-200/70 bg-white/80'
              : 'border-dashed border-slate-200 bg-slate-50/60'
          }`}
        >
          {hasScore ? (
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
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-2 py-2">
              <svg
                className="h-7 w-7 text-slate-300"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="3 2"
                />
                <path
                  d="M9 12h6M12 9v6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-center text-base leading-4 text-slate-400">
                本次未评估
              </span>
            </div>
          )}
          {hasScore && (
            <div className="mt-2 grid grid-cols-3">
              {(
                [
                  {
                    label: '任务',
                    value: stats?.taskCount ?? 0,
                    color: 'text-slate-900',
                  },
                  {
                    label: '痛点',
                    value: stats?.painCount ?? 0,
                    color: 'text-rose-500',
                  },
                  {
                    label: '观点',
                    value: stats?.obsCount ?? 0,
                    color: 'text-sky-500',
                  },
                ] as const
              ).map(({ label, value, color }) => (
                <div key={label} className="flex flex-col items-center py-1">
                  <span
                    className={`text-[20px] font-bold leading-none ${color}`}
                  >
                    {value}
                  </span>
                  <span className="mt-1 text-[14px] text-slate-400">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

type JourneyPanoramaFlowProps = {
  steps: JourneyStep[];
  className?: string;
  activeStepCode?: string;
  onCardClick?: (stepCode: string) => void;
  compact?: boolean;
  stepStats?: Record<string, StepStats>;
};

const JourneyPanoramaFlow: React.FC<JourneyPanoramaFlowProps> = ({
  steps,
  className = '',
  activeStepCode,
  onCardClick,
  compact = false,
  stepStats,
}) => {
  return (
    <div className={`overflow-x-auto pb-2 pt-1 ${className}`.trim()}>
      <div className="flex w-max min-w-full items-start justify-center gap-1 px-2">
        {steps.map((step, index) => (
          <React.Fragment key={step.key}>
            <StepNode
              step={step}
              isActive={activeStepCode === step.code}
              compact={compact}
              stats={stepStats?.[step.key]}
              onCardClick={(code) => {
                if (activeStepCode === code) {
                  onCardClick?.('');
                } else {
                  onCardClick?.(code);
                }
              }}
            />
            {index < steps.length - 1 ? (
              <div
                className={`flex ${
                  compact ? 'h-[228px]' : 'h-[260px]'
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
