import { formatRetentionTooltipValue } from './retentionTooltip';

describe('formatRetentionTooltipValue', () => {
  it('shows a missing point as "-"', () => {
    expect(formatRetentionTooltipValue(null)).toBe('-');
    expect(formatRetentionTooltipValue(undefined)).toBe('-');
    expect(formatRetentionTooltipValue('')).toBe('-');
  });

  it('formats a percentage with two decimals', () => {
    expect(formatRetentionTooltipValue(12.3)).toBe('12.30%');
    expect(formatRetentionTooltipValue('45')).toBe('45.00%');
    expect(formatRetentionTooltipValue([0, 45.6])).toBe('45.60%');
  });

  it('keeps a real zero visible', () => {
    expect(formatRetentionTooltipValue(0)).toBe('0.00%');
  });

  it('shows an unparsable value as "-"', () => {
    expect(formatRetentionTooltipValue('N/A')).toBe('-');
  });
});
