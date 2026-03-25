import React from 'react';
import { painGuideItems } from '../rawData';
import { PainLevel } from '../types';
import { getPainClasses } from '../helpers';

type PainGuidePopoverContentProps = {
  currentPainLevel: PainLevel;
  currentColor: string;
};

const PainGuidePopoverContent: React.FC<PainGuidePopoverContentProps> = ({
  currentPainLevel,
  currentColor,
}) => {
  return (
    <div className="w-[680px] max-w-[calc(100vw-96px)] overflow-hidden rounded-xl border border-slate-200">
      <div className="grid grid-cols-[118px_82px_82px_90px_minmax(0,1fr)] bg-slate-50 px-4 py-2 text-xs font-medium text-slate-500">
        <span>等级</span>
        <span>分数</span>
        <span>中文</span>
        <span>英文</span>
        <span>说明</span>
      </div>
      <div className="divide-y divide-slate-200 bg-white">
        {painGuideItems.map((item) => {
          const isCurrentLevel = item.level === currentPainLevel;

          return (
            <div
              key={item.level}
              className={`grid grid-cols-[118px_82px_82px_90px_minmax(0,1fr)] gap-0 px-4 py-3 text-[13px] leading-6 ${
                item.rowClassName
              } ${
                isCurrentLevel
                  ? 'relative z-[1] shadow-[inset_0_0_0_1px_rgba(15,23,42,0.08)]'
                  : ''
              }`}
              style={
                isCurrentLevel
                  ? {
                      boxShadow: `inset 4px 0 0 ${currentColor}, inset 0 0 0 1px rgba(15,23,42,0.08)`,
                    }
                  : undefined
              }
            >
              <div className="flex items-center gap-2 font-semibold text-slate-900">
                <span>{item.level}</span>
                {isCurrentLevel ? (
                  <span
                    className={`inline-flex min-w-[40px] items-center justify-center whitespace-nowrap rounded-full border px-2 py-0.5 text-[10px] font-semibold ${getPainClasses(
                      item.level
                    )}`}
                  >
                    当前
                  </span>
                ) : null}
              </div>
              <div
                className={
                  isCurrentLevel
                    ? 'font-semibold text-slate-900'
                    : 'text-slate-700'
                }
              >
                {item.scoreRange}
              </div>
              <div
                className={
                  isCurrentLevel
                    ? 'font-semibold text-slate-900'
                    : 'text-slate-700'
                }
              >
                {item.label}
              </div>
              <div
                className={
                  isCurrentLevel
                    ? 'font-semibold text-slate-900'
                    : 'font-medium text-slate-800'
                }
              >
                {item.english}
              </div>
              <div
                className={
                  isCurrentLevel
                    ? 'font-medium leading-6 text-slate-700'
                    : 'leading-6 text-slate-600'
                }
              >
                {item.description}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PainGuidePopoverContent;
