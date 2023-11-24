import React from 'react';
import { useStatusContext } from '@modules/analyze/context';
import { checkIsPending } from '@modules/analyze/constant';
import CompareBar from '@modules/analyze/components/CompareBar';
import UnderAnalysis from './Status/UnderAnalysis';
import NotFoundAnalysis from './Status/NotFoundAnalysis';
import LoadingAnalysis from './Status/LoadingAnalysis';
import Charts from './Charts';
import ContributorDetail from './ContributorDetail';
import useVerifyDetailRange from '@modules/analyze/hooks/useVerifyDetailRange';
import AuthRequire from '@modules/auth/AuthRequire';
import { useTopicType } from '@modules/analyze/store';
import { useSnapshot } from 'valtio';

const DataView = () => {
  const { notFound, isLoading, status, verifiedItems } = useStatusContext();
  const { topicType } = useSnapshot(useTopicType);

  if (isLoading) {
    return <LoadingAnalysis />;
  }

  if (!notFound && checkIsPending(status)) {
    return <UnderAnalysis />;
  }

  if (notFound) {
    return <NotFoundAnalysis />;
  }

  let source;
  if (topicType === 'collaboration') {
    source = <CollaborationDataView />;
  } else {
    source = <ContributorDataView />;
  }
  return <div className="mx-auto w-full flex-1">{source}</div>;
};
const CollaborationDataView = () => {
  return (
    <>
      <CompareBar />
      <Charts />
    </>
  );
};
const ContributorDataView = () => {
  const { isLoading } = useVerifyDetailRange();
  // const statusFalse = !data?.verifyDetailDataRange?.status;
  // const { switchRange } = useSwitchRange();

  if (isLoading) {
    return <LoadingAnalysis />;
  }
  return (
    <>
      <AuthRequire>
        <ContributorDetail />
      </AuthRequire>
    </>
  );
};

export default DataView;
