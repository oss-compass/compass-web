import React from 'react';
import NavBar from '@modules/oh/NavBar';
import SideBar from '@modules/oh/SideBar';
import DataView from '@modules/oh/DataView';
import OhRole from '@modules/oh/components/OhRole';
import { Main } from '@common/components/Layout';

const Oh = () => {
  return (
    <>
      <NavBar />
      <Main>
        <SideBar />
        <div className="relative flex min-w-0 flex-1 flex-col bg-[#f2f2f2] px-4 pt-4 md:p-0">
          <DataView />
        </div>
      </Main>
    </>
  );
};

export default Oh;
