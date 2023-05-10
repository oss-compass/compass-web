import React from 'react';
import Header from '@common/components/Header';
import Banner from '@modules/submitProject/Misc/Banner';
import SubmitProject from '@modules/submitProject';
import FormCommunity from '@modules/submitProject/FormCommunity';
import { GetServerSidePropsContext } from 'next';
import { UserInfoProvider } from '@modules/auth/UserInfoContext';
import getLocalesFile from '@common/utils/getLocalesFile';
import { useTranslation } from 'react-i18next';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['submit_project'])),
    },
  };
}

const SubmitYourProject: React.FC = () => {
  const { t } = useTranslation();
  return (
    <UserInfoProvider>
      <Header />
      <Banner content={t('submit_project:submit_your_project')} />
      <SubmitProject>
        <FormCommunity />
      </SubmitProject>
    </UserInfoProvider>
  );
};

export default SubmitYourProject;
