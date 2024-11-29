import React from 'react';
import NotFoundOh from '@modules/oh/components/NotFoundOh';
import Loading from '@modules/oh/components/Loading';
import EvaluationDetail from '@modules/oh/components/EvaluationInfo/EvaluationDetail';
import { useTpcSoftwareSelectionReportQuery } from '@oss-compass/graphql';
import client from '@common/gqlClient';

const GetReportData = ({
  shortCode,
  canClarify,
  targetSoftware = null,
  back,
}: {
  shortCode: any;
  canClarify: boolean;
  targetSoftware?: string;
  back?: () => void;
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
        back={back}
        refetch={refetch}
        targetSoftware={targetSoftware}
      />
    </>
  );
};

export default GetReportData;
