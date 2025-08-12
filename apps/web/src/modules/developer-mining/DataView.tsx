import React from 'react';
import useHashchangeEvent from '@common/hooks/useHashchangeEvent';
import Main from './Main';
import SubmitProject from './SubmitProject';
import MySubmissions from './MySubmissions';

const DataView: React.FC = () => {
  const hash = useHashchangeEvent();
  const currentView = hash || 'overview';

  const renderContent = () => {
    switch (currentView) {
      case 'overview':
        return <Main />;
      case 'submit-project':
        return <SubmitProject />;
      case 'my-submissions':
        return <MySubmissions />;
      default:
        return <Main />;
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)] flex-1 overflow-auto bg-gray-50">
      <div className="w-full overflow-y-auto">{renderContent()}</div>
    </div>
  );
};

export default DataView;
