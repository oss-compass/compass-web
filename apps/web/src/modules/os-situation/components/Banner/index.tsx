import React from 'react';
import classnames from 'classnames';
import { useTranslation } from 'next-i18next';
import LinkX from '@common/components/LinkX';
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
          'absolute bottom-0 right-28 h-[213px] w-[359px] md:-right-[300px]',
          style.headerBgGraph
        )}
      ></div>

      <div className="relative mx-auto w-[1200px] pt-10 text-sm  md:w-full md:px-2">
        <div className="h-[40px] text-4xl font-semibold md:-right-[300px]">
          {t('os-situation:banner.title')}
        </div>
        <div
          className={classnames(
            'mb-4 mt-4 line-clamp-3 h-16 max-w-3xl text-base md:-right-[300px]',
            style.headerdsc
          )}
        >
          {t('os-situation:banner.description')}
        </div>
        <div className="flex gap-4">
          <LinkX href="/docs/docs/service-guide/open-source-insights/">
            <div className="h-8 w-32 cursor-pointer bg-gradient-to-r from-[#3d8af7] to-[#0a4bb8] text-center leading-8 text-[#fff]">
              {t('os-situation:banner.service_guide')}
            </div>
          </LinkX>
        </div>
      </div>
    </div>
  );
};

export default Banner;
