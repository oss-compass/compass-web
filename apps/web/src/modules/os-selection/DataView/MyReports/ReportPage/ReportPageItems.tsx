import React from 'react';
import NotFoundOh from './NotFoundOh';
import GetReportData from './GetReportData';

const ReportPageItems = ({
  reportItems,
  canClarify = false,
  targetSoftware = null,
}) => {
  if (!reportItems && reportItems === 0) {
    return <NotFoundOh />;
  }
  if (reportItems.length === 1) {
    return (
      <GetReportData
        canClarify={canClarify}
        shortCode={reportItems[0].shortCode}
      />
    );
  }
  return (
    <div className="overflow-auto">
      <div className="flex w-full flex-shrink-0 gap-4 overflow-auto">
        {reportItems.map((z, index) => {
          return (
            <GetReportData
              key={index}
              canClarify={canClarify}
              shortCode={z.shortCode}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ReportPageItems;
