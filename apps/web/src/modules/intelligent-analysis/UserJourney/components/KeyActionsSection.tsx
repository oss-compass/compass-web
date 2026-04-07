import React, { useState } from 'react';
import { Tooltip } from 'antd';
import { ActionDetailRecord } from '../types';
import { getActionStatusClasses } from '../helpers';

type KeyActionsSectionProps = {
  currentStepKey: string;
  executionPathItems: ActionDetailRecord[];
};

const getResultDisplay = (detailItem: ActionDetailRecord) => {
  if (typeof detailItem.result === 'boolean') {
    return {
      label: detailItem.result ? '\u6210\u529f' : '\u5931\u8d25',
      status: detailItem.result ? 'success' : 'failed',
    } as const;
  }

  if (detailItem.result != null) {
    const label = String(detailItem.result).trim();

    if (label) {
      return {
        label,
        status: 'failed',
      } as const;
    }
  }

  if (detailItem.statusLabel || detailItem.status) {
    return {
      label: detailItem.statusLabel ?? detailItem.status ?? '-',
      status: detailItem.status ?? 'failed',
    } as const;
  }

  return null;
};

const ChevronIcon: React.FC<{ expanded: boolean; className?: string }> = ({
  expanded,
  className = '',
}) => (
  <svg
    className={`transition-transform duration-150 ${
      expanded ? 'rotate-180' : ''
    } ${className}`}
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
);

/** 将扁平列表按 taskId 分组，保持原始顺序，无 taskId 的归入 undefined 组 */
const groupByTaskId = (
  items: ActionDetailRecord[]
): {
  taskId: string | undefined;
  rows: { item: ActionDetailRecord; globalIndex: number }[];
}[] => {
  const orderMap: Map<
    string | undefined,
    { item: ActionDetailRecord; globalIndex: number }[]
  > = new Map();

  items.forEach((item, index) => {
    const key = item.taskId;
    if (!orderMap.has(key)) orderMap.set(key, []);
    orderMap.get(key)!.push({ item, globalIndex: index });
  });

  return Array.from(orderMap.entries()).map(([taskId, rows]) => ({
    taskId,
    rows,
  }));
};

const KeyActionsSection: React.FC<KeyActionsSectionProps> = ({
  currentStepKey,
  executionPathItems,
}) => {
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});
  const [allExpanded, setAllExpanded] = useState(false);

  const toggleRow = (index: number) => {
    setExpandedRows((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleAll = () => {
    const next = !allExpanded;
    setAllExpanded(next);
    const nextRows: Record<number, boolean> = {};
    executionPathItems.forEach((_, i) => {
      nextRows[i] = next;
    });
    setExpandedRows(nextRows);
  };

  const groups = groupByTaskId(executionPathItems);
  const hasTaskId = groups.some((g) => g.taskId !== undefined);

  return (
    <div className="mt-6">
      <div className="text-base font-semibold text-slate-900">关键动作</div>

      {executionPathItems.length ? (
        <div className="mt-4 overflow-x-auto rounded-[26px] border border-slate-200 bg-white shadow-[0_12px_24px_rgba(15,23,42,0.05)]">
          <table className="min-w-full table-fixed">
            <colgroup>
              <col className="w-14" />
              <col className="w-28" />
              <col />
              <col className="w-24" />
              <col className="w-20" />
            </colgroup>
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80">
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  序号
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  动作类型
                </th>
                <th className="px-3 py-2 text-left text-sm font-semibold text-slate-700">
                  <div className="flex items-center gap-2">
                    <span>详情</span>
                    <button
                      type="button"
                      onClick={toggleAll}
                      className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-medium text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-700"
                    >
                      <ChevronIcon
                        expanded={allExpanded}
                        className="h-2.5 w-2.5"
                      />
                      {allExpanded ? '收起全部' : '展开全部'}
                    </button>
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  结果
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  耗时
                </th>
              </tr>
            </thead>
            <tbody>
              {groups.map(({ taskId, rows }) => (
                <React.Fragment key={taskId ?? '__no_task__'}>
                  {/* Task 分组标题行，仅当存在 taskId 时渲染 */}
                  {hasTaskId && (
                    <tr className="border-b border-slate-100 bg-slate-50/60">
                      <td colSpan={5} className="px-4 py-2">
                        <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2.5 py-0.5 text-[12px] font-semibold tracking-wide text-slate-700">
                          <svg
                            className="h-3 w-3 text-slate-500"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="2"
                              y="4"
                              width="12"
                              height="9"
                              rx="1.5"
                              stroke="currentColor"
                              strokeWidth="1.4"
                            />
                            <path
                              d="M5 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1"
                              stroke="currentColor"
                              strokeWidth="1.4"
                            />
                          </svg>
                          {taskId ? taskId : '未分组'}
                        </span>
                        <span className="ml-2 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-slate-300 px-1 text-[12px] font-bold leading-none text-white">
                          {rows.length}
                        </span>
                      </td>
                    </tr>
                  )}
                  {rows.map(({ item: detailItem, globalIndex: index }) => {
                    const resultDisplay = getResultDisplay(detailItem);
                    const isExpanded = !!expandedRows[index];

                    return (
                      <tr
                        key={`${currentStepKey}-execution-${index}-${detailItem.label}`}
                        className="border-b border-slate-100 last:border-b-0"
                      >
                        <td className="px-4 py-4 align-top text-sm font-semibold text-slate-900">
                          {index + 1}
                        </td>
                        <td className="px-4 py-4 align-top text-sm font-medium text-slate-800">
                          {detailItem.label}
                        </td>
                        <td className="px-4 py-4 align-top text-sm leading-7 text-slate-600">
                          {detailItem.description &&
                          detailItem.description.length > 60 ? (
                            <div className="relative pr-6">
                              <div
                                className={`break-words ${
                                  isExpanded
                                    ? 'whitespace-pre-wrap'
                                    : 'line-clamp-1'
                                }`}
                              >
                                {detailItem.description}
                              </div>
                              <Tooltip title={isExpanded ? '收起' : '展开'}>
                                <button
                                  type="button"
                                  onClick={() => toggleRow(index)}
                                  className="absolute right-1 top-1.5 inline-flex items-center text-sm font-medium text-slate-400 transition-colors hover:text-slate-600"
                                >
                                  <ChevronIcon
                                    expanded={isExpanded}
                                    className="h-4 w-4"
                                  />
                                </button>
                              </Tooltip>
                            </div>
                          ) : (
                            <span className="whitespace-pre-wrap break-words">
                              {detailItem.description}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-4 align-top">
                          {resultDisplay ? (
                            <span
                              className={`inline-flex rounded-full border px-2.5 py-1 text-sm font-semibold ${getActionStatusClasses(
                                resultDisplay.status
                              )}`}
                            >
                              {resultDisplay.label}
                            </span>
                          ) : (
                            <span className="text-sm text-slate-400">-</span>
                          )}
                        </td>
                        <td className="px-4 py-4 align-top text-sm font-semibold text-slate-800">
                          {detailItem.duration || '-'}
                        </td>
                      </tr>
                    );
                  })}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 px-4 py-5 text-sm text-slate-700">
          当前步骤未记录执行路径。
        </div>
      )}
    </div>
  );
};

export default KeyActionsSection;
