import React, { useState } from 'react';
import { Tabs } from 'antd';
import ReportTable from './ReportTable';
import ProjectTable from './ProjectTable';

const Main = () => {
  // const [activeKey, setActiveKey] = useState('孵化选型申请');
  const allItems = [
    {
      key: '报告申请列表',
      label: <div className="mx-2 text-lg">报告申请列表</div>,
      children: <ReportTable />,
    },
    {
      key: '项目申请列表',
      label: <div className="mx-2 text-lg">选型申请列表</div>,
      children: <ProjectTable />,
    },
  ];

  return (
    <div className="flex flex-1 bg-[#f2f2f2]">
      <div className="relative flex h-[calc(100vh-170px)] flex-1 flex-col bg-white drop-shadow-sm md:p-0">
        <div className="oh-tabs relative h-[calc(100%-100px)] overflow-auto py-3">
          <Tabs className="oh-antd" size={'small'} items={allItems} />
        </div>
      </div>
    </div>
  );
};

export default Main;
