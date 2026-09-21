import React from 'react';
import { useRouter } from 'next/router';
import { buildExperienceOverviewHref } from '../../DeveloperExperience/routes';
import OverviewModuleTabs, { type OverviewModule } from './OverviewModuleTabs';

type ManagementModuleNavProps = {
  active: OverviewModule;
};

/** 管理页顶部沿用总览的模块导航，切换时进入对应模块的总览。 */
const ManagementModuleNav: React.FC<ManagementModuleNavProps> = ({
  active,
}) => {
  const router = useRouter();
  const org =
    typeof router.query.org === 'string' ? router.query.org : undefined;

  return (
    <header className="sticky top-0 z-30 flex h-12 flex-none items-center gap-3 overflow-x-auto border-b border-[var(--overview-slateBorder)] bg-[var(--overview-slateSoft)] px-4 shadow-[0_1px_4px_rgba(var(--overview-text-rgb),0.04)] [scrollbar-width:none] md:px-6 [&::-webkit-scrollbar]:hidden">
      <OverviewModuleTabs
        active={active}
        onChange={(module) => {
          void router.push(
            `${buildExperienceOverviewHref({ org })}?module=${module}`
          );
        }}
      />
    </header>
  );
};

export default ManagementModuleNav;
