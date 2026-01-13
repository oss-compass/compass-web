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
        <LinkX
          href="/docs/community/slack"
          target="_blank"
          className={classnames(subItemClass)}
        >
          <div className="mr-4 w-8">
            <Slack />
          </div>
          <div>
            <p className="text-base">{t('common:community.slack')}</p>
            <p className="text-sm text-white/50">
              {t('common:community.join_slack')}
            </p>
          </div>
        </LinkX>
        <LinkX
          href="/docs/community/wechat"
          target="_blank"
          className={classnames(subItemClass)}
        >
          <div className="mr-4 w-8">
            <Wechat />
          </div>
          <div>
            <p className="text-base">{t('common:community.wechat')}</p>
            <p className="text-sm text-white/50">
              {t('common:community.join_wechat')}
            </p>
          </div>
        </LinkX>
        <LinkX
          href="/docs/community/metting/"
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
        <LinkX
          href="https://github.com/oss-compass"
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
        </LinkX>
        <LinkX
          href="https://gitee.com/oss-compass"
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
        </LinkX>
      </div>
    </>
  );
};

const Blog = () => {
  const { t } = useTranslation();
  return (
    <LinkX
      href="/blog"
      className={classnames(
        categoryClass,
        borderBottomClass,
        'hover:bg-[#333333]'
      )}
    >
      <div className="mr-4 w-8">
        <BlogLogo />
      </div>
      <p className="text-base text-white"> {t('common:header.news')}</p>
    </LinkX>
  );
};

const CommunityDropdown = () => {
  const { t } = useTranslation();

  return (
    <div className="group relative flex h-full items-center transition">
      <div className="flex cursor-pointer items-center justify-center px-7 py-3 group-hover:bg-[#333333] 2xl:px-4">
        <a className={'font-medium text-white'}>
          {t('common:header.community')}
        </a>
        <AiFillCaretDown color="#fff" className="ml-2" />
      </div>

      <div className="z-dropdown absolute top-[100%] hidden w-[360px] group-hover:block">
        <div className="mt-[2px] bg-black/95 text-white">
          {/* <div className='mt-4'>
            <LinkX
              href="/blog"
              className={
                'mx-4 flex-shrink-0 px-2.5 font-medium text-white xl:mx-1 2xl:mx-2'
              }
            >
              {t('common:header.news')}
            </LinkX>
          </div> */}
          <Blog />
          <Discussion />
          <RepoLinks />
        </div>
      </div>
    </div>
  );
};

export default CommunityDropdown;
