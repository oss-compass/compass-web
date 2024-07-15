import React, { useState } from 'react';
import { Tabs } from 'antd';
import ReportTable from './ReportTable';
import ProjectTable from './ProjectTable';

const Main = () => {
  const url = new URL(window.location.href.replace('#', ''));
  const tabKey = url.searchParams.get('tab'); // 'luajava'
  console.log(tabKey);
  const [activeKey, setActiveKey] = useState(tabKey || '1');
  const allItems = [
    {
      key: '1',
      label: <div className="mx-2 text-lg">报告申请列表</div>,
      children: <ReportTable />,
    },
    {
      key: '2',
      label: <div className="mx-2 text-lg">选型申请列表</div>,
      children: <ProjectTable />,
    },
  ];

  return (
    <div className="flex flex-1 bg-[#f2f2f2]">
      <div className="relative flex h-[calc(100vh-170px)] flex-1 flex-col bg-white drop-shadow-sm md:p-0">
        <div className="oh-tabs relative my-3 h-full overflow-auto">
          <Tabs
            onChange={(activeKey) => {
              window.location.hash = '#hatchTable' + '?tab=' + activeKey;
            }}
            defaultActiveKey={activeKey}
            className="oh-antd"
            size={'small'}
            items={allItems}
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
