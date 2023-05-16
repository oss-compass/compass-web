import React, { useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import { AiFillGithub, AiOutlineLink, AiOutlinePlus } from 'react-icons/ai';
import classnames from 'classnames';
import { SiGitee } from 'react-icons/si';
import { useTranslation } from 'react-i18next';
import useProviderInfo from '@modules/auth/useProviderInfo';

export const getIcons = (type: string) => {
  switch (type) {
    case 'github':
      return <AiFillGithub />;
    case 'gitee':
      return <SiGitee color="#c71c27" />;
    default:
      return null;
  }
};

const AddSelectPopover: React.FC<{
  open: boolean;
  onClose: () => void;
  className?: string;
  onSelect: (v: 'input' | 'select') => void;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}> = ({ className, onSelect, onClick, open, onClose }) => {
  const { t } = useTranslation();
  const { providerUser: user } = useProviderInfo();
  const provider = user?.provider!;
  const ref = useRef<HTMLDivElement>(null);

  useClickAway(ref, () => {
    onClose();
  });

  const providerName = provider === 'github' ? 'GitHub' : 'Gitee';

  return (
    <div className={classnames('relative z-10 mt-4', className)}>
      <button
        type="button"
        className="flex items-center text-primary"
        onClick={(e) => onClick(e)}
      >
        <AiOutlinePlus /> {t('submit_project:add_repository')}
      </button>

      {open && (
        <div
          className="absolute top-8 left-0 w-[330px] border-2 border-black bg-white drop-shadow-xl"
          ref={ref}
        >
          <div
            className="flex cursor-pointer items-center py-4 pl-3 hover:bg-gray-100"
            onClick={() => {
              onSelect('select');
            }}
          >
            {getIcons(provider)}
            <p className="ml-2 text-sm font-medium">
              {t('submit_project:select_your_own_repository_on', {
                providerName: providerName,
              })}
            </p>
          </div>
          <div
            className="flex cursor-pointer items-center px-3 py-4 hover:bg-gray-100"
            onClick={() => {
              onSelect('input');
            }}
          >
            <AiOutlineLink />
            <p className="ml-2 text-sm font-medium">
              {t('submit_project:type_the_address_of_any_repository')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddSelectPopover;
