import React from 'react';
import Image from 'next/image';
import LinkX from '@common/components/LinkX';
import { useTranslation } from 'react-i18next';
import { AiFillCaretDown } from 'react-icons/ai';
import BlogLogo from '@public/images/logos/blog.svg';
import classnames from 'classnames';
import Link from 'next/link';
import { useUserInfo } from '@modules/auth';

const categoryClass =
  'flex cursor-pointer text-gray-300 items-center py-4 pl-6';

const subItemClass =
  'flex cursor-pointer items-center py-2 pl-6 hover:bg-[#333333]';

const borderBottomClass = 'border-b border-white/20';
const borderTopClass = 'border-t border-white/20';

const Blog = () => {
  const { t } = useTranslation();
  return (
    <LinkX href="/blog" passHref legacyBehavior>
      <a
        className={classnames(
          categoryClass,
          borderBottomClass,
          'hover:bg-[#333333]'
        )}
      >
        <div className="mr-4 w-8">
          <BlogLogo />
        </div>
        {t('common:header.news')}
      </a>
    </LinkX>
  );
};

const MoreDropdown = () => {
  const { t } = useTranslation();
  const { roleLevel } = useUserInfo();

  return (
    <div className="group relative flex h-full items-center transition">
      <div className="flex cursor-pointer items-center justify-center py-3 px-7 group-hover:bg-[#333333] 2xl:px-4">
        <a className={'font-medium text-white'}>{t('common:header.more')}</a>
        <AiFillCaretDown color="#fff" className="ml-2" />
      </div>

      <div className="z-dropdown absolute top-[100%] hidden w-[250px] group-hover:block">
        <div className="mt-[2px] flex flex-col gap-6 bg-black/95 p-6 text-white">
          <Link
            href="/explore"
            className={'mx-4 px-2.5 font-medium text-white xl:mx-1 2xl:mx-2'}
          >
            {t('common:header.projects')}
          </Link>
          <Link
            href="/lab"
            className={'mx-4 px-2.5 font-medium text-white xl:mx-1 2xl:mx-2'}
          >
            {t('common:header.lab')}
          </Link>
          {roleLevel && roleLevel >= 1 && (
            <LinkX href="/oh" legacyBehavior>
              <a
                className={
                  'mx-4 flex-shrink-0 px-2.5 font-medium text-white 2xl:mx-2'
                }
              >
                OpenHarmony
              </a>
            </LinkX>
          )}
          {/* <LinkX href="/blog" passHref legacyBehavior>
                        <a className={classnames(categoryClass, borderBottomClass, 'hover:bg-[#333333]')}>
                            <div className="mr-4 w-8">
                                <BlogLogo />
                            </div>
                            {t('common:header.news')}
                        </a>
                    </LinkX> */}
          {/* <Blog /> */}
        </div>
      </div>
    </div>
  );
};

export default MoreDropdown;
