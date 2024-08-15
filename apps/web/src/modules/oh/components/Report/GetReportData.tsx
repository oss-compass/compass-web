import React from 'react';
import NotFoundOh from '@modules/oh/components/NotFoundOh';
import Loading from '@modules/oh/components/Loading';
import EvaluationDetail from '@modules/oh/components/EvaluationInfo/EvaluationDetail';
import { useTpcSoftwareSelectionReportQuery } from '@oss-compass/graphql';
import client from '@common/gqlClient';

const GetReportData = ({
  shortCode,
  back,
  targetSoftware = null,
}: {
  shortCode: any;
  back?: () => void;
  targetSoftware?: string;
}) => {
  const { isLoading, data, refetch } = useTpcSoftwareSelectionReportQuery(
    client,
    {
      shortCode,
    }
  );
  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-170px)] min-w-[688px] flex-col bg-white drop-shadow-sm">
        <Loading />
      </div>
    );
  }
  if (!data?.tpcSoftwareSelectionReport) {
    return (
      <div className="flex h-[calc(100vh-170px)] min-w-[688px] flex-col bg-white drop-shadow-sm">
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
        back={back}
        refetch={refetch}
        targetSoftware={targetSoftware}
      />
    </>
  );
};

export default GetReportData;
