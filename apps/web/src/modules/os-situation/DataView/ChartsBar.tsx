import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'next-i18next';
import SituationCard from '../components/SituationCard';
import EchartCommon from '../components/EchartCommon';
import * as echarts from 'echarts';

// 格式化数字的辅助函数 (从 index.html 迁移)
const formatNumber = (num: number, decimals = 2): string => {
  let formatted = num.toFixed(decimals);
  return formatted.replace(/\.?0+$/, '');
};

// 格式化数值的辅助函数 (从 index.html 迁移)
const formatterValue = (value: number, toFixed = 1, other = ''): number => {
  // let res = value;
  // if (value >= 100000000) {
  //   res = formatNumber(value / 100000000, toFixed) + '亿';
  // } else if (value >= 10000000) {
  //   res = formatNumber(value / 10000000, toFixed) + '千万';
  // } else if (value >= 10000) {
  //   res = formatNumber(value / 10000, toFixed) + '万';
  // }
  // if (other) {
  //   res += other;
  // }
  return value;
};

// 从 index.html 迁移的常量数据
const country = ['美国', '中国', '欧盟', '印度'];
const years = ['2022', '2023', '2024'];
const QList = [
  '22 Q1',
  '22 Q2',
  '22 Q3',
  '22 Q4',
  '23 Q1',
  '23 Q2',
  '23 Q3',
  '23 Q4',
  '24 Q1',
  '24 Q2',
  '24 Q3',
  '24 Q4',
];
const colorList = [
  '84, 112, 198',
  '238, 108, 108',
  '174, 217, 153',
  '250, 200, 88',
];
const yearsData = {
  2022: {
    美国: [2923569, 3247036, 6170605],
    中国: [407076, 489931, 897007],
    欧盟: [3271216, 2671711, 5942927],
    印度: [374834, 534721, 909555],
  },
  2023: {
    美国: [3312485, 3796760, 7109245],
    中国: [393749, 476510, 870259],
    欧盟: [3783824, 2973911, 6757735],
    印度: [467147, 670903, 1138050],
  },
  2024: {
    美国: [4137791, 4833371, 8971162],
    中国: [528661, 676961, 1205622],
    欧盟: [5003263, 3752034, 8755297],
    印度: [647975, 844512, 1492487],
  },
};

const QData = {
  '22 Q1': {
    美国: [876634, 585868, 1462502],
    中国: [69684, 82295, 151979],
    欧盟: [215093, 389736, 604829],
    印度: [65675, 86834, 152509],
  },
  '22 Q2': {
    美国: [834749, 613669, 1448418],
    中国: [76785, 96925, 173710],
    欧盟: [204659, 384424, 589083],
    印度: [84139, 84371, 168510],
  },
  '22 Q3': {
    美国: [905070, 664413, 1569483],
    中国: [79741, 99340, 179081],
    欧盟: [219463, 408136, 627599],
    印度: [105638, 99543, 205181],
  },
  '22 Q4': {
    美国: [1037083, 716906, 1753989],
    中国: [109968, 107811, 217779],
    欧盟: [246871, 473394, 720265],
    印度: [90906, 106818, 197724],
  },
  '23 Q1': {
    美国: [972467, 751757, 1724224],
    中国: [101436, 109362, 210798],
    欧盟: [267297, 502320, 769617],
    印度: [96553, 121151, 217704],
  },
  '23 Q2': {
    美国: [965278, 783952, 1749230],
    中国: [116902, 124074, 240976],
    欧盟: [249902, 513991, 763893],
    印度: [109277, 134635, 243912],
  },
  '23 Q3': {
    美国: [975193, 734029, 1709222],
    中国: [106205, 98306, 204511],
    欧盟: [253810, 474263, 728073],
    印度: [119177, 138438, 257615],
  },
  '23 Q4': {
    美国: [1052339, 803420, 1855759],
    中国: [138652, 156533, 295185],
    欧盟: [279278, 545231, 824509],
    印度: [129860, 130402, 260262],
  },
  '24 Q1': {
    美国: [1328811, 859114, 2187925],
    中国: [117595, 114567, 232162],
    欧盟: [316817, 607555, 924372],
    印度: [133966, 150488, 284454],
  },
  '24 Q2': {
    美国: [1910125, 976713, 2886838],
    中国: [169436, 171530, 340966],
    欧盟: [307762, 642020, 949782],
    印度: [161054, 175719, 336773],
  },
  '24 Q3': {
    美国: [1870547, 880670, 2751217],
    中国: [127753, 133052, 260805],
    欧盟: [269404, 588823, 858227],
    印度: [171816, 194418, 366234],
  },
  '24 Q4': {
    美国: [1687591, 893234, 2580825],
    中国: [154598, 172457, 327055],
    欧盟: [309137, 673912, 983049],
    印度: [185357, 189845, 375202],
  },
};

