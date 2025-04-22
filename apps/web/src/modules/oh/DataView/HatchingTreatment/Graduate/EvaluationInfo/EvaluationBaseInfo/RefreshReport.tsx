import React from 'react';
import { ReloadOutlined } from '@ant-design/icons';
import { useUserInfo } from '@modules/auth/useUserInfo';
import { Popover } from 'antd';
import { useTriggerTpcSoftwareGraduationReportMutation } from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { toast } from 'react-hot-toast';

const RefreshReport = ({ report, editSuccess }) => {
  const { currentUser } = useUserInfo();
  const mutation = useTriggerTpcSoftwareGraduationReportMutation(client, {
    onSuccess(data) {
      if (data.triggerTpcSoftwareGraduationReport.status == 'true') {
        toast.success('操作成功');
        editSuccess && editSuccess();
      } else {
        toast.error(data.triggerTpcSoftwareGraduationReport.message);
      }
    },
    onError(res) {
      //   toast.error(res?.message);
    },
  });
  if (report?.graduationReportMetric?.status === 'again_progress') {
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
