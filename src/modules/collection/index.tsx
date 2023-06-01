import Header from '@common/components/Header';
import React from 'react';
import { useTranslation } from 'next-i18next';
import SideMenus from './SideMenus';
import MainContent from './MainContent';
import classnames from 'classnames';
import jsonData from '@public/data/collections.json';
import menusData from '@public/data/collections—menus.json';
import { Collection } from '../explore/type';

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
