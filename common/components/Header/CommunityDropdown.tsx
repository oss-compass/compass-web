import React from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { AiFillCaretDown } from 'react-icons/ai';
import Slack from '@common/svgs/slack.svg';
import Wechat from '@common/svgs/wechat.svg';
import Github from '@common/svgs/github.svg';
import GiteeRed from '@common/svgs/gitee-red.svg';

const itemClass =
  'flex cursor-pointer items-center py-4 pl-6 hover:bg-[#333333]';
const borderClass = 'border-b border-white/20';

const CommunityDropdown = () => {
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
        <li className={classnames(itemClass, borderClass)}>
          <div className="mr-4 w-8">
            <Slack />
          </div>
          <Link href="/docs/community/slack" passHref legacyBehavior>
            <a target="_blank">
              <p className="text-base">{t('common:community.slack')}</p>
              <p className="text-sm text-white/50">
                {t('common:community.join_slack')}
              </p>
            </a>
          </Link>
        </li>

        <li className={classnames(itemClass, borderClass)}>
          <div className="mr-4 w-8">
            <Wechat />
          </div>
          <Link href="/docs/community/wechat" passHref legacyBehavior>
            <a target="_blank">
              <div className="text-base">{t('common:community.wechat')}</div>
              <div className="text-sm text-white/50">
                {t('common:community.join_wechat')}
              </div>
            </a>
          </Link>
        </li>

        <li className={classnames(itemClass, borderClass)}>
          <div className="mr-4 w-8">
            <Github />
          </div>
          <Link href="https://github.com/oss-compass" passHref legacyBehavior>
            <a target="_blank" rel="noopener noreferrer">
              <div className="text-base">{t('common:community.github')}</div>
              <div className="text-sm text-white/50">
                {t('common:community.official_repository_on_github')}
              </div>
            </a>
          </Link>
        </li>

        <li className={classnames(itemClass)}>
          <div className="mr-4 w-8">
            <GiteeRed />
          </div>
          <Link href="https://gitee.com/oss-compass" passHref legacyBehavior>
            <a target="_blank" rel="noopener noreferrer">
              <div className="text-base">{t('common:community.gitee')}</div>
              <div className="text-sm text-white/50">
                {t('common:community.official_repository_on_gitee')}
              </div>
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default CommunityDropdown;
