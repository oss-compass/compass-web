import React from 'react';
import { Card, Tabs } from 'antd';
import StepDetailCard from './StepDetailCard';
import {
  ActionDetailRecord,
  JourneyStep,
  UserJourneyProjectView,
} from '../types';

type CompareStepSectionProps = {
  projects: UserJourneyProjectView[];
  activeStepKey: string;
  onStepChange: (stepKey: string) => void;
  /** sticky 吸顶时距容器顶部的偏移量（px），默认 0 */
  stickyTop?: number;
};

const getStepByKey = (
  steps: JourneyStep[],
  activeStepKey: string
): JourneyStep | null =>
  steps.find((step) => step.key === activeStepKey) ?? steps[0] ?? null;

const getKeyMetrics = (step: JourneyStep) => step.metrics;

const getExecutionPathItems = (step: JourneyStep): ActionDetailRecord[] =>
  step.executionPath ?? [];

const EmptyStepCard: React.FC<{ projectName: string }> = ({ projectName }) => {
  return (
    <Card
      bordered={false}
      className="h-full w-full rounded-3xl border border-white/80 bg-white/90 shadow-[0_24px_70px_rgba(15,23,42,0.08)]"
      bodyStyle={{ padding: 24 }}
    >
      <div className="text-xl font-semibold text-slate-900">开发旅程</div>
      <div className="mt-6 rounded-[28px] border border-dashed border-slate-200 bg-slate-50/80 px-6 py-12 text-center text-sm text-slate-500">
        {projectName} 当前没有可展示的步骤数据。
      </div>
    </Card>
  );
};

const CompareStepSection: React.FC<CompareStepSectionProps> = ({
  projects,
  activeStepKey,
  onStepChange,
  stickyTop = 0,
}) => {
  const baseSteps = projects[0]?.data.journeySteps ?? [];

  return (
    <div className="rounded-3xl border border-white/80 bg-white shadow-[0_20px_48px_rgba(15,23,42,0.08)]">
      {/* 吸顶 Tab 栏 */}
      <div className="sticky z-10" style={{ top: stickyTop }}>
        <div className="rounded-t-3xl border-b border-slate-100 bg-white px-5 pb-0 pt-5">
          <div className="mb-1 text-xl font-semibold text-slate-900">
            步骤名称
          </div>
          <Tabs
            activeKey={activeStepKey}
            onChange={onStepChange}
            items={baseSteps.map((step, index) => ({
              key: step.key,
              label: (
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                    {index + 1}
                  </span>
                  <span>{step.title}</span>
                </div>
              ),
            }))}
            className="[&_.ant-tabs-nav-list]:gap-6 [&_.ant-tabs-nav]:mb-0 [&_.ant-tabs-tab]:px-0 [&_.ant-tabs-tab]:py-2"
          />
        </div>
      </div>

      {/* 内容区（横向滚动） */}
      <div className="overflow-x-auto p-5 pb-6">
        <div className="flex min-w-full items-stretch gap-5">
          {projects.map((project) => {
            const currentStep = getStepByKey(
              project.data.journeySteps,
              activeStepKey
            );

            return (
              <div
                key={project.queryKey}
                className="flex min-w-[625px] flex-1 flex-col self-stretch"
              >
                <div className="mb-3 px-1">
                  <div className="flex items-baseline gap-2">
                    <div className="text-lg font-semibold text-slate-900">
                      {project.data.projectInfo.name}
                    </div>
                    <div className="text-lg font-semibold text-slate-900">
                      ·
                    </div>
                    <div className="text-lg font-semibold text-slate-900">
                      开发旅程
                    </div>
                  </div>
                  {project.data.projectInfo.version ? (
                    <div className="mt-0.5 text-xs font-medium uppercase tracking-[0.08em] text-slate-400">
                      {project.data.projectInfo.version}
                    </div>
                  ) : null}
                </div>
                <div className="flex-1">
                  {currentStep ? (
                    <StepDetailCard
                      currentStep={currentStep}
                      keyMetrics={getKeyMetrics(currentStep)}
                      painNarrative={
                        currentStep.painNarrative || currentStep.painSummary
                      }
                      executionPathItems={getExecutionPathItems(currentStep)}
                      agentVersion={project.data.agentVersion}
                      hideTitle
                      fixedMetricCols={2}
                    />
                  ) : (
                    <EmptyStepCard
                      projectName={project.data.projectInfo.name}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CompareStepSection;
