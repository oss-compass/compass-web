import React, { useState } from 'react';
import { Tabs } from 'antd';
import SelectionApplication from './SelectionApplication';

const Main = () => {
  // const [activeKey, setActiveKey] = useState('孵化选型申请');
  const allItems = [
    {
      key: '毕业申请',
      label: <div className="mx-2 text-lg">毕业申请</div>,
      children: <SelectionApplication />,
    },
    // {
    //   key: '已建仓申请',
    //   label: <div className="mx-2 text-lg">已建仓申请</div>,
    //   children: <RepoApplication />,
    // },
  ];

  return (
    <div className="flex flex-1 bg-[#f2f2f2]">
      <div className="relative flex h-[calc(100vh-170px)] flex-1 flex-col overflow-auto bg-white drop-shadow-sm md:p-0">
        <div className="oh-tabs w-fulll relative h-[calc(100%-50px)] overflow-auto pt-3">
          <Tabs className="oh-antd" size={'small'} items={allItems} />
        </div>
      </div>
    </div>
  );
};

export default Main;
