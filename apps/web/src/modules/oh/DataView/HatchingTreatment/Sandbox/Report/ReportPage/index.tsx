import React from 'react';
import useLabelData from '@modules/oh/hooks/useLabelData';
import ReportPageItems from '../ReportPageItems';
import { useGetReportData } from '../ReportPage/store/useReportStore';
import ProjectPageDetail from './ProjectPageDetail';

const ReportPageDetail = () => {
  const { reportItems } = useLabelData();
  const { targetSoftware } = useGetReportData();

  return (
    <div className="div">
      <div className="relative flex h-[calc(100vh-170px)] flex-1 flex-col border bg-white drop-shadow-sm lg:h-[calc(100vh-138px)]">
        <div className="oh-tabs flex items-center justify-between border-b px-5 py-3 font-semibold">
          {'TPC 软件报告详情'}
        </div>
        <div className="relative h-[calc(100%-60px)] overflow-auto p-5">
          <ReportPageItems
            canClarify={false}
            reportItems={reportItems}
            targetSoftware={targetSoftware}
          />
        </div>
      </div>
    </div>
  );
};

const ReportPage = () => {
  const { taskId } = useLabelData();

  return taskId ? <ProjectPageDetail /> : <ReportPageDetail />;
};

export default ReportPage;
