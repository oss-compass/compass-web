import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Card } from 'antd';
import { JourneyStep, UserJourneyProjectView } from '../types';
import useLogData from '../hooks/useLogData';
import JourneyTaskEvidenceCard from './JourneyTaskEvidenceCard';
import {
  getOrderedUniqueTaskIds,
  getSharedSearchEngineOptions,
  groupStepTasks,
} from '../taskMeta';
import SharedSearchEngineTabs from './SharedSearchEngineTabs';
import CapabilityBenchmarkChartCard from '../OverviewDashboard/CapabilityBenchmarkChartCard';
import type { CapabilityBenchmarkScoreItem } from '../OverviewDashboard/types';

const projectToneClasses = [
  {
    border: 'border-sky-200',
    bg: 'bg-sky-50/70',
    dot: 'bg-sky-500',
    bar: 'from-sky-200 to-blue-300',
    barActive: 'from-sky-400 to-blue-500',
    valueText: 'text-blue-600',
  },
  {
    border: 'border-orange-200',
    bg: 'bg-orange-50/70',
    dot: 'bg-orange-500',
    bar: 'from-fuchsia-200 to-violet-300',
    barActive: 'from-fuchsia-400 to-violet-500',
    valueText: 'text-violet-600',
  },
  {
    border: 'border-violet-200',
    bg: 'bg-violet-50/70',
    dot: 'bg-violet-500',
    bar: 'from-violet-200 to-fuchsia-300',
    barActive: 'from-violet-400 to-fuchsia-500',
    valueText: 'text-violet-600',
  },
  {
    border: 'border-emerald-200',
    bg: 'bg-emerald-50/70',
    dot: 'bg-emerald-500',
    bar: 'from-emerald-200 to-teal-300',
    barActive: 'from-emerald-400 to-teal-500',
    valueText: 'text-emerald-600',
  },
] as const;

const getStepByKeyOrCode = (
  steps: JourneyStep[],
  activeStepKey: string,
  stepCode?: string
): JourneyStep | null =>
  steps.find((step) => step.key === activeStepKey || step.code === stepCode) ??
  null;

const CompareStepScoreBarChart: React.FC<{
  projects: UserJourneyProjectView[];
  baseSteps: JourneyStep[];
  activeStepKey: string;
  onStepChange: (stepKey: string) => void;
}> = ({ projects, baseSteps, activeStepKey, onStepChange }) => {
  const rows = useMemo<CapabilityBenchmarkScoreItem[]>(
    () =>
      baseSteps.map((step) => {
        const firstProjectStep = getStepByKeyOrCode(
          projects[0]?.data.journeySteps ?? [],
          step.key,
          step.code
        );
        const secondProjectStep = getStepByKeyOrCode(
          projects[1]?.data.journeySteps ?? [],
          step.key,
          step.code
        );

        return {
          key: step.key,
          label: step.title,
          cannScore: firstProjectStep?.panoramaScore ?? null,
          benchmarkScore: secondProjectStep?.panoramaScore ?? null,
        };
      }),
    [baseSteps, projects]
  );

  return (
    <div className="compare-panorama-benchmark-chart">
      <ComparePanoramaBenchmarkChartStyles />
      <CapabilityBenchmarkChartCard
        title="步骤得分对比"
        rows={rows}
        primaryLegend={projects[0]?.data.projectInfo.name ?? '报告 1'}
        secondaryLegend={projects[1]?.data.projectInfo.name ?? '报告 2'}
        getRowClassName={(item) =>
          item.key === activeStepKey
            ? 'benchmark-chart-group-active'
            : undefined
        }
        onRowClick={(item) => onStepChange(item.key)}
      />
    </div>
  );
};

