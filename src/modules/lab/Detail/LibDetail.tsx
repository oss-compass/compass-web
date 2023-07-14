import React, { memo, PropsWithChildren } from 'react';
import Link from 'next/link';
import { FaInfoCircle } from 'react-icons/fa';
import HeaderWithFilterBar from '@modules/analyze/components/HeaderWithFitlerBar';
import { Main, Content } from '@common/components/Layout';
import DataView from './DataView';
import NoSsr from '@common/components/NoSsr';
import Footer from '@common/components/Footer';
import LegacyLabelRedirect from '@modules/analyze/components/Container/LegacyLabelRedirect';
import useLabelStatus from '@modules/analyze/hooks/useLabelStatus';
import { StatusContextProvider } from '@modules/analyze/context';
import PageInfoInit from '@modules/analyze/components/PageInfoInit';

const AnalyzeContainer: React.FC<PropsWithChildren> = ({ children }) => {
  const { status, isLoading, notFound, verifiedItems } = useLabelStatus();
  return (
    <NoSsr>
      <StatusContextProvider
        value={{ status, notFound, isLoading, verifiedItems }}
      >
        <PageInfoInit>{children}</PageInfoInit>
      </StatusContextProvider>
    </NoSsr>
  );
};

const Analyze = () => {
  return (
    <LegacyLabelRedirect isLab>
      <AnalyzeContainer>
        <HeaderWithFilterBar />
        <Main>
          <div className="relative flex min-w-0 flex-1 flex-col bg-gray-50 px-10 pt-4 md:p-0">
            <DataView />
            <Footer />
          </div>
        </Main>
      </AnalyzeContainer>
    </LegacyLabelRedirect>
  );
};

export default Analyze;
