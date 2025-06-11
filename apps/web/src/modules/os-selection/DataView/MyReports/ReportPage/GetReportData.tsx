import React from 'react';
import NotFoundOh from './NotFoundOh';
import Loading from './Loading';
import EvaluationDetail from './EvaluationInfo/EvaluationDetail';
import { useTpcSoftwareSelectionReportQuery } from '@oss-compass/graphql';
import client from '@common/gqlClient';

const GetReportData = ({
  shortCode,
  canClarify = false,
}: {
  shortCode: any;
  canClarify?: boolean;
}) => {
  const { isLoading, data, refetch } = useTpcSoftwareSelectionReportQuery(
    client,
    {
      shortCode,
    }
  );
  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-170px)] min-w-[688px] flex-col bg-white drop-shadow-sm lg:h-[calc(100vh-138px)]">
        <Loading />
      </div>
    );
  }
  if (!data?.tpcSoftwareSelectionReport) {
    return (
      <div className="flex h-[calc(100vh-170px)] min-w-[688px] flex-col bg-white drop-shadow-sm lg:h-[calc(100vh-138px)]">
        <NotFoundOh />
      </div>
    );
  }
  const reportPermission = (report, permission) => {
    return { ...report, ...permission };
  };
  return (
    <>
      <EvaluationDetail
        item={reportPermission(
          data?.tpcSoftwareSelectionReport,
          data?.tpcSoftwareReportMetricClarificationPermission
        )}
        canClarify={canClarify}
        refetch={refetch}
      />
    </>
  );
};

export default GetReportData;
