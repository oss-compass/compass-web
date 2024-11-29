import React from 'react';
import NotFoundOh from '@modules/oh/components/NotFoundOh';
import GetReportData from '@modules/oh/components/GraduationReport/GetReportData';

const ReportPageItems = ({
  canClarify,
  reportItems,
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
        targetSoftware={targetSoftware}
      />
    );
  }
  return (
    <div className="overflow-auto">
      <div className="flex w-full flex-shrink-0 gap-4 overflow-auto">
        {reportItems.map((z, index) => {
          return (
            <GetReportData
              canClarify={canClarify}
              key={z.id}
              shortCode={z.shortCode}
              targetSoftware={targetSoftware}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ReportPageItems;
