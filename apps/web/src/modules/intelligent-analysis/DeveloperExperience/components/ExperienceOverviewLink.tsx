import React from 'react';
import Link from 'next/link';
import { AppstoreOutlined } from '@ant-design/icons';
import { buildExperienceOverviewHref } from '../routes';

type ExperienceOverviewLinkProps = {
  org?: string;
};

const ExperienceOverviewLink: React.FC<ExperienceOverviewLinkProps> = ({
  org,
}) => (
  <Link
    href={buildExperienceOverviewHref({ org })}
    className="inline-flex h-9 flex-none items-center gap-2 rounded-xl px-3 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950"
  >
    <AppstoreOutlined className="text-[13px]" />
    <span>总览看板</span>
  </Link>
);

export default ExperienceOverviewLink;
