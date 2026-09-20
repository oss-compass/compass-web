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
 * 药丸式分段样式：灰底内凹药丸组 + 激活项白底蓝字。
 */
const OverviewModuleTabs: React.FC<OverviewModuleTabsProps> = ({
  active,
  onChange,
}) => (
  <nav
    aria-label="总览模块"
    className="flex min-w-max items-center gap-1 rounded-[30px] bg-[var(--overview-slateBorder)] px-1.5 py-[3px] shadow-[inset_0_1px_3px_rgba(var(--overview-text-rgb),0.06)]"
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
              ? 'inline-flex items-center rounded-3xl bg-[var(--overview-white)] px-5 py-1 text-sm font-semibold text-[var(--overview-text)] shadow-[0_1px_4px_rgba(var(--overview-text-rgb),0.08)]'
              : 'inline-flex items-center rounded-3xl px-5 py-1 text-sm font-semibold text-[var(--overview-text)] transition-colors hover:bg-[var(--overview-slateBorder)]'
          }
        >
          {item.label}
        </button>
      );
    })}
  </nav>
);

export default OverviewModuleTabs;
