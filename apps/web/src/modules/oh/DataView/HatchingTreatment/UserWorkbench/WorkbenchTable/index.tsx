import React, { useState } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import TableApply from './TableApply';
import TableApprove from './TableApprove';

const WorkbenchTable = ({ active }) => {
  const [applicationType, setApplicationType] = useState(0);
  const onChange = (key: string) => {
    setApplicationType(Number(key));
  };
  const items: TabsProps['items'] = [
    {
      key: '0',
      label: '孵化项目',
      children: '',
    },
    {
      key: '1',
      label: '毕业项目',
      children: '',
    },
  ];
  return (
    <div className="work-bench h-[calc(100%-230px)] min-h-[350px] px-6">
      <Tabs defaultActiveKey="0" items={items} onChange={onChange} />
      {active === 'apply' ? (
        <TableApply applicationType={applicationType} />
      ) : (
        <TableApprove applicationType={applicationType} />
      )}
    </div>
  );
};

export default WorkbenchTable;
