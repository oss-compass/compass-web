import React, { useState } from 'react';
import { Tabs } from 'antd';
import HatchReportApplication from './HatchReportApplication';

const Main = () => {
  return (
    <div className="flex flex-1 bg-[#f2f2f2]">
      <div className="relative flex h-[calc(100vh-170px)] flex-1 flex-col bg-white drop-shadow-sm md:p-0">
        <div className="oh-tabs relative h-[calc(100%-100px)] overflow-auto py-3">
          <HatchReportApplication />
        </div>
      </div>
    </div>
  );
};

export default Main;
