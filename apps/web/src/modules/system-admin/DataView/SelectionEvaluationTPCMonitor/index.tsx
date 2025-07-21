import React, { useState } from 'react';
import { Tabs } from 'antd';

import QueueTab from './QueueTab';
import HatchingTab from './HatchingTab';
import GraduationTab from './GraduationTab';

const SelectionEvaluationTPCMonitor: React.FC = () => {
  const [activeTab, setActiveTab] = useState('queue');

  const tabItems = [
    {
      key: 'queue',
      label: '队列监控',
      children: <QueueTab />,
    },
    {
      key: 'hatching',
      label: '孵化项目监控',
      children: <HatchingTab />,
    },
    {
      key: 'graduation',
      label: '毕业项目监控',
      children: <GraduationTab />,
    },
  ];

  return (
    <div className="p-6">
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

export default SelectionEvaluationTPCMonitor;
