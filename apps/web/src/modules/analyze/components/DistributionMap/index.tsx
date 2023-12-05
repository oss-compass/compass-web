import React, { useMemo } from 'react';
import BaseCard from '@common/components/BaseCard';
import { useTranslation } from 'next-i18next';
import classnames from 'classnames';
import { BiFullscreen, BiExitFullscreen } from 'react-icons/bi';
import type { EChartsOption, ECharts, SetOptionOpts } from 'echarts';
import dynamic from 'next/dynamic';
import Productivity from 'public/images/chart-legend/cube-1.svg';
import Robustness from 'public/images/chart-legend/cube-2.svg';
import NicheCreation from 'public/images/chart-legend/cube-3.svg';
import { useEchartsGlOpts } from '@modules/analyze/components/DistributionMap/EChartGlOpt';

const EChartGl = dynamic(() => import('@common/components/EChartGl'), {
  ssr: false,
});
const DistributionMap = () => {
  const { t } = useTranslation();
  // const echartsOpts = useMemo(() => {
  //   console.log(data);
  //   return useEchartsOpts(data?.metricModelsOverview || [], topicType);
  // }, [data, isLoading, topicType]);
  const { echartsOpts, isLoading } = useEchartsGlOpts();
  return (
    <BaseCard
      title={t('analyze:distribution_map')}
      headRight={(ref, fullScreen, setFullScreen) => (
        <>
          <FullScreen
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
        <div className="h-full">
          <div className="h-[280px]">
            <EChartGl
              option={echartsOpts as EChartsOption}
              loading={isLoading}
              containerRef={containerRef}
            />
          </div>
          <Legend />
        </div>
      )}
    </BaseCard>
  );
};
const Legend = () => {
  const { t } = useTranslation();

  return (
    <div className="fixed flex h-[70px] text-xs">
      <div className="ml-10">
        <div className="flex w-[105px] items-center gap-1">
          <Productivity />
          {t('analyze:topic:productivity')}
        </div>
        <div className="mt-2 flex w-[105px] items-center gap-1">
          <Robustness />
          {t('analyze:topic:robustness')}
        </div>
        <div className="mt-2 flex w-[105px] items-center gap-1">
          <NicheCreation />
          {t('analyze:topic:niche_creation')}
        </div>
      </div>
      <div className="ml-10">
        <div className="flex items-center gap-1">
          <div className="mt-1 h-4 w-4 border border-[#8b8988] bg-[#fff7cf]" />
          {t('analyze:collaboration')}
        </div>
        <div className="mt-2 flex items-center gap-1">
          <div className="h-4 w-4 border border-[#8b8988] bg-[#f5e5db]" />
          {t('analyze:contributor')}
        </div>
        <div className="mt-2 flex items-center gap-1">
          <div className="h-4 w-4 border border-[#8b8988] bg-[#e1e1e1]" />
          {t('analyze:software')}
        </div>
      </div>
    </div>
  );
};
const FullScreen = (props) => {
  const { t } = useTranslation();

  return (
    <div
      className={classnames(
        'flex h-8 cursor-pointer items-center px-4 md:hidden'
      )}
      onClick={() => {
        props.onFullScreen(!props.fullScreen);
      }}
    >
      {props.fullScreen ? (
        <>
          <BiExitFullscreen className="text-[#585858]" />
          <span className="ml-2 text-xs text-[#585858]">
            {t('analyze:full_screen_exit')}
          </span>
        </>
      ) : (
        <>
          <BiFullscreen className="text-[#585858]" />
          <span className="ml-2 text-xs text-[#585858]">
            {t('analyze:full_screen')}
          </span>
        </>
      )}
    </div>
  );
};
export default DistributionMap;
