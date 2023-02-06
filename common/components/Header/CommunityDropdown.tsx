import React from 'react';
import Link from 'next/link';
import LinkX from '@common/components/LinkX';
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

      <div className="absolute top-[100%] z-dropdown hidden w-[360px] group-hover:block">
        <div className="mt-[2px] bg-black/90 text-white">
          <LinkX href="/docs/community/slack" passHref legacyBehavior>
            <a target="_blank" className={classnames(itemClass, borderClass)}>
              <div className="mr-4 w-8">
                <Slack />
              </div>
              <div>
                <p className="text-base">{t('common:community.slack')}</p>
                <p className="text-sm text-white/50">
                  {t('common:community.join_slack')}
                </p>
              </div>
            </a>
          </LinkX>

          <LinkX href="/docs/community/wechat" passHref legacyBehavior>
            <a target="_blank" className={classnames(itemClass, borderClass)}>
              <div className="mr-4 w-8">
                <Wechat />
              </div>
              <div>
                <p className="text-base">{t('common:community.wechat')}</p>
                <p className="text-sm text-white/50">
                  {t('common:community.join_wechat')}
                </p>
              </div>
            </a>
          </LinkX>

          <LinkX href="https://github.com/oss-compass" passHref legacyBehavior>
            <a
              target="_blank"
              className={classnames(itemClass, borderClass)}
              rel="noopener noreferrer"
            >
              <div className="mr-4 w-8">
                <Github />
              </div>
              <div>
                <p className="text-base">{t('common:community.github')}</p>
                <p className="text-sm text-white/50">
                  {t('common:community.official_repository_on_github')}
                </p>
              </div>
            </a>
          </LinkX>

          <LinkX href="https://gitee.com/oss-compass" passHref legacyBehavior>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className={classnames(itemClass)}
            >
              <div className="mr-4 w-8">
                <GiteeRed />
              </div>
              <div>
                <p className="text-base">{t('common:community.gitee')}</p>
                <p className="text-sm text-white/50">
                  {t('common:community.official_repository_on_gitee')}
                </p>
              </div>
            </a>
          </LinkX>
        </div>
      </div>
    </div>
  );
};

export default CommunityDropdown;
