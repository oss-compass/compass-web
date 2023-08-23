import React, { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import OpenCommentDrawerFixedButton from './component/FixedCommentButton';
import CommentDrawer from './CommentDrawer';
import { SlugsVerifyContextProvider } from './context/StatusContext';
import LabDataProvider from './context/LabDataProvider';
import useLabelStatus from './hooks/useLabelStatus';
import { Loading, NotFoundAnalysis } from './status';
import ChartPanel from './ChartPanel';
import { useLabModelVersion } from '../hooks';
import { NotSuccess } from './status';
import { pageState, actions } from './state';

const LeftPanelWithStatus = () => {
  const { notFound, isLoading } = useLabelStatus();
  const { data: modelVersion } = useLabModelVersion();

  if (isLoading) {
    return <Loading />;
  }
  if (notFound) {
    return <NotFoundAnalysis />;
  }

  const versionStatus = modelVersion.labModelVersion?.triggerStatus;
  if (versionStatus !== 'success') {
    return <NotSuccess status={versionStatus} />;
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
  const { data: modelVersion } = useLabModelVersion();

  useEffect(() => {
    actions.reset();
    if (modelVersion?.labModelVersion) {
      const { id, version } = modelVersion?.labModelVersion;
      actions.onCurrentVersionChange({ id, version });
    }
  }, [modelVersion]);

  return (
    <div className="relative flex flex-1">
      <div className="relative min-w-0 flex-1 bg-[#f9f9f9]">
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
