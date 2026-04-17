import React, { useState } from 'react';
import { Card, Tooltip } from 'antd';
import JourneyPanoramaFlow from './JourneyPanoramaFlow';
import { JourneyStep, UserJourneyProjectView } from '../types';
import taskDefinitions from '../rawData/task_definitions.json';
import useLogData, { LogTask } from '../hooks/useLogData';
import EvidencePanel from './EvidencePanel';

/* ─── 类型 ─── */
type TaskDefinition = {
  task_id: string;
  name: string;
  phase: string;
  description: string;
};

const TASK_DEF_MAP = (
  taskDefinitions as { tasks: Record<string, TaskDefinition> }
).tasks as Record<string, TaskDefinition>;

/* ─── 单个任务的总结 & 痛点卡片 ─── */
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

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_16px_rgba(15,23,42,0.06)]">
      <div className="flex items-center gap-0 border-b border-slate-100">
        <div className="flex w-14 shrink-0 flex-col items-center justify-center self-stretch border-r border-slate-100 bg-slate-50 py-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-sm font-bold text-slate-600">
            {cardIndex}
          </span>
        </div>
        <div className="min-w-0 flex-1 px-4 py-3.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-base font-semibold text-slate-900">
              {displayName}
            </span>
          </div>
          {description && (
            <Tooltip
              title={description}
              placement="bottomLeft"
              styles={{ root: { maxWidth: 520 } }}
            >
              <p className="mt-1.5 line-clamp-2 cursor-default text-xs leading-relaxed text-slate-500">
                {description}
              </p>
            </Tooltip>
          )}
        </div>
      </div>
      <div className="px-5 py-4">
        <EvidencePanel observations={observations} pain_points={painPoints} />
      </div>
    </div>
  );
};

/* ─── 按 taskId 去重保序 ─── */
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

/* ─── 单个项目的全景图 + 任务总结痛点 ─── */
const ProjectPanoramaBlock: React.FC<{
  project: UserJourneyProjectView;
  hasBorderTop: boolean;
}> = ({ project, hasBorderTop }) => {
  const { data, queryKey } = project;
  const steps = data.journeySteps;

  const [activeStepKey, setActiveStepKey] = useState('');
  const logData = useLogData(queryKey);

  const activeStep = steps.find((s) => s.key === activeStepKey);
  const activeStepCode = activeStep?.code ?? '';

  const handleCardClick = (stepCode: string) => {
    const matched = steps.find((s) => s.code === stepCode);
    const nextKey =
      matched && matched.key === activeStepKey ? '' : matched?.key ?? '';
    setActiveStepKey(nextKey);
  };

  const taskIds = activeStep ? getUniqueTaskIds(activeStep) : [];

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
};

const ComparePanoramaCard: React.FC<ComparePanoramaCardProps> = ({
  projects,
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
          />
        ))}
      </div>
    </Card>
  );
};

export default ComparePanoramaCard;
