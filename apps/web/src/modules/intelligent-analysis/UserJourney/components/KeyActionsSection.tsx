import React from 'react';
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

const KeyActionsSection: React.FC<KeyActionsSectionProps> = ({
  currentStepKey,
  executionPathItems,
}) => {
  return (
    <div className="mt-6">
      <div className="text-base font-semibold text-slate-900">关键动作</div>

      {executionPathItems.length ? (
        <div className="mt-4 overflow-x-auto rounded-[26px] border border-slate-200 bg-white shadow-[0_12px_24px_rgba(15,23,42,0.05)]">
          <table className="min-w-full table-fixed">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80">
                <th className="w-20 px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  序号
                </th>
                <th className="w-28 px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  动作类型
                </th>
                <th className="min-w-[250px] px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  详情
                </th>
                <th className="w-24 px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  结果
                </th>
                <th className="w-20 px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  耗时
                </th>
              </tr>
            </thead>
            <tbody>
              {executionPathItems.map((detailItem, index) => {
                const resultDisplay = getResultDisplay(detailItem);

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
                      <div className="whitespace-pre-wrap break-words">
                        {detailItem.description}
                      </div>
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
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 px-4 py-5 text-sm text-slate-500">
          当前步骤未记录执行路径。
        </div>
      )}
    </div>
  );
};

export default KeyActionsSection;
