import React, { useState } from 'react';
import { JourneyRecommendation, JourneyStep } from '../types';

type RecommendationsSectionProps = {
  recommendations: JourneyRecommendation[];
  steps?: JourneyStep[];
  metricNameMap?: Record<string, string>;
  className?: string;
  showHeader?: boolean;
  variant?: 'default' | 'compact';
  /** 当前激活的 step code（全景图筛选联动） */
  activeStepCode?: string;
  /** 清除筛选回调 */
  onClearFilter?: () => void;
};

const isHighPriority = (priority: string) => {
  const normalized = priority.trim().toLowerCase();

  return (
    normalized.includes('critical') ||
    normalized.includes('high') ||
    priority.includes('高')
  );
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

/** 将 step_id / metric_id 数组渲染为内联 tag（直接嵌入同行 flex 容器） */
const RelatedTags: React.FC<{
  stepIds?: string[];
  metricIds?: string[];
  steps?: JourneyStep[];
  metricNameMap?: Record<string, string>;
}> = ({ stepIds, metricIds, steps, metricNameMap }) => {
  const hasSteps = stepIds && stepIds.length > 0;
  const hasMetrics = metricIds && metricIds.length > 0;

  if (!hasSteps && !hasMetrics) return null;

  const stepNameMap: Record<string, string> = {};
  if (steps) {
    steps.forEach((s) => {
      stepNameMap[s.code] = s.title;
    });
  }

  return (
    <>
      {hasSteps &&
        stepIds!.map((id) => (
          <span
            key={`step-${id}`}
            className="inline-flex items-center gap-1 rounded-full border border-violet-200 bg-violet-50 px-2 py-0.5 text-[11px] font-medium text-violet-700"
          >
            <svg
              className="h-2.5 w-2.5 shrink-0"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="6" cy="6" r="2.5" fill="currentColor" />
              <circle
                cx="6"
                cy="6"
                r="5"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeOpacity="0.4"
              />
            </svg>
            {stepNameMap[id] || id}
          </span>
        ))}
      {hasMetrics &&
        metricIds!.map((id) => (
          <span
            key={`metric-${id}`}
            className="inline-flex items-center gap-1 rounded-full border border-sky-200 bg-sky-50 px-2 py-0.5 text-[11px] font-medium text-sky-700"
          >
            <svg
              className="h-2.5 w-2.5 shrink-0"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.5 9L4.5 5.5L7 7.5L10.5 3"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {(metricNameMap && metricNameMap[id]) || id}
          </span>
        ))}
    </>
  );
};

const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({
  recommendations,
  steps,
  metricNameMap,
  className = '',
  showHeader = true,
  variant = 'default',
  activeStepCode,
  onClearFilter,
}) => {
  const [expanded, setExpanded] = useState(false);

  // activeStepCode 变化时：有筛选则展开全部，清除筛选则收起
  const prevActiveRef = React.useRef(activeStepCode);
  if (prevActiveRef.current !== activeStepCode) {
    prevActiveRef.current = activeStepCode;
    setExpanded(!!activeStepCode);
  }

  // 按激活的 step 过滤（无激活时展示全部）
  const filteredRecommendations = activeStepCode
    ? recommendations.filter((r) => r.relatedStepIds?.includes(activeStepCode))
    : recommendations;

  // 激活 step 对应的名称（用于标题提示）
  const activeStepTitle = activeStepCode
    ? steps?.find((s) => s.code === activeStepCode)?.title
    : undefined;

  const highItems = filteredRecommendations.filter((r) =>
    isHighPriority(r.priority)
  );
  const otherItems = filteredRecommendations.filter(
    (r) => !isHighPriority(r.priority)
  );
  const hasOther = otherItems.length > 0;

  const renderCompactItem = (recommendation: JourneyRecommendation) => {
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
            <RelatedTags
              stepIds={recommendation.relatedStepIds}
              metricIds={recommendation.relatedMetricIds}
              steps={steps}
              metricNameMap={metricNameMap}
            />
          </div>
          <div className="mt-1 text-[13px] leading-6 text-slate-600">
            {recommendation.description}
          </div>
        </div>
      </div>
    );
  };

  const renderDefaultItem = (
    recommendation: JourneyRecommendation,
    index: number
  ) => {
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
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${priorityMeta.badgeClassName}`}
            >
              {priorityMeta.label}
            </span>
            <RelatedTags
              stepIds={recommendation.relatedStepIds}
              metricIds={recommendation.relatedMetricIds}
              steps={steps}
              metricNameMap={metricNameMap}
            />
            <span className="ml-auto text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-300">
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
  };

  const expandButton = hasOther ? (
    <button
      type="button"
      onClick={() => setExpanded((v) => !v)}
      className="mt-3 flex items-center gap-1.5 text-[13px] font-medium text-slate-400 transition-colors hover:text-slate-600"
    >
      <svg
        className={`h-3.5 w-3.5 transition-transform duration-200 ${
          expanded ? 'rotate-180' : ''
        }`}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 6l4 4 4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {expanded
        ? `收起其他建议`
        : `展开其他 ${otherItems.length} 条建议（中 / 低优先级）`}
    </button>
  ) : null;

  return (
    <div className={className}>
      {showHeader ? (
        <div className="flex flex-col gap-1">
          <div className="text-xl font-semibold text-slate-900">改进建议</div>
        </div>
      ) : null}

      {/* 筛选状态提示条 */}
      {activeStepCode && activeStepTitle && (
        <div className="mb-3 flex items-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-3 py-2">
          <svg
            className="h-3.5 w-3.5 shrink-0 text-violet-500"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="7" cy="7" r="2.5" fill="currentColor" />
            <circle
              cx="7"
              cy="7"
              r="6"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeOpacity="0.4"
            />
          </svg>
          <span className="flex-1 text-[12px] font-medium text-violet-700">
            仅展示「{activeStepTitle}」阶段的改进建议
            {filteredRecommendations.length === 0 && '（暂无）'}
          </span>
          <button
            type="button"
            onClick={onClearFilter}
            className="flex items-center gap-1 rounded-full border border-violet-200 bg-white/80 px-2 py-0.5 text-[11px] font-medium text-violet-500 transition-colors hover:border-violet-300 hover:text-violet-700"
          >
            <svg
              className="h-2.5 w-2.5"
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
            清除筛选
          </button>
        </div>
      )}

      {filteredRecommendations.length ? (
        variant === 'compact' ? (
          <div className={`${showHeader ? 'mt-5' : ''}`}>
            <div className="divide-y divide-slate-100">
              {highItems.map(renderCompactItem)}
            </div>
            {hasOther && (
              <>
                {expandButton}
                {expanded && (
                  <div className="mt-1 divide-y divide-slate-100 border-t border-dashed border-slate-200 pt-1">
                    {otherItems.map(renderCompactItem)}
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          <div className={`${showHeader ? 'mt-5' : ''}`}>
            <div className="grid gap-4 xl:grid-cols-3">
              {highItems.map((rec, idx) => renderDefaultItem(rec, idx))}
            </div>
            {hasOther && (
              <>
                {expandButton}
                {expanded && (
                  <div className="mt-3 grid gap-4 xl:grid-cols-3">
                    {otherItems.map((rec, idx) =>
                      renderDefaultItem(rec, highItems.length + idx)
                    )}
                  </div>
                )}
              </>
            )}
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
