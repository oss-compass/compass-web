import React from 'react';
import classnames from 'classnames';
import { useTranslation } from 'next-i18next';
import Coutact from '../../Coutact';
import DataUsageProcess from '../../DataUsageProcess';
import style from './index.module.css';

const Banner = () => {
  const { t } = useTranslation();
  return (
    <div
      className={classnames(
        'relative h-60 overflow-hidden bg-[#ffebbf]',
        style.headerBgLine
      )}
    >
      <div
        className={classnames(
          'absolute right-28 bottom-0 h-[213px] w-[359px] md:-right-[300px]',
          style.headerBgGraph
        )}
      ></div>

      <div className="relative mx-auto w-[1200px] pt-10 text-sm  md:w-full md:px-2">
        <div className="h-[40px] text-4xl font-semibold md:-right-[300px]">
          {t('academe:academic_research_cooperation')}
        </div>
        <div
          className={classnames(
            'line-clamp-3 mt-4 mb-4 h-16 max-w-3xl text-base md:-right-[300px]',
            style.headerdsc
          )}
        >
          {t('academe:academic_research_desc')}
        </div>
        <div className="flex gap-4">
          <Coutact />
          <DataUsageProcess />
        </div>
      </div>
    </div>
  );
};

export default Banner;
