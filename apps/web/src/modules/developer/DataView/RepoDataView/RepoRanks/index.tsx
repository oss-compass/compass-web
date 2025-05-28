import React, { useMemo, useState } from 'react';
import { useTranslation } from 'next-i18next';
import BaseCard from '@modules/developer/components/DeveloperCard';
import CardDropDownMenu from '@modules/developer/components/CardDropDownMenu';
import RankCharts from './RankCharts';

const TotalScore = ({ data, isLoading }) => {
  const { t } = useTranslation();

  return (
    <BaseCard
      className="h-[550px]"
      bodyClass="h-[490px]"
      title={t('developer:repo_graph_details')}
      id="repo_graph_details"
      loading={isLoading}
      description={''}
      docLink={
        '/docs/metrics-models/productivity/collaboration-development-index/'
      }
      headRight={(ref, fullScreen, setFullScreen) => (
        <>
          <CardDropDownMenu
            cardRef={ref}
            fullScreen={fullScreen}
            onFullScreen={(b) => {
              setFullScreen(b);
            }}
          />
        </>
      )}
    >
      {(ref) => {
        return <RankCharts containerRef={ref} data={data} />;
      }}
    </BaseCard>
  );
};

export default TotalScore;
