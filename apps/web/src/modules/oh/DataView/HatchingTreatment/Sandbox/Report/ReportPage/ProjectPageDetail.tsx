import React from 'react';
import useLabelData from '@modules/oh/hooks/useLabelData';
import ReportPageItems from '../ReportPageItems';
import ReportIdFetcher from './store/ReportIdFetcher';
import ProjectInfo from '../ReportPage/ProjectInfo';
import SandboxTimeline from '../ReportPage/SandboxTimeline';
import { useGetReportData } from '../ReportPage/store/useReportStore';
import OneApprove from '../ReportPage/OneApprove';
import ApproveBox from './Approve/ApproveBox';
import ApprovalGuide from '@modules/oh/DataView/HatchingTreatment/components/ApprovalGuide';
import { allMetricData } from '@modules/oh/DataView/HatchingTreatment/Sandbox/EvaluationInfo/AllSandboxMetricData';

const ProjectPageDetail = () => {
  const { reportItems, taskId } = useLabelData();
  const { targetSoftware } = useGetReportData();

  return (
    <div className="div">
      <div className="relative flex h-[calc(100vh-170px)] flex-1 flex-col border bg-white drop-shadow-sm lg:h-[calc(100vh-138px)]">
        <div className="oh-tabs flex items-center  border-b px-5 py-2 text-lg font-semibold">
          {'沙箱申请详情'}
          <ApprovalGuide allMetricData={allMetricData} />
          <SandboxTimeline />
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
