import React from 'react';
import NotFoundOh from '@modules/oh/components/NotFoundOh';
import GetReportData from '@modules/oh/components/Report/GetReportData';
import useLabelData from '@modules/oh/hooks/useLabelData';
import Approve from '@modules/oh/components/Report/ReportPage/Approve';

const ReportPageItems = ({ reportItems, targetSoftware = null }) => {
  const { taskId } = useLabelData();
  if (!reportItems && reportItems === 0) {
    return <NotFoundOh />;
  }
  if (reportItems.length === 1) {
    return (
      <GetReportData
        shortCode={reportItems[0].shortCode}
        targetSoftware={targetSoftware}
      />
    );
  }
  return (
    <div className="overflow-auto">
      {/* <div className="fixed top-40 z-50">123</div> */}
      <div className="flex w-full flex-shrink-0 gap-4 overflow-auto">
        {reportItems.map((z, index) => {
          return (
            <GetReportData
              key={z.id}
              shortCode={z.shortCode}
              targetSoftware={targetSoftware}
            />
          );
        })}
      </div>
      {/* {taskId && (
        <>
          <Approve />
        </>
      )} */}
    </div>
  );
};

export default ReportPageItems;
