import React, { useState } from 'react';
import { Tooltip } from 'antd';
import JourneyPanoramaFlow from './JourneyPanoramaFlow';
import { JourneyStep } from '../types';
import taskDefinitions from '../rawData/task_definitions.json';
import useLogData, { LogTask } from '../hooks/useLogData';

/* ─── 类型 ─── */
type TaskDefinition = {
  task_id: string;
  name: string;
  phase: string;
  description: string;
};

type JourneyPanoramaSectionProps = {
  projectName: string;
  steps: JourneyStep[];
  projectFileKey?: string;
  onStepChange?: (stepKey: string) => void;
};

/* ─── 静态 task 定义 map ─── */
const TASK_DEF_MAP = (
  taskDefinitions as { tasks: Record<string, TaskDefinition> }
).tasks as Record<string, TaskDefinition>;

/* ─── 图标 ─── */
const EvidenceIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    className={className}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4" />
    <path
      d="M8 5v3.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="8" cy="11" r="0.75" fill="currentColor" />
  </svg>
);

const PainIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    className={className}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 2L14 13H2L8 2Z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <path
      d="M8 6v3"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <circle cx="8" cy="10.5" r="0.75" fill="currentColor" />
  </svg>
);

/* ─── 单个任务的观点 & 痛点卡片 ─── */
const TaskEvidenceCard: React.FC<{
  taskId: string;
  cardIndex: number;
  logTask?: LogTask;
}> = ({ taskId, cardIndex, logTask }) => {
  const def = TASK_DEF_MAP[taskId];
  const displayName = def?.name ?? taskId;
  const description = def?.description ?? logTask?.name ?? '';

  const observations = logTask?.evidence?.observations ?? [];
  const painPoints = logTask?.evidence?.pain_points ?? [];
  const hasObs = observations.length > 0;
  const hasPain = painPoints.length > 0;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_16px_rgba(15,23,42,0.06)]">
      {/* 卡片头 */}
      <div className="flex items-center gap-0 border-b border-slate-100">
        {/* 左侧序号 */}
        <div className="flex w-14 shrink-0 flex-col items-center justify-center self-stretch border-r border-slate-100 bg-slate-50 py-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-sm font-bold text-slate-600">
            {cardIndex}
          </span>
        </div>
        {/* 标题 + 描述 */}
        <div className="min-w-0 flex-1 px-4 py-2.5">
          <span className="text-base font-semibold text-slate-900">
            {displayName}
          </span>
          {description && (
            <Tooltip
              title={description}
              placement="bottomLeft"
              styles={{ root: { maxWidth: 520 } }}
            >
              <p className="mt-0.5 line-clamp-1 cursor-default text-xs leading-relaxed text-slate-500">
                {description}
              </p>
            </Tooltip>
          )}
        </div>
      </div>

      {/* 观点 & 痛点内容 */}
      <div className="px-5 py-4">
        {hasObs || hasPain ? (
          <div className="flex gap-3">
            {hasObs && (
              <div className="min-w-0 flex-1 rounded-xl border border-sky-100 bg-sky-50/70 px-4 py-3">
                <div className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-sky-600">
                  <EvidenceIcon className="h-3 w-3" />
                  观点
                  <span className="ml-0.5 rounded-full bg-sky-100 px-1.5 text-[10px] font-bold text-sky-700">
                    {observations.length}
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {observations.map((obs, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm leading-5 text-sky-900"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
                      {obs}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {hasPain && (
              <div className="min-w-0 flex-1 rounded-xl border border-rose-100 bg-rose-50/70 px-4 py-3">
                <div className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-rose-600">
                  <PainIcon className="h-3 w-3" />
                  痛点
                  <span className="ml-0.5 rounded-full bg-rose-100 px-1.5 text-[10px] font-bold text-rose-700">
                    {painPoints.length}
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {painPoints.map((p, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm leading-5 text-rose-900"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-1.5 rounded-lg border border-dashed border-slate-200 px-3 py-2">
            <EvidenceIcon className="h-3.5 w-3.5 shrink-0 text-slate-300" />
            <span className="text-xs text-slate-400">暂无观点与痛点记录</span>
          </div>
        )}
      </div>
    </div>
  );
};

/* ─── 按 taskId 分组，保持顺序去重 ─── */
const getUniqueTaskIds = (step: JourneyStep): string[] => {
  const seen = new Set<string>();
  const ids: string[] = [];
  (step.executionPath ?? []).forEach((action) => {
    if (action.taskId && !seen.has(action.taskId)) {
      seen.add(action.taskId);
      ids.push(action.taskId);
    }
  });
  return ids;
};

/* ─── 主组件 ─── */
const JourneyPanoramaSection: React.FC<JourneyPanoramaSectionProps> = ({
  projectName,
  steps,
  projectFileKey,
  onStepChange,
}) => {
  const [panoramaActiveStepKey, setPanoramaActiveStepKey] = useState(
    () => steps[0]?.key ?? ''
  );
  const [detailExpanded, setDetailExpanded] = useState(true);
  const logData = useLogData(projectFileKey);

  // 由全景图内部 activeStepKey 反推 step
  const panoramaActiveStep = steps.find((s) => s.key === panoramaActiveStepKey);
  const activeStepCode = panoramaActiveStep?.code ?? '';

  const handleCardClick = (stepCode: string) => {
    const matchedStep = steps.find((s) => s.code === stepCode);
    const nextKey =
      matchedStep && matchedStep.key === panoramaActiveStepKey
        ? ''
        : matchedStep?.key ?? '';
    setPanoramaActiveStepKey(nextKey);
    // 切换步骤时自动展开
    if (nextKey) setDetailExpanded(true);
    onStepChange?.(nextKey);
  };

  // 当前选中 step 的任务列表
  const activeStep = panoramaActiveStep;
  const taskIds = activeStep ? getUniqueTaskIds(activeStep) : [];

  return (
    <div className="mt-2 border-slate-100 pt-5">
      <div className="mb-3">
        <div className="text-xl font-semibold text-slate-900">
          旅程体验全景图
        </div>
      </div>

      <div className="rounded-[28px] border border-slate-200 bg-white px-4 py-5 shadow-[0_18px_42px_rgba(15,23,42,0.06)] md:px-6">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-200" />
          <div className="text-center">
            <div className="text-lg font-semibold text-slate-900">
              {projectName}
            </div>
          </div>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <JourneyPanoramaFlow
          steps={steps}
          className="mt-6"
          activeStepCode={activeStepCode}
          onCardClick={handleCardClick}
        />

        {/* 观点与痛点区域 */}
        <div className="mt-6">
          <button
            type="button"
            className={`group flex w-full items-center gap-3 text-left ${
              activeStep ? 'cursor-pointer' : 'cursor-default'
            }`}
            onClick={() => activeStep && setDetailExpanded((v) => !v)}
          >
            <div className="h-px flex-1 bg-slate-200" />
            {activeStep ? (
              <div
                className={`flex items-center gap-2 rounded-full border px-3 py-1 text-sm transition-colors duration-150 ${
                  detailExpanded
                    ? 'border-slate-300 bg-white text-slate-700 shadow-sm'
                    : 'border-slate-200 bg-slate-100 text-slate-500'
                }`}
              >
                <span className="font-semibold">{activeStep.title}</span>
                <span className="text-slate-400">· 任务观点与痛点</span>
                <svg
                  className={`h-3.5 w-3.5 shrink-0 text-slate-400 transition-transform duration-200 ${
                    detailExpanded ? '' : '-rotate-90'
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
              </div>
            ) : (
              <span className="text-base font-medium text-slate-400">
                任务观点与痛点
              </span>
            )}
            <div className="h-px flex-1 bg-slate-200" />
          </button>

          {detailExpanded &&
            (activeStep ? (
              taskIds.length > 0 ? (
                <div className="mt-4 space-y-4">
                  {taskIds.map((taskId, idx) => {
                    const logTask = logData
                      ? (logData[taskId] as LogTask | undefined)
                      : undefined;
                    return (
                      <TaskEvidenceCard
                        key={taskId}
                        taskId={taskId}
                        cardIndex={idx + 1}
                        logTask={logTask}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="mt-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 px-4 py-5 text-sm text-slate-500">
                  当前步骤未记录任务数据。
                </div>
              )
            ) : (
              <div className="mt-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 px-4 py-5 text-center text-sm text-slate-400">
                点击上方全景图卡片查看对应任务的观点与痛点
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default JourneyPanoramaSection;
