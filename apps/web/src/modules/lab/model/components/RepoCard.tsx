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

const RepoCard = ({
  modelId,
  versionId,
  label,
  shortCode,
  selected,
  compareMode,
  onSelectChange,
}: {
  modelId: number;
  versionId: number;
  label: string;
  shortCode: string;
  selected: boolean;
  compareMode?: boolean;
  onSelectChange?: (
    pre: boolean,
    value: { label: string; shortCode: string }
  ) => void;
}) => {
  const repo = getRepoName(label);
  const nameSpace = getNameSpace(label);
  const provider = getProvider(label);

  const content = (
    <>
      <div className="p-4">
        <div className="absolute top-2 right-3">
          {compareMode && (
            <input checked={selected} type="checkbox" onChange={() => {}} />
          )}
        </div>
        <div className="mb-2">
          <p
            className={classnames('mb-1 truncate break-words font-bold ', {
              'hover:underline': !compareMode,
            })}
          >
            {repo}
          </p>
          <p className="truncate text-sm text-gray-400">{nameSpace}</p>
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
          selected ? ['border-blue-600', 'border-2'] : ['border', 'p-px'],
        ])}
        onClick={async () => {
          onSelectChange?.(!selected, { label, shortCode });
        }}
      >
        {content}
      </div>
    );
  }

  return (
    <Link
      href={`/lab/model/${modelId}/version/${versionId}/analyze/${shortCode}`}
      className="relative block cursor-pointer border bg-white p-px"
    >
      {content}
    </Link>
  );
};

export default RepoCard;
