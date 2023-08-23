export interface DataResult {
  label: string;
  level: string;
  chartType: string;
  tab?: string;
  dates: string[];
  values: number[];
}

export type DataResults = DataResult[];
