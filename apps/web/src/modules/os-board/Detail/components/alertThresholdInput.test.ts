import { parseThresholdInput } from './AlertRuleDialog';

describe('parseThresholdInput', () => {
  it('keeps the field empty while the user clears it', () => {
    // The input is controlled by this value, so `Number('') === 0` would refill it with "0".
    expect(parseThresholdInput('')).toBe('');
    expect(parseThresholdInput('   ')).toBe('');
  });

  it('returns a number for a valid value', () => {
    expect(parseThresholdInput('12.5')).toBe(12.5);
    expect(parseThresholdInput('-3')).toBe(-3);
    expect(parseThresholdInput('0')).toBe(0);
  });

  it('does not put NaN into the state for a partial value', () => {
    // `Number('-')` / `Number('1e')` are NaN; React warns and the input becomes uncontrolled.
    expect(parseThresholdInput('-')).toBe('');
    expect(parseThresholdInput('1e')).toBe('');
    expect(parseThresholdInput('abc')).toBe('');
  });
});
