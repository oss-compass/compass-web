import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import Header from '@common/components/Header';
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
  const { query } = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    let t: number;
    if (query.error) {
      t = window.setTimeout(() => {
        toast.error((t) => <>{query.error}</>, {
          position: 'top-center',
        });
      }, 400);
    }
    return () => {
      t && clearTimeout(t);
    };
  }, [query.error]);

  return (
    <>
      <Header />
      <Banner content={t('setting:profile.account_settings')} />
      <AuthRequire className="mx-auto w-[1000px] py-10 md:w-full md:px-6">
        <ProfileSetting />
      </AuthRequire>
    </>
  );
};

export default Settings;
