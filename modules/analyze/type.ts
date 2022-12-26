import { Level } from '@modules/analyze/constant';
import { ChartThemeState } from '@modules/analyze/store';
import { EChartsOption } from 'echarts';

export interface TabOption {
  label: string;
  value: string;
}

export interface TransOpt {
  xKey: string;
  yKey: string;
  legendName: string;
  summaryKey: string;
}

export interface GenChartData {
  isCompare: boolean;
  compareLabels: string[];
  xAxis: string[];
  yResults: YResult[];
  summaryMean: (number | string)[];
  summaryMedian: (number | string)[];
}

export type GenChartOptions = (
  input: GenChartData,
  theme?: DeepReadonly<ChartThemeState>
) => EChartsOption;

export interface TransResult {
  xAxis: string[];
  yResults: YResult[];
}

export interface SummaryResult {
  summaryMean: (number | string)[];
  summaryMedian: (number | string)[];
}

export interface YResult {
  label: string;
  level: Level;
  legendName: string;
  key: string;
  data: any[];
}