const ComparePanoramaBenchmarkChartStyles: React.FC = () => (
  <style jsx global>{`
    .compare-panorama-benchmark-chart .benchmark-chart-card {
      border: 1px solid rgba(226, 232, 240, 0.92);
      border-radius: 16px;
      background: #ffffff;
      padding: 20px 22px 18px;
      overflow: hidden;
    }

    .compare-panorama-benchmark-chart .benchmark-chart-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }

    .compare-panorama-benchmark-chart .benchmark-chart-title {
      min-width: 0;
      color: #0f172a;
      font-size: 16px;
      line-height: 24px;
      font-weight: 700;
    }

    .compare-panorama-benchmark-chart .benchmark-chart-empty {
      min-height: 240px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: #94a3b8;
      font-size: 14px;
      line-height: 22px;
      font-weight: 500;
    }

    .compare-panorama-benchmark-chart .benchmark-chart-legend {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;
      margin-top: 12px;
      color: #64748b;
      font-size: 13px;
      line-height: 20px;
      font-weight: 600;
    }

    .compare-panorama-benchmark-chart .benchmark-chart-legend-item {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .compare-panorama-benchmark-chart .benchmark-chart-dot {
      width: 12px;
      height: 12px;
      border-radius: 999px;
      display: inline-block;
      box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.9);
    }

    .compare-panorama-benchmark-chart .benchmark-chart-dot-cann {
      background: #2070f3;
    }

    .compare-panorama-benchmark-chart .benchmark-chart-dot-benchmark {
      background: #bf68fa;
    }

    .compare-panorama-benchmark-chart .benchmark-chart {
      --benchmark-top-offset: 0px;
      --benchmark-bars-height: 236px;
      --benchmark-label-height: 44px;
      display: grid;
      grid-template-columns: 44px minmax(0, 1fr);
      gap: 14px;
      min-height: calc(
        var(--benchmark-top-offset) + var(--benchmark-bars-height) +
          var(--benchmark-label-height)
      );
    }

    .compare-panorama-benchmark-chart .benchmark-chart-y {
      position: relative;
      padding-top: var(--benchmark-top-offset);
      padding-bottom: var(--benchmark-label-height);
    }

    .compare-panorama-benchmark-chart .benchmark-chart-y-row {
      position: absolute;
      left: 0;
      right: 0;
      display: flex;
      align-items: flex-start;
      justify-content: flex-end;
    }

    .compare-panorama-benchmark-chart .benchmark-chart-y-label {
      font-size: 13px;
      line-height: 18px;
      color: #64748b;
      font-variant-numeric: tabular-nums;
      transform: translateY(-50%);
    }

    .compare-panorama-benchmark-chart .benchmark-chart-plot {
      position: relative;
      min-height: 0;
      padding-top: var(--benchmark-top-offset);
    }

    .compare-panorama-benchmark-chart .benchmark-chart-plot::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: var(--benchmark-label-height);
      border-top: 2px solid rgba(148, 163, 184, 0.46);
      z-index: 1;
    }

    .compare-panorama-benchmark-chart .benchmark-chart-grid {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: var(--benchmark-label-height);
      z-index: 0;
    }

    .compare-panorama-benchmark-chart .benchmark-chart-grid-line {
      position: absolute;
      left: 0;
      right: 0;
      border-top: 1px solid rgba(226, 232, 240, 0.72);
      transform: translateY(-50%);
    }

    .compare-panorama-benchmark-chart .benchmark-chart-groups {
      position: relative;
      z-index: 1;
      display: grid;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      gap: 18px;
      align-items: start;
    }

    .compare-panorama-benchmark-chart .benchmark-chart-group {
      position: relative;
      height: 100%;
      display: grid;
      grid-template-rows: var(--benchmark-bars-height) var(
          --benchmark-label-height
        );
      align-items: start;
      gap: 0;
      outline: none;
    }

    .compare-panorama-benchmark-chart .benchmark-chart-group-clickable {
      cursor: pointer;
    }

    .compare-panorama-benchmark-chart .benchmark-chart-slot,
    .compare-panorama-benchmark-chart .benchmark-chart-label {
      position: relative;
      z-index: 1;
    }

    .compare-panorama-benchmark-chart .benchmark-chart-slot {
      height: var(--benchmark-bars-height);
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding: 0 10px;
    }

    .compare-panorama-benchmark-chart .benchmark-chart-bars {
      position: relative;
      height: var(--benchmark-bars-height);
      display: flex;
      align-items: flex-end;
      justify-content: center;
      gap: 14px;
      padding: 0 4px;
      width: 100%;
    }

    .compare-panorama-benchmark-chart .benchmark-chart-bar-placeholder {
      width: 30px;
      flex: 0 0 30px;
    }

    .compare-panorama-benchmark-chart .benchmark-chart-bar {
      position: relative;
      z-index: 2;
      width: 30px;
      min-height: 0;
      border-radius: 12px 12px 0 0;
      box-shadow: none;
      overflow: visible;
      display: flex;
      align-items: flex-start;
      justify-content: center;
    }

    .compare-panorama-benchmark-chart .benchmark-chart-bar::before {
      content: '';
      position: absolute;
      top: 0px;
      left: 50%;
      transform: translateX(-50%);
      width: 8px;
      height: 4px;
      border-radius: 999px;
      box-shadow: none;
      z-index: 3;
    }

    .compare-panorama-benchmark-chart .benchmark-chart-bar-cann {
      background: #d6e4fd;
    }

    .compare-panorama-benchmark-chart .benchmark-chart-bar-cann::before {
      background: #2070f3;
    }

    .compare-panorama-benchmark-chart .benchmark-chart-bar-benchmark {
      background: #efd8ff;
    }

    .compare-panorama-benchmark-chart .benchmark-chart-bar-benchmark::before {
      background: #bf68fa;
    }

    .compare-panorama-benchmark-chart .benchmark-chart-bar-value {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding-top: 8px;
      color: #2070f3;
      font-size: 14px;
      line-height: 20px;
      font-weight: 600;
      font-variant-numeric: tabular-nums;
    }

    .compare-panorama-benchmark-chart
      .benchmark-chart-bar-benchmark
      .benchmark-chart-bar-value {
      color: #715afb;
    }

    .compare-panorama-benchmark-chart .benchmark-chart-label {
      text-align: center;
      color: #64748b;
      font-size: 15px;
      line-height: 22px;
      font-weight: 600;
      margin-top: 10px;
      display: inline-flex;
      align-self: center;
      justify-self: center;
      max-width: 100%;
      align-items: center;
      justify-content: center;
      border: 1px solid transparent;
      border-radius: 999px;
      padding: 4px 10px;
      transition: color 0.2s ease, font-weight 0.2s ease,
        background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease,
        transform 0.2s ease;
    }

    .compare-panorama-benchmark-chart
      .benchmark-chart-group-active
      .benchmark-chart-label,
    .compare-panorama-benchmark-chart
      .benchmark-chart-group-clickable:hover
      .benchmark-chart-label {
      color: #0f172a;
    }

    .compare-panorama-benchmark-chart
      .benchmark-chart-group-active
      .benchmark-chart-label {
      color: #1d4ed8;
      background: linear-gradient(
        180deg,
        rgba(32, 112, 243, 0.12) 0%,
        rgba(191, 104, 250, 0.08) 100%
      );
      border-color: rgba(59, 130, 246, 0.18);
      font-weight: 700;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9),
        0 6px 18px rgba(59, 130, 246, 0.12);
      transform: translateY(-1px);
    }
  `}</style>
);

