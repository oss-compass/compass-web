import React from 'react';
import { useTranslation } from 'next-i18next';
import { useQuery } from '@tanstack/react-query';
import SituationCard from '../components/SituationCard';
import EchartCommon from '../components/EchartCommon';
import { useCategoriesData } from '../hooks/useCategoriesData';
import { Alert } from 'antd';
import { getTranslatedCountryName } from '../utils/countryMapping';

const fetchPublicData = async (url) => {
  const response = await fetch(url); // 确保路径正确
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const ChartCards = ({ ChartInfo }) => {
  const { t } = useTranslation('os-situation');
  const { data, error, isLoading } = useQuery([ChartInfo.id], () => {
    return fetchPublicData(ChartInfo.value);
  });

  // 处理图表数据，过滤和国际化国家名称
  let processedData = data;
  if (data?.series) {
    processedData = {
      ...data,
      legend: {
        shwo: true,
      },
      series: data.series
        .filter((item) => {
          return (
            item?.name !== '中国(台湾地区除外)-Gitee' &&
            item?.name !== '中国(台湾地区除外)-Github'
          );
        })
        .map((item) => ({
          ...item,
          name: getTranslatedCountryName(item.name, t),
        })),
    };
  }
  return (
    <SituationCard
      bodyClass="h-[600px]"
      title={ChartInfo.name}
      id={ChartInfo.id}
      loading={isLoading}
    >
      {(ref) => {
        return (
          <EchartCommon
            containerRef={ref}
            loading={isLoading}
            option={processedData}
          />
        );
      }}
    </SituationCard>
  );
};

const Charts = ({ metric }) => {
  const { t } = useTranslation('os-situation');
  const categoriesData = useCategoriesData();
  const chartsList = categoriesData[metric];
  const descMap = {
    topics: t('description.topics'),
    // 'languages': t('os-situation:description.languages'),
  };
  return (
    <>
      <div className="base-card relative">
        {descMap?.[metric] && (
          <div className="mb-6">
            {' '}
            <Alert message={descMap?.[metric]} showIcon />
          </div>
        )}
        {chartsList.map((ChartItem) => {
          return (
            <div key={ChartItem.id}>
              <h1
                id={ChartItem.id}
                className={
                  'group relative z-20 mb-8 flex text-3xl font-semibold md:px-4 md:text-3xl'
                }
              >
                {ChartItem.name}
                <a href={`#${ChartItem.id}`}>
                  <span className="group-hover:text-primary invisible ml-2 cursor-pointer group-hover:visible">
                    #
                  </span>
                </a>
              </h1>

              <div className="relative mb-12 grid min-w-0 grid-cols-2 gap-4 md:grid-cols-1">
                {ChartItem.value.map((item) => (
                  <ChartCards ChartInfo={item} key={item.value} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Charts;
