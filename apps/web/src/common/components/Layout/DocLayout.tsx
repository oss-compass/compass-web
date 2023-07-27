import React, { PropsWithChildren } from 'react';
import Header from '@common/components/Header';
import { Center } from '@common/components/Layout';
import FooterLinks from '@common/components/FooterLinks';
import Copyright from '@common/components/Copyright';

const DocLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex h-full flex-col">
      <Header />
      <main className="mx-auto w-[1200px] flex-1 py-10 md:w-full">
        {children}
      </main>
      <footer>
        <Center>
          <FooterLinks />
        </Center>
        <Copyright />
      </footer>
    </div>
  );
};

export default DocLayout;
