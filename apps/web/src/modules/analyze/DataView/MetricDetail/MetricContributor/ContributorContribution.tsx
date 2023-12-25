import React, { useRef, useMemo, useState } from 'react';
import {
  useEcoContributorsOverviewQuery,
  useOrgContributionDistributionQuery,
} from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { useTranslation } from 'next-i18next';
import MetricChart from '@modules/analyze/DataView/MetricDetail/MetricChart';
import { useGetEcologicalText } from './contribution';
import { gradientRamp } from '@common/options';
import { Switch } from 'antd';
import type { EChartsOption } from 'echarts';

const ContributorContribution: React.FC<{
  label: string;
  level: string;
  beginDate: Date;
  endDate: Date;
  mileage: string[];
}> = ({ label, level, beginDate, endDate, mileage }) => {
  const [orgModel, setOrgModel] = useState<boolean>(true);
  const { t } = useTranslation();
  const onChange = (checked: boolean) => {
    setOrgModel(checked);
  };
  return (
    <div className="relative h-[600px] w-[50%] flex-1 pt-4">
      <div className="absolute z-10 h-4 bg-transparent pl-4 text-xs">
        <span className="mr-2">
          {t('analyze:metric_detail:show_organization')}
        </span>
        <Switch
          onChange={onChange}
          defaultChecked
          size="small"
          className="bg-[#bfbfbf]"
        />
      </div>
      {orgModel ? (
        <OrgContributorContribution
          label={label}
          level={level}
          beginDate={beginDate}
          endDate={endDate}
          mileage={mileage}
        />
      ) : (
        <EcoContributorContribution
          label={label}
          level={level}
          beginDate={beginDate}
          endDate={endDate}
          mileage={mileage}
        />
      )}
    </div>
  );
};

const EcoContributorContribution: React.FC<{
  label: string;
  level: string;
  beginDate: Date;
  endDate: Date;
  mileage: string[];
}> = ({ label, level, beginDate, endDate, mileage }) => {
  const { t } = useTranslation();
  const chartRef = useRef<HTMLDivElement>(null);
  const { data, isLoading } = useEcoContributorsOverviewQuery(client, {
    label: label,
    level: level,
    beginDate: beginDate,
    endDate: endDate,
    filterOpts: [{ type: 'mileage_type', values: mileage }],
  });
  const getEcologicalText = useGetEcologicalText();
  const getSeries = useMemo(() => {
    const legend = [];
    const ecoData = [];
    const contributorsData = [];
    let allCount = 0;
    if (data?.ecoContributorsOverview?.length > 0) {
      const ecoContributorsOverview = data.ecoContributorsOverview;
      ecoContributorsOverview.forEach((item, i) => {
        const { subTypeName, topContributorDistribution } = item;
        const name = getEcologicalText(subTypeName);
        const colorList = gradientRamp[i];
        let count = 0;
        topContributorDistribution.forEach(({ subCount, subName }, index) => {
          count += subCount;
          // const color = `rgba(74, 144, 226, ${1-index * 0.1})`;
          contributorsData.push({
            parentName: name,
            name: subName,
            value: subCount,
            itemStyle: { color: colorList[index + 1] },
          });
        });
        legend.push({
          name: name,
          itemStyle: { color: colorList[0] },
        });
        allCount += count;
        ecoData.push({
          name: name,
          value: count,
          itemStyle: { color: colorList[0] },
        });
      });
    }
    return {
      legend,
      allCount,
      ecoData,
      contributorsData,
    };
  }, [data]);
  const unit: string = t('analyze:metric_detail:contribution_unit');
  const formatter = '{b} : {c}' + unit + ' ({d}%)';
  const option: EChartsOption = {
    tooltip: {
      trigger: 'item',
      formatter: formatter,
    },
    legend: {
      top: 40,
      left: 'center',
      data: getSeries.legend,
    },
    title: {
      text:
        t('analyze:metric_detail:global_contribution_distribution') +
        '(' +
        getSeries.allCount +
        unit +
        ')',
      left: 'center',
    },
    series: [
      {
        top: 15,
        name: '生态类型',
        type: 'pie',
        selectedMode: 'single',
        radius: [0, '40%'],
        label: {
          position: 'inner',
          fontSize: 12,
          color: '#333',
          formatter: formatter,
        },
        labelLine: {
          show: false,
        },
        labelLayout: {
          hideOverlap: false,
          moveOverlap: 'shiftY',
        },
        data: getSeries.ecoData,
      },
      {
        top: 15,
        name: '贡献者',
        type: 'pie',
        radius: ['50%', '62%'],
        labelLine: {
          length: 30,
        },
        label: {
          formatter: formatter,
          color: '#333',
        },
        data: getSeries.contributorsData,
      },
    ],
  };

  return (
    <div className="h-full w-full" ref={chartRef}>
      <MetricChart
        style={{ height: '100%', zIndex: 1, marginTop: '20px' }}
        loading={isLoading}
        option={option}
        containerRef={chartRef}
        filterData={getSeries.contributorsData}
      />
    </div>
  );
};

