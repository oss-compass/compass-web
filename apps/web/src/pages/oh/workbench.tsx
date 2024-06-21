import React from 'react';
import { GetServerSideProps } from 'next';
import NoSsr from '@common/components/NoSsr';
import getLocalesFile from '@common/utils/getLocalesFile';
import OhRole from '@modules/oh/components/OhRole';
import Workbench from '@modules/oh/DataView/HatchingTreatment/Workbench';
import Header from '@common/components/Header';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['analyze', 'oh'])),
    },
  };
};
const WorkbenchPage = () => {
  return (
    <NoSsr>
      <OhRole>
        <Workbench name={'TPC'} />
      </OhRole>
    </NoSsr>
  );
};

export default WorkbenchPage;
