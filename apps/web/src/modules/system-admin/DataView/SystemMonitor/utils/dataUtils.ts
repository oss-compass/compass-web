import type { DateRangeType } from '@common/components/DateRangePicker';

// 生成趋势数据的函数
export const generateTrendData = (
  baseValue: number,
  variance: number = 10,
  days: number = 30
): number[] => {
  const data: number[] = [];
  for (let i = 0; i < days; i++) {
    const randomVariance = (Math.random() - 0.5) * variance;
    const value = Math.max(0, Math.min(100, baseValue + randomVariance));
    data.push(Math.round(value * 10) / 10);
  }
  return data;
};

// 生成带宽趋势数据
export const generateBandwidthTrendData = (
  baseValue: number,
  variance: number = 20,
  days: number = 30
): number[] => {
  const data: number[] = [];
  for (let i = 0; i < days; i++) {
    const randomVariance = (Math.random() - 0.5) * variance;
    const value = Math.max(0, baseValue + randomVariance);
    data.push(Math.round(value * 10) / 10);
  }
  return data;
};

// 生成磁盘IO趋势数据
export const generateDiskIOTrendData = (
  baseValue: number,
  variance: number = 30,
  days: number = 30
): number[] => {
  const data: number[] = [];
  for (let i = 0; i < days; i++) {
    const randomVariance = (Math.random() - 0.5) * variance;
    const value = Math.max(0, baseValue + randomVariance);
    data.push(Math.round(value * 10) / 10);
  }
  return data;
};

// 根据日期范围获取天数
export const getDaysByRange = (range: DateRangeType): number => {
  switch (range) {
    case '7d':
      return 7;
    case '30d':
      return 30;
    case '90d':
      return 90;
    case '1y':
      return 365;
    default:
      return 30;
  }
};

// 生成日期标签
export const generateDateLabels = (days: number): string[] => {
  return Array.from({ length: days }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - 1 - i));
    return `${date.getMonth() + 1}/${date.getDate()}`;
  });
};
