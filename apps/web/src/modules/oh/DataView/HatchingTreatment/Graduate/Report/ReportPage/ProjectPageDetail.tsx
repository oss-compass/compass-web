import React from 'react';
import useLabelData from '@modules/oh/hooks/useLabelData';
import ReportPageItems from '@modules/oh/DataView/HatchingTreatment/Graduate/Report/ReportPageItems';
import GraduationTimeline from '@modules/oh/DataView/HatchingTreatment/Graduate/Report/ReportPage/GraduationTimeline';
import { useGetReportData } from '@modules/oh/DataView/HatchingTreatment/Graduate/Report/ReportPage/store/useReportStore';
import ReportIdFetcher from '@modules/oh/DataView/HatchingTreatment/Graduate/Report/ReportPage/store/ReportIdFetcher';
import OneApprove from '@modules/oh/DataView/HatchingTreatment/Graduate/Report/ReportPage/OneApprove';
import ProjectInfo from '@modules/oh/DataView/HatchingTreatment/Graduate/Report/ReportPage/ProjectInfo';
import ApproveBox from './Approve/ApproveBox';
import ApprovalGuide from '@modules/oh/DataView/HatchingTreatment/components/ApprovalGuide';
import { allMetricData } from '@modules/oh/DataView/HatchingTreatment/Graduate/EvaluationInfo/AllGraduateMetricData';

const ProjectPageDetail = () => {
  const { reportItems, taskId } = useLabelData();
  const { targetSoftware } = useGetReportData();

  return (
    <div className="div">
      <div className="relative flex h-[calc(100vh-170px)] flex-1 flex-col border bg-white drop-shadow-sm lg:h-[calc(100vh-138px)]">
        <div className="oh-tabs flex items-center  border-b px-5 py-2 text-lg font-semibold">
          {'毕业申请详情'}
          <ApprovalGuide allMetricData={allMetricData} moduleType="graduate" />
          <GraduationTimeline />
        </div>
        <div className="relative h-[calc(100%-60px)] overflow-auto p-5">
          <div className="mb-6 pl-2 text-base font-semibold">基础信息</div>
          <ProjectInfo />
          <div className="mb-6 mt-4 pl-2 text-base font-semibold">报告信息</div>
          <ReportPageItems
            canClarify={true}
            reportItems={reportItems}
            targetSoftware={targetSoftware}
          />
          <ReportIdFetcher selectionId={Number(taskId)} />
          <OneApprove />
          <ApproveBox selectionId={Number(taskId)} />
        </div>
      </div>
    </div>
  );
};

export default ProjectPageDetail;
