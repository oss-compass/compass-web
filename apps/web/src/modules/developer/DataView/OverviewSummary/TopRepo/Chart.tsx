import React from 'react';
import EchartCommon from '@modules/developer/components/EchartCommon';
import { getPathname, getNameSpacePng } from '@common/utils';

interface RepoData {
  repo_url: string;
  contribution: number;
}

interface ChartProps {
  containerRef: React.RefObject<HTMLDivElement>;
  data?: RepoData[];
}

const Pie: React.FC<ChartProps> = ({ containerRef, data }) => {
  // 如果没有数据或数据为空，使用默认值
  // 处理API返回的数据
  const processedData = data.slice(0, 5).map((item) => ({
    name: getPathname(item.repo_url),
    value: item.contribution,
    img: getNameSpacePng(item.repo_url),
  }));

  let xAxisData = processedData.map((item) => item.name);
  let seriesData = processedData.map((item) => item.value);
  let maxSeriesData = [];
  const MAX = Math.max(...seriesData);
  for (let i = 0; i < seriesData.length; i++) {
    maxSeriesData.push(MAX);
  }

  let barLinearColors = [
    '#4791ff',
    '#02bc77',
    '#ffd950',
    '#ff2366',
    '#ef6667',
    // 其他颜色注释保持不变
  ];

  function rankBarColor(cData) {
    let tempData = [];
    cData.forEach((item, index) => {
      tempData.push({
        value: item,
        itemStyle: {
          color: index > 4 ? barLinearColors[4] : barLinearColors[index],
        },
      });
    });
    return tempData;
  }

  const option = {
    // tooltip 注释保持不变
    grid: {
      top: 20,
      bottom: 20,
      left: 60,
      right: 30,
    },
    xAxis: [
      {
        type: 'value',
        splitLine: { show: false },
        axisLabel: { show: false },
        axisTick: { show: false },
        axisLine: { show: false },
      },
    ],
    yAxis: [
      {
        type: 'category',
        inverse: true,
        axisLine: { show: false },
        axisTick: { show: false },
        data: xAxisData,
        axisLabel: {
          padding: [0, 8, 20, 0],
          // fontSize: 12,
          rich: {
            nt1: {
              fontSize: 0,
              color: '#fff',
              backgroundColor: {
                image: processedData?.[0]?.img || '/images/default.png',
              },
              width: 25,
              height: 25,
              align: 'center',
              borderRadius: 100,
            },
            nt2: {
              fontSize: 0,
              color: '#fff',
              backgroundColor: {
                image: processedData?.[1]?.img || '/images/default.png',
              },
              width: 25,
              height: 25,
              align: 'center',
              borderRadius: 100,
            },
            nt3: {
              fontSize: 0,
              color: '#fff',
              backgroundColor: {
                image: processedData?.[2]?.img || '/images/default.png',
              },
              width: 25,
              height: 25,
              align: 'center',
              borderRadius: 100,
            },
            nt: {
              fontSize: 0,
              color: '#fff',
              backgroundColor: {
                image: processedData?.[3]?.img || '/images/default.png',
              },
              width: 25,
              height: 25,
              align: 'center',
              borderRadius: 100,
            },
          },
          formatter: function (value, index) {
            let idx = index + 1;
            if (idx <= 3) {
              return ['{nt' + idx + '|' + idx + '}'].join('\n');
            } else {
              return ['{nt|' + idx + '}'].join('\n');
            }
          },
        },
      },
      {
        //名称
        type: 'category',
        offset: -10,
        position: 'left',
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color: '#333',
          align: 'left',
          verticalAlign: 'bottom',
          lineHeight: 32,
          fontSize: 14,
          fontWeight: 600,
          padding: [2, 4],
        },
        data: xAxisData.slice().reverse(),
      },
    ],
    series: [
      {
        zlevel: 1,
        type: 'bar',
        barWidth: 6,
        data: rankBarColor(seriesData),
        itemStyle: {
          borderRadius: 30,
        },
      },
      {
        type: 'bar',
        barWidth: 6,
        barGap: '-100%',
        itemStyle: {
          borderRadius: 30,
          color: '#f3f5f8',
        },
        label: {
          color: '#333',
          show: true,
          position: ['96%', '-20px'],
          fontSize: 14,
          // fontWeight: 600,
          formatter: function (params) {
            return rankBarColor(seriesData)[params.dataIndex]['value'];
          },
        },
        data: maxSeriesData,
      },
    ],
  };

  return (
    <>
      <EchartCommon option={option} containerRef={containerRef} />
    </>
  );
};

export default React.memo(Pie);
