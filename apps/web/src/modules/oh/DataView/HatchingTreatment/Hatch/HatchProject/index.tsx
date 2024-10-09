import React, { useState } from 'react';
import { Tabs } from 'antd';
import SelectionApplication from './SelectionApplication';

const Main = () => {
  // const [activeKey, setActiveKey] = useState('孵化选型申请');
  const allItems = [
    {
      key: '选型申请',
      label: <div className="mx-2 text-lg">孵化申请</div>,
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
          <div className="absolute top-[26px] right-6 text-sm">
            <a
              href="https://gitee.com/openharmony-tpc/docs/blob/master/tpc-governance-platform-user-guide.md#%E5%AD%B5%E5%8C%96%E9%A1%B9%E7%9B%AE%E7%94%B3%E8%AF%B7"
              className="cursor-pointer text-[#1677ff] drop-shadow-md hover:underline"
              target="_blank"
            >
              使用文档
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
