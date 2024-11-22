import React from 'react';
import useLabelData from '@modules/oh/hooks/useLabelData';
import ReportPageItems from '@modules/oh/components/GraduationReport/ReportPageItems';
import GraduationTimeline from '@modules/oh/components/GraduationReport/ReportPage/GraduationTimeline';
import { useGetReportData } from '@modules/oh/components/GraduationReport/ReportPage/store/useReportStore';
import ReportIdFetcher from '@modules/oh/components/GraduationReport/ReportPage/store/ReportIdFetcher';
import Comment from '@modules/oh/components/GraduationReport/ReportPage/Comment';
import Approve from '@modules/oh/components/GraduationReport/ReportPage/Approve';
import QAsubmit from '@modules/oh/components/GraduationReport/ReportPage/QAsubmit';
import ProjectInfo from '@modules/oh/components/GraduationReport/ReportPage/ProjectInfo';

const ProjectPageDetail = () => {
  const { reportItems, taskId } = useLabelData();
  const { targetSoftware } = useGetReportData();

  return (
    <div className="div">
      <div className="relative flex h-[calc(100vh-170px)] flex-1 flex-col border bg-white drop-shadow-sm lg:h-[calc(100vh-138px)]">
        <div className="oh-tabs flex items-center  border-b px-5 py-2 text-lg font-semibold">
          {'毕业申请详情'}
          <GraduationTimeline />
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
          {/* <QAsubmit /> */}
          <Approve />
        </div>
      </div>
    </div>
  );
};

export default ProjectPageDetail;
