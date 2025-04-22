import { Level } from '@modules/developer/constant';
import { ChartThemeState } from '@modules/developer/store';
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

export interface DataContainerResult {
  isCompare: boolean;
  compareLabels: string[];
  xAxis: string[];
  yResults: YResult[];
  summaryMean: (number | string)[];
  summaryMedian: (number | string)[];
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
  input: DataContainerResult,
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
