import React, { useMemo } from 'react';
import TableCard from '@modules/oh/components/TableCard';
import { Tabs, Button } from 'antd';
import SelectionApplication from './SelectionApplication';
import SelectionEvaluation from './SelectionEvaluation';
import RepoInformationMaintenance from './RepoInformationMaintenance';
import { useRouter } from 'next/router';

const Main = () => {
  const items = [
    {
      key: '1',
      label: <div className="mx-4 text-lg">孵化申请</div>,
      children: <SelectionApplication />,
    },
    {
      key: '2',
      label: <div className="mx-4 text-lg">选型评估</div>,
      children: <SelectionEvaluation />,
    },
    // {
    //   key: '3',
    //   label: <div className="mx-4 text-lg">仓库信息维护</div>,
    //   children: <RepoInformationMaintenance />,
    // },
    // {
    //   key: '4',
    //   label: <div className="mx-4 text-lg">依赖关系解析</div>,
    //   children: '依赖关系解析',
    //   disabled: true,
    // },
    // {
    //   key: '5',
    //   label: <div className="mx-4 text-lg">完整性信息维护</div>,
    //   children: '完整性信息维护',
    //   disabled: true,
    // },
  ];
  const router = useRouter();
  const queryType = router.query?.type as string;
  return (
    <>
      <div className="relative ml-1 flex h-[calc(100vh-170px)] flex-1 flex-col border bg-white drop-shadow-sm md:p-0">
        <div className="border-b px-5 py-3 font-semibold">
          TPC 软件孵化选型流程
        </div>
        <div className="mx-5 my-3 mb-2 h-[calc(100%-110px)] border">
          <Tabs
            className="oh-tabs h-full"
            // onChange={onChange}
            type="card"
            items={items}
          />
        </div>
        {queryType === '孵化选型评审' ? (
          <div className="flex justify-center gap-2">
            <Button className="rounded-none" type="primary" htmlType="submit">
              提交
            </Button>
            <Button className="rounded-none" htmlType="submit">
              转其他人
            </Button>
            <Button className="rounded-none" htmlType="submit">
              撤回
            </Button>
          </div>
        ) : (
          <div className="flex justify-center gap-2">
            <Button className="rounded-none" type="primary" htmlType="submit">
              提交
            </Button>
            <Button className="rounded-none" htmlType="submit">
              保存
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default Main;
