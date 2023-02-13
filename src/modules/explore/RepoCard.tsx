import React from 'react';
import {
  getAnalyzeLink,
  getNameSpace,
  getPathname,
  getProvider,
  getRepoName,
} from '@common/utils';
import { SiGitee } from 'react-icons/si';
import { AiFillGithub } from 'react-icons/ai';
import MiniChart from '@common/components/EChartX/MiniChart';
import Link from 'next/link';

const RepoCard = (props: { label: string; chartData?: number[] }) => {
  const { label, chartData } = props;
  const repo = getRepoName(label);
  const nameSpace = getNameSpace(label);
  const provider = getProvider(label);

  return (
    <Link key={label} href={getAnalyzeLink({ label: label, level: 'repo' })}>
      <div className="cursor-pointer border py-4 px-6">
        <div className="h-20">
          <p className="mb-1 truncate break-words text-xl font-bold hover:underline">
            {repo}
          </p>
          <p className="h-6 truncate text-sm text-gray-400">{nameSpace}</p>
        </div>
        <div className="flex w-full items-center">
          <div className="mr-auto flex-1">
            {provider ? (
              provider === 'gitee' ? (
                <SiGitee className="inline-block h-5 w-5 text-[#c71c27]" />
              ) : (
                <AiFillGithub className="inline-block h-5 w-5 text-[#000000]" />
              )
            ) : (
              ''
            )}
          </div>
          <MiniChart data={chartData} />
        </div>
      </div>
    </Link>
  );
};

export default RepoCard;