const OrgContributorContribution: React.FC<{
  label: string;
  level: string;
  beginDate: Date;
  endDate: Date;
  mileage: string[];
}> = ({ label, level, beginDate, endDate, mileage }) => {
  const { t } = useTranslation();
  const chartRef = useRef<HTMLDivElement>(null);
  const { data, isLoading } = useOrgContributionDistributionQuery(client, {
    label: label,
    level: level,
    beginDate: beginDate,
    endDate: endDate,
    filterOpts: [{ type: 'mileage_type', values: mileage }],
  });
  const getEcologicalText = useGetEcologicalText();
  const getSeries = useMemo(() => {
    const legend = [];
    const ecoData = [];
    const contributorsData = [];
    let allCount = 0;
    if (data?.orgContributionDistribution?.length > 0) {
      const orgContributionDistribution = data.orgContributionDistribution;
      orgContributionDistribution.forEach((item, i) => {
        const { subTypeName, topContributorDistribution } = item;
        const name = getEcologicalText(subTypeName);
        const colorList = gradientRamp[i];
        let count = 0;
        topContributorDistribution.forEach(({ subCount, subName }, index) => {
          count += subCount;
          // const color = `rgba(74, 144, 226, ${1-index * 0.1})`;
          contributorsData.push({
            parentName: name,
            name: subName,
            value: subCount,
            itemStyle: { color: colorList[index + 1] },
          });
        });
        legend.push({
          name: name,
          itemStyle: { color: colorList[0] },
        });
        allCount += count;
        ecoData.push({
          name: name,
          value: count,
          itemStyle: { color: colorList[0] },
        });
      });
    }
    return {
      legend,
      allCount,
      ecoData,
      contributorsData,
    };
  }, [data]);
  const unit: string = t('analyze:metric_detail:contribution_unit');
  const formatter = '{b} : {c}' + unit + ' ({d}%)';
  const option: EChartsOption = {
    tooltip: {
      trigger: 'item',
      formatter: formatter,
    },
    legend: {
      top: 40,
      left: 'center',
      data: getSeries.legend,
    },
    title: {
      text:
        t('analyze:metric_detail:global_contribution_distribution') +
        '(' +
        getSeries.allCount +
        unit +
        ')',
      left: 'center',
    },
    series: [
      {
        top: 15,
        name: '生态类型',
        type: 'pie',
        selectedMode: 'single',
        radius: [0, '40%'],
        label: {
          position: 'inner',
          fontSize: 12,
          color: '#333',
          formatter: formatter,
        },
        labelLine: {
          show: false,
        },
        labelLayout: {
          hideOverlap: false,
          moveOverlap: 'shiftY',
        },
        data: getSeries.ecoData,
      },
      {
        top: 15,
        name: '贡献者',
        type: 'pie',
        radius: ['50%', '62%'],
        labelLine: {
          length: 30,
        },
        label: {
          formatter: formatter,
          color: '#333',
        },
        data: getSeries.contributorsData,
      },
    ],
  };
  return (
    <div className="h-full w-full" ref={chartRef}>
      <MetricChart
        style={{ height: '100%', zIndex: 1, marginTop: '20px' }}
        loading={isLoading}
        option={option}
        containerRef={chartRef}
        filterData={getSeries.contributorsData}
      />
    </div>
  );
};
export default ContributorContribution;
