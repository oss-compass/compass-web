import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'react-i18next';
import Header from '@common/components/Header';
import FlashToast from '@common/components/FlashToast';
import Banner from '@modules/submitProject/Misc/Banner';
import AuthRequire from '@modules/auth/AuthRequire';
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

  return (
    <>
      <Header />
      <Banner content={t('setting:profile.account_setting')} />
      <FlashToast />
      <AuthRequire className="mx-auto w-[1000px] py-10 md:w-full md:px-6">
        <ProfileSetting />
      </AuthRequire>
    </>
  );
};

export default Settings;
