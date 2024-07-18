import React from 'react';
import NotFoundOh from '@modules/oh/components/NotFoundOh';
import GetReportData from '@modules/oh/components/Report/GetReportData';

const ReportPageItems = ({ reportItems, targetSoftware = null }) => {
  if (!reportItems && reportItems === 0) {
    return <NotFoundOh />;
  }
  if (reportItems.length === 1) {
    return <GetReportData shortCode={reportItems[0].shortCode} />;
  }
  return (
    <>
      {/* <div className="fixed top-40 z-50">123</div> */}
      <div className="flex h-full w-full flex-shrink-0 gap-4 overflow-auto">
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
    </>
  );
};

export default ReportPageItems;
