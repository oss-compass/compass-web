import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { getAnalyzeLink, getRepoLink } from '@common/utils';
import FieldAi from './assets/field-ai.svg';
import FieldSos from './assets/field-sos.svg';
import FieldDb from './assets/field-db.svg';
import FieldItdo from './assets/field-itdo.svg';

interface FieldItem {
  name: string;
  comingSoon: Boolean;
  link: string;
  svg: React.ReactElement;
}

const Field: React.FC<FieldItem> = ({ name, comingSoon, link, svg }) => {
  const { t } = useTranslation();
  return (
    <div className="relative h-40 w-1/4 border-b border-r px-5 py-4  lg:w-1/2">
      <Link href={link} legacyBehavior={true}>
        <a
          onClick={(e) => {
            console.log(e);
            comingSoon && e.preventDefault();
          }}
          className="mb-4 block h-20 w-3/4"
        >
          <h3 className="mb-1  break-words text-xl font-bold line-clamp-2 hover:underline">
            {name}
          </h3>
          {comingSoon && (
            <div className="h-5 w-24  rounded-xl bg-[#ECECEC] text-center text-xs leading-5 text-gray-400">
              {t('home:coming_soon')}
            </div>
          )}
        </a>
      </Link>
      <div className="absolute right-0 bottom-0">{svg}</div>
    </div>
  );
};
const HotFields = () => {
  const { t } = useTranslation();
  const fieldList: Array<FieldItem> = [
    {
      name: t('home:artificial_intelligence'),
      comingSoon: false,
      link: '/analyze?label=https%3A%2F%2Fgithub.com%2Ftensorflow%2Ftensorflow&level=repo&label=https%3A%2F%2Fgithub.com%2Fpytorch%2Fpytorch&label=https%3A%2F%2Fgitee.com%2Fmindspore%2Fmindspore&label=https%3A%2F%2Fgithub.com%2FPaddlePaddle%2FPaddle',
      svg: <FieldAi />,
    },
    {
      name: t('home:server_os'),
      comingSoon: true,
      link: '',
      svg: <FieldSos />,
    },
    {
      name: t('home:database'),
      comingSoon: false,

      link: '/analyze?label=https%3A%2F%2Fgitee.com%2Fopengauss%2FopenGauss-server&label=https%3A%2F%2Fgithub.com%2Foceanbase%2Foceanbase&label=https%3A%2F%2Fgithub.com%2Fpingcap%2Ftidb&level=repo',
      svg: <FieldDb />,
    },
    {
      name: t('home:intelligent_terminal_distributed_os'),
      comingSoon: true,
      link: '',
      svg: <FieldItdo />,
    },
  ];
  return (
    <section
      className={classnames(
        'relative mx-auto flex w-[1200px] flex-col justify-between pt-[40px] pb-[25px]',
        'lg:w-full'
      )}
    >
      <div className="mb-6 flex justify-between text-2xl font-bold">
        {t('home:hot_fields')}
      </div>
      <div className="flex w-full flex-wrap rounded border-t border-l lg:w-full">
        {fieldList.map((item) => {
          return (
            <Field
              key={item.name}
              name={item.name}
              comingSoon={item.comingSoon}
              link={item.link}
              svg={item.svg}
            />
          );
        })}
      </div>
    </section>
  );
};

export default HotFields;
