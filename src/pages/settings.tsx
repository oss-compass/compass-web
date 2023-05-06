import React from 'react';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'react-i18next';
import Header from '@common/components/Header';
import Banner from '@modules/submitProject/Misc/Banner';
import ProfileSetting from '@modules/settings/ProfileSetting';
import getLocalesFile from '@common/utils/getLocalesFile';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, [])),
    },
  };
};

const Settings = () => {
  const { t } = useTranslation();
  return (
    <>
      <Header />
      <Banner content={'Account Settings'} />
      <ProfileSetting />
    </>
  );
};

export default Settings;
