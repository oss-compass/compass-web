import React from 'react';
import LegacyLabelRedirect from './components/Container/LegacyLabelRedirect';
import AnalyzeContainer from './components/Container/AnalyzeContainer';
import { Main } from '@common/components/Layout';
import MetricDetailMore from './components/MetricDetail/MetricDetailMore';
import Header from '@common/components/Header';

const Analyze = () => {
  return (
    <LegacyLabelRedirect>
      <AnalyzeContainer>
        <Header />
        <Main>
          <MetricDetailMore />
        </Main>
      </AnalyzeContainer>
    </LegacyLabelRedirect>
  );
};

export default Analyze;
