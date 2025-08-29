import React from 'react';
import QueueManagement from './QueueManagement';
import QueueOverview from './QueueOverview';

const QueueTab: React.FC = () => {
  return (
    <>
      <QueueManagement />
      <QueueOverview />
    </>
  );
};

export default QueueTab;