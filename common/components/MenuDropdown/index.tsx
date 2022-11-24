import React, { PropsWithChildren } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { AiFillCaretDown } from 'react-icons/ai';
import Slack from './logo-slack.svg';
import Wechat from './logo-wechat.svg';

export const HeaderCommunityMenu = () => {
  const { t } = useTranslation();
  return (
    <div className="group relative flex h-full items-center transition">
      <div className="flex cursor-pointer items-center justify-center py-3 px-7 group-hover:bg-[#333333]">
        <a className={'font-medium text-white'}>
          {t('common:header.community')}
        </a>
        <AiFillCaretDown color="#fff" className="ml-2" />
      </div>
      <ul className="absolute top-[100%] z-dropdown hidden w-[360px] border-t-2 bg-black/90 text-white group-hover:block">
        <li className="flex cursor-pointer items-center border-b border-white/30 py-4 pl-6 hover:bg-[#333333]">
          <div className="mr-4 w-8">
            <Slack />
          </div>
          <Link href="/docs/community/slack" passHref legacyBehavior>
            <a target="_blank" rel="noopener noreferrer">
              <p className="text-base">{t('common:contact.slack')}</p>
              <p className="text-sm text-white/50">
                {t('common:contact.join_slack')}
              </p>
            </a>
          </Link>
        </li>
        <li className="flex cursor-pointer items-center py-4 pl-6 hover:bg-[#333333]">
          <div className="mr-4 w-8">
            <Wechat />
          </div>
          <Link href="/docs/community/wechat" passHref legacyBehavior>
            <a target="_blank" rel="noopener noreferrer">
              <div className="text-base">{t('common:contact.wechat')}</div>
              <div className="text-sm text-white/50">
                {t('common:contact.join_wechat')}
              </div>
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
};
