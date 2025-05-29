import React, { useMemo } from 'react';
import EchartCommon from '@modules/developer/components/EchartCommon';
import { getPathname } from '@common/utils';
import { useTranslation } from 'next-i18next';

interface RepoContributionData {
  repo: string;
  push_contribution: number;
  pull_request_contribution: number;
  pull_request_comment_contribution: number;
  issue_contribution: number;
  issue_comment_contribution: number;
  total_contribution: number;
  repo_roles: string[];
}

interface ChartProps {
  containerRef?: React.RefObject<HTMLElement>;
  data?: RepoContributionData[];
}

const RankCharts: React.FC<ChartProps> = ({ containerRef, data = [] }) => {
  const { t } = useTranslation();

  const processedData = useMemo(() => {
    if (!data || data.length === 0) return [];
    return [...data].sort(
      (a, b) => a.total_contribution - b.total_contribution
    );
  }, [data]);

  // 提取仓库名称（从URL中获取）
  const repoNames = useMemo(() => {
    return processedData.map((item) => {
      return getPathname(item.repo);
    });
  }, [processedData]);
  const repoRoles = useMemo(() => {
    return processedData.map((item) => {
      return item.repo_roles && item.repo_roles.length > 0
        ? `${t('analyze:metric_detail:' + item.repo_roles[0])}`
        : '';
    });
  }, [processedData]);
  const option = {
    color: [
      '#4791ff',
      '#02bc77',
      '#ffd950',
      '#ff2366',
      '#ef6667',
      '#fcb32c',
      '#409eff',
      '#76d275',
      '#505d96',
      '#ededed',
      '#5686a5',
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      formatter: function (params) {
        const repo = repoNames[params[0].dataIndex];
        let tooltipContent = `<div style="font-weight:bold;margin-bottom:5px;">${repo}</div>`;

        params.forEach((param) => {
          tooltipContent += `<div style="display:flex;justify-content:space-between;align-items:center;margin:3px 0;">
                        <span style="margin-right:15px;">
                            <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background-color:${param.color};margin-right:5px;"></span>
                            ${param.seriesName}:
                        </span>
                        <span style="font-weight:bold;">${param.value}</span>
                    </div>`;
        });

        return tooltipContent;
      },
    },
    legend: {
      left: '10',
      top: '10',
      icon: 'circle',
    },
    grid: {
      left: '3%',
      right: '130',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      splitLine: {
        show: false,
      },
    },
    dataZoom: [
      {
        type: 'slider',
        show: true,
        yAxisIndex: [0, 1],
        left: '93%',
        startValue: processedData.length,
        endValue: processedData.length > 10 ? processedData.length - 10 : 0,
        maxValueSpan: 10,
      },
    ],
    yAxis: [
      {
        type: 'category',
        data: repoNames,
        axisLabel: {
          formatter: function (value) {
            // // 如果仓库名称太长，截断显示
            // if (value.length > 20) {
            //     return value.substring(0, 17) + '...';
            // }
            return value;
          },
        },
      },
      {
        type: 'category',
        position: 'right',
        data: repoRoles,
        offset: 10,
        axisLine: {
          show: true,
        },
        axisTick: {
          show: true,
        },
        axisLabel: {
          show: true,
          color: '#999',
          formatter: function (value) {
            // // 如果角色名称太长，截断显示
            // if (value.length > 15) {
            //     return value.substring(0, 12) + '...';
            // }
            return value;
          },
        },
      },
    ],
    series: [
      {
        name: 'Push',
        type: 'bar',
        stack: 'total',
        barWidth: 20,
        emphasis: {
          focus: 'series',
        },
        data: processedData.map((item) => item.push_contribution),
      },
      {
        name: 'Pull Request',
        type: 'bar',
        stack: 'total',
        barWidth: 20,
        emphasis: {
          focus: 'series',
        },
        data: processedData.map((item) => item.pull_request_contribution),
      },
      {
        name: 'PR Comment',
        type: 'bar',
        stack: 'total',
        barWidth: 20,
        emphasis: {
          focus: 'series',
        },
        data: processedData.map(
          (item) => item.pull_request_comment_contribution
        ),
      },
      {
        name: 'Issue',
        type: 'bar',
        stack: 'total',
        barWidth: 20,
        emphasis: {
          focus: 'series',
        },
        data: processedData.map((item) => item.issue_contribution),
      },
      {
        name: 'Issue Comment',
        type: 'bar',
        stack: 'total',
        barWidth: 20,
        emphasis: {
          focus: 'series',
        },
        data: processedData.map((item) => item.issue_comment_contribution),
      },
    ],
  };

  return (
    <>
      <EchartCommon option={option} containerRef={containerRef} />
    </>
  );
};

export default React.memo(RankCharts);
