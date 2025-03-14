import React, { useState, useRef } from 'react';
import { List } from 'antd';
import { useGetReportData } from '@modules/oh/DataView/HatchingTreatment/Hatch/Report/ReportPage/store/useReportStore';
import ApproveContent from './ApproveContent';
import CheckApprove from './CheckApprove';

const ApproveBox = ({ selectionId }) => {
  const { commentState, commentCommitterPermission, commentSigLeadPermission } =
    useGetReportData();
  return (
    <>
      <CheckApprove selectionId={selectionId} />
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
