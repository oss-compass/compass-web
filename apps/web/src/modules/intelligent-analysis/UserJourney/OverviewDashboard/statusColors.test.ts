import { PAIN_STATUS_CFG } from './constants';
import { OVERVIEW_PAIN_STATUS_COLORS } from './theme';

describe('overview workflow status colors', () => {
  it('preserves distinct original colors for the three in-progress stages', () => {
    expect(
      ['2', '3', '4'].map((status) => PAIN_STATUS_CFG[status].tagColor)
    ).toEqual(['#d4b106', '#1677ff', '#722ed1']);
    for (const field of ['tagBg', 'tagColor', 'tagBorder'] as const) {
      expect(
        new Set(['2', '3', '4'].map((status) => PAIN_STATUS_CFG[status][field]))
          .size
      ).toBe(3);
    }
  });

  it('uses shared colors for every workflow status', () => {
    for (const [status, colors] of Object.entries(
      OVERVIEW_PAIN_STATUS_COLORS
    )) {
      expect(PAIN_STATUS_CFG[status]).toMatchObject(colors);
    }
  });
});
