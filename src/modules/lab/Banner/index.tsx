import React from 'react';
import classnames from 'classnames';
import style from './index.module.css';
import { BsArrowRight } from 'react-icons/bs';
import { useTranslation } from 'next-i18next';

const Banner = () => {
  const { t } = useTranslation();
  return (
    <div
      className={classnames(
        'relative mb-12 h-60 overflow-hidden bg-[#2c5fea]',
        style.headerBgLine
      )}
    >
      <div
        className={classnames(
          'absolute  right-28 bottom-0 h-60 w-[376px] md:-right-[300px]',
          style.headerBgGraph
        )}
      ></div>

      <div className="relative mx-auto w-[1280px] pt-16 text-sm text-[#876E35] md:w-full md:px-2">
        <div
          className={classnames(
            ' h-[40px] w-[260px] md:-right-[300px]',
            style.headerTitle
          )}
        ></div>
        <div
          className={classnames(
            'mt-4 mb-4 h-11 max-w-3xl line-clamp-2 md:-right-[300px]',
            style.headerdsc
          )}
        >
          {t('lab:the_locale_names_are_used_for')}
        </div>
        <div>
          <a className="hover:underline" href="">
            {t('common:know_more')}
          </a>
          <BsArrowRight className="ml-2 inline-block text-xs" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