// 从 index.html 迁移的数据获取和处理函数
const getData = (raw: any[], countryName: string): [number, number, number] => {
  let out = 0;
  let putIn = 0;
  raw
    .filter((item) => item[1] === countryName)
    .forEach((element) => {
      putIn += element[2];
    });
  raw
    .filter((item) => item[0] === countryName)
    .forEach((element) => {
      out += element[2];
    });
  const all = out + putIn;
  return [putIn, out, all];
};

// 新增的数据获取和处理函数 (从 ininOutRadio 迁移)
const getOutRadioData = async (): Promise<any> => {
  const [yearData, qData] = await Promise.all([
    fetch(
      '/test/collaborator_model/line_AS_country_activity_push_contribution.json'
    ).then((response) => response.json()),
    fetch(
      '/test/collaborator_model/line_QS-JAN_country_activity_push_contribution.json'
    ).then((response) => response.json()),
  ]);

  const allCountryTotalYear = country.map((c) => {
    let ser = yearData.series.find((s: any) => s.name === c);
    return ser ? ser.data : [];
  });

  const allCountryTotalQ = country.map((c) => {
    let ser = qData.series.find((s: any) => s.name === c);
    return ser ? ser.data : [];
  });

  return { allCountryTotalYear, allCountryTotalQ };
};

// 新增的数据 (从 initBar2 迁移)
const initBar2Data = [
  [22892672, 25859844, 32893772], // Top30进出口push量
  [478840783 + 8618731, 549930151 + 6697007, 706780614], // 全球总push量
  [4.7, 4.65, 4.65], // Top30进出口/全球总push量比例图
];

const initBar2Types = [
  'Top30进出口push量',
  '全球总push量',
  'Top30进出口/全球总push量比例图',
];

