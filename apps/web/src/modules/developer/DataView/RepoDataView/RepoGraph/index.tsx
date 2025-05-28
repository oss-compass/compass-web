import React from 'react';
import { useTranslation } from 'next-i18next';
import BaseCard from '@modules/developer/components/DeveloperCard';
import CardDropDownMenu from '@modules/developer/components/CardDropDownMenu';
import Chart from './Chart';

const TotalScore = ({ data, error, isLoading }) => {
  const { t } = useTranslation();

  return (
    <BaseCard
      title={t('developer:repo_graph')}
      id="repo_graph"
      loading={isLoading}
      isEmpty={data?.length === 0}
      description=""
      className="h-[550px]"
      bodyClass="h-[490px]"
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
      {(containerRef) => (
        <div className="flex h-full w-full justify-center">
          <Chart containerRef={containerRef} data={data} />
        </div>
      )}
    </BaseCard>
  );
};

export default TotalScore;
