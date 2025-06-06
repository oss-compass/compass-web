import React from 'react';
import useLabelData from '@modules/os-selection/hooks/useLabelData';
import AuthRequire from '@modules/auth/AuthRequire';
import Header from '@common/components/Header';
import Footer from '@common/components/Footer';
import Banner from '@modules/os-selection/components/Banner';
import ReportPageItems from './ReportPageItems';
import { useGetReportData } from '../ReportPage/store/useReportStore';

const ReportPageDetail = () => {
  const { reportItems } = useLabelData();
  const { targetSoftware } = useGetReportData();

  return (
    <div className="my-6 mx-auto max-w-[1500px]">
      <div className="relative flex flex-1 flex-col rounded border bg-white">
        <div className="oh-tabs flex items-center justify-between border-b px-5 py-3 font-semibold">
          {'软件评估报告详情'}
        </div>
        <div className="relative overflow-auto p-5">
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
  return (
    <AuthRequire>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <Banner />
        <ReportPageDetail />
      </div>
      <Footer />
    </AuthRequire>
  );
};

export default ReportPage;
