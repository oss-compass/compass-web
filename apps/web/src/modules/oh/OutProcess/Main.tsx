import React, { useState } from 'react';
import { Tabs, Button } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';
import SelectionApplication from './SelectionApplication';
import SelectionEvaluation from './SelectionEvaluation';
import RepoInformationMaintenance from './RepoInformationMaintenance';
import AutomaticStorage from './AutomaticStorage';
import Finish from './Finish';
import { useSnapshot } from 'valtio';
import { subscribeKey } from 'valtio/utils';
import { procseeState } from '@modules/oh/OutProcess/OutProcseeState';

const Main = () => {
  // const snap = useSnapshot(procseeState);
  const allProcesses = procseeState.allProcesses;
  const { active } = procseeState;

  let activeProcesses = allProcesses.find((item) => item.id === active);

  const allItems = [
    {
      key: '孵化准出申请',
      label: <div className="mx-2 text-lg">孵化准出申请</div>,
      children: <SelectionApplication />,
    },
    {
      key: '孵化准出 TPC 预审',
      label: <div className="mx-2 text-lg">孵化准出 TPC 预审</div>,
      children: <SelectionApplication />,
    },
    {
      key: '孵化准出架构预审',
      label: <div className="mx-2 text-lg">孵化准出架构预审</div>,
      children: <RepoInformationMaintenance />,
    },
    {
      key: '孵化准出 QA 预审',
      label: <div className="mx-2 text-lg">孵化准出 QA 预审</div>,
      children: <AutomaticStorage />,
    },
    {
      key: '准出电子流自动化处理 (TPC 建仓)',
      label: <div className="mx-2 text-lg">准出电子流自动化处理</div>,
      children: <AutomaticStorage />,
    },
    {
      key: '结束',
      label: <div className="mx-2 text-lg">结束</div>,
      children: <Finish />,
    },
  ];
  const items = allItems.slice(0, activeProcesses.index + 1).map((item) => {
    let proces = allProcesses.find((i) => i.id === item.key);
    if (proces.state === 'finish') {
      item.label = (
        <div className="flex">
          {item.label}
          <CheckCircleTwoTone twoToneColor="#52c41a" rev={undefined} />
        </div>
      );
    }

    return item;
  });

  const [activeKey, setActiveKey] = useState('孵化选型申请');
  const onChange = (key: string) => {
    setActiveKey(key);
  };
  subscribeKey(procseeState, 'active', (v) => {
    setActiveKey(v);
  });
  return (
    <>
      <div className="relative ml-1 flex h-[calc(100vh-170px)] flex-1 flex-col border bg-white drop-shadow-sm md:p-0">
        <div className="border-b px-5 py-3 font-semibold">
          TPC 软件孵化准出流程
        </div>
        <div className="mx-5 my-3 mb-2 h-[calc(100%-110px)] border">
          <Tabs
            className="oh-tabs h-full"
            onChange={onChange}
            type="card"
            items={items}
          />
        </div>
      </div>
    </>
  );
};

export default Main;
