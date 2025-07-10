import React from 'react';
import useHashchangeEvent from '@common/hooks/useHashchangeEvent';
import Dashboard from './Dashboard';
import UserManagement from './UserManagement';
import UserList from './UserList';
import SystemMonitor from './SystemMonitor';
import EcosystemEvaluationMonitor from './EcosystemEvaluationMonitor';
import SelectionEvaluationTPCMonitor from './SelectionEvaluationTPCMonitor';

const DataView: React.FC = () => {
  const hash = useHashchangeEvent();
  const currentView = hash || 'dashboard';

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />; // 重定向到监控总览
      case 'user-list':
        return <UserList />;
      case 'ecosystem-evaluation-monitor':
        return <EcosystemEvaluationMonitor />;
      case 'selection-evaluation-tpc-monitor':
        return <SelectionEvaluationTPCMonitor />;
      case 'user-management':
        return <UserManagement />;
      case 'system-monitor':
        return <SystemMonitor />;
      default:
        return <Dashboard />; // 默认显示监控总览
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)] flex-1 overflow-auto bg-gray-50">
      <div className="w-full overflow-y-auto p-6">{renderContent()}</div>
    </div>
  );
};

export default DataView;
