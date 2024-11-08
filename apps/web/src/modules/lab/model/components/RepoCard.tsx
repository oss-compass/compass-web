import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getNameSpace, getProvider, getRepoName } from '@common/utils';
import { SiGitee } from 'react-icons/si';
import { AiFillGithub } from 'react-icons/ai';
import classnames from 'classnames';
import TriggerSingleBtn from './TriggerSingleBtn';
import ImageFallback from '@common/components/ImageFallback';
import ProviderIcon from '@common/components/ProviderIcon';

const Avatar = ({ logoUrl, origin }: { logoUrl: string; origin: string }) => {
  return (
    <div className="relative">
      <div className="h-8 w-8 overflow-hidden rounded-full border border-gray-100">
        <ImageFallback
          src={logoUrl || '/images/default.png'}
          unoptimized
          width={32}
          height={32}
          style={{
            objectFit: 'cover',
          }}
          fallbackSrc={'/images/default.png'}
          alt="logo"
        />
      </div>
      <div className="absolute -bottom-0 -right-0 z-10 h-4 rounded-full bg-white">
        {origin ? (
          origin === 'gitee' ? (
            <SiGitee className="h-4 w-4 text-[#c71c27]" />
          ) : (
            <AiFillGithub className="h-4 w-4 text-[#000000]" />
          )
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

const RepoCard = ({
  modelId,
  versionId,
  reportId,
  label,
  shortCode,
  selected,
  triggerStatus,
  triggerUpdatedAt,
  logoUrl,
  compareMode,
  onSelectChange,
}: {
  modelId: number;
  versionId: number;
  reportId: number;
  label: string;
  shortCode: string;
  selected: boolean;
  triggerStatus: string;
  logoUrl: string;
  triggerUpdatedAt: string;
  compareMode?: boolean;
  onSelectChange?: (
    pre: boolean,
    value: { label: string; shortCode: string }
  ) => void;
}) => {
  const router = useRouter();
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
        <div
          className={classnames('mb-2', {
            'cursor-pointer': !compareMode,
          })}
          onClick={() => {
            !compareMode &&
              router.push(
                `/lab/model/${modelId}/version/${versionId}/analyze/${shortCode}`
              );
          }}
        >
          <p
            className={classnames(
              'mb-1 truncate break-words text-base font-bold ',
              {
                'hover:underline': !compareMode,
              }
            )}
          >
            {repo}
          </p>
          <p className="truncate text-sm text-gray-400">{nameSpace}</p>
        </div>

        <div className="flex w-full items-center justify-between">
          <Avatar logoUrl={logoUrl} origin={provider} />
          {/* <div className="mr-auto flex-1">
            {provider ? (
              provider === 'gitee' ? (
                <SiGitee className="inline-block h-5 w-5 text-[#c71c27]" />
              ) : (
                <AiFillGithub className="inline-block h-5 w-5 text-[#000000]" />
              )
            ) : (
              ''
            )}
          </div> */}
          <TriggerSingleBtn
            projectUrl={label}
            reportId={reportId}
            triggerStatus={triggerStatus}
            triggerUpdatedAt={triggerUpdatedAt}
          />
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
    <div
      // href={`/lab/model/${modelId}/version/${versionId}/analyze/${shortCode}`}
      className="relative block border bg-white p-px"
    >
      {content}
    </div>
  );
};

export default RepoCard;
