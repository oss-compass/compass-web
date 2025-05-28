import React from 'react';
import EchartCommon from '@modules/developer/components/EchartCommon';

interface ContributionTypeData {
  commit: number;
  pr: number;
  pr_comment: number;
  issue: number;
  issue_comment: number;
  code_review: number;
}

interface ChartProps {
  containerRef?: React.RefObject<HTMLElement>;
  data?: ContributionTypeData;
}

const Chart: React.FC<ChartProps> = ({ containerRef, data }) => {
  // 如果没有数据，使用默认值
  const contributionData = data;

  // 将数据转换为雷达图所需的数组格式
  const radarData = [
    contributionData.commit,
    contributionData.issue,
    contributionData.issue_comment,
    contributionData.pr,
    contributionData.pr_comment,
    contributionData.code_review,
  ];

  // 计算最大值，用于设置雷达图的刻度
  const maxValue = Math.max(...radarData);
  const roundedMaxValue = ((maxValue / 10) * 10).toFixed(2); // 向上取整到最接近的10的倍数

  const option = {
    grid: {
      top: 50,
      bottom: 60,
      left: 10,
      right: 40,
      containLabel: true,
    },
    legend: {
      show: false,
    },
    radar: {
      radius: 110,
      center: ['50%', '50%'],
      splitArea: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: '#e6ebf1',
        },
      },
      // shape: 'circle',
      indicator: [
        {
          name: contributionData.commit + '%' + '\n' + 'Commits',
          max: roundedMaxValue,
          min: 0,
        },
        {
          name: contributionData.issue + '%' + '\n' + 'Issues',
          max: roundedMaxValue,
          min: 0,
        },
        {
          name: contributionData.issue_comment + '%' + '\n' + 'Issue Comments',
          max: roundedMaxValue,
          min: 0,
        },
        {
          name: contributionData.pr + '%' + '\n' + 'PRs',
          max: roundedMaxValue,
          min: 0,
        },
        {
          name: contributionData.pr_comment + '%' + '\n' + 'PR Comments',
          max: roundedMaxValue,
          min: 0,
        },
        {
          name: contributionData.code_review + '%' + '\n' + 'Code Reviews',
          max: roundedMaxValue,
          min: 0,
        },
      ],
      axisName: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#696d6e',
        formatter: function (value, index) {
          // 将百分比和名称分开
          const parts = value.split('\n');
          return `{percent|${parts[0]}}\n{name|${parts[1]}}`;
        },
        rich: {
          percent: {
            fontSize: 12,
            fontWeight: 'bold',
            color: '#696d6e',
            align: 'center',
            padding: [0, 0, 2, 0],
          },
          name: {
            fontSize: 12,
            fontWeight: 'bold',
            color: '#696d6e',
            align: 'center',
          },
        },
      },
    },
    series: [
      {
        name: '贡献类型占比',
        type: 'radar',
        symbol: 'circle',
        symbolSize: 1,
        shadowBlur: 0,
        lineStyle: {
          width: 4,
          type: 'solid',
          color: '#28b5e1',
        },
        data: [
          {
            value: radarData,
            areaStyle: {
              color: '#e9f7fb',
            },
          },
        ],
        label: {
          show: false,
          formatter: '{c}%', // 显示数据值并添加百分比符号
          color: '#333',
        },
      },
    ],
    // tooltip: {
    //   trigger: 'item',
    //   formatter: function (params) {
    //     const value = params.value;
    //     const indicator = params.indicator;
    //     let result = params.name + '<br/>';
    //     for (let i = 0; i < indicator.length; i++) {
    //       result += indicator[i].name + ': ' + value[i].toFixed(2) + '%<br/>';
    //     }
    //     return result;
    //   }
    // }
  };

  return (
    <>
      <EchartCommon option={option} containerRef={containerRef} />
    </>
  );
};

export default React.memo(Chart);
