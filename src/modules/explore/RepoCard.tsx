import React, { useEffect, useState } from 'react';
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
import classnames from 'classnames';

const RepoCard = (props: {
  label: string;
  chartData?: number[];
  checked?: boolean;
  checkedFun?: (pre: boolean, label: string) => void;
}) => {
  const { label, chartData, checked, checkedFun } = props;
  const repo = getRepoName(label);
  const nameSpace = getNameSpace(label);
  const provider = getProvider(label);
  useEffect(() => {
    if (!checked) setSelect(false);
  }, [checked]);
  const [select, setSelect] = useState(false);
  return (
    <div
      className={classnames('relative cursor-pointer  py-4 px-6', {
        'border-blue-600': select,
        'border-2': select,
        border: !select,
      })}
    >
      <div className="absolute top-2 right-3">
        {checked && (
          <input
            type="checkbox"
            onChange={(e) => {
              setSelect(e.target.checked);
              checkedFun && checkedFun(e.target.checked, label);
            }}
          />
        )}
      </div>
      <Link key={label} href={getAnalyzeLink({ label: label, level: 'repo' })}>
        <div className="h-20">
          <p className="mb-1 truncate break-words text-xl font-bold hover:underline">
            {repo}
          </p>
          <p className="h-6 truncate text-sm text-gray-400">{nameSpace}</p>
        </div>
      </Link>

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
  );
};

export default RepoCard;
