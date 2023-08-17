import React, { useState } from 'react';
import OpenCommentDrawerFixedButton from './component/FixedCommentButton';
import CommentDrawer from './CommentDrawer';
import { SlugsVerifyContextProvider } from './context/StatusContext';
import LabDataProvider from './context/LabDataProvider';
import useLabelStatus from './hooks/useLabelStatus';
import { Loading, NotFoundAnalysis } from './status';
import ChartPanel from './ChartPanel';

const LeftPanelWithStatus = () => {
  const { notFound, isLoading } = useLabelStatus();
  if (isLoading) {
    return <Loading />;
  }
  if (notFound) {
    return <NotFoundAnalysis />;
  }
  return <ChartPanel />;
};

const LeftPanel = () => {
  const status = useLabelStatus();
  return (
    <SlugsVerifyContextProvider value={status}>
      <LabDataProvider>
        <LeftPanelWithStatus />
      </LabDataProvider>
    </SlugsVerifyContextProvider>
  );
};

const LabAnalyzePage = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="relative flex flex-1">
      <div className="bg-smoke relative min-w-0 flex-1">
        <LeftPanel />
      </div>

      <CommentDrawer
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />

      {open ? null : (
        <OpenCommentDrawerFixedButton
          onClick={() => {
            setOpen(true);
          }}
        />
      )}
    </div>
  );
};

export default LabAnalyzePage;
