import React from 'react';
import useLabelData from '@modules/os-selection/hooks/useLabelData';
import AuthRequire from '@modules/auth/AuthRequire';
import Header from '@common/components/Header';
import Footer from '@common/components/Footer';
import Banner from '@modules/os-selection/components/Banner';
import ReportPageItems from './ReportPageItems';
import { useGetReportData } from '../ReportPage/store/useReportStore';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { LeftCircleOutlined } from '@ant-design/icons';

const ReportPageDetail = () => {
  const { reportItems } = useLabelData();
  const { targetSoftware } = useGetReportData();
  const { t } = useTranslation('os-selection');
  const router = useRouter();
  const back = () => {
    router.push(`/os-selection?tab=${2}`);
  };
  return (
    <div className="my-6 mx-auto max-w-[1500px]">
      <div className="relative flex flex-1 flex-col rounded border bg-white">
        <div className="oh-tabs flex items-center gap-2 border-b px-5 py-3 font-semibold">
          {back && (
            <LeftCircleOutlined
              onClick={() => {
                back();
              }}
              className="mr-2 cursor-pointer text-2xl text-[#3f60ef]"
            />
          )}
          {t('my_reports.report_page_title')}
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
