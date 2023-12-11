import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useCounter } from 'react-use';
import LinkX from '@common/components/LinkX';
import { usePlantList, useModelList } from './plantConfig';
import Chart from './Chart';
import Productivity from 'public/images/chart-legend/cube-1.svg';
import Robustness from 'public/images/chart-legend/cube-2.svg';
import NicheCreation from 'public/images/chart-legend/cube-3.svg';

const SectionExplain = () => {
  const { t, i18n } = useTranslation();
  const plantList = usePlantList();
  const modelList = useModelList();
  const [value, { inc, reset, set }] = useCounter(
    plantList.length,
    plantList.length,
    0
  );

  return (
    <section>
      <div
        id="sectionexplain"
        className="relative mx-auto grid w-[1200px] pt-[40px] pb-6 lg:w-full lg:grid-cols-1 lg:gap-y-6 lg:px-4"
      >
        <div className="mb-6 text-2xl font-bold">
          {t('home:oss_eco_evaluation_system')}
        </div>
        <div className="flex h-[521px] w-full overflow-hidden rounded-lg bg-[#eff1f1]">
          <Chart />
          <Legend />
        </div>
      </div>
    </section>
  );
};
const Legend = () => {
  const { t } = useTranslation();

  return (
    <div className="h-full w-[440px] bg-[#eff1f1] py-6 px-4 text-xs">
      <div className="my-4">
        <div className="flex w-[155px] items-center gap-1 font-semibold">
          <Productivity />
          {t('metrics_models:dimensionality:topic:productivity')}
        </div>
        <div className="ml-5 mt-2">
          {t('metrics_models:dimensionality:productivity')}
        </div>
        <div className="mt-3 flex w-[155px] items-center gap-1 font-semibold">
          <Robustness />
          {t('metrics_models:dimensionality:topic:robustness')}
        </div>
        <div className="ml-5 mt-2">
          {t('metrics_models:dimensionality:robustness')}
        </div>
        <div className="mt-3 flex w-[155px] items-center gap-1 font-semibold">
          <NicheCreation />
          {t('metrics_models:dimensionality:topic:niche_creation')}
        </div>
        <div className="ml-5 mt-2">
          {t('metrics_models:dimensionality:niche_creation')}
        </div>
      </div>
      <div className="mt-3 border-t py-4 ">
        <div className="flex items-center gap-1 font-semibold">
          <div className="mt-1 h-4 w-4 border border-[#8b8988] bg-[#fff7cf]" />
          {t('metrics_models:dimensionality:type:collaboration')}
        </div>
        <div className="ml-5 mt-2">
          {t('metrics_models:dimensionality:collaboration')}
        </div>
        <div className="mt-3 flex items-center gap-1 font-semibold">
          <div className="h-4 w-4 border border-[#8b8988] bg-[#f5e5db]" />
          {t('metrics_models:dimensionality:type:contributor')}
        </div>
        <div className="ml-5 mt-2">
          {t('metrics_models:dimensionality:contributor')}
        </div>
        <div className="mt-3 flex items-center gap-1 font-semibold">
          <div className="h-4 w-4 border border-[#8b8988] bg-[#e1e1e1]" />
          {t('metrics_models:dimensionality:type:software')}
        </div>
        <div className="ml-5 mt-2">
          {t('metrics_models:dimensionality:software')}
        </div>
      </div>
      <div className="mt-2 flex h-8 w-[180px] cursor-pointer items-center justify-center bg-[#000000] px-3 text-sm text-white hover:bg-black/90">
        <LinkX href="/docs/dimensions-define/">
          <a>{t('home:more_about_the_evaluation_system')}</a>
        </LinkX>
      </div>
    </div>
  );
};
export default SectionExplain;
