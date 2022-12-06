import React, { memo, PropsWithChildren } from 'react';
import Link from 'next/link';
import { FaInfoCircle } from 'react-icons/fa';
import HeaderWithFilterBar from '@modules/analyze/components/HeaderWithFitlerBar';
import { Main, Content } from '@common/components/Layout';
import DataView from './DataView';
import Footer from '@common/components/Footer';
import useLabelStatus from '@modules/analyze/hooks/useLabelStatus';
import { ConfigContextProvider } from '@modules/analyze/context';
import ColorThemeInit from '@modules/analyze/components/ColorThemeInit';

const AnalyzeWrap: React.FC<PropsWithChildren> = ({ children }) => {
  const { status, isLoading, isError } = useLabelStatus();
  return (
    <ConfigContextProvider value={{ status, isError, isLoading }}>
      <ColorThemeInit>{children}</ColorThemeInit>
    </ConfigContextProvider>
  );
};

const Analyze = () => {
  return (
    <AnalyzeWrap>
      <HeaderWithFilterBar />
      <Main>
        <div className="relative flex min-w-0 flex-1 flex-col bg-gray-50 px-10 pt-4 md:p-0">
          <div className="mb-4 flex items-center rounded border border-[#DDCAA0] bg-[#FFEBBC] py-2 px-3 text-[#876E35]">
            <FaInfoCircle className="mr-2 text-[#F9A001]" /> Basing on
            <span className="mx-2 font-bold">Model I</span>, an experimental
            model in Lab,
            <Link href="/">
              <a className="underline">know more about the model</a>
            </Link>
          </div>
          <DataView />
          <Footer />
        </div>
      </Main>
    </AnalyzeWrap>
  );
};

export default Analyze;
