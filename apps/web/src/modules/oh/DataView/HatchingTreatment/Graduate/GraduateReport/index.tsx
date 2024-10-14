import React, { useState } from 'react';
import { Tabs } from 'antd';
import SelectionReportApplication from './SelectionReportApplication';
// import RepoReportApplication from './RepoReportApplication';

const Main = () => {
  // const [activeKey, setActiveKey] = useState('孵化选型申请');
  const allItems = [
    {
      key: '毕业报告申请',
      label: <div className="mx-2 text-lg">毕业报告申请</div>,
      children: <SelectionReportApplication />,
    },
  ];

  return (
    <div className="flex flex-1 bg-[#f2f2f2]">
      <div className="relative flex h-[calc(100vh-170px)] flex-1 flex-col bg-white drop-shadow-sm md:p-0 lg:h-[calc(100vh-138px)]">
        <div className="oh-tabs relative h-[calc(100%-100px)] overflow-auto py-3">
          <Tabs className="oh-antd" size={'small'} items={allItems} />
        </div>
      </div>
    </div>
  );
};

export default Main;
