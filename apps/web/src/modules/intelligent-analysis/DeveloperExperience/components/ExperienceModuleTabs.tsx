import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { EXPERIENCE_MODULES, type ExperienceType } from '../experienceModules';
import {
  buildExperienceModuleHref,
  getExperienceModuleSwitchQuery,
} from '../routes';

type ExperienceModuleTabsProps = {
  activeType?: ExperienceType;
  org?: string;
};

const ExperienceModuleTabs: React.FC<ExperienceModuleTabsProps> = ({
  activeType,
  org,
}) => {
  const router = useRouter();

  return (
    <nav
      aria-label="开发者体验模块"
      className="flex min-w-max items-center gap-1 rounded-2xl border border-slate-200/80 bg-slate-100/80 p-1"
    >
      {EXPERIENCE_MODULES.map((item) => {
        const active = item.type === activeType;
        const query = getExperienceModuleSwitchQuery({
          sourceType: activeType,
          targetType: item.type,
          query: router.query,
        });
        const content = (
          <>
            <span className=">sm:inline hidden">{item.label}</span>
            <span className=">sm:hidden">{item.shortLabel}</span>
            {item.status === 'planned' ? (
              <span
                className={`>lg:inline-flex hidden rounded-full px-1.5 py-0.5 text-[10px] font-semibold leading-none ${
                  active
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-slate-200/80 text-slate-500 group-hover:bg-amber-100 group-hover:text-amber-700'
                }`}
              >
                待建设
              </span>
            ) : null}
          </>
        );

        if (active) {
          return (
            <span
              key={item.type}
              aria-current="page"
              className="inline-flex h-8 items-center gap-2 rounded-xl bg-white px-3 text-sm font-medium text-blue-700 shadow-[0_3px_12px_rgba(15,23,42,0.10)] ring-1 ring-slate-200/70"
            >
              {content}
            </span>
          );
        }

        return (
          <Link
            key={item.type}
            href={buildExperienceModuleHref(item.type, { org }, query)}
            className="group inline-flex h-8 items-center gap-2 rounded-xl px-3 text-sm font-medium text-slate-600 transition-all hover:bg-white/70 hover:text-slate-950"
          >
            {content}
          </Link>
        );
      })}
    </nav>
  );
};

export default ExperienceModuleTabs;
