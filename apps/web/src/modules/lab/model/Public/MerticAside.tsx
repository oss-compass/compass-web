import React from 'react';
import cls from 'classnames';
import { useMetricSetListQuery } from '@oss-compass/graphql';
import gqlClient from '@common/gqlClient';
import Loading from './Loading';
import groupBy from 'lodash/groupBy';
import { useTranslation } from 'next-i18next';

const MerticList = ({ mertics, activeList, setActiveList }) => {
  const { t } = useTranslation();

  console.log(mertics);
  return (
    <div className="flex flex-wrap">
      {mertics.map(({ category, ident, id }) => {
        const nameKey = `lab_metrics:${category}.${ident}`;
        const name = t(nameKey);
        const active = activeList === id;
        return (
          <a
            key={id}
            className={cls(
              'mb-2 mr-2 box-border inline-block cursor-pointer items-center border px-2 py-1 text-sm font-normal leading-[normal] transition-colors hover:text-blue-600 focus:outline-none',
              active && 'border-blue-200 bg-blue-50 text-blue-600'
            )}
            onClick={() => {
              if (active) {
                setActiveList(0);
              } else {
                setActiveList(id);
              }
              //   if (active) {
              //     setActiveList((prevList) =>
              //       prevList.filter((item) => item !== ident)
              //     );
              //   } else {
              //     setActiveList((prevList) => [...prevList, ident]);
              //   }
            }}
          >
            {name}
          </a>
        );
      })}
    </div>
  );
};

const MerticAside = ({
  activeList,
  setActiveList,
  className,
}: {
  activeList: number;
  setActiveList: (t) => void;
  className?: string;
}) => {
  const { t } = useTranslation();
  const { data, isLoading } = useMetricSetListQuery(
    gqlClient,
    {},
    { staleTime: 5 * 60 * 1000 }
  );
  if (isLoading) {
    return (
      <Loading className="w-[312px] flex-shrink-0 px-4 pb-[22px] sm:hidden lg:!w-[256px]" />
    );
  }
  const categoryMap = groupBy(data?.metricSetOverview, 'category');
  const categoryKeys = Object.keys(categoryMap);

  return (
    <div className="grid gap-y-4">
      {categoryKeys?.map((category) => {
        return (
          <div className="grid gap-y-2" key={category}>
            <div className="text-base font-medium">
              {t(`lab_metrics:${category}.title`)}
            </div>
            <MerticList
              mertics={categoryMap[category]}
              activeList={activeList}
              setActiveList={setActiveList}
            />
          </div>
        );
      })}
    </div>
  );
};

export default MerticAside;
