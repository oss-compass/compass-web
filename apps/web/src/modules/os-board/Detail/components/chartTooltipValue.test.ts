import { formatChartTooltipValue } from './chartTooltipValue';

describe('formatChartTooltipValue', () => {
  it('shows a missing point as "-" instead of zero', () => {
    // ECharts passes null for a gap, and Number(null) / Number('') are 0.
    expect(formatChartTooltipValue(null)).toBe('-');
    expect(formatChartTooltipValue(undefined)).toBe('-');
    expect(formatChartTooltipValue('')).toBe('-');
  });

  it('keeps a real zero visible', () => {
    expect(formatChartTooltipValue(0)).toBe('0');
    expect(formatChartTooltipValue('0')).toBe('0');
  });

  it('formats the value like the chart did before', () => {
    expect(formatChartTooltipValue(12)).toBe('12');
    expect(formatChartTooltipValue('12')).toBe('12');
    expect(formatChartTooltipValue(1.2)).toBe('1.2');
    expect(formatChartTooltipValue('N/A')).toBe('-');
  });
});
