import React from 'react';
import { useTranslation } from 'next-i18next';
import Navber from '@modules/os-situation/components/NavBar';
import SideBar from '@modules/os-situation/components/SideBar';
import { useRouter } from 'next/router';
import ChartsLine from './ChartsLine';
import ChartsBar from './ChartsBar';
import { categoriesData } from './categoriesData';

import { Main, Content } from '@common/components/Layout';
import StickyNav from '@common/components/Header/StickyNav';
import Header from '@common/components/Header';

const MerticPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const metric = router.query.metric as string;

  return (
    <>
      <StickyNav className=">md:-top-[80px] md:-top-[48px]">
        <Header />
        <Navber defaultValue={metric} />
      </StickyNav>
      <Main>
        <SideBar />
        <Content>
          <div className="relative flex min-w-0 flex-1 flex-col bg-[#f9fafb] px-4 pt-4 md:p-2">
            {metric === 'import_export' ? (
              <ChartsBar />
            ) : (
              <ChartsLine metric={metric} />
            )}
          </div>
        </Content>
      </Main>
    </>
  );
};
export default MerticPage;
