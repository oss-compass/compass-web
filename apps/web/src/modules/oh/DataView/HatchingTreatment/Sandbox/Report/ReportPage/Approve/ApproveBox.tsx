import React from 'react';
import { List } from 'antd';
import { useGetReportData } from '@modules/oh/DataView/HatchingTreatment/Sandbox/Report/ReportPage/store/useReportStore';
import ApproveContent from '@modules/oh/components/CommonApprove/ApproveContent';
import CheckApprove from './CheckApprove';
import QaSubmit from './QaSubmits';

const ApproveBox = ({ selectionId }) => {
  const { commentState, state } = useGetReportData();
  return (
    <>
      {state === 4 ? (
        <QaSubmit selectionId={selectionId} />
      ) : (
        <CheckApprove selectionId={selectionId} />
      )}
      <List
        className="oh !rounded-none"
        size="large"
        header={
          <div className="flex justify-between">
            <div className="flex items-center text-base font-bold">
              <span className="mr-4">评审记录</span>
            </div>
          </div>
        }
        bordered
        dataSource={commentState}
        renderItem={(item, index) => (
          <List.Item
            key={index}
            className="relative flex flex-col !items-start"
          >
            <ApproveContent item={item} />
          </List.Item>
        )}
      />
    </>
  );
};
export default ApproveBox;
