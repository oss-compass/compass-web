import React from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useSnapshot } from 'valtio';
import { getNameSpace, getProvider, getRepoName } from '@common/utils';
import { SiGitee } from 'react-icons/si';
import { AiFillGithub } from 'react-icons/ai';
import { formFiledState, FormFiledState, getKey } from '../state';

const labelIsSelect = (
  snapshot: DeepReadonly<FormFiledState>,
  label: string,
  extra: { levelFirst: string; levelSecond: string }
): boolean => {
  const key = getKey(extra.levelFirst, extra.levelSecond);
  if (snapshot.selected[key]) {
    const index = snapshot.selected[key].findIndex((i) => i === label);
    return index > -1;
  }
  return false;
};

const RepoCard = ({
  label,
  firstIdent,
  secondIdent,
  onSelect,
}: {
  label: string;
  firstIdent: string;
  secondIdent: string;
  onSelect: (label: string) => void;
}) => {
  const { t } = useTranslation();
  const snapshot = useSnapshot(formFiledState);
  const repo = getRepoName(label) || label;
  const nameSpace = getNameSpace(label);
  const provider = getProvider(label);

  const selected = labelIsSelect(snapshot, label, {
    levelFirst: firstIdent,
    levelSecond: secondIdent,
  });

  return (
    <div
      className={classnames('relative cursor-pointer bg-white', [
        selected ? ['border-blue-600', 'border-2'] : ['border', 'p-px'],
      ])}
      onClick={() => onSelect(label)}
    >
      <div className="py-2.5 px-4">
        <div className="absolute bottom-1.5 right-4">
          <input checked={selected} type="checkbox" onChange={() => {}} />
        </div>

        <div>
          <p className={classnames('mb-1 truncate break-words font-bold ')}>
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
    </div>
  );
};

export default RepoCard;
