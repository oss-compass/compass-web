import type { EChartsOption, PieSeriesOption } from 'echarts';
export const getPieOption = (
  opts: {
    series?: PieSeriesOption;
    seriesData: {
      name: any;
      value: number;
    }[];
    legend?: EChartsOption['legend'];
    title?: EChartsOption['title'];
    formatter?: string | (() => string);
  } & EChartsOption
): EChartsOption => {
  const { series, seriesData, title, formatter, ...restOpts } = opts;
  return {
    color: [
      '#6474d2',
      '#a3e683',
      '#fed95f',
      '#ee6666',
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
    title: title || {},
    legend: { top: '2%', left: 'center', type: 'scroll' },
    tooltip: { trigger: 'item', formatter: formatter || '{b} : {c} ({d}%)' },
    series: series || [
      {
        name: '',
        type: 'pie',
        selectedMode: 'single',
        radius: [0, '65%'],
        label: {
          position: 'inner',
          fontSize: 14,
          color: '#333',
          formatter: formatter || '{b} : {c} ({d}%)',
        },
        data: seriesData,
      },
    ],
    ...restOpts,
  };
};
