import React, { useState } from 'react';
import { Tabs } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { subscribeKey } from 'valtio/utils';
import { procseeState } from '@modules/oh/DataView/HatchingTreatment/Process/procseeState';
import SelectionApplication from './SelectionApplication';
import SelectionEvaluation from './SelectionEvaluation';
import RepoInformationMaintenance from './RepoInformationMaintenance';
import AutomaticStorage from './AutomaticStorage';
import Finish from './Finish';
import { useBoolean, useUnmount } from 'ahooks';

const Main = () => {
  useUnmount(() => {
    console.log('useUnmount');
  });
  const { active } = procseeState;
  const [activeKey, setActiveKey] = useState('孵化选型申请');
  const allItems = [
    {
      key: '孵化选型申请',
      label: <div className="mx-2 text-lg">孵化选型申请</div>,
      children: <SelectionApplication />,
    },
    {
      key: '孵化选型评审',
      label: <div className="mx-2 text-lg">孵化选型评审</div>,
      children: <SelectionEvaluation />,
    },
    {
      key: '建仓门禁评审',
      label: <div className="mx-2 text-lg">建仓门禁评审</div>,
      children: <RepoInformationMaintenance />,
    },
    {
      key: '入库自动化处理',
      label: <div className="mx-2 text-lg">入库自动化处理</div>,
      children: <AutomaticStorage />,
    },
    {
      key: '结束',
      label: <div className="mx-2 text-lg">结束</div>,
      children: <Finish />,
    },
  ];
  const item = allItems.find((item) => item.key === active);
  // const items = allItems.slice(0, activeProcesses.index + 1).map((item) => {
  //   let proces = allProcesses.find((i) => i.id === item.key);
  //   if (proces.state === 'finish') {
  //     item.label = (
  //       <div className="flex">
  //         {item.label}
  //         <CheckCircleTwoTone twoToneColor="#52c41a" rev={undefined} />
  //       </div>
  //     );
  //   }
  //   return item;
  // });

  const onChange = (key: string) => {
    setActiveKey(key);
  };
  subscribeKey(procseeState, 'active', (v) => {
    setActiveKey(v);
  });
  return (
    <>
      <div className="relative flex h-[calc(100vh-170px)] flex-1 flex-col border bg-white drop-shadow-sm md:p-0">
        <div className="border-b px-5 py-3 font-semibold">{item.key}</div>
        <div className="oh-tabs relative h-[calc(100%-100px)] overflow-auto py-3 px-5 ">
          {item.children}
        </div>
      </div>
    </>
  );
};

export default Main;
