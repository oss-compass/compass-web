import React, { useState } from 'react';
import { FloatButton, Drawer, Popover } from 'antd';
import useLabelData from '@modules/oh/hooks/useLabelData';
import { CommentOutlined } from '@ant-design/icons';
import CommentBox from './CommentBox';
import { useGetReportData } from '@modules/oh/components/GraduationReport/ReportPage/store/useReportStore';

const Comment = () => {
  const { taskId } = useLabelData();
  const [open, setOpen] = useState(false);
  const { count } = useGetReportData();
  return (
    <>
      {taskId && (
        <>
          {
            <Popover content="讨论">
              <FloatButton
                onClick={() => {
                  setOpen(true);
                }}
                style={{ bottom: 20, right: 20 }}
                badge={{ count: count, color: 'blue' }}
                icon={<CommentOutlined rev={undefined} />}
              />
            </Popover>
          }
          <Drawer
            width={560}
            placement="right"
            onClose={() => {
              setOpen(false);
            }}
            open={open}
            title={<div className="flex justify-between">讨论</div>}
          >
            <CommentBox taskId={Number(taskId)} />
          </Drawer>
        </>
      )}
    </>
  );
};
export default Comment;
