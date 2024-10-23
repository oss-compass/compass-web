import React from 'react';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'react-i18next';
import getLocalesFile from '@common/utils/getLocalesFile';
import AuthRequire from '@modules/auth/AuthRequire';
import FlashToast from '@common/components/FlashToast';
import NoSsr from '@common/components/NoSsr';
import Header from '@common/components/Header';
import MyModelsBanner from '@modules/lab/model/components/MyModelsBanner';
import MyReport from '@modules/lab/report/My';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, [
        'lab',
        'lab_metrics',
        'collection',
      ])),
    },
  };
};

const Report = () => {
  const { t } = useTranslation();
  return (
    <NoSsr>
      <Header />
      <MyModelsBanner text={t('lab:my_model_reports')} />
      <FlashToast />
      <AuthRequire loadingClassName="mx-auto w-[1200px] py-10 md:w-full md:px-6">
        <MyReport />
      </AuthRequire>
    </NoSsr>
  );
};

export default Report;
