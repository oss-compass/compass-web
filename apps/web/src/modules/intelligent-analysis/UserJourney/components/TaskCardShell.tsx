import React from 'react';
import { Tooltip } from 'antd';

export type TaskCardTab = {
  key: string;
  label: string;
  description?: string;
  score?: number | null;
};

type TaskCardShellProps = {
  cardIndex: number;
  title: string;
  description?: string;
  tabs?: TaskCardTab[];
  activeTabKey?: string;
  onTabChange?: (key: string) => void;
  headerMeta?: React.ReactNode;
  headerAction?: React.ReactNode;
  cardId?: string;
  children: React.ReactNode;
};

const TaskCardShell: React.FC<TaskCardShellProps> = ({
  cardIndex,
  title,
  description,
  tabs = [],
  activeTabKey,
  onTabChange,
  headerMeta,
  headerAction,
  cardId,
  children,
}) => {
  const activeTab =
    tabs.find((tab) => tab.key === activeTabKey) ?? tabs[0] ?? undefined;
  const activeDescription = activeTab?.description || description;
  const showTabs = tabs.length > 1;

  return (
    <div
      id={cardId}
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_16px_rgba(15,23,42,0.06)]"
    >
      <div className="flex items-center gap-0 border-b border-slate-100">
        <div className="flex w-14 shrink-0 flex-col items-center justify-center self-stretch border-r border-slate-100 bg-slate-50 py-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-sm font-bold text-slate-600">
            {cardIndex}
          </span>
        </div>

        <div className="min-w-0 flex-1 px-4 py-3.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-base font-semibold text-slate-900">
              {title}
            </span>
            {headerMeta}
          </div>

          {activeDescription && (
            <Tooltip
              title={activeDescription}
              placement="bottomLeft"
              styles={{ root: { maxWidth: 520 } }}
            >
              <p className="mt-1.5 line-clamp-2 cursor-default text-xs leading-relaxed text-slate-500">
                {activeDescription}
              </p>
            </Tooltip>
          )}

          {showTabs && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {tabs.map((tab) => {
                const active = tab.key === activeTab?.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => onTabChange?.(tab.key)}
                    className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                      active
                        ? 'border-slate-300 bg-slate-900 text-white'
                        : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-700'
                    }`}
                  >
                    <span>{tab.label}</span>
                    {typeof tab.score === 'number' ? (
                      <span
                        className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none ${
                          active
                            ? 'bg-white/15 text-white'
                            : tab.score >= 80
                            ? 'bg-emerald-50 text-emerald-700'
                            : tab.score >= 60
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-red-50 text-red-600'
                        }`}
                      >
                        {tab.score}分
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {headerAction ? (
          <div className="mr-4 shrink-0">{headerAction}</div>
        ) : null}
      </div>

      {children}
    </div>
  );
};

export default TaskCardShell;
