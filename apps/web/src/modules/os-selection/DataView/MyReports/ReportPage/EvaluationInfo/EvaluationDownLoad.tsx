import React, { useState } from 'react';
import { useTpcSoftwareSelectionReportRowQuery } from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { Popover } from 'antd';
import { DownloadOutlined, LoadingOutlined } from '@ant-design/icons';
import { useMerticDetailData } from './MerticDetail';
import { useTranslation } from 'next-i18next';

const DownloadReportRow = ({ item, setLoadingDownLoad }) => {
  const { downloadReport } = useMerticDetailData();
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
  const { t } = useTranslation('os-selection');
  const [loadingDownLoad, setLoadingDownLoad] = useState(false);
  return (
    <>
      {loadingDownLoad ? (
        <DownloadReportRow
          item={item}
          setLoadingDownLoad={setLoadingDownLoad}
        />
      ) : (
        <Popover content={t('mertic_detail.download_csv')}>
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
