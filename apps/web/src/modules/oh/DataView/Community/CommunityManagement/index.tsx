import React from 'react';
import Approve from './Approve';
import Organization from './Organization';
import Member from './Member';

import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

const CommunityManagement = () => {
  const onChange = (key: string) => {
    console.log(key);
  };
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '  审批详情',
      children: <Approve />,
    },
    {
      key: '2',
      label: '组织管理',
      children: <Organization />,
    },
    {
      key: '3',
      label: '成员管理',
      children: <Member />,
    },
  ];
  return (
    <div className="bg-[#fff]">
      <Tabs
        defaultActiveKey="1"
        tabBarExtraContent={{ left: <div className="text-[#fff]">123</div> }}
        items={items}
        onChange={onChange}
      />
    </div>
  );
};

export default CommunityManagement;
