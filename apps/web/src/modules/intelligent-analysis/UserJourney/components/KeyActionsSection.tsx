import React from 'react';
import { Tooltip } from 'antd';
import { ActionDetailRecord } from '../types';
import { getActionStatusClasses } from '../helpers';

type KeyActionsSectionProps = {
  currentStepKey: string;
  currentStepColor: string;
  executionPathItems: ActionDetailRecord[];
};

const KeyActionsSection: React.FC<KeyActionsSectionProps> = ({
  currentStepKey,
  currentStepColor,
  executionPathItems,
}) => {
  return (
    <div className="mt-6">
      <div className="text-base font-semibold text-slate-900">关键动作</div>

      {executionPathItems.length ? (
        <div className="mt-4 grid gap-3 [grid-template-columns:repeat(auto-fill,minmax(min(100%,370px),1fr))]">
          {executionPathItems.map((detailItem, index) => (
            <div
              key={`${currentStepKey}-execution-${index}-${detailItem.label}`}
              className="w-full"
            >
              <div className="h-[192px] w-full max-w-[560px]">
                <div className="flex h-full flex-col rounded-[26px] border border-slate-200 bg-white px-4 py-4 shadow-[0_12px_24px_rgba(15,23,42,0.05)]">
                  <div className="h-full px-1 py-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 flex-1 items-start gap-3">
                        <span
                          className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-sm font-semibold text-white shadow-[0_6px_14px_rgba(15,23,42,0.12)]"
                          style={{ backgroundColor: currentStepColor }}
                        >
                          {index + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="text-[16px] font-semibold leading-6 text-slate-900">
                            {detailItem.label}
                          </div>
                          <Tooltip title={detailItem.description}>
                            <div
                              className="mt-2 h-[120px] overflow-hidden text-[14px] leading-6 text-slate-500"
                              style={{
                                display: '-webkit-box',
                                WebkitLineClamp: 5,
                                WebkitBoxOrient: 'vertical',
                              }}
                            >
                              {detailItem.description}
                            </div>
                          </Tooltip>
                        </div>
                      </div>
                      <div className="flex flex-shrink-0 flex-col items-end gap-2">
                        {detailItem.status ? (
                          <span
                            className={`rounded-full border px-2 py-1 text-sm font-semibold ${getActionStatusClasses(
                              detailItem.status
                            )}`}
                          >
                            {detailItem.statusLabel ?? detailItem.status}
                          </span>
                        ) : null}
                        {detailItem.duration ? (
                          <div className="text-right">
                            <div className="text-[16px] font-semibold leading-6 text-slate-800">
                              {detailItem.duration}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
