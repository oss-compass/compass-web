import React from 'react';
import { JourneyRecommendation } from '../types';

type RecommendationsSectionProps = {
  recommendations: JourneyRecommendation[];
  className?: string;
  showHeader?: boolean;
  variant?: 'default' | 'compact';
};

const getPriorityMeta = (priority: string) => {
  const normalizedPriority = priority.trim().toLowerCase();

  if (
    normalizedPriority.includes('critical') ||
    normalizedPriority.includes('high') ||
    priority.includes('高')
  ) {
    return {
      label: '高优先级',
      badgeClassName:
        'border-rose-200 bg-rose-50 text-rose-700 shadow-[0_8px_18px_rgba(244,63,94,0.12)]',
      cardClassName:
        'border-rose-200/80 bg-[linear-gradient(180deg,#fff8f8_0%,#ffffff_100%)]',
      railClassName: 'bg-rose-500',
    };
  }

  if (
    normalizedPriority.includes('medium') ||
    normalizedPriority.includes('mid') ||
    priority.includes('中')
  ) {
    return {
      label: '中优先级',
      badgeClassName:
        'border-amber-200 bg-amber-50 text-amber-700 shadow-[0_8px_18px_rgba(245,158,11,0.12)]',
      cardClassName:
        'border-amber-200/80 bg-[linear-gradient(180deg,#fffdf7_0%,#ffffff_100%)]',
      railClassName: 'bg-amber-500',
    };
  }

  if (normalizedPriority.includes('low') || priority.includes('低')) {
    return {
      label: '低优先级',
      badgeClassName:
        'border-emerald-200 bg-emerald-50 text-emerald-700 shadow-[0_8px_18px_rgba(16,185,129,0.12)]',
      cardClassName:
        'border-emerald-200/80 bg-[linear-gradient(180deg,#f7fffb_0%,#ffffff_100%)]',
      railClassName: 'bg-emerald-500',
    };
  }

  return {
    label: priority || '建议',
    badgeClassName:
      'border-slate-200 bg-slate-50 text-slate-600 shadow-[0_8px_18px_rgba(15,23,42,0.06)]',
    cardClassName:
      'border-slate-200/80 bg-[linear-gradient(180deg,#fbfdff_0%,#ffffff_100%)]',
    railClassName: 'bg-slate-400',
  };
};

const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({
  recommendations,
  className = '',
  showHeader = true,
  variant = 'default',
}) => {
  return (
    <div className={className}>
      {showHeader ? (
        <div className="flex flex-col gap-1">
          <div className="text-xl font-semibold text-slate-900">改进建议</div>
        </div>
      ) : null}

      {recommendations.length ? (
        variant === 'compact' ? (
          <div
            className={`${showHeader ? 'mt-5' : ''} divide-y divide-slate-100`}
          >
            {recommendations.map((recommendation) => {
              const priorityMeta = getPriorityMeta(recommendation.priority);

              return (
                <div
                  key={recommendation.key}
                  className="flex items-start gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold text-slate-900">
                        {recommendation.title}
                      </span>
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${priorityMeta.badgeClassName}`}
                      >
                        {priorityMeta.label}
                      </span>
                    </div>
                    <div className="mt-1 text-[13px] leading-6 text-slate-600">
                      {recommendation.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div
            className={`${showHeader ? 'mt-5' : ''} grid gap-4 xl:grid-cols-3`}
          >
            {recommendations.map((recommendation, index) => {
              const priorityMeta = getPriorityMeta(recommendation.priority);

              return (
                <div
                  key={recommendation.key}
                  className={`relative overflow-hidden rounded-[28px] border px-5 py-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)] ${priorityMeta.cardClassName}`}
                >
                  <div
                    className={`absolute inset-y-0 left-0 w-1.5 ${priorityMeta.railClassName}`}
                  />
                  <div className="ml-2">
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${priorityMeta.badgeClassName}`}
                      >
                        {priorityMeta.label}
                      </span>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-300">
                        {`R${index + 1}`}
                      </span>
                    </div>
                    <div className="mt-4 text-[18px] font-semibold leading-7 text-slate-900">
                      {recommendation.title}
                    </div>
                    <div className="mt-3 text-[14px] leading-7 text-slate-600">
                      {recommendation.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )
      ) : (
        <div className="mt-5 rounded-[24px] border border-dashed border-slate-200 bg-white/70 px-5 py-6 text-sm leading-7 text-slate-500">
          当前报告未提供改进建议。
        </div>
      )}
    </div>
  );
};

export default RecommendationsSection;
