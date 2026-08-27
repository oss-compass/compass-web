import React from 'react';

export type CiView = 'overview' | 'embedded-report';

type CiViewTabsProps = {
  active: CiView;
  onChange: (view: CiView) => void;
};

const VIEWS: Array<{ key: CiView; label: string }> = [
  { key: 'overview', label: '社区工程总览' },
  { key: 'embedded-report', label: '工具链评估报告' },
];

/** 社区工程总览标题右侧的二级页签。 */
const CiViewTabs: React.FC<CiViewTabsProps> = ({ active, onChange }) => (
  <nav
    aria-label="社区工程视图"
    className="flex min-w-max items-center gap-1 rounded-[30px] border border-blue-100 bg-blue-50 p-[3px]"
  >
    {VIEWS.map((item) => {
      const isActive = item.key === active;
      return (
        <button
          key={item.key}
          type="button"
          aria-current={isActive ? 'page' : undefined}
          onClick={() => onChange(item.key)}
          className={
            isActive
              ? 'inline-flex items-center rounded-3xl bg-white px-4 py-1 text-xs font-semibold text-blue-700 shadow-sm'
              : 'inline-flex items-center rounded-3xl px-4 py-1 text-xs font-semibold text-slate-600 transition-colors hover:bg-white/70 hover:text-blue-700'
          }
        >
          {item.label}
        </button>
      );
    })}
  </nav>
);

export default CiViewTabs;
