import React from 'react';
import { useTranslation } from 'next-i18next';
import BaseCard from '@modules/developer/components/DeveloperCard';
import { Topic } from '@modules/developer/components/SideBar/config';
import CardDropDownMenu from '@modules/developer/components/CardDropDownMenu';
import Chart from './Chart';

const TotalScore = ({ data, error, isLoading }) => {
  const { t } = useTranslation();

  return (
    <BaseCard
      title={'开发者协作关系图'}
      loading={isLoading}
      isEmpty={data?.length === 0}
      id={'开发者协作关系图'}
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
