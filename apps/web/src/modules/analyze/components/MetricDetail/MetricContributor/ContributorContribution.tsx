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
      name: '个人管理者',
      value: 4455,
      itemStyle: {
        color: '#ee6666',
      },
      userList: [
        {
          name: 'aramase',
          count: 170,
        },
        {
          name: 'alexzielenski',
          count: 170,
        },
        {
          name: 'mrunalp',
          count: 161,
        },
        {
          name: 'p0lyn0mial',
          count: 155,
        },
        {
          name: 'danwinship',
          count: 154,
        },
        {
          name: 'Jefftree',
          count: 145,
        },
        {
          name: 'gjkim42',
          count: 145,
        },
        {
          name: 'uablrek',
          count: 145,
        },
        {
          name: 'neolit123',
          count: 132,
        },
        {
          name: 'AxeZhan',
          count: 125,
        },
        {
          name: 'mengjiao-liu',
          count: 123,
        },
        {
          name: 'tallclair',
          count: 118,
        },
        {
          name: 'seans3',
          count: 117,
        },
        {
          name: 'MikeSpreitzer',
          count: 113,
        },
        {
          name: 'tkashem',
          count: 107,
        },
        {
          name: 'Damans227',
          count: 99,
        },
        {
          name: 'Verolop',
          count: 94,
        },
        {
          name: 'xingyang',
          count: 93,
        },
        {
          name: 'KnVerey',
          count: 91,
        },
        {
          name: 'MadhavJivrajani',
          count: 90,
        },
        {
          name: 'SataQiu',
          count: 88,
        },
        {
          name: 'yue9944882',
          count: 83,
        },
        {
          name: 'ritazh',
          count: 74,
        },
        {
          name: 'jsturtevant',
          count: 72,
        },
        {
          name: 'ahmedtd',
          count: 69,
        },
        {
          name: 'sding3',
          count: 68,
        },
        {
          name: 'andrewsykim',
          count: 64,
        },
        {
          name: 'heyymonth',
          count: 64,
        },
        {
          name: 'chendave',
          count: 61,
        },
        {
          name: 'cyclinder',
          count: 60,
        },
        {
          name: 'cvvz',
          count: 60,
        },
        {
          name: 'davidmccormick',
          count: 59,
        },
        {
          name: 'haoruan',
          count: 57,
        },
        {
          name: 'humblec',
          count: 57,
        },
        {
          name: 'vaibhav2107',
          count: 56,
        },
        {
          name: 'brianpursley',
          count: 55,
        },
        {
          name: 'odinuge',
          count: 55,
        },
        {
          name: 'WangXiangUSTC',
          count: 54,
        },
        {
          name: 'kkkkun',
          count: 49,
        },
        {
          name: 'marosset',
          count: 48,
        },
        {
          name: 'wzshiming',
          count: 47,
        },
        {
          name: 'nikhita',
          count: 46,
        },
        {
          name: 'mochizuki875',
          count: 45,
        },
        {
          name: 'Vyom-Yadav',
          count: 45,
        },
        {
          name: 'ncdc',
          count: 42,
        },
        {
          name: 'lauralorenz',
          count: 38,
        },
        {
          name: 'jayunit100',
          count: 37,
        },
        {
          name: 'denkensk',
          count: 36,
        },
        {
          name: 'mowangdk',
          count: 33,
        },
        {
          name: 'shaneutt',
          count: 33,
        },
        {
          name: 'harshanarayana',
          count: 31,
        },
        {
          name: 'aimuz',
          count: 30,
        },
        {
          name: 'carlory',
          count: 28,
        },
        {
          name: 'deads2k',
          count: 28,
        },
        {
          name: 'verb',
          count: 28,
        },
        {
          name: 'mmiranda96',
          count: 28,
        },
        {
          name: 'mikedanese',
          count: 27,
        },
        {
          name: 'matthyx',
          count: 27,
        },
        {
          name: 'justaugustus',
          count: 26,
        },
      ],
    },
    {
      name: '个人参与者',
      value: 786,
      itemStyle: {
        color: '#9fe080',
      },
      userList: [
        {
          name: 'TommyStarK',
          count: 122,
        },
        {
          name: 'fedebongio',
          count: 66,
        },
        {
          name: 'sourcelliu',
          count: 63,
        },
        {
          name: 'calvin0327',
          count: 51,
        },
        {
          name: 'nilekhc',
          count: 45,
        },
        {
          name: 'helayoty',
          count: 41,
        },
        {
          name: 'xiaomudk',
          count: 37,
        },
        {
          name: 'marquiz',
          count: 36,
        },
        {
          name: 'tenzen-y',
          count: 33,
        },
        {
          name: 'nikhilno1',
          count: 32,
        },
        {
          name: 'eddycharly',
          count: 32,
        },
        {
          name: 'czybjtu',
          count: 31,
        },
        {
          name: 'tangwz',
          count: 31,
        },
        {
          name: 'knelasevero',
          count: 29,
        },
        {
          name: 'hysyeah',
          count: 29,
        },
        {
          name: 'lanycrost',
          count: 27,
        },
        {
          name: 'MikeZappa87',
          count: 27,
        },
        {
          name: 'akhilerm',
          count: 27,
        },
        {
          name: 'freddie400',
          count: 27,
        },
      ],
    },
    {
      name: '组织管理者',
      value: 2689,
      itemStyle: {
        color: '#fac858',
      },
      userList: [
        {
          name: 'fromanirh',
          count: 172,
        },
        {
          name: 'logicalhan',
          count: 168,
        },
        {
          name: 'sathyanarays',
          count: 165,
        },
        {
          name: 'swatisehgal',
          count: 139,
        },
        {
          name: 'tzneal',
          count: 127,
        },
        {
          name: 'ahg-g',
          count: 126,
        },
        {
          name: 'Huang-Wei',
          count: 123,
        },
        {
          name: 'jsafrane',
          count: 112,
        },
        {
          name: 'robscott',
          count: 108,
        },
        {
          name: 'dgrisonnet',
          count: 97,
        },
        {
          name: 'DangerOnTheRanger',
          count: 85,
        },
        {
          name: 'justinsb',
          count: 80,
        },
        {
          name: 'claudiubelu',
          count: 80,
        },
        {
          name: 'aaron-prindle',
          count: 77,
        },
        {
          name: 'darkowlzz',
          count: 77,
        },
        {
          name: 'maxsmythe',
          count: 75,
        },
        {
          name: 'yangjunmyfm192085',
          count: 75,
        },
        {
          name: 'alexanderConstantinescu',
          count: 73,
        },
        {
          name: 'akremsa',
          count: 64,
        },
        {
          name: 'harche',
          count: 59,
        },
        {
          name: 'ruiwen-zhao',
          count: 53,
        },
        {
          name: 'jkh52',
          count: 50,
        },
        {
          name: 'zhangbanger',
          count: 47,
        },
        {
          name: 'pbetkier',
          count: 44,
        },
        {
          name: 'mattcary',
          count: 41,
        },
        {
          name: 'linxiulei',
          count: 41,
        },
        {
          name: 'nckturner',
          count: 40,
        },
        {
          name: 'haircommander',
          count: 39,
        },
        {
          name: 'howardjohn',
          count: 36,
        },
        {
          name: 'stlaz',
          count: 33,
        },
        {
          name: 'tosi3k',
          count: 32,
        },
        {
          name: 'princepereira',
          count: 32,
        },
        {
          name: 'rphillips',
          count: 31,
        },
        {
          name: 'benluddy',
          count: 31,
        },
        {
          name: 'RomanBednar',
          count: 29,
        },
        {
          name: 'pwschuurman',
          count: 28,
        },
      ],
    },
    {
      name: '组织参与者',
      value: 470,
      itemStyle: {
        color: '#5c6bc0',
      },
      userList: [
        {
          name: 'danielvegamyhre',
          count: 112,
        },
        {
          name: 'moshe010',
          count: 99,
        },
        {
          name: 'bketelsen',
          count: 86,
        },
        {
          name: 'skitt',
          count: 69,
        },
        {
          name: 'adrianreber',
          count: 58,
        },
        {
          name: 'yt2985',
          count: 46,
        },
      ],
    },
  ];
  let data2 = [
    {
      name: 'aramase',
      value: 170,
      org: '个人管理者',
    },
    {
      name: 'alexzielenski',
      value: 170,
      org: '个人管理者',
    },
    {
      name: 'mrunalp',
      value: 161,
      org: '个人管理者',
    },
    {
      name: 'p0lyn0mial',
      value: 155,
      org: '个人管理者',
    },
    {
      name: 'danwinship',
      value: 154,
      org: '个人管理者',
    },
    {
      name: 'Jefftree',
      value: 145,
      org: '个人管理者',
    },
    {
      name: 'gjkim42',
      value: 145,
      org: '个人管理者',
    },
    {
      name: 'uablrek',
      value: 145,
      org: '个人管理者',
    },
    {
      name: 'neolit123',
      value: 132,
      org: '个人管理者',
    },
    {
      name: 'AxeZhan',
      value: 125,
      org: '个人管理者',
    },
    {
      name: 'mengjiao-liu',
      value: 123,
      org: '个人管理者',
    },
    {
      name: 'other',
      value: 2830,
      org: '个人管理者',
    },
    {
      name: 'TommyStarK',
      value: 122,
      org: '个人参与者',
    },
    {
      name: 'fedebongio',
      value: 66,
      org: '个人参与者',
    },
    {
      name: 'sourcelliu',
      value: 63,
      org: '个人参与者',
    },
    {
      name: 'calvin0327',
      value: 51,
      org: '个人参与者',
    },
    {
      name: 'nilekhc',
      value: 45,
      org: '个人参与者',
    },
    {
      name: 'helayoty',
      value: 41,
      org: '个人参与者',
    },
    {
      name: 'xiaomudk',
      value: 37,
      org: '个人参与者',
    },
    {
      name: 'marquiz',
      value: 36,
      org: '个人参与者',
    },
    {
      name: 'tenzen-y',
      value: 33,
      org: '个人参与者',
    },
    {
      name: 'nikhilno1',
      value: 32,
      org: '个人参与者',
    },
    {
      name: 'eddycharly',
      value: 32,
      org: '个人参与者',
    },
    {
      name: 'other',
      value: 228,
      org: '个人参与者',
    },
    {
      name: 'fromanirh',
      value: 172,
      org: '组织管理者',
    },
    {
      name: 'logicalhan',
      value: 168,
      org: '组织管理者',
    },
    {
      name: 'sathyanarays',
      value: 165,
      org: '组织管理者',
    },
    {
      name: 'swatisehgal',
      value: 139,
      org: '组织管理者',
    },
    {
      name: 'tzneal',
      value: 127,
      org: '组织管理者',
    },
    {
      name: 'ahg-g',
      value: 126,
      org: '组织管理者',
    },
    {
      name: 'Huang-Wei',
      value: 123,
      org: '组织管理者',
    },
    {
      name: 'jsafrane',
      value: 112,
      org: '组织管理者',
    },
    {
      name: 'robscott',
      value: 108,
      org: '组织管理者',
    },
    {
      name: 'dgrisonnet',
      value: 97,
      org: '组织管理者',
    },
    {
      name: 'DangerOnTheRanger',
      value: 85,
      org: '组织管理者',
    },
    {
      name: 'other',
      value: 1267,
      org: '组织管理者',
    },
    {
      name: 'danielvegamyhre',
      value: 112,
      org: '组织参与者',
    },
    {
      name: 'moshe010',
      value: 99,
      org: '组织参与者',
    },
    {
      name: 'bketelsen',
      value: 86,
      org: '组织参与者',
    },
    {
      name: 'skitt',
      value: 69,
      org: '组织参与者',
    },
    {
      name: 'adrianreber',
      value: 58,
      org: '组织参与者',
    },
    {
      name: 'yt2985',
      value: 46,
      org: '组织参与者',
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
          formatter: '{b}: {c} ({d}%)',
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
