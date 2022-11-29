import React from 'react';
import { GetServerSideProps } from 'next';
import Analyze from '@modules/analyze';
import {
  ConfigContextProvider,
  ChartThemeProvider,
} from '@modules/analyze/context';
import useLabelStatus from '@modules/analyze/hooks/useLabelStatus';
import getLocalesFile from '@common/utils/getLocalesFile';
import ColorThemeInit from '@modules/analyze/components/ColorThemeInit';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['analyze', 'metrics_models'])),
    },
  };
};

const AnalyzePage = () => {
  const { status, isLoading } = useLabelStatus();
  return (
    <ConfigContextProvider value={{ status, loading: isLoading }}>
      <ChartThemeProvider>
        <ColorThemeInit>
          <Analyze />
        </ColorThemeInit>
      </ChartThemeProvider>
    </ConfigContextProvider>
  );
};

export default AnalyzePage;
