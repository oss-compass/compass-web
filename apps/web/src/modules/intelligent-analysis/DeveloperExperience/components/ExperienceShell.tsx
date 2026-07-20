import React, { ReactNode } from 'react';
import type { ExperienceType } from '../experienceModules';
import ExperienceModuleTabs from './ExperienceModuleTabs';
import ExperienceOverviewLink from './ExperienceOverviewLink';

type ExperienceShellProps = {
  activeType?: ExperienceType;
  children: ReactNode;
  org?: string;
};

const ExperienceShell: React.FC<ExperienceShellProps> = ({
  activeType,
  children,
  org,
}) => (
  <div className="flex h-[100dvh] h-screen min-h-0 flex-col bg-[#eef2fa] text-slate-950">
    <header className=">md:px-6 relative z-20 flex h-16 flex-none items-center border-b border-slate-200/90 bg-white/95 px-4 shadow-[0_1px_0_rgba(15,23,42,0.02)] backdrop-blur">
      <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <ExperienceOverviewLink org={org} />
        <div className="h-6 w-px flex-none bg-slate-200" />
        <ExperienceModuleTabs activeType={activeType} org={org} />
      </div>

      {org ? (
        <div className=">md:flex ml-4 hidden flex-none items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
          {org}
        </div>
      ) : null}
    </header>

    <main className="min-h-0 flex-1 overflow-y-auto">{children}</main>
  </div>
);

export default ExperienceShell;
