import React, { useEffect } from 'react';
import { GetServerSidePropsContext } from 'next';
import AuthRequire from '@modules/auth/AuthRequire';
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

  return (
    <>
      <Header />
      <Banner content={t('submit_project:submit_your_project')} />
      <AuthRequire className="mx-auto w-[1000px] py-10 md:w-full md:px-6">
        <SubmitProject>
          <FormSingleRepo />
        </SubmitProject>
      </AuthRequire>
    </>
  );
};

export default SubmitYourProject;
