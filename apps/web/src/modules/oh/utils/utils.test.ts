import { formatOatAlarmText, OAT_ALARM_TITLE } from './utils';

describe('formatOatAlarmText', () => {
  it('interpolates the first warning when there are more than two', () => {
    const text = formatOatAlarmText(['告警一', '告警二', '告警三']);

    expect(text).toBe(`以下告警来自 oat 扫描：告警一; (${OAT_ALARM_TITLE})`);
  });

  it('never renders the placeholder expression itself', () => {
    const text = formatOatAlarmText(['告警一', '告警二', '告警三']);

    expect(text).not.toContain('${');
    expect(text).not.toContain('oatDetail');
  });

  it('lists every warning when there are at most two', () => {
    expect(formatOatAlarmText(['告警一', '告警二'])).toBe(
      '以下告警来自 oat 扫描：告警一、告警二; '
    );
    expect(formatOatAlarmText(['告警一'])).toBe(
      '以下告警来自 oat 扫描：告警一; '
    );
  });

  it('returns no text without warnings', () => {
    expect(formatOatAlarmText([])).toBe('');
    expect(formatOatAlarmText(null)).toBe('');
    expect(formatOatAlarmText(undefined)).toBe('');
  });
});
