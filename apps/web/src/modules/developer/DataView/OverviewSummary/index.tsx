import React from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@common/components/ErrorFallback';
import DeveloperDashboard from './DeveloperDashboard';
import Languages from './Languages';
import TopRepo from './TopRepo';
import Radar from './Radar';

const OverviewSummary = () => {
  return (
    <div className="relative mb-4 grid min-w-0 grid-cols-2 gap-4 md:grid-cols-1">
      <DeveloperDashboard />
      <Languages />
      <TopRepo />
      {/* <ConnectLineMini /> */}
      {/* <Calendar /> */}
      <Radar />
      {/* <Cloud /> */}
    </div>
  );
};
export default withErrorBoundary(OverviewSummary, {
  FallbackComponent: ErrorFallback,
  onError(error, info) {
    console.log(error, info);
    // Do something with the error
    // E.g. log to an error logging client here
  },
});
