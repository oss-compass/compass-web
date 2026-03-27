import React from 'react';
import { ExperienceGrade, experienceGradeGuideItems } from '../helpers';

type ExperienceGradePopoverContentProps = {
  currentGrade: ExperienceGrade;
};

const ExperienceGradePopoverContent: React.FC<
  ExperienceGradePopoverContentProps
> = ({ currentGrade }) => {
  return (
    <div className="w-[920px] max-w-[calc(100vw-96px)] overflow-hidden rounded-xl border border-slate-200">
      <div className="grid grid-cols-[88px_120px_130px_170px_minmax(0,1fr)] bg-amber-700 px-4 py-2 text-xs font-semibold text-white">
        <span>等级</span>
        <span>分数范围</span>
        <span>等级名称(中)</span>
        <span>Grade Name(EN)</span>
        <span>体验描述</span>
      </div>
      <div className="divide-y divide-slate-200 bg-white">
        {experienceGradeGuideItems.map((item) => {
          const isCurrentGrade = item.grade === currentGrade;

          return (
            <div
              key={item.grade}
              className={`grid grid-cols-[88px_120px_130px_170px_minmax(0,1fr)] gap-0 px-4 py-3 text-[13px] leading-6 ${
                item.rowClassName
              } ${
                isCurrentGrade
                  ? 'relative z-[1] shadow-[inset_0_0_0_1px_rgba(15,23,42,0.08)]'
                  : ''
              }`}
              style={
                isCurrentGrade
                  ? {
                      boxShadow: `inset 4px 0 0 ${item.accentColor}, inset 0 0 0 1px rgba(15,23,42,0.08)`,
                    }
                  : undefined
              }
            >
              <div className="flex items-center gap-2 font-semibold text-slate-900">
                <span>{item.grade}</span>
                {isCurrentGrade ? (
                  <span
                    className={`inline-flex min-w-[40px] items-center justify-center whitespace-nowrap rounded-full border px-2 py-0.5 text-[10px] font-semibold ${item.badgeClassName}`}
                  >
                    当前
                  </span>
                ) : null}
              </div>
              <div
                className={
                  isCurrentGrade
                    ? 'font-semibold text-slate-900'
                    : 'text-slate-700'
                }
              >
                {item.scoreRange}
              </div>
              <div
                className={
                  isCurrentGrade
                    ? 'font-semibold text-slate-900'
                    : 'font-medium text-slate-800'
                }
              >
                {item.label}
              </div>
              <div
                className={
                  isCurrentGrade
                    ? 'font-semibold text-slate-900'
                    : 'font-medium text-slate-700'
                }
              >
                {item.english}
              </div>
              <div
                className={
                  isCurrentGrade
                    ? 'font-medium text-slate-800'
                    : 'text-slate-600'
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

export default ExperienceGradePopoverContent;
