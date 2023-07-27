import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { getAnalyzeLink, getRepoLink } from '@common/utils';
import FieldDl from './assets/field-dl.svg';
import FieldBigData from './assets/field-bigdata.svg';

import FieldDb from './assets/field-db.svg';
import FieldWeb from './assets/field-web.svg';

interface FieldItem {
  name: string;
  comingSoon: Boolean;
  svg: React.ReactElement;
  category?: {
    name: string;
    link: string;
  }[];
}

const Field: React.FC<FieldItem> = ({ name, comingSoon, category, svg }) => {
  const { t } = useTranslation();
  return (
    <div className="md:h-50 relative h-40 w-1/4 border-b border-r px-5 py-4 md:w-full lg:w-1/2">
      <div className="absolute right-0 bottom-0 w-[165px]">{svg}</div>
      <h3 className="relative mb-1 break-words text-xl font-bold">{name}</h3>
      {comingSoon && (
        <div className="h-5 w-24 rounded-xl bg-[#ECECEC] text-center text-xs leading-5 text-gray-400">
          {t('home:coming_soon')}
        </div>
      )}
      <div className="relative flex w-1/2 flex-col">
        {category &&
          category.map((c) => {
            if (c.link) {
              return (
                <Link key={c.name} href={c.link}>
                  <a className="mb-1 flex text-sm hover:underline">
                    <p className="mr-1 mt-2 h-1 w-1 shrink-0 rounded-full bg-black" />
                    {c.name}
                  </a>
                </Link>
              );
            }
            return (
              <a
                key={c.name}
                className="mb-1 flex cursor-not-allowed text-sm text-gray-400"
              >
                <span className="mr-1 mt-2 h-1 w-1 shrink-0 rounded-full bg-gray-400" />
                {c.name}
              </a>
            );
          })}
      </div>
    </div>
  );
};
const HotFields = () => {
  const { t } = useTranslation();
  const fieldList: Array<FieldItem> = [
    {
      name: t('home:hot_fields_content.artificial_intelligence'),
      comingSoon: false,
      svg: <FieldDl />,
      category: [
        {
          name: t('home:hot_fields_content.machine_learning_framework'),
          link: '/collection/deep-learning-framework',
        },
      ],
    },
    {
      name: t('home:hot_fields_content.server_os'),
      comingSoon: false,
      svg: <FieldBigData />,
      category: [
        {
          name: t('home:hot_fields_content.big_data_framework'),
          link: '/collection/big-data',
        },
      ],
    },
    {
      name: t('home:hot_fields_content.database'),
      comingSoon: false,
      svg: <FieldDb />,
      category: [
        {
          name: t('home:hot_fields_content.relational_db'),
          link: '/collection/sql-database',
        },
        {
          name: t('home:hot_fields_content.document_db'),
          link: '',
        },
        {
          name: t('home:hot_fields_content.time_series_db'),
          link: '',
        },
        {
          name: t('home:hot_fields_content.graph_db'),
          link: '',
        },
      ],
    },
    {
      name: t('home:hot_fields_content.intelligent_terminal_distributed_os'),
      comingSoon: false,
      svg: <FieldWeb />,
      category: [
        {
          name: t('home:hot_fields_content.web_framework'),
          link: '/collection/web-framework',
        },
      ],
    },
  ];
  return (
    <section
      className={classnames(
        'relative mx-auto flex w-[1200px] flex-col justify-between pt-[40px] pb-[25px]',
        'lg:w-full'
      )}
    >
      <div className="lg:px-4  lg:pb-10">
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
                category={item.category}
                svg={item.svg}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HotFields;
