import { render } from '@testing-library/react';
import Chart from '@modules/developer/DataView/OverviewSummary/TopRepo/Chart';

// The contributor_portrait API sends roles under `repo_roles` (string[]) — the
// sibling consumers (RankCharts, LeftPan) read that name. TopRepo read `roles`,
// which never exists on the payload, so the tooltip's role line was always N/A
// even when the API returned roles (issue #565).
const capturedOptions: any[] = [];
jest.mock(
  '@modules/developer/components/EchartCommon',
  () => ({ option }: { option: any }) => {
    capturedOptions.push(option);
    return <div data-testid="chart" />;
  }
);

const repos = [
  {
    repo_url: 'https://github.com/oss-compass/compass-web',
    contribution: 120,
    repo_roles: ['committer'],
  },
];

describe('TopRepo Chart', () => {
  it('shows the API-provided role in the tooltip instead of N/A', () => {
    const containerRef = { current: document.createElement('div') };
    render(<Chart containerRef={containerRef} data={repos} />);

    const option = capturedOptions[capturedOptions.length - 1];
    const tooltip: string = option.tooltip.formatter([{ dataIndex: 0 }]);

    expect(tooltip).toContain('committer');
    expect(tooltip).not.toContain('N/A');
  });
});
