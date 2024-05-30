import React from 'react';
import TableCard from '@modules/oh/components/TableCard';
import { Tabs } from 'antd';
import SelectionApplication from './SelectionApplication';
import SelectionEvaluation from './SelectionEvaluation';
import RepoInformationMaintenance from './RepoInformationMaintenance';

const Main = () => {
  const items = [
    {
      key: '1',
      label: <div className="mx-4 text-lg">选型申请</div>,
      children: <SelectionApplication />,
    },
    {
      key: '2',
      label: <div className="mx-4 text-lg">选型评估</div>,
      children: <SelectionEvaluation />,
    },
    {
      key: '3',
      label: <div className="mx-4 text-lg">仓库信息维护</div>,
      children: <RepoInformationMaintenance />,
    },
    {
      key: '4',
      label: <div className="mx-4 text-lg">依赖关系解析</div>,
      children: '依赖关系解析',
      disabled: true,
    },
    {
      key: '5',
      label: <div className="mx-4 text-lg">完整性信息维护</div>,
      children: '完整性信息维护',
      disabled: true,
    },
  ];
  return (
    <>
      <div className="relative flex min-w-0 flex-1 flex-col bg-gray-50 px-4 pt-4 md:p-0">
        <TableCard
          className={'mb-0 min-h-[calc(100vh-112px)]'}
          id={'processMain'}
          title={'Owner选型引入流程'}
        >
          <Tabs
            // onChange={onChange}
            type="card"
            items={items}
          />
        </TableCard>
      </div>
    </>
  );
};

export default Main;
