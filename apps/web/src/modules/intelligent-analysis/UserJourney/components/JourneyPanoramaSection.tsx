import React, { useEffect, useMemo, useState } from 'react';
import JourneyPanoramaFlow, { StepStats } from './JourneyPanoramaFlow';
import { JourneyStep } from '../types';
import useLogData from '../hooks/useLogData';
import { usePainConfirmations } from '../hooks/usePainConfirmations';
import JourneyTaskEvidenceCard from './JourneyTaskEvidenceCard';
import {
  getOrderedUniqueTaskIds,
  getSharedSearchEngineOptions,
  groupStepTasks,
} from '../taskMeta';
import SharedSearchEngineTabs from './SharedSearchEngineTabs';

type JourneyPanoramaSectionProps = {
  projectName: string;
  steps: JourneyStep[];
  projectFileKey?: string;
  isLatestReport?: boolean;
  activeStepKey?: string;
  onStepChange?: (stepKey: string) => void;
  previewMode?: boolean;
};

/* ─── 主组件 ─── */
const JourneyPanoramaSection: React.FC<JourneyPanoramaSectionProps> = ({
  projectName,
  steps,
  projectFileKey,
  isLatestReport = false,
  activeStepKey,
  onStepChange,
  previewMode = false,
}) => {
  const [detailExpanded, setDetailExpanded] = useState(true);
  const [sharedSearchEngine, setSharedSearchEngine] = useState<string>('');
  const logData = useLogData(projectFileKey);
  const { overviewPains } = usePainConfirmations(projectFileKey, {
    enabled: !previewMode,
  });

  // 由全景图内部 activeStepKey 反推 step
  const panoramaActiveStep = steps.find((s) => s.key === activeStepKey);
  const activeStepCode = panoramaActiveStep?.code ?? '';

  const handleCardClick = (stepCode: string) => {
    const matchedStep = steps.find((s) => s.code === stepCode);
    const nextKey =
      matchedStep && matchedStep.key === activeStepKey
        ? ''
        : matchedStep?.key ?? '';
    // 切换步骤时自动展开
    if (nextKey) setDetailExpanded(true);
    onStepChange?.(nextKey);
  };

  // 当前选中 step 的任务列表
  const activeStep = panoramaActiveStep;
  const taskGroups = useMemo(
    () =>
      activeStep
        ? groupStepTasks(getOrderedUniqueTaskIds(activeStep), logData)
        : [],
    [activeStep, logData]
  );
  const sharedSearchEngineOptions = useMemo(
    () =>
      activeStep?.code?.startsWith('S0')
        ? getSharedSearchEngineOptions(taskGroups)
        : [],
    [activeStep?.code, taskGroups]
  );

  useEffect(() => {
    setSharedSearchEngine(sharedSearchEngineOptions[0]?.value || '');
  }, [activeStepKey, sharedSearchEngineOptions]);

  // 每个 step 的统计数（任务数、痛点数、观点数）
  const stepStats = useMemo(() => {
    const map: Record<string, StepStats> = {};
    for (const step of steps) {
      const groupedTasks = groupStepTasks(
        getOrderedUniqueTaskIds(step),
        logData
      );
      const ids = groupedTasks.flatMap((group) =>
        group.variants.map((variant) => variant.taskId)
      );
      const matchIds = new Set<string>([
        ...ids,
        ...groupedTasks.map((group) => group.groupKey),
      ]);
      let painCount = 0;
      let obsCount = 0;

      // 如果有 overviewPains，痛点数量从这里计算
      if (overviewPains && overviewPains.length > 0) {
        const stepCode = step.code;
        painCount = overviewPains.filter((p: any) => {
          const pid = p.task_id || p.step_id;
          return pid === stepCode || matchIds.has(pid);
        }).length;
      }

      for (const taskId of ids) {
        const logTask = logData
          ? (logData[taskId] as
              | import('../hooks/useLogData').LogTask
              | undefined)
          : undefined;

        if ((!overviewPains || overviewPains.length === 0) && previewMode) {
          painCount += logTask?.evidence?.pain_points?.length ?? 0;
        }
        obsCount += logTask?.evidence?.observations?.length ?? 0;
      }
      map[step.key] = {
        taskCount: groupedTasks.length,
        painCount,
        obsCount,
      };
    }
    return map;
  }, [steps, logData, overviewPains, previewMode]);

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
          stepStats={stepStats}
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
                <span className="text-slate-400">· 任务总结与痛点</span>
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
                任务总结与痛点
              </span>
            )}
            <div className="h-px flex-1 bg-slate-200" />
          </button>

          {detailExpanded &&
            (activeStep ? (
              taskGroups.length > 0 ? (
                <div className="mt-4 space-y-4">
                  {sharedSearchEngineOptions.length > 1 ? (
                    <SharedSearchEngineTabs
                      options={sharedSearchEngineOptions}
                      value={sharedSearchEngine}
                      onChange={setSharedSearchEngine}
                    />
                  ) : null}
                  {taskGroups.map((group, idx) => (
                    <JourneyTaskEvidenceCard
                      key={group.groupKey}
                      group={group}
                      cardIndex={idx + 1}
                      fileKey={projectFileKey}
                      stepId={activeStep?.code}
                      isLatestReport={isLatestReport}
                      previewMode={previewMode}
                      sharedSearchEngine={sharedSearchEngine || undefined}
                      hideTabs={sharedSearchEngineOptions.length > 1}
                      onStepClick={(toolIds, ctx) => {
                        onStepChange?.(activeStep.key);
                        window.dispatchEvent(
                          new CustomEvent('user-journey:highlight-steps', {
                            detail: { toolIds, taskId: ctx?.taskId },
                          })
                        );
                      }}
                    />
                  ))}
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
