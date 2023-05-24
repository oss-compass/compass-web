import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEventEmitter } from 'ahooks';
import { EventEmitter } from 'ahooks/lib/useEventEmitter';
import classnames from 'classnames';
import { HiOutlineChevronRight } from 'react-icons/hi';
import { useTranslation } from 'next-i18next';
import { CollectionMenu } from '../explore/type';
import style from './SideMenus.module.scss';

const MenuItem = ({
  menu,
  event$,
}: {
  menu: CollectionMenu;
  event$: EventEmitter<boolean>;
}) => {
  const { query } = useRouter();
  const [expand, setExpand] = useState(false);
  const { i18n } = useTranslation();
  const nameKey = i18n.language === 'zh' ? 'name_cn' : 'name';

  event$.useSubscription((b) => {
    setExpand(b);
  });

  useEffect(() => {
    const active = menu?.items_info?.find?.(
      (item) => item.slug === `/${query.slug}`
    );

    if (active) {
      setExpand(true);
    }
  }, [menu.items_info, query.slug]);

  return (
    <div key={menu.ident} className="mt-1">
      <div
        onClick={() => {
          if (expand) {
            setExpand(false);
          } else {
            event$.emit(false);
            setExpand(true);
          }
        }}
        className={classnames(
          style.menu,
          'flex h-[31px] cursor-pointer items-center justify-between rounded pl-3'
        )}
      >
        <div
          className={classnames('text-sm font-bold text-gray-700', {
            '!text-primary': expand,
          })}
        >
          {menu[nameKey]}
        </div>
        <div className={classnames('rounded-md px-2 py-1', style.menuArrow)}>
          <HiOutlineChevronRight
            className={classnames('text-xl text-gray-400 transition-all', {
              'rotate-90': expand,
            })}
          />
        </div>
      </div>

      <div
        className={classnames(style.menuBox, 'pl-3', {
          '!h-auto overflow-visible': expand,
          'h-0 overflow-hidden ': !expand,
        })}
      >
        {menu.items_info.map((item) => {
          const active = `/${query.slug}` === item.slug;
          return (
            <Link key={item.ident} href={`/collection${item.slug}`}>
              <a
                className={classnames(
                  style.menu,
                  'mt-1 flex h-[31px] cursor-pointer items-center justify-between rounded pl-3',
                  { [style.menuActive]: active }
                )}
              >
                <span
                  className={classnames('text-sm font-bold text-gray-700', {
                    '!text-primary': active,
                  })}
                >
                  {item[nameKey]}
                </span>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const SideMenus = ({ menus }: { menus: CollectionMenu[] }) => {
  const { t } = useTranslation();
  const event$ = useEventEmitter<boolean>();

  return (
    <div className="flex h-full w-[272px] flex-col border-r bg-white md:hidden">
      <div className="thin-scrollbar overflow-y-auto">
        <div className="mb-4 flex items-center justify-between pt-4 pl-5">
          <div className="text-xl font-medium">
            {t('collection:collections')}
          </div>
        </div>

        <div className="px-2 pb-4">
          {menus.map((menu) => {
            return <MenuItem menu={menu} key={menu.ident} event$={event$} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SideMenus;
