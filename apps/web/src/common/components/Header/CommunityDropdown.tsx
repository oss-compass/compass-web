import React from 'react';
import Image from 'next/image';
import LinkX from '@common/components/LinkX';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { AiFillCaretDown } from 'react-icons/ai';
import Slack from '@public/images/logos/slack.svg';
import Wechat from '@public/images/logos/wechat.svg';
import Github from '@public/images/logos/github.svg';
import GiteeRed from '@public/images/logos/gitee-red.svg';
import BlogLogo from '@public/images/logos/blog.svg';
import TencentMeeting from '@public/images/logos/tencentmeeting.svg';

const categoryClass =
  'flex cursor-pointer text-gray-300 items-center py-4 pl-6';

const subItemClass =
  'flex cursor-pointer items-center py-2 pl-6 hover:bg-[#333333]';

const borderBottomClass = 'border-b border-white/20';
const borderTopClass = 'border-t border-white/20';

const Discussion = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className={classnames(categoryClass)}>
        {t('common:community.discussion')}
      </div>
      <div className={classnames('pb-4', borderBottomClass)}>
        <LinkX href="/docs/community/slack" passHref legacyBehavior>
          <a target="_blank" className={classnames(subItemClass)}>
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
          <a target="_blank" className={classnames(subItemClass)}>
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
        <LinkX href="/docs/community/metting/" passHref legacyBehavior>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className={classnames(subItemClass)}
          >
            <div className="mr-4 w-8">
              <TencentMeeting />
            </div>
            <div>
              <p className="text-base">{t('common:community.meeting')}</p>
              <p className="text-sm text-white/50">
                {t('common:community.join_meeting')}
              </p>
            </div>
          </a>
        </LinkX>
      </div>
    </>
  );
};

const RepoLinks = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className={classnames(categoryClass)}>
        {t('common:community.code_base')}
      </div>
      <div className={classnames('pb-4', borderBottomClass)}>
        <LinkX href="https://github.com/oss-compass" passHref legacyBehavior>
          <a
            target="_blank"
            className={classnames(subItemClass)}
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
            className={classnames(subItemClass)}
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
    </>
  );
};

const Blog = () => {
  const { t } = useTranslation();
  return (
    <LinkX href="/blog" passHref legacyBehavior>
      <a className={classnames(categoryClass, 'hover:bg-[#333333]')}>
        <div className="mr-4 w-8">
          <BlogLogo />
        </div>
        <div>{t('common:header.blog')}</div>
      </a>
    </LinkX>
  );
};

const CommunityDropdown = () => {
  const { t } = useTranslation();

  return (
    <div className="group relative flex h-full items-center transition">
      <div className="flex cursor-pointer items-center justify-center py-3 px-7 group-hover:bg-[#333333] 2xl:px-4">
        <a className={'font-medium text-white'}>
          {t('common:header.community')}
        </a>
        <AiFillCaretDown color="#fff" className="ml-2" />
      </div>

      <div className="z-dropdown absolute top-[100%] hidden w-[360px] group-hover:block">
        <div className="mt-[2px] bg-black/95 text-white">
          <Discussion />
          <RepoLinks />
          <Blog />
        </div>
      </div>
    </div>
  );
};

export default CommunityDropdown;
