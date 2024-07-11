import React from 'react';
import { Tabs } from 'antd';
import EvaluationDetail from '@modules/oh/components/EvaluationInfo/EvaluationDetail';
import NotFoundOh from '@modules/oh/components/NotFoundOh';
import StickyNav from '@common/components/Header/StickyNav';

const ReportPageItem = ({ reportItems }) => {
  if (!reportItems && reportItems === 0) {
    return <NotFoundOh />;
  }
  if (reportItems.length === 1) {
    return <EvaluationDetail item={reportItems[0]} />;
  }
  return (
    <>
      {/* <div className="fixed top-40 z-50">123</div> */}
      <div className="flex w-full gap-4 overflow-auto">
        {reportItems.map((z) => {
          return (
            <div key={z.id}>
              <EvaluationDetail item={z} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ReportPageItem;
