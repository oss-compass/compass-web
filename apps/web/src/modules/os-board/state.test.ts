import {
  actions,
  buildCsv,
  buildReportText,
  getMetricValue,
  osBoardState,
} from './state';

describe('os-board state helpers', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('buildCsv should include headers and quote values', () => {
    const csv = buildCsv([
      { project: 'github:org/repo', value: 12.3 },
      { project: 'github:org/another', value: 0 },
    ]);
    expect(csv.split('\n')[0]).toContain('"project"');
    expect(csv.split('\n')[0]).toContain('"value"');
    expect(csv).toContain('"github:org/repo"');
  });

  it('getMetricValue should be stable for same inputs', () => {
    const a = getMetricValue({
      dashboardId: 'db-x',
      project: 'github:org/repo',
      metricId: 'health_score',
    });
    const b = getMetricValue({
      dashboardId: 'db-x',
      project: 'github:org/repo',
      metricId: 'health_score',
    });
    expect(a).toBe(b);
  });

  it('buildReportText should include dashboard name and sections', () => {
    const db = actions.createDashboard({
      name: 'Test Dashboard',
      type: 'community',
      config: {
        projects: ['github:oss-compass/compass-web'],
        competitorProjects: [],
        metrics: ['health_score', 'commits'],
        compareMode: false,
        timeRange: { preset: '30d' },
      },
    });
    const text = buildReportText({ dashboardId: db.id, template: 'weekly' });
    expect(text).toContain('Test Dashboard');
    expect(text).toContain('## 一、核心数据摘要');
    expect(text).toContain('## 二、预警事项');
    expect(text).toContain('## 三、项目数据');

    osBoardState.dashboards = osBoardState.dashboards.filter(
      (d) => d.id !== db.id
    );
  });
});
