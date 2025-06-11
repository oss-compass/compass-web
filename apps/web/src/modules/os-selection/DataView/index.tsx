import React, { useState, useEffect } from 'react';
import MainContent from './Selection';
import MyReports from './MyReports';
import { Tabs } from 'antd';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const DataView = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const tabKey = router.query.tab as string;
  const [activeKey, setActiveKey] = useState(tabKey || '1');

  // 使用 useEffect 监听 tabKey 变化并更新 activeKey
  useEffect(() => {
    setActiveKey(tabKey || '1');
  }, [tabKey]); // 将 tabKey 添加到依赖数组

  const items = [
    {
      key: '1',
      label: t('os-selection:tabs.assessment'),
      children: <MainContent />, // 软件评估选型
    },
    {
      key: '2',
      label: t('os-selection:tabs.my_reports'),
      destroyOnHidden: true,
      children: activeKey === '2' ? <MyReports /> : '', // 我的报告
    },
  ];

  const handleTabChange = (key: string) => {
    setActiveKey(key);
    // 更新 URL 中的 tab 参数
    router.replace({
      pathname: router.pathname,
      query: { ...router.query, tab: key },
    });
  };

  return (
    <>
      <div className="mx-auto mt-6 min-h-screen max-w-6xl bg-gray-50">
        <Tabs
          activeKey={activeKey} // 使用 activeKey 状态控制当前选中的 Tab
          items={items}
          onChange={handleTabChange} // 调用新的处理函数
          size="large"
          tabBarStyle={{ fontWeight: 'bold', fontSize: '20px' }}
        />
      </div>
    </>
  );
};

export default DataView;
