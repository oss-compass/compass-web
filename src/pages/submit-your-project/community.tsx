import React from 'react';
import Header from '@common/components/Header';
import Banner from '@modules/submitProject/Misc/Banner';
import SubmitProject from '@modules/submitProject';
import FormCommunity from '@modules/submitProject/FormCommunity';
import AuthRequire from '@modules/auth/AuthRequire';
import { GetServerSidePropsContext } from 'next';
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
    <>
      <Header />
      <Banner content={t('submit_project:submit_your_project')} />
      <AuthRequire className="mx-auto w-[1000px] py-10 md:w-full md:px-6">
        <SubmitProject>
          <FormCommunity />
        </SubmitProject>
      </AuthRequire>
    </>
  );
};

export default SubmitYourProject;
