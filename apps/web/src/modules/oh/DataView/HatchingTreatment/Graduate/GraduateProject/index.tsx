import React, { useState } from 'react';
import { Tabs } from 'antd';
import SelectionApplication from './Application';

const Main = () => {
  const allItems = [
    {
      key: '毕业申请',
      label: <div className="mx-2 text-lg">毕业申请</div>,
      children: <SelectionApplication />,
    },
  ];

  return (
    <div className="flex flex-1 bg-[#f2f2f2]">
      <div className="relative flex h-[calc(100vh-170px)] flex-1 flex-col overflow-auto bg-white drop-shadow-sm md:p-0 lg:h-[calc(100vh-138px)]">
        <div className="oh-tabs w-fulll relative h-[calc(100%-50px)] overflow-auto pt-3">
          <Tabs className="oh-antd" size={'small'} items={allItems} />
        </div>
      </div>
    </div>
  );
};

export default Main;
