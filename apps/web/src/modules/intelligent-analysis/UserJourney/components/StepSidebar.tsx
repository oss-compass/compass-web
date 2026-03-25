import React from 'react';
import { Card, Typography } from 'antd';
import { JourneyStep } from '../types';

const { Title } = Typography;

type StepSidebarProps = {
  steps: JourneyStep[];
  activeStepKey: string;
  onStepChange: (stepKey: string) => void;
};

const StepSidebar: React.FC<StepSidebarProps> = ({
  steps,
  activeStepKey,
  onStepChange,
}) => {
  return (
    <Card
      bordered={false}
      className="h-full w-full rounded-3xl border border-white/80 bg-white/90 shadow-[0_20px_48px_rgba(15,23,42,0.08)]"
      bodyStyle={{ padding: 16 }}
    >
      <Title level={4} style={{ marginTop: 0, marginBottom: 16 }}>
        步骤名称
      </Title>
      <div className="flex flex-col gap-3">
        {steps.map((step, index) => {
          const isActive = step.key === activeStepKey;

          return (
            <button
              key={step.key}
              type="button"
              onClick={() => onStepChange(step.key)}
              className={`w-full cursor-pointer rounded-2xl border text-left transition-all duration-200 ${
                isActive
                  ? 'border-slate-900 bg-slate-900 text-white shadow-[0_14px_32px_rgba(15,23,42,0.18)]'
                  : 'border-slate-200/80 bg-white/90 text-slate-700 shadow-[0_12px_32px_rgba(15,23,42,0.05)] hover:-translate-y-0.5 hover:border-slate-200 hover:shadow-[0_14px_28px_rgba(15,23,42,0.1)]'
              }`}
            >
              <div className="flex items-center gap-3 px-4 py-4">
                <div
                  className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl ${
                    isActive
                      ? 'bg-white/12 text-white'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  <span className="text-sm font-semibold">{index + 1}</span>
                </div>
                <div className="min-w-0">
                  <div
                    className={`truncate text-sm font-semibold ${
                      isActive ? 'text-white' : 'text-slate-800'
                    }`}
                  >
                    {step.title}
                  </div>
                  <div
                    className={`mt-1 truncate text-xs ${
                      isActive ? 'text-slate-300' : 'text-slate-500'
                    }`}
                  >
                    {step.code}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
};

export default StepSidebar;
