import React, { useState } from 'react';
import { Tabs } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { subscribeKey } from 'valtio/utils';
import { procseeState } from '@modules/oh/Process/procseeState';
import SelectionApplication from './SelectionApplication';
import SelectionEvaluation from './SelectionEvaluation';
import RepoInformationMaintenance from './RepoInformationMaintenance';
import AutomaticStorage from './AutomaticStorage';
import EvaluationApplication from './EvaluationApplication';
import Finish from './Finish';

const Main = () => {
  const { active } = procseeState;
  const allItems = [
    {
      key: '孵化评估申请',
      label: <div className="mx-2 text-lg">孵化评估申请</div>,
      children: <EvaluationApplication />,
    },
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

  const [activeKey, setActiveKey] = useState('孵化评估申请');
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
          TPC 软件孵化选型流程
        </div>
        <div className="relative mx-5 my-3 mb-2 h-[calc(100%-110px)] border">
          <Tabs
            activeKey={activeKey}
            className="oh-tabs h-full"
            onChange={onChange}
            type="card"
            items={[item]}
          />
        </div>
      </div>
    </>
  );
};

export default Main;
