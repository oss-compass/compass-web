import React, { useRef, useEffect } from 'react';
import { graphic, init } from 'echarts';

const Pie = () => {
  let data = [
    { name: 'flutter', value: 97 },
    { name: 'react', value: 68 },
    { name: 'vue', value: 50 },
    { name: 'axios', value: 36 },
  ];
  let xAxisData = data.map((item) => item.name);
  let seriesData = data.map((item) => item.value);
  let maxSeriesData = [];
  const MAX = Math.max(...seriesData);
  for (let i = 0; i < seriesData.length; i++) {
    maxSeriesData.push(MAX);
  }
  maxSeriesData;
  let barLinearColors = [
    '#ef6667',
    '#fcb32c',
    '#409eff',
    '#76d275',
    new graphic.LinearGradient(0, 1, 1, 1, [
      { offset: 0, color: '#EB3B5A' },
      { offset: 1, color: '#FE9C5A' },
    ]),
    new graphic.LinearGradient(0, 1, 1, 1, [
      { offset: 0, color: '#FA8231' },
      { offset: 1, color: '#FFD14C' },
    ]),
    new graphic.LinearGradient(0, 1, 1, 1, [
      { offset: 0, color: '#F7B731' },
      { offset: 1, color: '#FFEE96' },
    ]),
    new graphic.LinearGradient(0, 1, 1, 1, [
      { offset: 0, color: '#0fe5e3' },
      { offset: 1, color: '#2ca1d6' },
    ]),
  ];

  function rankBarColor(cData) {
    let tempData = [];
    cData.forEach((item, index) => {
      tempData.push({
        value: item,
        itemStyle: {
          color: index > 4 ? barLinearColors[3] : barLinearColors[index],
        },
      });
    });
    return tempData;
  }
  var option = {
    tooltip: {
      backgroundColor: 'rgba(50,50,50,.3)',
      textStyle: {
        color: '#222',
      },
    },
    grid: {
      top: 20,
      bottom: 20,
    },
    xAxis: {
      type: 'value',
      splitLine: { show: false },
      axisLabel: { show: false },
      axisTick: { show: false },
      axisLine: { show: false },
    },
    yAxis: [
      {
        type: 'category',
        inverse: true,
        axisLine: { show: false },
        axisTick: { show: false },
        data: xAxisData,
        axisLabel: {
          padding: [0, 8, 20, 0],
          fontSize: 12,
          rich: {
            nt1: {
              fontSize: 0,
              color: '#fff',
              backgroundColor: {
                image:
                  'https://avatars.githubusercontent.com/u/14101776?s=200&v=4',
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
                image:
                  'https://avatars.githubusercontent.com/u/5550850?s=48&v=4',
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
                image:
                  'https://avatars.githubusercontent.com/u/6128107?s=200&v=4',
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
                image: 'https://avatars.githubusercontent.com/u/53640896?v=4',
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
          padding: [-3, 4],
        },
        data: xAxisData.reverse(),
      },
    ],
    series: [
      {
        zlevel: 1,
        type: 'bar',
        barWidth: 8,
        data: rankBarColor(seriesData),
        itemStyle: {
          normal: {
            barBorderRadius: 30,
          },
        },
      },
      {
        type: 'bar',
        barWidth: 8,
        barGap: '-100%',
        itemStyle: {
          normal: {
            barBorderRadius: 30,
            color: 'rgba(0,0,0,0.04)',
          },
        },
        label: {
          normal: {
            color: '#333',
            show: true,
            position: ['98%', '-15px'],
            textStyle: {
              fontSize: 14,
            },
            formatter: function (params) {
              return rankBarColor(seriesData)[params.dataIndex]['value'];
            },
          },
        },
        data: maxSeriesData,
      },
    ],
  };

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let chart = init(cardRef.current);
    chart.setOption(option);
  }, [option]);

  return <div className="h-full w-[600px]" ref={cardRef}></div>;
};
export default React.memo(Pie);
