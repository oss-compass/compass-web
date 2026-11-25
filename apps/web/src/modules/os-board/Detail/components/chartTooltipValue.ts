import { toFixed } from '@common/utils';

/**
 * Value shown in a tooltip row of the os-board charts.
 *
 * ECharts passes `null` for a data point that has no value (the series uses `null` gaps) and
 * the api can send an empty string; `Number(null)` / `Number('')` are 0, so those points were
 * reported as a real `0` in the tooltip. They must be shown as missing instead.
 */
export const formatChartTooltipValue = (raw: unknown): string => {
  if (raw === null || raw === undefined || raw === '') {
    return '-';
  }
  const value = typeof raw === 'number' ? raw : Number(raw);
  if (!Number.isFinite(value)) {
    return '-';
  }
  if (Number.isInteger(value)) {
    return String(value);
  }
  return String(toFixed(value, 3));
};
