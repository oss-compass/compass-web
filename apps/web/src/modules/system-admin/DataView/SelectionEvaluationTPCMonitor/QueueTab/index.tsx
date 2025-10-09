import React from 'react';
import QueueManagement from './QueueManagement';
import QueueOverview from './QueueOverview';

const QueueTab: React.FC = () => {
  return (
    <div className="mt-4 space-y-6">
      <QueueManagement />
      <QueueOverview />
    </div>
  );
};

export default QueueTab;
