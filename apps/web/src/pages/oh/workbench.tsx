import React from 'react';
import { GetServerSideProps } from 'next';
import NoSsr from '@common/components/NoSsr';
import getLocalesFile from '@common/utils/getLocalesFile';
import { Main } from '@common/components/Layout';
import NavBar from '@modules/oh/NavBar';
import SideBar from '@modules/oh/SideBar';
import DataView from '@modules/oh/DataView';
import OhRole from '@modules/oh/components/OhRole';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['analyze', 'oh'])),
    },
  };
};
const Workbench = () => {
  return (
    <NoSsr>
      <OhRole>
        <NavBar />
        <Main>
          <SideBar />
          <div className="relative flex min-w-0 flex-1 flex-col bg-gray-50 px-4 pt-4 md:p-0">
            <DataView />
          </div>
        </Main>
      </OhRole>
    </NoSsr>
  );
};

export default Workbench;
