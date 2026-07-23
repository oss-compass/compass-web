import React from 'react';

/** 总览看板模块：社区入门 / 社区贡献 / 社区工程 */
export type OverviewModule = 'community-onboarding' | 'issue' | 'ci';

type OverviewModuleTabsProps = {
  active: OverviewModule;
  onChange: (module: OverviewModule) => void;
};

const MODULES: { key: OverviewModule; label: string }[] = [
  { key: 'community-onboarding', label: '社区入门' },
  { key: 'issue', label: '社区贡献' },
  { key: 'ci', label: '社区工程' },
];

/**
 * 总览看板顶部模块切换导航（状态驱动的页内切换）。
 * 样式对齐报告页 navbar（ExperienceModuleTabs）的药丸式分段。
 */
const OverviewModuleTabs: React.FC<OverviewModuleTabsProps> = ({
  active,
  onChange,
}) => (
  <nav
    aria-label="总览模块"
    className="flex min-w-max items-center gap-1 rounded-2xl border border-slate-200/80 bg-slate-100/80 p-1"
  >
    {MODULES.map((item) => {
      const isActive = item.key === active;
      return (
        <button
          key={item.key}
          type="button"
          aria-current={isActive ? 'page' : undefined}
          onClick={() => onChange(item.key)}
          className={
            isActive
              ? 'inline-flex h-8 items-center gap-2 rounded-xl bg-white px-3 text-sm font-medium text-blue-700 shadow-[0_3px_12px_rgba(15,23,42,0.10)] ring-1 ring-slate-200/70'
              : 'inline-flex h-8 items-center gap-2 rounded-xl px-3 text-sm font-medium text-slate-600 transition-all hover:bg-white/70 hover:text-slate-950'
          }
        >
          {item.label}
        </button>
      );
    })}
  </nav>
);

export default OverviewModuleTabs;
