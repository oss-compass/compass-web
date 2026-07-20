import React from 'react';
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';

type ReportComingSoonProps = {
  accent: 'amber' | 'blue';
  description: string;
  moduleName: string;
  org?: string;
};

const accentStyles = {
  amber: {
    glow: 'bg-amber-300/30',
    icon: 'bg-amber-100 text-amber-700 ring-amber-200',
    tag: 'border-amber-200 bg-amber-50 text-amber-700',
  },
  blue: {
    glow: 'bg-sky-300/30',
    icon: 'bg-sky-100 text-sky-700 ring-sky-200',
    tag: 'border-sky-200 bg-sky-50 text-sky-700',
  },
} as const;

const ReportComingSoon: React.FC<ReportComingSoonProps> = ({
  accent,
  description,
  moduleName,
  org,
}) => {
  const styles = accentStyles[accent];

  return (
    <div className="relative flex min-h-full items-center justify-center overflow-hidden bg-[linear-gradient(145deg,#eef3fb_0%,#f8fafc_52%,#edf4fb_100%)] px-5 py-14">
      <div
        aria-hidden="true"
        className={`absolute left-[12%] top-[18%] h-48 w-48 rounded-full blur-3xl ${styles.glow}`}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-[10%] right-[8%] h-56 w-56 rounded-full bg-slate-300/25 blur-3xl"
      />

      <section className="relative w-full max-w-[760px] overflow-hidden rounded-[28px] border border-white/90 bg-white/90 p-8 shadow-[0_28px_80px_rgba(15,23,42,0.12)] backdrop-blur md:p-12">
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#94a3b8,transparent)] opacity-50" />

        <div
          className={`mb-7 inline-flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ring-1 ${styles.icon}`}
        >
          <ClockCircleOutlined />
        </div>

        <div
          className={`mb-4 inline-flex rounded-full border px-3 py-1 text-xs font-bold tracking-[0.08em] ${styles.tag}`}
        >
          REPORT PLACEHOLDER
        </div>

        <h1 className="text-3xl font-bold tracking-[-0.03em] text-slate-950 md:text-4xl">
          {moduleName}
        </h1>
        <p className="mt-4 max-w-[620px] text-base leading-7 text-slate-600">
          {description}
        </p>

        <div className="mt-8 grid gap-3 border-t border-slate-200 pt-6 sm:grid-cols-3">
          {['页面路由已就绪', '模块切换已就绪', '等待报告内容'].map(
            (item, index) => (
              <div
                key={item}
                className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-600 ring-1 ring-slate-200/70"
              >
                {index < 2 ? (
                  <CheckCircleOutlined className="text-emerald-600" />
                ) : (
                  <ClockCircleOutlined className="text-amber-600" />
                )}
                {item}
              </div>
            )
          )}
        </div>

        {org ? (
          <p className="mt-5 text-xs font-medium text-slate-400">
            当前组织：<span className="text-slate-600">{org}</span>
          </p>
        ) : null}
      </section>
    </div>
  );
};

export default ReportComingSoon;
