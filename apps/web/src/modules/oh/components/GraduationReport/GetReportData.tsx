import React from 'react';
import NotFoundOh from '@modules/oh/components/NotFoundOh';
import Loading from '@modules/oh/components/Loading';
import EvaluationDetail from '@modules/oh/components/GraduationEvaluationInfo/EvaluationDetail';
import { useTpcSoftwareGraduationReportQuery } from '@oss-compass/graphql';
import client from '@common/gqlClient';

const GetReportData = ({
  canClarify = false,
  shortCode,
  back,
  targetSoftware = null,
}: {
  canClarify?: boolean;
  shortCode: any;
  back?: () => void;
  targetSoftware?: string;
}) => {
  const { isLoading, data, refetch } = useTpcSoftwareGraduationReportQuery(
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
  if (!data?.tpcSoftwareGraduationReport) {
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
        canClarify={canClarify}
        item={reportPermission(
          data.tpcSoftwareGraduationReport,
          data.tpcSoftwareReportMetricClarificationPermission
        )}
        back={back}
        refetch={refetch}
      />
    </>
  );
};

export default GetReportData;
