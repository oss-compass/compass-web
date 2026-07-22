import React from 'react';
import { Card } from 'antd';
import type { IssueReportStage } from '../types';

type IssueStageDirectoryProps = {
  stages: IssueReportStage[];
  activeStageId: string;
  onStageChange: (stageId: string) => void;
  compact?: boolean;
};

const IssueStageDirectory: React.FC<IssueStageDirectoryProps> = ({
  stages,
  activeStageId,
  onStageChange,
  compact = false,
}) => {
  if (compact) {
    return (
      <nav
        aria-label="步骤名称"
        className="flex gap-2 overflow-x-auto rounded-2xl border border-white/80 bg-white/95 p-2 shadow-[0_12px_32px_rgba(15,23,42,0.08)] backdrop-blur [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {stages.map((stage, index) => {
          const active = stage.id === activeStageId;
          return (
            <button
              key={stage.id}
              type="button"
              aria-pressed={active}
              onClick={() => onStageChange(stage.id)}
              className={`flex-none rounded-xl px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 ${
                active
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {index + 1}. {stage.name}
            </button>
          );
        })}
      </nav>
    );
  }

  return (
    <Card
      bordered={false}
      className="w-full rounded-2xl border border-slate-200 bg-white shadow-[0_4px_16px_rgba(15,23,42,0.05)]"
      bodyStyle={{ padding: 16 }}
    >
      <h2 className="mb-4 text-base font-semibold text-slate-800">步骤名称</h2>
      <nav aria-label="步骤名称" className="flex flex-col gap-3">
        {stages.map((stage, index) => {
          const active = stage.id === activeStageId;
          return (
            <button
              key={stage.id}
              type="button"
              aria-pressed={active}
              onClick={() => onStageChange(stage.id)}
              className={`w-full rounded-2xl border text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 ${
                active
                  ? 'border-slate-900 bg-slate-900 text-white shadow-[0_14px_32px_rgba(15,23,42,0.18)]'
                  : 'border-slate-200/80 bg-white/90 text-slate-700 shadow-[0_12px_32px_rgba(15,23,42,0.05)] hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_14px_28px_rgba(15,23,42,0.1)]'
              }`}
            >
              <span className="flex items-center gap-3 px-4 py-3">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-semibold ${
                    active
                      ? 'bg-white/[0.12] text-white'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {index + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={`block truncate text-sm font-semibold ${
                      active ? 'text-white' : 'text-slate-800'
                    }`}
                  >
                    {stage.name}
                  </span>
                  <span
                    className={`mt-0.5 block truncate text-xs ${
                      active ? 'text-slate-300' : 'text-slate-500'
                    }`}
                  >
                    {stage.is_lens ? '参考镜头' : stage.id} · {stage.mixed} 分
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </nav>
    </Card>
  );
};

export default IssueStageDirectory;
