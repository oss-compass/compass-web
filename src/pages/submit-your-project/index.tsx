import React, { useEffect } from 'react';
import { GetServerSidePropsContext } from 'next';
import useAuthRedirect from '@modules/auth/useAuthRedirect';
import Header from '@common/components/Header';
import Banner from '@modules/submitProject/Misc/Banner';
import SubmitProject from '@modules/submitProject';
import FormSingleRepo from '@modules/submitProject/FormSingleRepo';
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

const SubmitYourProject = () => {
  const { t } = useTranslation();
  useAuthRedirect();

  return (
    <>
      <Header />
      <Banner content={t('submit_project:submit_your_project')} />
      <SubmitProject>
        <FormSingleRepo />
      </SubmitProject>
    </>
  );
};

export default SubmitYourProject;
