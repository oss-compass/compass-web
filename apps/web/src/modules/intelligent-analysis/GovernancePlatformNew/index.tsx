import React from 'react';
import { useRouter } from 'next/router';
import { ArrowRightOutlined } from '@ant-design/icons';
import { PROJECTS_CONFIG } from '../config/projects';

const GovernancePlatformNewOverview: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-full bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.14),_transparent_34%),linear-gradient(180deg,#f4feff_0%,#f8fafc_38%,#eef8fb_100%)]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-[32px] border border-cyan-100 bg-white/90 p-8 shadow-[0_24px_80px_rgba(14,116,144,0.10)] backdrop-blur">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-700">
              Governance Platform New
            </div>
            <h1
              className="text-4xl font-semibold leading-tight text-slate-900"
              style={{ fontFamily: '"Crimson Pro", serif' }}
            >
              以技术栈为核心的信息聚合与识别工作台
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              新版页面不再平铺仓库、组织、开发者表格，而是先围绕技术栈形成总览判断，再聚焦重点高校与伙伴组织、潜在开发者线索，并将明细能力收束到详情入口。
            </p>
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">
                技术栈入口
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                选择一个技术栈进入新的治理分析视图。
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {PROJECTS_CONFIG.map((project) => (
              <button
                key={project.slug}
                type="button"
                className="group rounded-[28px] border border-slate-200 bg-white p-6 text-left shadow-[0_16px_40px_rgba(15,23,42,0.06)] transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-[0_22px_48px_rgba(8,145,178,0.14)]"
                onClick={() =>
                  router.push(
                    `/intelligent-analysis/governance-platform-new/${project.slug}`
                  )
                }
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-lg font-semibold text-slate-900">
                      {project.displayName}
                    </div>
                    <div className="mt-2 text-sm leading-6 text-slate-600">
                      开发者 {project.developers.toLocaleString()} · 组织{' '}
                      {project.organizations.toLocaleString()}
                    </div>
                  </div>
                  <span className="rounded-full bg-cyan-50 p-2 text-cyan-700 transition group-hover:bg-cyan-600 group-hover:text-white">
                    <ArrowRightOutlined />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default GovernancePlatformNewOverview;
