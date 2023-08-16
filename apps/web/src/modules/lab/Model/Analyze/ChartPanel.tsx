import React from 'react';
import { SlugsVerifyContextProvider } from './context/StatusContext';
import LabDataProvider from './context/LabDataProvider';
import useLabelStatus from './hooks/useLabelStatus';
import LabChart from './component/LabChart';
import { Loading, NotFoundAnalysis } from './status';

const ChartPanelWithStatus = () => {
  const { notFound, isLoading } = useLabelStatus();

  if (isLoading) {
    return <Loading />;
  }

  if (notFound) {
    return <NotFoundAnalysis />;
  }

  return <LabChart />;
};

const ChartPanel = () => {
  const status = useLabelStatus();
  return (
    <SlugsVerifyContextProvider value={status}>
      <LabDataProvider>
        <ChartPanelWithStatus />
      </LabDataProvider>
    </SlugsVerifyContextProvider>
  );
};

export default ChartPanel;
