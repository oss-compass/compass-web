import React from 'react';
import {
  ArrowRightOutlined,
  CheckCircleFilled,
  ExclamationCircleFilled,
} from '@ant-design/icons';
import { getPainGuideItem, getPainLevelFromScore } from '../helpers';
import { JourneyStep } from '../types';

const getStarText = (score: number) => {
  const filled = Math.max(0, Math.min(5, Math.round(score / 20)));

  return `${'★'.repeat(filled)}${'☆'.repeat(5 - filled)}`;
};

const getCompactResult = (step: JourneyStep) => {
  const primaryText =
    step.summary ||
    step.painPoints?.[0] ||
    step.painSummary ||
    step.description ||
    '';
  const compactText =
    primaryText
      .replace(/\s+/g, ' ')
      .split(/[，。；;？?]/)[0]
      ?.trim() || primaryText;

  return compactText.length > 16
    ? `${compactText.slice(0, 16)}...`
    : compactText;
};

type StepNodeProps = {
  step: JourneyStep;
};

const StepNode: React.FC<StepNodeProps> = ({ step }) => {
  const panoramaScore = step.panoramaScore;
  const painLevel = getPainLevelFromScore(panoramaScore);
  const guideItem = getPainGuideItem(painLevel);
  const icon =
    guideItem.iconType === 'check' ? (
      <CheckCircleFilled style={{ color: guideItem.accentColor }} />
    ) : (
      <ExclamationCircleFilled style={{ color: guideItem.accentColor }} />
    );

  return (
    <div className="flex w-[180px] flex-none flex-col items-center">
      <div
        className={`flex h-[252px] w-full flex-col rounded-[20px] border px-4 pb-5 pt-4 shadow-[0_14px_32px_rgba(15,23,42,0.06)] ${guideItem.cardClassName}`}
      >
        <div className="flex min-h-[40px] items-center justify-center gap-3">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-xl text-base"
            style={{
              color: step.color,
              background: `${step.color}14`,
            }}
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

        <div className="mt-4 flex flex-1 flex-col rounded-2xl border border-slate-200/70 bg-white/80 px-3 py-2.5">
          <div className="flex items-center justify-center gap-1.5 text-[13px] font-semibold text-slate-500">
            {icon}
            <span>{guideItem.label}</span>
          </div>
          <div className="mt-1 line-clamp-2 min-h-[40px] text-center text-[14px] font-medium leading-6 text-slate-700">
            {getCompactResult(step)}
          </div>
        </div>
      </div>
    </div>
  );
};

type JourneyPanoramaFlowProps = {
  steps: JourneyStep[];
  className?: string;
};

const JourneyPanoramaFlow: React.FC<JourneyPanoramaFlowProps> = ({
  steps,
  className = '',
}) => {
  return (
    <div className={`overflow-x-auto pb-2 ${className}`.trim()}>
      <div className="flex w-max min-w-full items-start justify-center gap-1 px-2">
        {steps.map((step, index) => (
          <React.Fragment key={step.key}>
            <StepNode step={step} />
            {index < steps.length - 1 ? (
              <div className="flex h-[252px] flex-shrink-0 items-center text-slate-300">
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
