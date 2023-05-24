import Header from '@common/components/Header';
import React from 'react';
import { useTranslation } from 'next-i18next';
import SideMenus from './SideMenus';
import MainContent from './MainContent';
import classnames from 'classnames';
import { Collection } from '../explore/type';
import jsonData from '../../../script/tmp/collections.json';
import menusData from '../../../script/tmp/menus.json';

const collections = jsonData as unknown as Record<string, Collection>;

const Collection = () => {
  const { t } = useTranslation();
  const items = Object.keys(collections).map((k) => collections[k]);

  return (
    <>
      <Header />
      <div
        className={classnames(
          'flex h-[calc(100vh-80px)] w-full bg-[#FAFAFA]',
          'md:h-[calc(100vh-44px)]'
        )}
      >
        <SideMenus menus={menusData} />
        <MainContent items={items} />
      </div>
    </>
  );
};

export default Collection;
