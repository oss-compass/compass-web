import React, { useState, useMemo } from 'react';
import { Button, Drawer, Popover } from 'antd';
import useLabelData from '@modules/oh/hooks/useLabelData';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { useGetReportData } from '@modules/oh/components/Report/ReportPage/store/useReportStore';
import { useUserInfo } from '@modules/auth/useUserInfo';

const Comment = () => {
  const { taskId } = useLabelData();
  const { currentUser } = useUserInfo();
  const userId = currentUser?.id;
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
          <div className="oh mb-4 flex items-center gap-2">
            <div className="oh text-base font-semibold">评审意见：</div>
            <div className="flex gap-2">
              <Button
                className="flex items-center !rounded-none"
                type="primary"
              >
                <CheckOutlined rev={undefined} />
                通过
              </Button>
              <Button
                onClick={() => {}}
                className="flex items-center !rounded-none"
                type="primary"
              >
                <CloseOutlined rev={undefined} />
                驳回
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default Comment;
