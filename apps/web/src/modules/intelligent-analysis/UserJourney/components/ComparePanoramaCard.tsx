import React, { useEffect, useMemo, useState } from 'react';
import { Card } from 'antd';
import JourneyPanoramaFlow, { StepStats } from './JourneyPanoramaFlow';
import { UserJourneyProjectView } from '../types';
import useLogData, { LogTask } from '../hooks/useLogData';
import { usePainConfirmations } from '../hooks/usePainConfirmations';
import JourneyTaskEvidenceCard from './JourneyTaskEvidenceCard';
import {
  getOrderedUniqueTaskIds,
  getSharedSearchEngineOptions,
  groupStepTasks,
} from '../taskMeta';
import SharedSearchEngineTabs from './SharedSearchEngineTabs';

/* ─── 单个项目的全景图 + 任务总结痛点 ─── */
const ProjectPanoramaBlock: React.FC<{
  project: UserJourneyProjectView;
  hasBorderTop: boolean;
  activeStepKey: string;
  onStepChange: (stepKey: string) => void;
}> = ({ project, hasBorderTop, activeStepKey, onStepChange }) => {
  const { data, queryKey } = project;
  const steps = data.journeySteps;
  const [sharedSearchEngine, setSharedSearchEngine] = useState<string>('');

  const logData = useLogData(queryKey);
  const { overviewPains } = usePainConfirmations(queryKey);

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
      const stepCode = step.code;

      if (overviewPains && overviewPains.length > 0) {
        painCount = overviewPains.filter((p: any) => {
          const pid = p.task_id || p.step_id;
          return pid === stepCode || matchIds.has(pid);
        }).length;
      }

      for (const taskId of ids) {
        const logTask = logData
          ? (logData[taskId] as LogTask | undefined)
          : undefined;
        if (!(overviewPains && overviewPains.length > 0)) {
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
  }, [steps, logData, overviewPains]);

  const activeStep = steps.find((s) => s.key === activeStepKey);
  const activeStepCode = activeStep?.code ?? '';

  const handleCardClick = (stepCode: string) => {
    const matched = steps.find((s) => s.code === stepCode);
    if (matched) {
      onStepChange(matched.key);
    }
  };

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

  return (
    <div className={hasBorderTop ? 'border-t border-slate-100 pt-7' : ''}>
      {/* 项目标题 */}
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-slate-200" />
        <div className="text-center">
          <div className="text-lg font-semibold text-slate-900">
            {data.projectInfo.name}
          </div>
          {data.projectInfo.version ? (
            <div className="mt-1 text-xs font-medium uppercase tracking-[0.08em] text-slate-400">
              {data.projectInfo.version}
            </div>
          ) : null}
        </div>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      {/* 全景图 */}
      <JourneyPanoramaFlow
        steps={steps}
        className="mt-6"
        compact
        activeStepCode={activeStepCode}
        onCardClick={handleCardClick}
        stepStats={stepStats}
      />

      {/* 任务总结与痛点 */}
      <div className="mt-6">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-200" />
          <div className="text-center">
            <div className="text-lg font-semibold text-slate-900">
              {activeStep
                ? `「${activeStep.title}」任务总结与痛点`
                : '任务总结与痛点'}
            </div>
          </div>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        {activeStep ? (
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
                  fileKey={queryKey}
                  stepId={activeStep?.code}
                  sharedSearchEngine={sharedSearchEngine || undefined}
                  hideTabs={sharedSearchEngineOptions.length > 1}
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
            点击上方全景图卡片查看对应任务的总结与痛点
          </div>
        )}
      </div>
    </div>
  );
};

/* ─── 主组件 ─── */
type ComparePanoramaCardProps = {
  projects: UserJourneyProjectView[];
  activeStepKey: string;
  onStepChange: (stepKey: string) => void;
};

const ComparePanoramaCard: React.FC<ComparePanoramaCardProps> = ({
  projects,
  activeStepKey,
  onStepChange,
}) => {
  return (
    <Card
      bordered={false}
      className="rounded-3xl border border-white/80 bg-white/90 shadow-[0_24px_70px_rgba(15,23,42,0.08)]"
      bodyStyle={{ padding: 24 }}
    >
      <div className="mb-5 text-xl font-semibold text-slate-900">
        旅程体验全景图
      </div>
      <div className="space-y-7">
        {projects.map((project, index) => (
          <ProjectPanoramaBlock
            key={project.queryKey}
            project={project}
            hasBorderTop={index > 0}
            activeStepKey={activeStepKey}
            onStepChange={onStepChange}
          />
        ))}
      </div>
    </Card>
  );
};

export default ComparePanoramaCard;
