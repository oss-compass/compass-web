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
 * 全圆角分段样式：灰底胶囊导航组 + 两端呈半圆的白底选中项。
 */
const OverviewModuleTabs: React.FC<OverviewModuleTabsProps> = ({
  active,
  onChange,
}) => (
  <nav
    aria-label="总览模块"
    className="flex min-w-max items-center gap-1 rounded-full bg-[var(--overview-slateBorder)] px-1.5 py-[3px] shadow-[inset_0_1px_3px_rgba(var(--overview-text-rgb),0.06)]"
  >
    {MODULES.map((item) => {
      const isActive = item.key === active;
      return (
        <button
          key={item.key}
          type="button"
          data-management-control="navigation"
          aria-current={isActive ? 'page' : undefined}
          onClick={() => onChange(item.key)}
          className={
            isActive
              ? 'inline-flex items-center rounded-full bg-[var(--overview-white)] px-5 py-1 text-sm font-semibold text-[var(--overview-text)] shadow-[0_1px_4px_rgba(var(--overview-text-rgb),0.08)]'
              : 'inline-flex items-center rounded-full px-5 py-1 text-sm font-semibold text-[var(--overview-text)] transition-colors hover:bg-[var(--overview-slateBorder)]'
          }
        >
          {item.label}
        </button>
      );
    })}
  </nav>
);

export default OverviewModuleTabs;
