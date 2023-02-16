import React from 'react';
import Header from '@common/components/Header';
import { Center } from '@common/components/Layout';
import FooterLinks from '@common/components/FooterLinks';
import Copyright from '@common/components/Copyright';
import AboutContent from '@modules/about';
import { GetServerSideProps } from 'next';
import getLocalesFile from '@common/utils/getLocalesFile';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['about'])),
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
