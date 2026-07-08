import React from 'react';
import { SearchEngineOption } from '../taskMeta';

type SharedSearchEngineTabsProps = {
  options: SearchEngineOption[];
  value?: string;
  onChange: (value: string) => void;
  className?: string;
};

const SharedSearchEngineTabs: React.FC<SharedSearchEngineTabsProps> = ({
  options,
  value,
  onChange,
  className = '',
}) => {
  if (options.length < 2) return null;

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`.trim()}>
      <span className="text-xs font-medium text-slate-500">搜索引擎：</span>
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
              active
                ? 'border-slate-300 bg-slate-900 text-white'
                : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-700'
            }`}
          >
            <span>{option.label}</span>
            {typeof option.score === 'number' ? (
              <span
                className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none ${
                  active
                    ? 'bg-white/15 text-white'
                    : option.score >= 80
                    ? 'bg-emerald-50 text-emerald-700'
                    : option.score >= 60
                    ? 'bg-amber-50 text-amber-700'
                    : 'bg-red-50 text-red-600'
                }`}
              >
                {option.score}分
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
};

export default SharedSearchEngineTabs;
