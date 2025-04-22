import React, { useState, useEffect, useMemo } from 'react';
import { FloatButton, Popover, Modal } from 'antd';
import useLabelData from '@modules/oh/hooks/useLabelData';
import { ExclamationOutlined, CheckOutlined } from '@ant-design/icons';
import { useGetReportData } from '@modules/oh/DataView/HatchingTreatment/Hatch/Report/ReportPage/store/useReportStore';
import { useUserInfo } from '@modules/auth/useUserInfo';
import ApproveBox from '../Approve/ApproveBox';
import MerticApprove from './MerticApprove';

const Approve = () => {
  const { taskId } = useLabelData();
  const { currentUser } = useUserInfo();
  const userId = currentUser?.id;

  const {
    state,
    commentState,
    commentCommitterPermission,
    commentSigLeadPermission,
    commentCompliancePermission,
    commentLegalPermission,
  } = useGetReportData();

  const hasRole =
    commentCommitterPermission ||
    commentSigLeadPermission ||
    commentCompliancePermission ||
    commentLegalPermission;

  const [open, setOpen] = useState(hasRole);

  useEffect(() => {
    if (state === 2) {
      setOpen(hasRole);
    }
  }, [hasRole, state]);
  const userCommentState = useMemo(() => {
    return (commentState || []).some((item) => item.userId === userId);
  }, [commentState, userId]);
  const showPopover = useMemo(() => {
    return !open && hasRole;
  }, [hasRole, open]);
  if (!taskId) return <></>;
  return (
    <>
      {showPopover ? (
        <Popover content={'全部评审'}>
          <FloatButton
            onClick={() => {
              setOpen(true);
            }}
            style={{ bottom: 20, right: 20 }}
            badge={
              hasRole && {
                offset: [-6, 6],
                count: userCommentState ? (
                  <CheckOutlined
                    className="rounded-full text-white"
                    style={{ backgroundColor: '#52c41a' }}
                  />
                ) : (
                  <ExclamationOutlined
                    className="rounded-full text-white"
                    style={{ backgroundColor: '#ff0000' }}
                  />
                ),
              }
            }
          />
        </Popover>
      ) : (
        ''
      )}
      <Modal
        width={'90vw'}
        style={{
          maxWidth: '1000px',
          top: '10%',
        }}
        footer={null}
        onCancel={() => {
          setOpen(false);
        }}
        destroyOnClose={true}
        open={open}
        title={<div className="flex justify-between text-xl">全部评审</div>}
      >
        <div className="max-h-[75vh] overflow-y-auto px-4">
          <MerticApprove />
          <ApproveBox selectionId={Number(taskId)} />
        </div>
      </Modal>
    </>
  );
};
export default Approve;
