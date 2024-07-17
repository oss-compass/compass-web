import React, { useState, useMemo } from 'react';
import { FloatButton, Drawer, Popover } from 'antd';
import useLabelData from '@modules/oh/hooks/useLabelData';
import {
  ExclamationOutlined,
  ClockCircleOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import { useGetReportData } from '@modules/oh/components/Report/ReportPage/store/useReportStore';
import { useUserInfo } from '@modules/auth/useUserInfo';
import ApproveBox from './ApproveBox';

const Comment = () => {
  const { taskId } = useLabelData();
  const { currentUser } = useUserInfo();
  const userId = currentUser.id;
  const [open, setOpen] = useState(false);
  const { commentState, commentCommitterPermission, commentSigLeadPermission } =
    useGetReportData();
  const hasRole = commentCommitterPermission || commentSigLeadPermission;

  const userCommentState = useMemo(() => {
    return (commentState || []).some((item) => item.userId === userId);
  }, [commentState, userId]);
  return (
    <>
      {taskId && (
        <>
          {!open && (
            <Popover content="审批">
              <FloatButton
                onClick={() => {
                  setOpen(true);
                }}
                style={{ bottom: 70, right: 20 }}
                badge={
                  hasRole && {
                    offset: [-6, 6],
                    count: userCommentState ? (
                      <CheckOutlined
                        className="rounded-full text-white"
                        rev={undefined}
                        style={{ backgroundColor: '#52c41a' }}
                      />
                    ) : (
                      <ExclamationOutlined
                        className="rounded-full text-white"
                        style={{ backgroundColor: '#ff0000' }}
                        rev={undefined}
                      />
                    ),
                  }
                }
              />
            </Popover>
          )}
          <Drawer
            width={560}
            placement="right"
            onClose={() => {
              setOpen(false);
            }}
            open={open}
            title={<div className="flex justify-between">审批</div>}
          >
            <ApproveBox selectionId={Number(taskId)} />
          </Drawer>
        </>
      )}
    </>
  );
};
export default Comment;
