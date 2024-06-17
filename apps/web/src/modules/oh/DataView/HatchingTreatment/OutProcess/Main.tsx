import React, { useState } from 'react';
import { useUnmount } from 'ahooks';
import { CheckCircleTwoTone } from '@ant-design/icons';
import SelectionApplication from './SelectionApplication';
import SelectionEvaluation from './SelectionEvaluation';
import RepoInformationMaintenance from './RepoInformationMaintenance';
import AutomaticStorage from './AutomaticStorage';
import Finish from './Finish';
import { useSnapshot } from 'valtio';
import { subscribeKey } from 'valtio/utils';
import {
  procseeState,
  procseeActions,
} from '@modules/oh/DataView/HatchingTreatment/OutProcess/outProcseeState';

const Main = () => {
  useUnmount(() => {
    procseeActions.reset();
  });
  // const snap = useSnapshot(procseeState);
  const { active } = procseeState;

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
  const item = allItems.find((item) => item.key === active);

  const [activeKey, setActiveKey] = useState('孵化选型申请');
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
