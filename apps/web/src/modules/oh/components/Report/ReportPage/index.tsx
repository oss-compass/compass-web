import React from 'react';
import useLabelData from '@modules/oh/hooks/useLabelData';
import ReportPageItems from '@modules/oh/components/Report/ReportPageItems';
import ReportIdFetcher from '@modules/oh/components/Report/ReportPage/store/ReportIdFetcher';
import Comment from '@modules/oh/components/Report/ReportPage/Comment';
import Approve from '@modules/oh/components/Report/ReportPage/Approve';
import ProjectInfo from '@modules/oh/components/Report/ReportPage/ProjectInfo';
import { useGetReportData } from '@modules/oh/components/Report/ReportPage/store/useReportStore';

const ReportPageDetail = () => {
  const { reportItems } = useLabelData();
  const { targetSoftware } = useGetReportData();

  return (
    <div className="div">
      <div className="relative flex h-[calc(100vh-170px)] flex-1 flex-col border bg-white drop-shadow-sm">
        <div className="oh-tabs flex items-center justify-between border-b px-5 py-3 font-semibold">
          {'TPC 软件报告详情'}
        </div>
        <div className="relative h-[calc(100%-60px)] overflow-auto p-5">
          <ReportPageItems
            reportItems={reportItems}
            targetSoftware={targetSoftware}
          />
        </div>
      </div>
    </div>
  );
};
const ProjectPageDetail = () => {
  const { reportItems, taskId } = useLabelData();
  const { targetSoftware } = useGetReportData();

  return (
    <div className="div">
      <div className="relative flex h-[calc(100vh-170px)] flex-1 flex-col border bg-white drop-shadow-sm">
        <div className="oh-tabs flex items-center justify-between border-b px-5 py-3 text-lg font-semibold">
          {'孵化申请详情'}
        </div>
        <div className="relative h-[calc(100%-60px)] overflow-auto p-5">
          <div className="mb-6 pl-2 text-base font-semibold">基础信息</div>
          <ProjectInfo />
          <div className="mb-6 mt-4 pl-2 text-base font-semibold">报告信息</div>
          <ReportPageItems
            reportItems={reportItems}
            targetSoftware={targetSoftware}
          />
          <ReportIdFetcher selectionId={Number(taskId)} />
          <Comment />
          <Approve />
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
