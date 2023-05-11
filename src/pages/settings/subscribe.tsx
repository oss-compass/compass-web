import React from 'react';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'react-i18next';
import useAuthRedirect from '@modules/auth/useAuthRedirect';
import Header from '@common/components/Header';
import Banner from '@modules/submitProject/Misc/Banner';
import getLocalesFile from '@common/utils/getLocalesFile';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, [])),
    },
  };
};

const Subscribe = () => {
  const { t } = useTranslation();
  useAuthRedirect();
  return (
    <>
      <Header />
      <Banner content={''} />
    </>
  );
};

export default Subscribe;
