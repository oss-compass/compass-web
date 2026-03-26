import React from 'react';
import {
  ExperienceGrade,
  experienceGradeGuideItems,
  getExperienceGradeGuideItem,
} from '../helpers';

type ExperienceGradePopoverContentProps = {
  currentGrade: ExperienceGrade;
};

const ExperienceGradePopoverContent: React.FC<
  ExperienceGradePopoverContentProps
> = ({ currentGrade }) => {
  return (
    <div className="w-[420px] max-w-[calc(100vw-96px)] overflow-hidden rounded-xl border border-slate-200">
      <div className="grid grid-cols-[88px_120px_minmax(0,1fr)] bg-slate-50 px-4 py-2 text-xs font-medium text-slate-500">
        <span>等级</span>
        <span>分数</span>
        <span>中文评级</span>
      </div>
      <div className="divide-y divide-slate-200 bg-white">
        {experienceGradeGuideItems.map((item) => {
          const isCurrentGrade = item.grade === currentGrade;

          return (
            <div
              key={item.grade}
              className={`grid grid-cols-[88px_120px_minmax(0,1fr)] gap-0 px-4 py-3 text-[13px] leading-6 ${
                item.rowClassName
              } ${
                isCurrentGrade
                  ? 'relative z-[1] shadow-[inset_0_0_0_1px_rgba(15,23,42,0.08)]'
                  : ''
              }`}
              style={
                isCurrentGrade
                  ? {
                      boxShadow: `inset 4px 0 0 ${
                        getExperienceGradeGuideItem(item.grade).accentColor
                      }, inset 0 0 0 1px rgba(15,23,42,0.08)`,
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExperienceGradePopoverContent;
