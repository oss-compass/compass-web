import Header from '@common/components/Header';
import React from 'react';
import { useTranslation } from 'next-i18next';
import SideMenus from './SideMenus';
import MainContent from './MainContent';

const Collection = () => {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <div className="flex h-[calc(100vh-80px)] w-full bg-[#FAFAFA]">
        <SideMenus />
        <MainContent />
      </div>
    </>
  );
};

export default Collection;
