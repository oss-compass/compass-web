import React, { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import OpenCommentDrawerFixedButton from './component/FixedCommentButton';
import CommentDrawer from './CommentDrawer';
import { SlugsVerifyContextProvider } from './context/StatusContext';
import LabDataProvider from './context/LabDataProvider';
import useLabelStatus from './hooks/useLabelStatus';
import { Loading, NotFoundAnalysis } from './status';
import ChartPanel from './ChartPanel';
import { pageState, actions } from './state';

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
  const state = useSnapshot(pageState);
  useEffect(() => {
    actions.reset();
  }, []);

  return (
    <div className="relative flex flex-1">
      <div className="bg-smoke relative min-w-0 flex-1">
        <LeftPanel />
      </div>

      <CommentDrawer
        open={state.commentDrawerOpen}
        onClose={() => {
          actions.toggleCommentDrawer(false);
        }}
      />

      {!state.commentDrawerOpen ? (
        <OpenCommentDrawerFixedButton
          onClick={() => {
            actions.toggleCommentDrawer(true);
          }}
        />
      ) : null}
    </div>
  );
};

export default LabAnalyzePage;