const ChartsBar = () => {
  const { t } = useTranslation();
  // const [yearData, setYearData] = useState<any>(null);
  // const [QData, setQData] = useState<any>(null);
  const [chartOptions, setChartOptions] = useState<echarts.EChartsOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [outRadioData, setOutRadioData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const outRadioResult = await getOutRadioData();
        // setYearData(yearResult);
        // setQData(qResult);
        setOutRadioData(outRadioResult);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (yearsData && QData && outRadioData) {
      const options: echarts.EChartsOption[] = [];

      // 进出口折线柱状图配置 (从 ininChart 迁移)
      const types = ['进口', '出口', '进出口总和'];
      types.forEach((type) => {
        const lineSeries = country.map((c, i) => ({
          name: c + '季度',
          type: 'line',
          smooth: true,
          itemStyle: {
            color: `rgba(${colorList[i]},.7)`, // 示例颜色，需要根据实际 colorList 调整
          },
          data: QList.map((q) => QData[q][c][types.indexOf(type)]),
        }));

        const barSeries = country.map((c, i) => ({
          name: c + '年度',
          type: 'bar',
          xAxisIndex: 1,
          data: years.map((y) => yearsData[y][c][types.indexOf(type)]),
          itemStyle: {
            color: `rgba(${colorList[i]},.7)`, // 示例颜色，需要根据实际 colorList 调整
          },
          barMaxWidth: '16%',
        }));

        options.push({
          tooltip: { trigger: 'axis' },
          legend: {
            show: true,
          },
          grid: { left: '3%', right: '4%', bottom: 55, containLabel: true },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: QList.map((i) => '20' + i), // 需要根据实际数据格式调整
            },
            {
              type: 'category',
              data: years,
              show: false,
            },
          ],
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: (value: number) => formatterValue(value).toString(),
            },
          },
          series: [...barSeries] as echarts.SeriesOption[],
        });
        options.push({
          tooltip: { trigger: 'axis' },
          legend: {
            show: true,
          },
          grid: { left: '3%', right: '4%', bottom: 55, containLabel: true },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: QList.map((i) => '20' + i), // 需要根据实际数据格式调整
            },
            {
              type: 'category',
              data: years,
              show: false,
            },
          ],
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: (value: number) => formatterValue(value).toString(),
            },
          },
          series: [...lineSeries] as echarts.SeriesOption[],
        });
      });

      // outRadioLine 和 outRadioLine1 的配置 (从 ininOutRadio 迁移)
      const { allCountryTotalYear, allCountryTotalQ } = outRadioData;

      const outRadioBarSeries = country.map((c, i) => ({
        name: c + '年度',
        type: 'bar',
        xAxisIndex: 0, // 使用第一个 xAxis
        data: years.map((y, zndey) => {
          const out = yearsData[y][c][2];
          const total = allCountryTotalYear[i][zndey];
          return total ? parseFloat((out / total).toFixed(3)) : 0; // 避免除以零
        }),
        itemStyle: {
          color: `rgba(${colorList[i]},.7)`,
        },
        barMaxWidth: '16%',
      }));

      const outRadioLineSeries = country.map((c, i) => ({
        name: c + '季度',
        type: 'line',
        smooth: true,
        itemStyle: {
          color: `rgba(${colorList[i]},1)`,
        },
        data: QList.map((y, zndey) => {
          const out = QData[y][c][2];
          const total = allCountryTotalQ[i][zndey];
          return total ? parseFloat((out / total).toFixed(3)) : 0; // 避免除以零
        }),
      }));

      // 年度比例图配置
      options.push({
        tooltip: { trigger: 'axis' },
        legend: {
          show: true,
        },
        grid: { left: '3%', right: '4%', bottom: 55, containLabel: true },
        xAxis: [
          {
            type: 'category',
            data: years,
          },
          {
            type: 'category',
            data: years,
            show: false,
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              formatter: (value: number) => formatterValue(value).toString(),
            },
          },
          {
            type: 'value',
          },
        ],
        series: [...outRadioBarSeries] as echarts.SeriesOption[],
      });

      // 季度比例图配置
      options.push({
        tooltip: { trigger: 'axis' },
        legend: {
          show: true,
        },
        grid: { left: '3%', right: '4%', bottom: 55, containLabel: true },
        xAxis: [
          {
            type: 'category',
            data: QList.map((i) => '20' + i),
          },
          {
            type: 'category',
            data: years,
            show: false,
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              formatter: (value: number) => formatterValue(value).toString(),
            },
          },
          {
            type: 'value',
          },
        ],
        series: [...outRadioLineSeries] as echarts.SeriesOption[],
      });

      setChartOptions(options);
    }
  }, [yearsData, QData, outRadioData]);

  const chartTitles = [
    '进口年度',
    '进口季度',
    '出口年度',
    '进口年度',
    '进出口总和年度',
    '进出口总和季度',
    '进出口贡献量占总贡献量比例年度',
    '进出口贡献量占总贡献量比例季度',
    'Top30进出口push量',
    '全球总push量',
    'Top30进出口/全球总push量比例图',
  ];

  return (
    <>
      <div className="relative mb-12 grid min-w-0 grid-cols-2 gap-4 md:grid-cols-1">
        {chartOptions.map((option, index) => (
          <SituationCard
            key={chartTitles[index] + index}
            bodyClass="h-[600px]"
            title={chartTitles[index]}
            id={chartTitles[index]}
            loading={loading}
          >
            {(ref) => (
              <EchartCommon
                containerRef={ref}
                loading={loading}
                option={option}
              />
            )}
          </SituationCard>
        ))}
      </div>
    </>
  );
};

export default ChartsBar;
