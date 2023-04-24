import React from 'react';
import { useTranslation } from 'next-i18next';
import SectionTitle from '@modules/analyze/components/SectionTitle';
import { Section } from '@modules/analyze/components/SideBar/config';

import TotalScore from './TotalScore';
import PrTimeToClose from './PrTimeToClose';
import TimeToFirstResponse from './TimeToFirstResponse';
import ChangeRequestClosureRatioSamePeriod from './ChangeRequestClosureRatioSamePeriod';
import ChangeRequestClosureRatioAllPeriod from './ChangeRequestClosureRatioAllPeriod';
import BusFactor from './BusFactor';
import ReleaseFrequency from './ReleaseFrequency';

import { withErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@common/components/ErrorFallback';
import ConnectLine from '@modules/analyze/components/ConnectLine';

const CollaborationDevelopmentIndexOverview = () => {
  const { t } = useTranslation();
  return (
    <>
      <SectionTitle id={Section.StarterProjectHealth}>
        {t('metrics_models:starter_project_health.title')}
      </SectionTitle>

      <div className="mb-4">
        <TotalScore />
      </div>

      <div className="relative mb-12 grid min-w-0 grid-cols-2 gap-4 md:grid-cols-1">
        <ConnectLine />
        <TimeToFirstResponse />
        <PrTimeToClose />
        <ChangeRequestClosureRatioSamePeriod />
        <ChangeRequestClosureRatioAllPeriod />
        <BusFactor />
        <ReleaseFrequency />
      </div>
    </>
  );
};

export default withErrorBoundary(CollaborationDevelopmentIndexOverview, {
  FallbackComponent: ErrorFallback,
  onError(error, info) {
    console.log(error, info);
    // Do something with the error
    // E.g. log to an error logging client here
  },
});
