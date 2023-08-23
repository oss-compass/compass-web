import React from 'react';
import { useRouter } from 'next/router';
import classnames from 'classnames';
import { BsArrowRight } from 'react-icons/bs';
import { useTranslation } from 'next-i18next';

import style from './index.module.css';

const Banner = () => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <div
      className={classnames(
        'relative mb-12 h-60 overflow-hidden bg-[#ffebbf]',
        style.headerBgLine
      )}
    >
      <div
        className={classnames(
          'absolute  right-28 bottom-0 h-60 w-[376px] md:-right-[300px]',
          style.headerBgGraph
        )}
      ></div>

      <div className="relative mx-auto w-[1280px] pt-10 text-sm text-[#876E35] md:w-full md:px-2">
        <div
          className={classnames(
            'h-[40px] w-[260px] md:-right-[300px]',
            style.headerTitle
          )}
        ></div>
        <div
          className={classnames(
            'line-clamp-3 mt-4 mb-4 h-16 max-w-3xl md:-right-[300px]',
            style.headerdsc
          )}
        >
          {t('lab:the_locale_names_are_used_for')}
        </div>
        <div className="flex">
          <div
            className="h-8 w-32 cursor-pointer bg-gradient-to-r from-[#F1B600] to-[#854700] text-center leading-8 text-[#fff]"
            onClick={() => {
              router.push('/lab/model/create');
            }}
          >
            {t('lab:create_a_model')}
          </div>
          {/*<div className="ml-6 h-8 text-center leading-8">*/}
          {/*  <a className="hover:underline" href="">*/}
          {/*    {t('common:know_more')}*/}
          {/*  </a>*/}
          {/*  <BsArrowRight className="ml-2 inline-block text-xs" />*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
};

export default Banner;
