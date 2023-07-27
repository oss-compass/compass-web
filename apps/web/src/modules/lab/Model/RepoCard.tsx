import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAnalyzeLink, getLabDetailLink } from '@common/utils';
import classnames from 'classnames';

type Repo = {
  path: string;
  origin: string;
  name?: string | null | undefined;
  type: string;
};

const RepoCard: React.FC<{
  repo: Repo;
  compareMode: boolean;
  onSelectChange?: (pre: boolean, label: string) => void;
}> = ({ repo, compareMode, onSelectChange }) => {
  const router = useRouter();
  const [select, setSelect] = useState(false);
  useEffect(() => {
    if (!compareMode) setSelect(false);
  }, [compareMode]);
  return (
    <div
      className={classnames(
        'relative h-[5.25rem] w-[12.5rem] cursor-pointer md:w-full',
        select
          ? ['border-blue-600', 'border-2']
          : ['border', 'p-px', '- [#CFCFCF] border']
      )}
      onClick={async () => {
        if (compareMode) {
          setSelect(!select);
          onSelectChange && onSelectChange(!select, repo.origin);
        } else {
          // go to analyze page
          await router.push(getLabDetailLink(repo));
        }
      }}
    >
      <div className="px-3 pt-3">
        <div className="absolute top-2 right-3">
          {compareMode && (
            <input checked={select} type="checkbox" onChange={() => {}} />
          )}
        </div>
        <div>
          <a className="mb-1 block">
            <div
              className="line-clamp-1 mb-1 break-words font-bold leading-5"
              title={repo.path || ''}
            >
              {repo.name}
            </div>
            <div className="truncate text-sm leading-4 text-gray-400">
              {repo.path?.split('/')[0]}
            </div>
          </a>
        </div>
        <div className="line-clamp-1 flex h-3.5 w-full cursor-pointer items-center text-xs text-[#585858]">
          <img
            className="mr-1 mb-1 inline-block h-3 w-3"
            src="/images/lab/datasets.png"
          />
          {repo.type}
        </div>
      </div>
    </div>
  );
};
export default RepoCard;
