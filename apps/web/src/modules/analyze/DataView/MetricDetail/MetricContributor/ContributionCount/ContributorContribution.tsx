import React, { useRef, useMemo, useState } from 'react';
import {
  useEcoContributorsOverviewQuery,
  useOrgContributionDistributionQuery,
} from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { useTranslation } from 'next-i18next';
import MetricChart from '@modules/analyze/DataView/MetricDetail/MetricChart';
import { useGetEcologicalText } from '../contribution';
import { gradientRamp } from '@common/options';
import PieDropDownMenu from '../../PieDropDownMenu';
import type { EChartsOption } from 'echarts';

const ContributorContribution: React.FC<{
  label: string;
  level: string;
  beginDate: Date;
  endDate: Date;
  commonFilterOpts: any[];
}> = ({ label, level, beginDate, endDate, commonFilterOpts }) => {
  const [orgModel, setOrgModel] = useState<boolean>(true);
  const [onlyIdentity, setOnlyIdentity] = useState<boolean>(false);
  const [onlyOrg, setOnlyOrg] = useState<boolean>(false);

  return (
    <div className="relative w-[50%] flex-shrink-0 pt-4 lg:h-[50%] lg:w-full">
      <div className="absolute right-6 z-10 h-4 bg-transparent pl-4 text-xs">
        <PieDropDownMenu
          showOrgModel={true}
          orgModel={orgModel}
          onOrgModelChange={(b) => {
            setOrgModel(b);
            if (b) {
              setOnlyIdentity(false);
              setOnlyOrg(false);
            }
          }}
          onlyIdentity={onlyIdentity}
          onOnlyIdentityChange={(b) => {
            setOnlyIdentity(b);
            if (b) {
              setOrgModel(false);
              setOnlyOrg(false);
            }
          }}
          onlyOrg={onlyOrg}
          onOnlyOrgChange={(b) => {
            setOnlyOrg(b);
            if (b) {
              setOnlyIdentity(false);
              setOrgModel(false);
            }
          }}
        />
      </div>
      {orgModel ? (
        <OrgContributorContribution
          label={label}
          level={level}
          beginDate={beginDate}
          endDate={endDate}
          commonFilterOpts={commonFilterOpts}
        />
      ) : (
        <EcoContributorContribution
          label={label}
          level={level}
          beginDate={beginDate}
          endDate={endDate}
          commonFilterOpts={commonFilterOpts}
          orgModel={orgModel}
          onlyIdentity={onlyIdentity}
          onlyOrg={onlyOrg}
        />
      )}
    </div>
  );
};

const getSeriesFun = (data, onlyIdentity, onlyOrg, getEcologicalText) => {
  const legend = [];
  const ecoData = [];
  const contributorsData = [];
  let allCount = 0;

  if (onlyIdentity || onlyOrg) {
    if (data?.ecoContributorsOverview?.length > 0) {
      const ecoContributorsOverview = data.ecoContributorsOverview;
      const map = onlyIdentity
        ? ['manager', 'participant']
        : ['individual', 'organization'];

      map.forEach((item, i) => {
        let list = ecoContributorsOverview.filter((i) =>
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

        distribution.forEach((z, index) => {
          const { subCount, subName } = z;
          count += subCount;
          if (subName == 'other' || index > 10) {
            otherCount += subCount;
          } else {
            contributorsData.push({
              parentName: name,
              name: subName,
              value: subCount,
              itemStyle: { color: colorList[index + 1] },
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
    if (data?.ecoContributorsOverview?.length > 0) {
      const ecoContributorsOverview = data.ecoContributorsOverview;
      ecoContributorsOverview.forEach((item, i) => {
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
  }
  legend.sort((a, b) => a?.index - b?.index);
  return {
    legend,
    allCount,
    ecoData,
    contributorsData,
  };
};

const EcoContributorContribution: React.FC<{
  label: string;
  level: string;
  beginDate: Date;
  endDate: Date;
  commonFilterOpts: any[];
  orgModel: boolean;
  onlyIdentity: boolean;
  onlyOrg: boolean;
}> = ({
  label,
  level,
  beginDate,
  endDate,
  commonFilterOpts,
  orgModel,
  onlyIdentity,
  onlyOrg,
}) => {
  const { t } = useTranslation();
  const chartRef = useRef<HTMLDivElement>(null);
  const { data, isLoading } = useEcoContributorsOverviewQuery(client, {
    label: label,
    level: level,
    beginDate: beginDate,
    endDate: endDate,
    // filterOpts: commonFilterOpts,
  });
  const getEcologicalText = useGetEcologicalText();
  const getSeries = useMemo(() => {
    return getSeriesFun(data, onlyIdentity, onlyOrg, getEcologicalText);
  }, [data, onlyIdentity, onlyOrg, getEcologicalText]);
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
        style={{ height: '100%', zIndex: 1 }}
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
  commonFilterOpts: any[];
}> = ({ label, level, beginDate, endDate, commonFilterOpts }) => {
  const { t } = useTranslation();
  const chartRef = useRef<HTMLDivElement>(null);
  const { data, isLoading } = useOrgContributionDistributionQuery(client, {
    label: label,
    level: level,
    beginDate: beginDate,
    endDate: endDate,
    // filterOpts: commonFilterOpts,
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
        const { name, index } = getEcologicalText(subTypeName);
        const colorList = gradientRamp[index];
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
    legend.sort((a, b) => a?.index - b?.index);
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
        style={{ height: '100%', zIndex: 1 }}
        loading={isLoading}
        option={option}
        containerRef={chartRef}
        filterData={getSeries.contributorsData}
      />
    </div>
  );
};
export default ContributorContribution;
