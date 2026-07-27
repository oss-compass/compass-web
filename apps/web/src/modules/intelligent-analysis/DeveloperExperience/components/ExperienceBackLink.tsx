import React from 'react';
import Link from 'next/link';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { buildExperienceOverviewHref } from '../routes';

type ExperienceBackLinkProps = {
  org?: string;
  /** 返回后总览看板应切换到的模块 tab */
  module?: 'community-onboarding' | 'issue' | 'ci';
};

/** 模块对应的报告类型名（与总览看板 tab 文案一致） */
const MODULE_LABELS: Record<
  NonNullable<ExperienceBackLinkProps['module']>,
  string
> = {
  'community-onboarding': '社区入门',
  issue: '社区贡献',
  ci: '社区工程',
};

/**
 * 报告页返回总览看板按钮，右侧以竖线分隔展示当前报告类型。
 * 样式沿用社区入门报告页原「返回看板」按钮（UserJourney PageHeader）。
 */
const ExperienceBackLink: React.FC<ExperienceBackLinkProps> = ({
  org,
  module,
}) => (
  <span className="inline-flex flex-shrink-0 items-center gap-3">
    <Link
      href={`${buildExperienceOverviewHref({ org })}${
        module ? `?module=${module}` : ''
      }`}
      className="group inline-flex h-9 flex-shrink-0 items-center gap-2 rounded-full border border-white/80 bg-white px-3.5 text-sm font-semibold text-slate-700 shadow-[0_12px_30px_rgba(15,23,42,0.08)] backdrop-blur transition hover:-translate-y-0.5 hover:border-sky-200 hover:bg-white hover:text-sky-700 hover:shadow-[0_16px_36px_rgba(59,130,246,0.18)]"
    >
      <ArrowLeftOutlined className="text-xs transition-transform group-hover:-translate-x-0.5" />
      <span>返回看板</span>
    </Link>
    {module ? (
      <>
        <span className="text-[#c9cdd4]">|</span>
        <span className="text-lg font-semibold text-slate-900">
          {MODULE_LABELS[module]}
        </span>
      </>
    ) : null}
  </span>
);

export default ExperienceBackLink;
