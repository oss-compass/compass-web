import React, { useRef, useMemo } from 'react';
import { usePullsCommentQuery } from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { useTranslation } from 'next-i18next';
import MetricChart from '@modules/analyze/components/MetricDetail/MetricChart';
import type { EChartsOption } from 'echarts';

const ContributorContribution: React.FC<{
  label: string;
  level: string;
  beginDate: Date;
  endDate: Date;
  mileage: string[];
}> = ({ label, level, beginDate, endDate, mileage }) => {
  const { t } = useTranslation();
  const chartRef = useRef<HTMLDivElement>(null);
  const { data, isLoading } = usePullsCommentQuery(client, {
    label: label,
    level: level,
    beginDate: beginDate,
    endDate: endDate,
  });
  const data1 = [
    {
      name: 'Google, Inc.',
      value: 1396,
      userList: [
        {
          name: 'logicalhan',
          value: 168,
          org: 'Google, Inc.',
        },
        {
          name: 'ahg-g',
          value: 126,
          org: 'Google, Inc.',
        },
        {
          name: 'danielvegamyhre',
          value: 112,
          org: 'Google, Inc.',
        },
        {
          name: 'robscott',
          value: 108,
          org: 'Google, Inc.',
        },
        {
          name: 'bketelsen',
          value: 86,
          org: 'Google, Inc.',
        },
        {
          name: 'DangerOnTheRanger',
          value: 85,
          org: 'Google, Inc.',
        },
        {
          name: 'justinsb',
          value: 80,
          org: 'Google, Inc.',
        },
        {
          name: 'aaron-prindle',
          value: 77,
          org: 'Google, Inc.',
        },
        {
          name: 'darkowlzz',
          value: 77,
          org: 'Google, Inc.',
        },
        {
          name: 'maxsmythe',
          value: 75,
          org: 'Google, Inc.',
        },
        {
          name: 'ruiwen-zhao',
          value: 53,
          org: 'Google, Inc.',
        },
        {
          name: 'jkh52',
          value: 50,
          org: 'Google, Inc.',
        },
        {
          name: 'yt2985',
          value: 46,
          org: 'Google, Inc.',
        },
        {
          name: 'pbetkier',
          value: 44,
          org: 'Google, Inc.',
        },
        {
          name: 'mattcary',
          value: 41,
          org: 'Google, Inc.',
        },
        {
          name: 'linxiulei',
          value: 41,
          org: 'Google, Inc.',
        },
        {
          name: 'howardjohn',
          value: 36,
          org: 'Google, Inc.',
        },
        {
          name: 'tosi3k',
          value: 32,
          org: 'Google, Inc.',
        },
        {
          name: 'benluddy',
          value: 31,
          org: 'Google, Inc.',
        },
        {
          name: 'pwschuurman',
          value: 28,
          org: 'Google, Inc.',
        },
      ],
    },
    {
      name: 'Red Hat',
      value: 902,
      userList: [
        {
          name: 'fromanirh',
          value: 172,
          org: 'Red Hat',
        },
        {
          name: 'swatisehgal',
          value: 139,
          org: 'Red Hat',
        },
        {
          name: 'jsafrane',
          value: 112,
          org: 'Red Hat',
        },
        {
          name: 'dgrisonnet',
          value: 97,
          org: 'Red Hat',
        },
        {
          name: 'skitt',
          value: 69,
          org: 'Red Hat',
        },
        {
          name: 'akremsa',
          value: 64,
          org: 'Red Hat',
        },
        {
          name: 'harche',
          value: 59,
          org: 'Red Hat',
        },
        {
          name: 'adrianreber',
          value: 58,
          org: 'Red Hat',
        },
        {
          name: 'haircommander',
          value: 39,
          org: 'Red Hat',
        },
        {
          name: 'stlaz',
          value: 33,
          org: 'Red Hat',
        },
        {
          name: 'rphillips',
          value: 31,
          org: 'Red Hat',
        },
        {
          name: 'RomanBednar',
          value: 29,
          org: 'Red Hat',
        },
      ],
    },
    {
      name: 'Amazon.com',
      value: 167,
      userList: [
        {
          name: 'tzneal',
          value: 127,
          org: 'Amazon.com',
        },
        {
          name: 'nckturner',
          value: 40,
          org: 'Amazon.com',
        },
      ],
    },
    {
      name: 'VMware',
      value: 165,
      userList: [
        {
          name: 'sathyanarays',
          value: 165,
          org: 'VMware',
        },
      ],
    },
    {
      name: 'Apple',
      value: 123,
      userList: [
        {
          name: 'Huang-Wei',
          value: 123,
          org: 'Apple',
        },
      ],
    },
    {
      name: 'NVidia',
      value: 99,
      userList: [
        {
          name: 'moshe010',
          value: 99,
          org: 'NVidia',
        },
      ],
    },
    {
      name: 'Cloudbase Solutions',
      value: 80,
      userList: [
        {
          name: 'claudiubelu',
          value: 80,
          org: 'Cloudbase Solutions',
        },
      ],
    },
    {
      name: 'Microsoft',
      value: 79,
      userList: [
        {
          name: 'zhangbanger',
          value: 47,
          org: 'Microsoft',
        },
        {
          name: 'princepereira',
          value: 32,
          org: 'Microsoft',
        },
      ],
    },
    {
      name: 'ZTE',
      value: 75,
      userList: [
        {
          name: 'yangjunmyfm192085',
          value: 75,
          org: 'ZTE',
        },
      ],
    },
    {
      name: 'Confluent',
      value: 73,
      userList: [
        {
          name: 'alexanderConstantinescu',
          value: 73,
          org: 'Confluent',
        },
      ],
    },
  ];
  let data2 = [
    {
      name: 'logicalhan',
      value: 168,
      org: 'Google, Inc.',
    },
    {
      name: 'ahg-g',
      value: 126,
      org: 'Google, Inc.',
    },
    {
      name: 'danielvegamyhre',
      value: 112,
      org: 'Google, Inc.',
    },
    {
      name: 'robscott',
      value: 108,
      org: 'Google, Inc.',
    },
    {
      name: 'bketelsen',
      value: 86,
      org: 'Google, Inc.',
    },
    {
      name: 'DangerOnTheRanger',
      value: 85,
      org: 'Google, Inc.',
    },
    {
      name: 'justinsb',
      value: 80,
      org: 'Google, Inc.',
    },
    {
      name: 'aaron-prindle',
      value: 77,
      org: 'Google, Inc.',
    },
    {
      name: 'darkowlzz',
      value: 77,
      org: 'Google, Inc.',
    },
    {
      name: 'maxsmythe',
      value: 75,
      org: 'Google, Inc.',
    },
    {
      name: 'ruiwen-zhao',
      value: 53,
      org: 'Google, Inc.',
    },
    {
      name: 'Google, Inc.-other',
      value: 349,
      org: 'Google, Inc.',
    },
    {
      name: 'fromanirh',
      value: 172,
      org: 'Red Hat',
    },
    {
      name: 'swatisehgal',
      value: 139,
      org: 'Red Hat',
    },
    {
      name: 'jsafrane',
      value: 112,
      org: 'Red Hat',
    },
    {
      name: 'dgrisonnet',
      value: 97,
      org: 'Red Hat',
    },
    {
      name: 'skitt',
      value: 69,
      org: 'Red Hat',
    },
    {
      name: 'akremsa',
      value: 64,
      org: 'Red Hat',
    },
    {
      name: 'harche',
      value: 59,
      org: 'Red Hat',
    },
    {
      name: 'adrianreber',
      value: 58,
      org: 'Red Hat',
    },
    {
      name: 'haircommander',
      value: 39,
      org: 'Red Hat',
    },
    {
      name: 'stlaz',
      value: 33,
      org: 'Red Hat',
    },
    {
      name: 'rphillips',
      value: 31,
      org: 'Red Hat',
    },
    {
      name: 'Red Hat-other',
      value: 29,
      org: 'Red Hat',
    },
    {
      name: 'tzneal',
      value: 127,
      org: 'Amazon.com',
    },
    {
      name: 'nckturner',
      value: 40,
      org: 'Amazon.com',
    },
    {
      name: 'sathyanarays',
      value: 165,
      org: 'VMware',
    },
    {
      name: 'Huang-Wei',
      value: 123,
      org: 'Apple',
    },
    {
      name: 'moshe010',
      value: 99,
      org: 'NVidia',
    },
    {
      name: 'claudiubelu',
      value: 80,
      org: 'Cloudbase Solutions',
    },
    {
      name: 'zhangbanger',
      value: 47,
      org: 'Microsoft',
    },
    {
      name: 'princepereira',
      value: 32,
      org: 'Microsoft',
    },
    {
      name: 'yangjunmyfm192085',
      value: 75,
      org: 'ZTE',
    },
    {
      name: 'alexanderConstantinescu',
      value: 73,
      org: 'Confluent',
    },
  ];
  let legend = [];
  data1.forEach((z) => {
    legend.push(z.name);
  });
  var option1: EChartsOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
    },
    color: [
      // "#5470c6",
      // "#91cc75",
      // "#fac858",
      // "#ee6666",
      '#2ec7c9',
      '#b6a2de',
      '#5ab1ef',
      '#ffb980',
      '#d87a80',
      '#8d98b3',
      '#e5cf0d',
      '#97b552',
      '#95706d',
      '#dc69aa',
      '#07a2a4',
      '#9a7fd1',
      '#588dd5',
      '#f5994e',
      '#c05050',
      '#59678c',
      '#c9ab00',
      '#7eb00a',
      '#6f5553',
      '#c14089',
    ],
    legend: {
      top: '2%',
      left: 'center',
      type: 'scroll',
      data: legend,
    },
    // title: {
    //   top: 10,
    //   // text: title,
    //   left: "center",
    // },
    series: [
      {
        name: '生态类型',
        type: 'pie',
        selectedMode: 'single',
        radius: [0, '45%'],
        label: {
          position: 'inner',
          fontSize: 12,
          color: '#333',
        },
        labelLine: {
          show: false,
        },
        labelLayout: {
          hideOverlap: false,
          moveOverlap: 'shiftY',
        },
        data: data1,
      },
      {
        name: '贡献者',
        type: 'pie',
        radius: ['55%', '67%'],
        labelLine: {
          length: 30,
        },
        label: {
          formatter: '{b}: {c} ({d}%)',
          color: '#333',
        },
        data: data2,
      },
    ],
  };
  const getSeries = useMemo(() => {
    const distribution = data?.pullsDetailOverview?.pullCommentDistribution;
    if (data && distribution?.length > 0) {
      return distribution.map(({ subCount, subName }) => {
        return { name: subName, value: subCount, count: subCount };
      });
    } else {
      return [];
    }
  }, [data]);

  const option: EChartsOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
    },
    color: [
      // '#5470c6',
      // '#91cc75',
      // '#fac858',
      // '#ee6666',
      '#2ec7c9',
      '#b6a2de',
      '#5ab1ef',
      '#ffb980',
      '#d87a80',
      '#8d98b3',
      '#e5cf0d',
      '#97b552',
      '#95706d',
      '#dc69aa',
      '#07a2a4',
      '#9a7fd1',
      '#588dd5',
      '#f5994e',
      '#c05050',
      '#59678c',
      '#c9ab00',
      '#7eb00a',
      '#6f5553',
      '#c14089',
    ],
    legend: {
      top: '2%',
      left: 'center',
    },
    series: [
      {
        name: '',
        type: 'pie',
        selectedMode: 'single',
        radius: [0, '65%'],
        label: {
          position: 'inner',
          fontSize: 14,
          color: '#333',
        },
        data: getSeries,
      },
    ],
  };
  const legendselectchanged = () => {};

  return (
    <div className="flex-1 pt-4" ref={chartRef}>
      <MetricChart
        style={{ height: '100%' }}
        loading={isLoading}
        option={option1}
        containerRef={chartRef}
        legendselectchanged={data2}
      />
    </div>
  );
};
export default ContributorContribution;
