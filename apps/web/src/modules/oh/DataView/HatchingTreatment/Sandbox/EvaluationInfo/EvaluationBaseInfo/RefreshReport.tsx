import React from 'react';
import { ReloadOutlined } from '@ant-design/icons';
import { useUserInfo } from '@modules/auth/useUserInfo';
import { Popover } from 'antd';
import { useTriggerTpcSoftwareSandboxReportMutation } from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { toast } from 'react-hot-toast';

const RefreshReport = ({ report, editSuccess }) => {
  const { currentUser } = useUserInfo();
  const mutation = useTriggerTpcSoftwareSandboxReportMutation(client, {
    onSuccess(data) {
      if (data.triggerTpcSoftwareSandboxReport.status == 'true') {
        toast.success('操作成功');
        editSuccess && editSuccess();
      } else {
        toast.error(data.triggerTpcSoftwareSandboxReport.message);
      }
    },
    onError(res) {},
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
            }}
          />
        </Popover>
      )}
    </>
  );
};

export default RefreshReport;
