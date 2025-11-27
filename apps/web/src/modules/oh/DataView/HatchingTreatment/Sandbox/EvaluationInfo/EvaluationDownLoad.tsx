import React, { useState } from 'react';
import { useTpcSoftwareSandboxReportRowQuery } from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { Popover } from 'antd';
import { DownloadOutlined, LoadingOutlined } from '@ant-design/icons';
import { downloadReport } from '@modules/oh/DataView/HatchingTreatment/Sandbox/EvaluationInfo/MerticDetail';

const DownloadReportRow = ({ item, setLoadingDownLoad }) => {
  useTpcSoftwareSandboxReportRowQuery(
    client,
    { shortCode: item.shortCode },
    {
      onSuccess: (data) => {
        item.tpcSoftwareReportMetricRaw =
          data?.tpcSoftwareSandboxReport?.tpcSoftwareSandboxReportMetricRaw;
        downloadReport(item);
        setLoadingDownLoad(false);
      },
      onError: (error) => {
        setLoadingDownLoad(false);
      },
    }
  );
  return <LoadingOutlined />;
};

const EvaluationDownLoad = ({ item }) => {
  const [loadingDownLoad, setLoadingDownLoad] = useState(false);
  return (
    <>
      {loadingDownLoad ? (
        <DownloadReportRow
          item={item}
          setLoadingDownLoad={setLoadingDownLoad}
        />
      ) : (
        <Popover content="下载 CSV">
          <div
            onClick={() => {
              setLoadingDownLoad(true);
            }}
            className=""
          >
            <DownloadOutlined />
          </div>
        </Popover>
      )}
    </>
  );
};
export default EvaluationDownLoad;
