import React from 'react';
import { Input, Tabs } from 'antd';
import NotFoundOh from '@modules/oh/components/NotFoundOh';
import Loading from '@modules/oh/components/Loading';
import EvaluationDetail from '@modules/oh/components/EvaluationInfo/EvaluationDetail';
import {
  TpcSoftwareSelectionReportQuery,
  useTpcSoftwareSelectionReportQuery,
} from '@oss-compass/graphql';
import client from '@common/gqlClient';

const GetReportData = ({
  shortCode,
  back,
}: {
  shortCode: any;
  back?: () => void;
}) => {
  const { isLoading, data } = useTpcSoftwareSelectionReportQuery(client, {
    shortCode,
  });
  if (isLoading) {
    return (
      <div className="relative flex h-[calc(100vh-170px)] flex-1 flex-col bg-white drop-shadow-sm">
        <Loading />;
      </div>
    );
  }
  return (
    <>
      <EvaluationDetail
        item={data.tpcSoftwareSelectionReport}
        back={() => {
          back();
        }}
      />
    </>
  );
};

export default GetReportData;
