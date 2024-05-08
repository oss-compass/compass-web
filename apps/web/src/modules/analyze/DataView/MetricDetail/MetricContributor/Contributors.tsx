import React, { useRef, useMemo, useState } from 'react';
import { useContributorsOverviewQuery } from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { useTranslation } from 'next-i18next';
import MetricChart from '@modules/analyze/DataView/MetricDetail/MetricChart';
import { gradientRamp } from '@common/options';
import type { EChartsOption } from 'echarts';
import { useGetEcologicalText } from './contribution';
import PieDropDownMenu from '../PieDropDownMenu';

const getSeriesFun = (data, onlyIdentity, onlyOrg, getEcologicalText) => {
  const legend = [];
  const ecoData = [];
  const contributorsData = [];
  let allCount = 0;

  if (onlyIdentity || onlyOrg) {
    if (data?.orgContributorsDistribution?.length > 0) {
      const orgContributorsDistribution = data.orgContributorsDistribution;
      const map = onlyIdentity
        ? ['manager', 'participant']
        : ['individual', 'organization'];

      map.forEach((item, i) => {
        let list = orgContributorsDistribution.filter((i) =>
          i?.subTypeName?.includes(item)
        );
        let distribution = list.flatMap((i) => i.topContributorDistribution);
        distribution.sort((a, b) => b.subCount - a.subCount);
        const { name, index } = getEcologicalText(item);
        const colorList = gradientRamp[index];
        let count = 0;
        let otherCount = 0;
        if (item === 'organization') {
          distribution = distribution.reduce((acc, curr) => {
            const found = acc.find((item) => item.subBelong === curr.subBelong);
            if (found) {
              found.subCount += curr.subCount;
            } else {
              acc.push({
                subBelong: curr.subBelong,
                subName: curr.subBelong,
                subCount: curr.subCount,
              });
            }
            return acc;
          }, []);
        }

        distribution.forEach((z, y) => {
          const { subCount, subName } = z;
          count += subCount;
          if (subName == 'other' || y > 10) {
            otherCount += subCount;
          } else {
            contributorsData.push({
              parentName: name,
              name: subName,
              value: subCount,
              itemStyle: { color: colorList[y + 1] },
            });
          }
        });
        otherCount &&
          contributorsData.push({
            parentName: name,
            name: 'other',
            value: otherCount,
            itemStyle: { color: colorList[0] },
          });
        legend.push({
          index: index,
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
  } else {
    if (data?.orgContributorsDistribution?.length > 0) {
      const orgContributorsDistribution = data.orgContributorsDistribution;
      orgContributorsDistribution.forEach((item, i) => {
        const { subTypeName, topContributorDistribution } = item;
        const { name, index } = getEcologicalText(subTypeName);
        const colorList = gradientRamp[index];
        let count = 0;
        topContributorDistribution.forEach(({ subCount, subName }, index) => {
          count += subCount;
          contributorsData.push({
            parentName: name,
            name: subName,
            value: subCount,
            itemStyle: { color: colorList[index + 1] },
          });
        });
        legend.push({
          name: name,
          index: index,
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
  }
  legend.sort((a, b) => a?.index - b?.index);
  return {
    legend,
    allCount,
    ecoData,
    contributorsData,
  };
};
const ContributorContributors: React.FC<{
  label: string;
  level: string;
  beginDate: Date;
  endDate: Date;
  commonFilterOpts: any[];
}> = ({ label, level, beginDate, endDate, commonFilterOpts }) => {
  const { t } = useTranslation();
  const getEcologicalText = useGetEcologicalText();
  const chartRef = useRef<HTMLDivElement>(null);
  const [onlyIdentity, setOnlyIdentity] = useState<boolean>(false);
  const [onlyOrg, setOnlyOrg] = useState<boolean>(false);
  const { data, isLoading } = useContributorsOverviewQuery(client, {
    label: label,
    level: level,
    beginDate: beginDate,
    endDate: endDate,
    filterOpts: commonFilterOpts,
  });

  const getSeries = useMemo(() => {
    return getSeriesFun(data, onlyIdentity, onlyOrg, getEcologicalText);
  }, [data, onlyIdentity, onlyOrg, getEcologicalText]);
  const unit: string = t('analyze:metric_detail:contributor_unit');
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
        t('analyze:metric_detail:contributor_distribution') +
        '(' +
        getSeries.allCount +
        unit +
        ')',
      left: 'center',
    },
    series: [
      {
        top: 15,
        name: '',
        type: 'pie',
        selectedMode: 'single',
        radius: [0, '40%'],
        label: {
          position: 'inner',
          fontSize: 12,
          color: '#333',
          formatter: formatter,
          show: false,
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
        name: '',
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
    <div className="relative flex h-full pt-4" ref={chartRef}>
      <div className="absolute right-6 z-10 h-4 bg-transparent pl-4 text-xs">
        <PieDropDownMenu
          onlyIdentity={onlyIdentity}
          onOnlyIdentityChange={(b) => {
            setOnlyIdentity(b);
            if (b) {
              setOnlyOrg(false);
            }
          }}
          onlyOrg={onlyOrg}
          onOnlyOrgChange={(b) => {
            setOnlyOrg(b);
            if (b) {
              setOnlyIdentity(false);
            }
          }}
        />
      </div>
      <MetricChart
        style={{ height: '100%' }}
        loading={isLoading}
        option={option}
        containerRef={chartRef}
        filterData={getSeries.contributorsData}
      />
    </div>
  );
};
export default ContributorContributors;
