import React from 'react';
import EvaluationApplication from './EvaluationApplication';
import OutEvaluationApplication from './OutEvaluationApplication';
import { Tabs } from 'antd';

const Main = () => {
  let tabItems = [
    {
      key: '2',
      label: <div className="mx-2">选型评估报告</div>,
      children: <EvaluationApplication />,
    },
    {
      key: '4',
      label: <div className="mx-2">孵化评估报告</div>,
      children: <OutEvaluationApplication />,
    },
    {
      key: '5',
      label: <div className="mx-2">孵化评估报告</div>,
      children: <OutEvaluationApplication />,
    },
  ];
  return (
    <div className="oh-tabs relative flex h-[calc(100vh-170px)] flex-col border bg-white drop-shadow-sm">
      <div className="flex items-center justify-between border-b px-5 py-3 font-semibold">
        TPC 评估报告生成
      </div>
      <div className="px-4 pt-3">
        <Tabs className="oh-antd" size={'small'} items={tabItems} />
      </div>
    </div>
  );
};

export default Main;
