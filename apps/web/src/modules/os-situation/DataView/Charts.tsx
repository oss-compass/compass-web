import React from 'react';
import { useTranslation } from 'next-i18next';
import { useQuery } from '@tanstack/react-query';
import SituationCard from '../components/SituationCard1';
import EchartCommon from '../components/EchartCommon';

const fetchPublicData = async (url) => {
  const response = await fetch(url); // 确保路径正确
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const ChartCards = ({ ChartInfo }) => {
  const { data, error, isLoading } = useQuery(['publicData'], () => {
    return fetchPublicData(ChartInfo.value);
  });
  console.log(data);
  return (
    <SituationCard
      bodyClass="h-[600px]"
      title={ChartInfo.text}
      id={ChartInfo.text}
      loading={isLoading}
    >
      {(ref) => {
        return (
          <EchartCommon containerRef={ref} loading={isLoading} option={data} />
        );
      }}
    </SituationCard>
  );
};

const Charts = () => {
  const { t } = useTranslation();
  const chartsList = [
    {
      value:
        '/test/contributor_model/line_AS_country_activity_push_contribution.json',
      text: 'Push 全球年度_欧盟合并',
    },
    {
      value:
        '/test/contributor_model/line_AS_country_not_merge_eu_activity_push_contribution.json',
      text: 'Push 全球年度_欧盟拆开',
    },
    {
      value:
        '/test/contributor_model/line_AS_eu_country_activity_push_contribution.json',
      text: 'Push 欧盟年度',
    },
    {
      value:
        '/test/contributor_model/merge_line_AS_china_city_activity_push_contribution.json',
      text: 'Push 中国年度',
    },
    {
      value:
        '/test/contributor_model/line_AS_china_city_activity_push_contribution.json',
      text: 'Push 中国 (Github) 年度',
    },
    {
      value:
        '/test/contributor_model/gitee_line_AS_china_city_activity_push_contribution.json',
      text: 'Push 中国 (Gitee) 年度',
    },
  ];
  return (
    <>
      <div className="relative mb-12 grid min-w-0 grid-cols-2 gap-4 md:grid-cols-1">
        {chartsList.map((Chart) => {
          return <ChartCards ChartInfo={Chart} key={Chart.value} />;
        })}
      </div>
    </>
  );
};

export default Charts;
