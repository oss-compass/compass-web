import React from 'react';
import { GetServerSideProps } from 'next';
import AuthRequire from '@modules/auth/AuthRequire';
import getLocalesFile from '@common/utils/getLocalesFile';
import NoSsr from '@common/components/NoSsr';
import Header from '@common/components/Header';
import AnalyzePage from '@modules/lab/model/Analyze';
import ModelVersionProvider from '@modules/lab/model/Provider/ModelVersionProvider';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['lab', 'lab_metrics'])),
    },
  };
};

const LoadingUi = () => (
  <div className=" flex-1 animate-pulse space-y-4">
    <div className="h-6 rounded bg-slate-200"></div>
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2 h-6 rounded bg-slate-200"></div>
      <div className="col-span-1 h-6 rounded bg-slate-200"></div>
    </div>
    <div className="h-6 rounded bg-slate-200"></div>
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-1 h-6 rounded bg-slate-200"></div>
      <div className="col-span-2 h-6 rounded bg-slate-200"></div>
    </div>
    <div className="h-6 rounded bg-slate-200"></div>
  </div>
);

const VersionCreate = () => {
  return (
    <NoSsr>
      <Header />
      <AuthRequire loadingClassName="px-6 py-6 w-full">
        <ModelVersionProvider
          loadingClassName="px-6 py-6"
          loadingUi={<LoadingUi />}
        >
          <AnalyzePage />
        </ModelVersionProvider>
      </AuthRequire>
    </NoSsr>
  );
};

export default VersionCreate;
