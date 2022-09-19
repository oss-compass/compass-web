import React, { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Header, Main, Content } from '@common/components/BaseLayout';
import Footer from '@common/components/Footer';
import SideBar from './Misc/SideBar';
import NavBar from './Misc/NavBar';
import CompareBar from './Misc/CompareBar';
import { useAnalyzeConfigContext } from '@modules/analyze/context';
import { checkIsPadding } from '@modules/analyze/constant';

const DynamicDataView = dynamic(() => import('./DataView'), { ssr: false });

const View = () => {
  const { value } = useAnalyzeConfigContext();
  if (checkIsPadding(value.status)) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="mb-4">
          <Image
            src="/images/analyze/padding.gif"
            width={79}
            height={60}
            alt={'padding'}
          />
        </div>
        <p className="mb-2">
          The current project is under analysis, please visit later.
        </p>
        <Link href={'/'}>
          <a className="text-blue-600">Explore other projects</a>
        </Link>
      </div>
    );
  }
  return (
    <div className="w-full flex-1 xl:mx-auto xl:max-w-[1200px]">
      <CompareBar />
      <DynamicDataView />
    </div>
  );
};

const Analyze = memo(() => {
  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <NavBar />
      <Main>
        <SideBar />
        <Content>
          <View />
          <Footer />
        </Content>
      </Main>
    </div>
  );
});
Analyze.displayName = 'Analyze';

export default Analyze;
