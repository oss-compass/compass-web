import React from 'react';

export type CiView = 'daily' | 'weekly';

type CiViewToggleProps = {
  view: CiView;
  onChange: (view: CiView) => void;
};

const items: { key: CiView; label: string }[] = [
  { key: 'daily', label: '日观测板' },
  { key: 'weekly', label: '周复盘' },
];

/** 日观测板 / 周复盘 节奏切换（社区药丸样式） */
const CiViewToggle: React.FC<CiViewToggleProps> = ({ view, onChange }) => (
  <div
    role="tablist"
    aria-label="节奏切换"
    className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white p-1"
  >
    {items.map((it) => {
      const on = view === it.key;
      return (
        <button
          key={it.key}
          type="button"
          role="tab"
          aria-selected={on}
          onClick={() => onChange(it.key)}
          className={`rounded-full px-4 py-1.5 text-[13px] font-semibold transition-colors ${
            on
              ? 'bg-slate-900 text-white'
              : 'bg-white text-slate-500 hover:text-slate-700'
          }`}
        >
          {it.label}
        </button>
      );
    })}
  </div>
);

export default CiViewToggle;
