import React from 'react';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'react-i18next';
import Header from '@common/components/Header';
import Banner from '@modules/submitProject/Misc/Banner';
import useAuthRedirect from '@modules/auth/useAuthRedirect';
import ProfileSetting from '@modules/settings/profile';
import getLocalesFile from '@common/utils/getLocalesFile';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['setting'])),
    },
  };
};

const Settings = () => {
  const { t } = useTranslation();
  useAuthRedirect();

  return (
    <>
      <Header />
      <Banner content={t('setting:profile.account_settings')} />
      <ProfileSetting />
    </>
  );
};

export default Settings;
