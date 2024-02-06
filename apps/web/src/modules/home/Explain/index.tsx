import React from 'react';
import { useTranslation } from 'react-i18next';
import Chart from './Chart';
import Legend from '@common/components/EChartGl/Legend';

const SectionExplain = () => {
  const { t } = useTranslation();

  return (
    <section>
      <div
        id="sectionexplain"
        className="relative mx-auto grid max-w-[1200px] pt-[40px] pb-6 lg:w-full lg:grid-cols-1 lg:gap-y-6 lg:px-4"
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
export default SectionExplain;
