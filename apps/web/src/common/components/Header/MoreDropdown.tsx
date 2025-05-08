import React from 'react';
import Link from 'next/link';
import LinkX from '@common/components/LinkX';
import { useTranslation } from 'react-i18next';
import { AiFillCaretDown } from 'react-icons/ai';

const MoreDropdown = () => {
  const { t } = useTranslation();

  return (
    <div className="group relative flex h-full items-center transition">
      <div className="flex cursor-pointer items-center justify-center py-3 px-7 group-hover:bg-[#333333] xl:mx-1 2xl:px-4">
        <a className={'font-medium text-white'}>{t('common:header.more')}</a>
        <AiFillCaretDown color="#fff" className="ml-2" />
      </div>

      <div className="z-dropdown absolute top-[100%] hidden w-[160px] group-hover:block">
        <div className="mt-[2px] flex flex-col bg-black/95 text-white">
          <div className=">3xl:hidden border-b border-white/20 py-4 pl-6 hover:bg-[#333333] ">
            <LinkX href="/blog" legacyBehavior>
              <a className={'mx-4 flex-shrink-0 px-2.5 font-medium text-white'}>
                {t('common:header.news')}
              </a>
            </LinkX>
          </div>
          <div className=">3xl:hidden border-b border-white/20 py-4 pl-6 hover:bg-[#333333] ">
            <Link
              href="/about"
              className={'mx-4 px-2.5 font-medium text-white'}
            >
              {t('common:header.about')}
            </Link>
          </div>
          <div className="border-b border-white/20 py-4 pl-6 hover:bg-[#333333]">
            <Link
              href="/openApi"
              className={'mx-4 px-2.5 font-medium text-white'}
            >
              API
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreDropdown;
