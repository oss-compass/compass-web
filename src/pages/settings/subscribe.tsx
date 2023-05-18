import React from 'react';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'react-i18next';
import AuthRequire from '@modules/auth/AuthRequire';
import Header from '@common/components/Header';
import Banner from '@modules/submitProject/Misc/Banner';
import Subscribe from '@modules/settings/subscribe';
import getLocalesFile from '@common/utils/getLocalesFile';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, [])),
    },
  };
};

const SubscribePage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Header />
      <Banner content="Subscription" />
      <AuthRequire className="mx-auto w-[1000px] py-10 md:w-full md:px-6">
        <Subscribe />
      </AuthRequire>
    </>
  );
};

export default SubscribePage;
