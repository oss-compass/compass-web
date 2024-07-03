import React, { useState } from 'react';
import { Tabs } from 'antd';
import HatchReportApplication from './HatchReportApplication';

const Main = () => {
  const allItems = [
    {
      key: '选型报告申请',
      label: <div className="mx-2 text-lg">选型报告申请</div>,
      children: <HatchReportApplication />,
    },
    // {
    //   key: '已建仓报告申请',
    //   label: <div className="mx-2 text-lg">已建仓报告申请</div>,
    //   children: <RepoReportApplication />,
    // },
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
