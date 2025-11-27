import React from 'react';
import Timeline from '@modules/oh/components/Timeline';
import { useGetTaskTimelineData } from '@modules/oh/DataView/HatchingTreatment/Hatch/Report/ReportPage/store/useReportStore';

const HatchTimeline = () => {
  const {
    state,
    awaitingClarificationCount,
    clarifiedCount,
    awaitingConfirmationCount,
    confirmedCount,
    sigLeadCount,
    complianceCount,
    legalCount,
    userId,
  } = useGetTaskTimelineData();
  let content = null;
  if (state === 0) {
    content = (
      <>
        <div>待澄清指标数量：{awaitingClarificationCount}</div>
        <div>已澄清指标数量：{clarifiedCount}</div>
      </>
    );
  } else if (state === 1) {
    content = (
      <>
        <div>待确认指标数量：{awaitingConfirmationCount}</div>
        <div>已确认指标数量：{confirmedCount}</div>
      </>
    );
  } else if (state === 2) {
    content = (
      <>
        <div>SIG Lead 已审批人数：{sigLeadCount}/1</div>
        <div>合规代表已审批人数：{complianceCount}/1</div>
        <div> 法务代表已审批人数：{legalCount}/1</div>
      </>
    );
  }

  return (
    <div className="flex h-10 w-full flex-1 justify-center">
      <Timeline state={state} content={content} userId={userId} />
    </div>
  );
};
export default HatchTimeline;
