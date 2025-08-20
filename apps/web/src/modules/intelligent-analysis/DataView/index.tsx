import React from 'react';
import useHashchangeEvent from '@common/hooks/useHashchangeEvent';
import SubmitProject from './SubmitProject';
import MySubmissions from './MySubmissions';
import Overview from './Overview';
import Main from './Main';

const DataView: React.FC = () => {
  const hash = useHashchangeEvent();
  const currentView = hash || 'overview';

  // 项目路由映射
  const projectRoutes = [
    'flutter',
    'ionic',
    'react-native',
    'cef',
    'electron',
    'chromium',
  ];

  const renderContent = () => {
    // 检查是否是项目页面
    if (projectRoutes.includes(currentView)) {
      return <Main projectType={currentView} />;
    }

    switch (currentView) {
      case 'overview':
        return <Overview />;
      case 'submit-project':
        return <SubmitProject />;
      case 'my-submissions':
        return <MySubmissions />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)] flex-1 overflow-auto bg-gray-50">
      <div className="w-full overflow-y-auto">{renderContent()}</div>
    </div>
  );
};

export default DataView;
