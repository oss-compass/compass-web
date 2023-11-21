import React from 'react';
import { useTranslation } from 'react-i18next';
import Svg1 from './assets/icon1.svg';
import Svg2 from './assets/icon2.svg';
import Svg3 from './assets/icon3.svg';

const Purpose = () => {
  const { t } = useTranslation();

  return (
    <section className="mx-auto grid w-[1200px] grid-cols-3 gap-x-6 pb-16 md:grid-cols-1 md:gap-y-6 lg:w-full lg:px-4">
      <div className="flex flex-col items-center rounded-lg border p-8">
        <div className="h-36 w-32">
          <Svg1 />
        </div>
        <div className="mt-2 text-xl font-semibold">
          {t('home:open_source_manage')}
        </div>
        <div className="mt-4 text-base">
          {t('home:open_source_manage_desc')}
        </div>
      </div>
      <div className="flex flex-col items-center rounded-lg border p-8">
        <div className="h-36 w-32">
          <Svg2 />
        </div>
        <div className="mt-2 text-xl font-semibold">
          {t('home:data_decision')}
        </div>
        <div className="mt-4 text-base">{t('home:data_decision_desc')}</div>
      </div>
      <div className="flex flex-col items-center rounded-lg border p-8">
        <div className="h-36 w-32">
          <Svg3 />
        </div>
        <div className="mt-2 text-xl font-semibold">
          {t('home:academic_research')}
        </div>
        <div className="mt-4 text-base">{t('home:academic_research_desc')}</div>
      </div>
    </section>
  );
};

export default Purpose;
