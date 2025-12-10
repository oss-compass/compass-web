import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { getNameSpace, getProvider, getRepoName } from '@common/utils';
import { SiGitee } from 'react-icons/si';
import { AiFillGithub } from 'react-icons/ai';
import Image from 'next/image';
import classnames from 'classnames';
import TriggerSingleBtn from './TriggerSingleBtn';
import ImageFallback from '@common/components/ImageFallback';
import { getLabRange } from '@modules/lab/utils';

const Avatar = ({ logoUrl, origin }: { logoUrl: string; origin: string }) => {
  const hasOrigin = ['gitee', 'github', 'gitcode'].includes(origin);
  return (
    <div className="relative">
      <div className="h-8 w-8 overflow-hidden rounded-full border border-gray-300">
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
      {hasOrigin ? (
        origin === 'gitee' ? (
          <div className="absolute -bottom-0 -right-0 z-10 h-4 rounded-full bg-white">
            <SiGitee className="h-4 w-4 text-[#c71c27]" />
          </div>
        ) : origin === 'gitcode' ? (
          <div className="absolute -bottom-0 -right-0 z-10 h-4 rounded-full bg-white">
            <Image
              src="/images/logos/gitcode.png"
              alt="gitcode"
              width={16}
              height={16}
            />
          </div>
        ) : (
          <div className="absolute -bottom-0 -right-0 z-10 h-4 rounded-full bg-white">
            <AiFillGithub className="h-4 w-4 text-[#000000]" />
          </div>
        )
      ) : (
        ''
      )}
    </div>
  );
};

const RepoCard = ({
  model,
  label,
  shortCode,
  selected,
  triggerStatus,
  triggerUpdatedAt,
  logoUrl,
  compareMode,
  onSelectChange,
}: {
  model: any;
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
  const { t } = useTranslation();
  const router = useRouter();
  const repo = getRepoName(label) || label;
  const nameSpace = getNameSpace(label);
  const provider = getProvider(label);
  const { modelId, reportId, versionId } = model;

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
                `/lab/model/${modelId}/version/${versionId}/analyze/${shortCode}?range=${getLabRange(
                  model.metrics
                )}`
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
          {nameSpace ? (
            <p className="h-6 truncate text-sm text-gray-400">{nameSpace}</p>
          ) : (
            <div className="">
              <span className="h-5 rounded-[10px] bg-[#FFF9F2] px-1 py-0.5 text-xs text-[#D98523]">
                {t('lab:community')}
              </span>
            </div>
          )}
        </div>

        <div className="flex w-full items-center justify-between">
          <Avatar logoUrl={logoUrl} origin={provider} />
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
