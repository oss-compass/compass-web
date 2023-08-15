import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  getAnalyzeLink,
  getNameSpace,
  getShortAnalyzeLink,
  getProvider,
  getRepoName,
} from '@common/utils';
import { SiGitee } from 'react-icons/si';
import { AiFillGithub } from 'react-icons/ai';
import classnames from 'classnames';

const RepoCard = (props: {
  label: string;
  shortCode: string;
  compareMode?: boolean;
  onSelectChange?: (
    pre: boolean,
    value: { label: string; shortCode: string }
  ) => void;
}) => {
  const router = useRouter();
  const modelId = Number(router.query.model);
  const versionId = Number(router.query.version);

  const { label, shortCode, compareMode, onSelectChange } = props;

  const repo = getRepoName(label);
  const nameSpace = getNameSpace(label);
  const provider = getProvider(label);
  const [select, setSelect] = useState(false);

  useEffect(() => {
    if (!compareMode) setSelect(false);
  }, [compareMode]);

  const item = (
    <>
      <div className="py-4 px-6">
        <div className="absolute top-2 right-3">
          {compareMode && (
            <input checked={select} type="checkbox" onChange={() => {}} />
          )}
        </div>
        <div>
          <div className="h-20">
            <p
              className={classnames(
                'mb-1 truncate break-words text-xl font-bold ',
                { 'hover:underline': !compareMode }
              )}
            >
              {repo}
            </p>
            <p className="h-6 truncate text-sm text-gray-400">{nameSpace}</p>
          </div>
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
        </div>
      </div>
    </>
  );

  if (compareMode) {
    return (
      <div
        className={classnames('relative cursor-pointer bg-white', [
          select ? ['border-blue-600', 'border-2'] : ['border', 'p-px'],
        ])}
        onClick={async () => {
          setSelect(!select);
          if (onSelectChange) {
            onSelectChange(!select, { label, shortCode });
          }
        }}
      >
        {item}
      </div>
    );
  }

  return (
    <Link
      href={`/lab/model/${modelId}/version/${versionId}/analyze/${shortCode}`}
      className="relative block cursor-pointer border bg-white p-px"
    >
      {item}
    </Link>
  );
};

export default RepoCard;
