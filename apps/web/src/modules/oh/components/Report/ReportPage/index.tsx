import React from 'react';
import useLabelData from '@modules/oh/hooks/useLabelData';
import ReportPageItems from '@modules/oh/components/Report/ReportPageItems';
import ReportIdFetcher from '@modules/oh/components/Report/ReportPage/store/ReportIdFetcher';
import Comment from '@modules/oh/components/Report/ReportPage/Comment';
import Approve from '@modules/oh/components/Report/ReportPage/Approve';
import { useGetReportData } from '@modules/oh/components/Report/ReportPage/store/useReportStore';
// import { Input, Tabs } from 'antd';
// import NotFoundOh from '@modules/oh/components/NotFoundOh';
// import Loading from '@modules/oh/components/Loading';
// import Analyzing from '@modules/oh/components/Analyzing';
// import ReportPageItem from '@modules/oh/components/Report/VerifyReportPageItems';

const ReportPage = () => {
  const { reportItems, taskId } = useLabelData();
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
          {taskId && (
            <>
              <ReportIdFetcher selectionId={Number(taskId)} />
              <Comment />
              <Approve />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
