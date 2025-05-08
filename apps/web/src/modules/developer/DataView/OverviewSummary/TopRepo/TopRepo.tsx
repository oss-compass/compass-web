import React, { useMemo, useState } from 'react';
import { useTranslation } from 'next-i18next';
import BaseCard from '@modules/developer/components/DeveloperCard';
import { Topic } from '@modules/developer/components/SideBar/config';
import CardDropDownMenu from '@modules/developer/components/CardDropDownMenu';
import { chartUserSettingState } from '@modules/developer/store';
import Chart from './Chart';

const RepoChart = () => {
  const { t } = useTranslation();

  const [onePointSys, setOnePointSys] = useState(
    chartUserSettingState.onePointSys
  );
  const [yAxisScale, setYAxisScale] = useState(
    chartUserSettingState.yAxisScale
  );

  return (
    <BaseCard
      title={'贡献仓库排名'}
      id={Topic.Overview}
      description=""
      className="h-[300px]"
      bodyClass="h-[220px]"
      headRight={(ref, fullScreen, setFullScreen) => (
        <>
          <CardDropDownMenu
            cardRef={ref}
            fullScreen={fullScreen}
            onFullScreen={(b) => {
              setFullScreen(b);
            }}
            enableReferenceLineSwitch={false}
            yAxisScale={yAxisScale}
            onYAxisScaleChange={(v) => {
              setYAxisScale(v);
            }}
            onePointSys={onePointSys}
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
