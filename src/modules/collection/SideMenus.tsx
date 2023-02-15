import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AiOutlinePlusSquare } from 'react-icons/ai';
import { Collection } from '../explore/type';
import jsonData from '../../../script/tmp/collections.json';
import classnames from 'classnames';
import { useTranslation } from 'next-i18next';

const collections = jsonData as unknown as Record<string, Collection>;

const SideMenus = () => {
  const router = useRouter();
  const { slug } = router.query;
  const items = Object.keys(collections).map((k) => collections[k]);
  const { t, i18n } = useTranslation();
  const nameKey = i18n.language === 'zh' ? 'name_cn' : 'name';

  return (
    <div className="flex h-full w-[272px] flex-col border-r bg-white py-4 px-4">
      <div className="mb-4 flex items-center justify-between px-2">
        <div className="text-xl font-medium">{t('collection:collections')}</div>
        <div
          className="cursor-pointer text-2xl text-gray-500"
          onClick={() => {
            window.location.href =
              'https://github.com/oss-compass/compass-projects-information';
          }}
        >
          <AiOutlinePlusSquare />
        </div>
      </div>

      <div className="overflow-y-auto">
        {items.map((i) => {
          return (
            <Link key={i.ident} href={`/collection${i.slug}`}>
              <a
                className={classnames(
                  'block h-8 cursor-pointer rounded px-2 text-sm leading-8 transition-all',
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
