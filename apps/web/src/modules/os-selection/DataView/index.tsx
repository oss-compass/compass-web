import React, { useState } from 'react';
import MainContent from '../components/MainContent';
import MyReports from './MyReports';
import { Tabs } from 'antd';
import { useRouter } from 'next/router';

const DataView = () => {
  const router = useRouter();
  const tabKey = router.query.tab as string;
  const [defaultActiveKey, setDefaultActiveKey] = useState(tabKey || '1');
  const [activeKey, setActiveKey] = useState(defaultActiveKey);
  const items = [
    {
      key: '1',
      label: '软件评估选型',
      children: <MainContent />,
    },
    {
      key: '2',
      label: '我的报告',
      destroyOnHidden: true,
      children: activeKey === '2' ? <MyReports /> : '',
    },
  ];
  return (
    <>
      <div className="mx-auto mt-6 min-h-screen max-w-6xl bg-gray-50">
        <Tabs
          defaultActiveKey={activeKey}
          items={items}
          onChange={(e) => setActiveKey(e)}
        />
      </div>
    </>
  );
};

export default DataView;