const ProjectTaskComparePanel: React.FC<{
  project: UserJourneyProjectView;
  activeStepKey: string;
  baseStepCode?: string;
  toneIndex: number;
  getTaskCollapseState: (taskRowKey: string) => {
    summaryExpanded: boolean;
    painExpanded: boolean;
  };
  onTaskSummaryExpandedChange: (taskRowKey: string, expanded: boolean) => void;
  onTaskPainExpandedChange: (taskRowKey: string, expanded: boolean) => void;
  onStepChange: (stepKey: string) => void;
}> = ({
  project,
  activeStepKey,
  baseStepCode,
  toneIndex,
  getTaskCollapseState,
  onTaskSummaryExpandedChange,
  onTaskPainExpandedChange,
  onStepChange,
}) => {
  const tone = projectToneClasses[toneIndex % projectToneClasses.length];
  const [sharedSearchEngine, setSharedSearchEngine] = useState<string>('');
  const logData = useLogData(project.queryKey);
  const activeStep = getStepByKeyOrCode(
    project.data.journeySteps,
    activeStepKey,
    baseStepCode
  );

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
    <div className="flex h-full flex-col rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
      <div className="flex items-start gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${tone.dot}`} />
            <div className="text-base font-semibold text-slate-900">
              {project.data.projectInfo.name}
            </div>
          </div>
          {project.data.projectInfo.version ? (
            <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.08em] text-slate-400">
              {project.data.projectInfo.version}
            </div>
          ) : null}
        </div>
      </div>

      {activeStep ? (
        <>
          {taskGroups.length > 0 ? (
            <div className="mt-4 flex flex-1 flex-col">
              {sharedSearchEngineOptions.length > 1 ? (
                <div className="mb-4">
                  <SharedSearchEngineTabs
                    options={sharedSearchEngineOptions}
                    value={sharedSearchEngine}
                    onChange={setSharedSearchEngine}
                  />
                </div>
              ) : null}
              <div className="flex flex-1 flex-col gap-3">
                {taskGroups.map((group, idx) => {
                  const taskRowKey = `${activeStep.key}:${idx}`;
                  const collapseState = getTaskCollapseState(taskRowKey);

                  return (
                    <div
                      key={`${project.queryKey}-${group.groupKey}`}
                      data-compare-panorama-task={activeStep.key}
                    >
                      <JourneyTaskEvidenceCard
                        group={group}
                        cardIndex={idx + 1}
                        fileKey={project.queryKey}
                        stepId={activeStep.code}
                        cardId={`panorama-task-card-${activeStep.key}-${group.groupKey}`}
                        summaryExpanded={collapseState.summaryExpanded}
                        onSummaryExpandedChange={(expanded) =>
                          onTaskSummaryExpandedChange(taskRowKey, expanded)
                        }
                        painExpanded={collapseState.painExpanded}
                        onPainExpandedChange={(expanded) =>
                          onTaskPainExpandedChange(taskRowKey, expanded)
                        }
                        sharedSearchEngine={sharedSearchEngine || undefined}
                        hideTabs={sharedSearchEngineOptions.length > 1}
                        onStepClick={(toolIds, ctx) => {
                          onStepChange(activeStep.key);
                          window.dispatchEvent(
                            new CustomEvent('user-journey:highlight-steps', {
                              detail: { toolIds, taskId: ctx?.taskId },
                            })
                          );
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="mt-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 px-4 py-5 text-sm text-slate-500">
              当前步骤未记录任务数据。
            </div>
          )}
        </>
      ) : (
        <div className="mt-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 px-4 py-5 text-sm text-slate-400">
          该报告当前没有匹配的步骤数据。
        </div>
      )}
    </div>
  );
};

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
  const baseProject = projects[0];
  const baseSteps = baseProject?.data.journeySteps ?? [];
  const activeBaseStep =
    getStepByKeyOrCode(baseSteps, activeStepKey) ?? baseSteps[0] ?? null;
  const columnRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [taskCollapseState, setTaskCollapseState] = useState<
    Record<string, { summaryExpanded: boolean; painExpanded: boolean }>
  >({});

  const getTaskCollapseState = (taskRowKey: string) =>
    taskCollapseState[taskRowKey] ?? {
      summaryExpanded: false,
      painExpanded: true,
    };

  const updateTaskCollapseState = (
    taskRowKey: string,
    nextPartial: Partial<{ summaryExpanded: boolean; painExpanded: boolean }>
  ) => {
    setTaskCollapseState((prev) => ({
      ...prev,
      [taskRowKey]: {
        summaryExpanded: prev[taskRowKey]?.summaryExpanded ?? false,
        painExpanded: prev[taskRowKey]?.painExpanded ?? true,
        ...nextPartial,
      },
    }));
  };

  useLayoutEffect(() => {
    const containers = projects
      .map((project) => columnRefs.current[project.queryKey])
      .filter((container): container is HTMLDivElement => !!container);

    if (containers.length < 2 || !activeBaseStep) {
      return;
    }

    let frameId = 0;

    const syncTaskCardHeights = () => {
      cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(() => {
        const elementLists = containers.map((container) =>
          Array.from(
            container.querySelectorAll<HTMLElement>(
              `[data-compare-panorama-task="${activeBaseStep.key}"]`
            )
          )
        );

        elementLists.flat().forEach((element) => {
          element.style.minHeight = '';
        });

        const maxElementCount = Math.max(
          ...elementLists.map((elements) => elements.length),
          0
        );

        for (let index = 0; index < maxElementCount; index += 1) {
          const rowElements = elementLists
            .map((elements) => elements[index])
            .filter((element): element is HTMLElement => !!element);

          if (rowElements.length < 2) {
            continue;
          }

          const maxHeight = Math.max(
            ...rowElements.map(
              (element) => element.getBoundingClientRect().height
            ),
            0
          );

          rowElements.forEach((element) => {
            element.style.minHeight = `${Math.ceil(maxHeight)}px`;
          });
        }
      });
    };

    syncTaskCardHeights();

    if (typeof ResizeObserver === 'undefined') {
      return () => {
        cancelAnimationFrame(frameId);
      };
    }

    const observer = new ResizeObserver(() => {
      syncTaskCardHeights();
    });

    containers.forEach((container) => {
      observer.observe(container);
    });

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, [activeBaseStep, projects, taskCollapseState]);

  if (!baseProject) {
    return null;
  }

  return (
    <Card
      bordered={false}
      className="rounded-3xl border border-white/80 bg-white/90 shadow-[0_24px_70px_rgba(15,23,42,0.08)]"
      bodyStyle={{ padding: 24 }}
    >
      <div className="flex flex-col gap-6">
        <div>
          <div className="text-xl font-semibold text-slate-900">
            旅程体验全景图
          </div>
        </div>

        <CompareStepScoreBarChart
          projects={projects}
          baseSteps={baseSteps}
          activeStepKey={activeBaseStep?.key ?? ''}
          onStepChange={onStepChange}
        />

        <div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-lg font-semibold text-slate-900">
                <span>任务总结与痛点</span>
                {activeBaseStep ? (
                  <>
                    <span className="text-slate-600">•</span>
                    <span className="text-slate-900">
                      {activeBaseStep.title}
                    </span>
                  </>
                ) : null}
              </div>
            </div>
          </div>

          {activeBaseStep ? (
            <div className=">xl:flex-row mt-5 flex flex-col gap-4">
              {projects.map((project, index) => (
                <div
                  key={`${project.queryKey}-detail`}
                  ref={(node) => {
                    columnRefs.current[project.queryKey] = node;
                  }}
                  className=">xl:min-w-0 >xl:flex-1 >xl:basis-0"
                >
                  <ProjectTaskComparePanel
                    project={project}
                    activeStepKey={activeBaseStep.key}
                    baseStepCode={activeBaseStep.code}
                    toneIndex={index}
                    getTaskCollapseState={getTaskCollapseState}
                    onTaskSummaryExpandedChange={(taskRowKey, expanded) =>
                      updateTaskCollapseState(taskRowKey, {
                        summaryExpanded: expanded,
                      })
                    }
                    onTaskPainExpandedChange={(taskRowKey, expanded) =>
                      updateTaskCollapseState(taskRowKey, {
                        painExpanded: expanded,
                      })
                    }
                    onStepChange={onStepChange}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 px-4 py-5 text-center text-sm text-slate-400">
              点击上方步骤矩阵查看对应任务的总结与痛点
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ComparePanoramaCard;
