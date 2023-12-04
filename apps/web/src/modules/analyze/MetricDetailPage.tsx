import React from 'react';
import LegacyLabelRedirect from './components/Container/LegacyLabelRedirect';
import AnalyzeContainer from './components/Container/AnalyzeContainer';
import { Main } from '@common/components/Layout';
import MetricDetail from '@modules/analyze/DataView/MetricDetail';
import Header from '@common/components/Header';

const Analyze = () => {
  return (
    <LegacyLabelRedirect>
      <AnalyzeContainer>
        <Header />
        <Main>
          <MetricDetail />
        </Main>
      </AnalyzeContainer>
    </LegacyLabelRedirect>
  );
};

export default Analyze;
