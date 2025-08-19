import React, { useState } from 'react';
import { Tabs } from 'antd';
import QueueTab from './QueueTab';
import RepositoryTab from './RepositoryTab/index';
import CommunityTab from './CommunityTab/index';

const EcosystemEvaluationMonitor: React.FC = () => {
  const [activeTab, setActiveTab] = useState('queue');

  const tabItems = [
    {
      key: 'queue',
      label: '队列监控',
      children: <QueueTab />,
    },
    {
      key: 'repository',
      label: '仓库项目监控',
      children: <RepositoryTab />,
    },
    {
      key: 'community',
      label: '社区项目监控',
      children: <CommunityTab />,
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
        size="large"
        style={{
          backgroundColor: 'transparent',
          padding: '6px',
        }}
        tabBarStyle={{
          borderRadius: '8px',
          border: '1px',
          backgroundColor: '#ffffff',
          margin: 0,
          padding: '0 16px',
        }}
      />
    </div>
  );
};

export default EcosystemEvaluationMonitor;
