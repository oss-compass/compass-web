import React from 'react';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'react-i18next';
import AuthRequire from '@modules/auth/AuthRequire';
import getLocalesFile from '@common/utils/getLocalesFile';
import NoSsr from '@common/components/NoSsr';
import Header from '@common/components/Header';
import ModelDetail from '@modules/lab/model/Detail';
import MyModelsBanner from '@modules/lab/model/components/MyModelsBanner';
import ModelDetailProvider from '@modules/lab/model/Provider/ModelDetailProvider';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, [
        'lab',
        'lab_metrics',
        'lab_models',
      ])),
    },
  };
};

const Deatil = () => {
  const { t } = useTranslation();
  return (
    <NoSsr>
      <Header />
      <MyModelsBanner text={t('lab:model_detail')} />
      <AuthRequire loadingClassName="mx-auto w-[1200px] py-10 md:w-full">
        <ModelDetailProvider loadingClassName="mx-auto w-[1200px] lg:w-full md:px-4 py-10">
          <ModelDetail />
        </ModelDetailProvider>
      </AuthRequire>
    </NoSsr>
  );
};

export default Deatil;
