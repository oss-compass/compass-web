jest.mock('@modules/analyze/components/CardDropDownMenu', () => ({
  __esModule: true,
  default: () => null,
}));

import { getChartTabs } from './BugIssueOpenTime';

describe('getChartTabs', () => {
  it('plots the bug-issue open time series, not the all-issue one', () => {
    const tabs = getChartTabs((key) => key);
    expect(tabs['1'].yKey).toBe('metricCommunity.bugIssueOpenTimeAvg');
    expect(tabs['2'].yKey).toBe('metricCommunity.bugIssueOpenTimeMid');
    expect(tabs['1'].summaryKey).toBe('summaryCommunity.bugIssueOpenTimeAvg');
    expect(tabs['2'].summaryKey).toBe('summaryCommunity.bugIssueOpenTimeMid');
  });
});
