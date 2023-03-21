import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import classnames from 'classnames';
import { useTranslation } from 'next-i18next';
import { Collection } from '../explore/type';

const SideMenus = ({ items }: { items: Collection[] }) => {
  const router = useRouter();
  const { slug } = router.query;
  const { t, i18n } = useTranslation();
  const nameKey = i18n.language === 'zh' ? 'name_cn' : 'name';

  return (
    <div className="flex h-full w-[272px] flex-col border-r bg-white pt-4 md:hidden">
      <div className="mb-4 flex items-center justify-between px-6">
        <div className="text-xl font-medium">{t('collection:collections')}</div>
        {/*<div*/}
        {/*  className="cursor-pointer text-2xl text-gray-500"*/}
        {/*  onClick={() => {*/}
        {/*    window.location.href =*/}
        {/*      'https://github.com/oss-compass/compass-projects-information';*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <AiOutlinePlusSquare />*/}
        {/*</div>*/}
      </div>

      <div className="overflow-y-auto px-4 pb-4">
        {items.map((i) => {
          return (
            <Link key={i.ident} href={`/collection${i.slug}`}>
              <a
                className={classnames(
                  'mb-0.5 block h-8 cursor-pointer rounded px-2 text-sm leading-8 transition-all',
                  'hover:bg-[#F8F9FB]',
                  { 'bg-[#F8F9FB] text-primary': `/${slug}` === i.slug }
                )}
              >
                {i[nameKey]}
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SideMenus;
