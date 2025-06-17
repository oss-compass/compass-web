import React, { useState, useEffect } from 'react';
import { ReloadOutlined } from '@ant-design/icons';
import { useUserInfo } from '@modules/auth/useUserInfo';
import { Popover } from 'antd';
import { useTriggerTpcSoftwareSelectionReportMutation } from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { toast } from 'react-hot-toast';

const RefreshReport = ({ report, editSuccess }) => {
  const { currentUser } = useUserInfo();
  const mutation = useTriggerTpcSoftwareSelectionReportMutation(client, {
    onSuccess(data) {
      if (data.triggerTpcSoftwareSelectionReport.status == 'true') {
        toast.success('操作成功');
        editSuccess && editSuccess();
      } else {
        toast.error(data.triggerTpcSoftwareSelectionReport.message);
      }
    },
    onError(res) {
      //   toast.error(res?.message);
    },
  });
  if (report?.tpcSoftwareReportMetric?.status === 'again_progress') {
    return null;
  }
  return (
    <>
      {currentUser?.id === report.userId && (
        <Popover content={'重跑报告'}>
          <ReloadOutlined
            onClick={() => {
              mutation.mutate({
                reportId: report.id,
              });
              //   anction(record);
            }}
          />
        </Popover>
      )}
    </>
  );
};

export default RefreshReport;
