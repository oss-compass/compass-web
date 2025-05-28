import React from 'react';
import { Button, Popover } from 'antd';
import toast from 'react-hot-toast';
import useLabelData from '@modules/oh/hooks/useLabelData';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { useAcceptTpcSoftwareSelectionMutation } from '@oss-compass/graphql';
import gqlClient from '@common/gqlClient';
import {
  useGetReportData,
  ReportStore,
  ReportEvent,
} from '@modules/oh/DataView/HatchingTreatment/Hatch/Report/ReportPage/store/useReportStore';

const Qasubmit = ({ selectionId }) => {
  const { taskId } = useLabelData();
  const { commentQaPermission } = useGetReportData();
  const mutation = useAcceptTpcSoftwareSelectionMutation(gqlClient);
  const passApprove = (state) => {
    mutation.mutate(
      {
        selectionId,
        memberType: 4,
        state,
      },
      {
        onSuccess: (res) => {
          if (res.acceptTpcSoftwareSelection.status === 'true') {
            ReportStore.event$?.emit(ReportEvent.REFRESH);
            toast.success(`${state === 0 ? '取消' : '操作'}成功`);
          } else {
            toast.error(res.acceptTpcSoftwareSelection.message);
          }
        },
      }
    );
  };
  if (!taskId) return <></>;
  return (
    <>
      <div className="oh mb-4 flex items-center gap-2">
        <div className="oh text-base font-semibold">报告评审(QA确认)：</div>
        <Popover
          content={
            commentQaPermission ? '' : '您不是该软件的QA人员，暂无权限审批'
          }
        >
          <div className="flex gap-2">
            <Button
              disabled={!commentQaPermission}
              onClick={() => {
                passApprove(1);
              }}
              className="flex items-center !rounded-none"
              type="primary"
            >
              <CheckOutlined />
              通过
            </Button>
            <Button
              disabled={!commentQaPermission}
              onClick={() => passApprove(0)}
              className="flex items-center !rounded-none"
              type="primary"
            >
              <CloseOutlined />
              驳回
            </Button>
          </div>
        </Popover>
      </div>
    </>
  );
};
export default Qasubmit;
