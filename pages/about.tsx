import React from 'react';
import type { GetStaticProps } from 'next';
import { Header, Center } from '@common/components/Layout';
import FooterLinks from '@common/components/FooterLinks';
import Copyright from '@common/components/Copyright';
import AboutContent from '@modules/about';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  console.log('locale', locale);
  return {
    props: {
      ...(await serverSideTranslations(locale as string)),
    },
  };
};

const About: React.FC = (props) => {
  return (
    <>
      <Header />
      <main>
        <AboutContent />
      </main>
      <footer>
        <Center>
          <FooterLinks />
        </Center>
        <Copyright />
      </footer>
    </>
  );
};

export default About;
