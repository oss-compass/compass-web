import React, { useState, useEffect } from 'react';
import { useTpcSoftwareSelectionReportRowQuery } from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { Popover, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { DownloadOutlined, LoadingOutlined } from '@ant-design/icons';
import { downloadReport } from '@modules/oh/DataView/HatchingTreatment/Hatch/EvaluationInfo/MerticDetail';

const DownloadReportRow = ({ item, setLoadingDownLoad }) => {
  useTpcSoftwareSelectionReportRowQuery(
    client,
    { shortCode: item.shortCode },
    {
      onSuccess: (data) => {
        item.tpcSoftwareReportMetricRaw =
          data?.tpcSoftwareSelectionReport?.tpcSoftwareReportMetricRaw;
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
  const dropdownItem: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a
          onClick={() => {
            setLoadingDownLoad(true);
          }}
        >
          下载 CSV
        </a>
      ),
    },
  ];
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
    // <Dropdown placement="bottom" menu={{ items: dropdownItem }}>
    //   {loadingDownLoad ? (
    //     <DownloadReportRow
    //       item={item}
    //       setLoadingDownLoad={setLoadingDownLoad}
    //     />
    //   ) : (
    //     <DownloadOutlined   />
    //   )}
    // </Dropdown>
  );
};
export default EvaluationDownLoad;
