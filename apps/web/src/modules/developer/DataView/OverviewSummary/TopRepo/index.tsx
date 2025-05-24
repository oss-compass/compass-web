import React from 'react';
import { useTranslation } from 'next-i18next';
import BaseCard from '@modules/developer/components/DeveloperCard';
import { Topic } from '@modules/developer/components/SideBar/config';
import CardDropDownMenu from '@modules/developer/components/CardDropDownMenu';
import Chart from './Chart';

const RepoChart = () => {
  const { t } = useTranslation();

  return (
    <BaseCard
      title={'贡献仓库排名'}
      id={Topic.Overview}
      description=""
      className="h-[380px]"
      bodyClass="h-[320px]"
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
          <Chart containerRef={containerRef} />
        </div>
      )}
    </BaseCard>
  );
};

export default RepoChart;
