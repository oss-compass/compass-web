import React from 'react';
import classnames from 'classnames';
import style from './index.module.css';
import Center from '@common/components/Layout/Center';
import { useTranslation } from 'next-i18next';

const Banner = () => {
  const { t } = useTranslation();
  return (
    <div
      className={classnames(
        'relative h-40 overflow-hidden bg-[#2c5fea]',
        style.headerBgLine
      )}
    >
      <div
        className={classnames(
          'absolute  right-28 bottom-0 h-60 w-[376px] md:-right-[300px]',
          style.headerBgGraph
        )}
      />

      <Center>
        <div className={classnames('mt-14 text-4xl font-bold text-[#886F36] ')}>
          My Models
        </div>
      </Center>
    </div>
  );
};

export default Banner;
