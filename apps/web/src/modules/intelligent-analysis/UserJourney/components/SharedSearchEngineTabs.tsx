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
            className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
              active
                ? 'border-slate-300 bg-slate-900 text-white'
                : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-700'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default SharedSearchEngineTabs;
