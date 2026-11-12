import { buildEvaluationDetail } from './MerticDetail';

const metricList = [
  'legal_compliance',
  'technical_ecology',
  'lifecycle',
  'network_security',
];

const allMetricData = [
  { key: 'complianceLicense', 维度: 'legal_compliance' },
  { key: 'complianceDco', 维度: 'legal_compliance' },
  { key: 'ecologyCodeMaintenance', 维度: 'technical_ecology' },
  { key: 'ecologySoftwareQuality', 维度: 'technical_ecology' },
  { key: 'lifecycleVersionLifecycle', 维度: 'lifecycle' },
  { key: 'securityVulnerability', 维度: 'network_security' },
  { key: 'securityVulnerabilityResponse', 维度: 'network_security' },
];

describe('buildEvaluationDetail', () => {
  it('scores each dimension 0 instead of NaN when all metric fields are null', () => {
    const row = {
      name: 'all-null-report',
      tpcSoftwareReportMetric: {
        complianceLicense: null,
        complianceDco: null,
        ecologyCodeMaintenance: null,
        ecologySoftwareQuality: null,
        lifecycleVersionLifecycle: null,
        securityVulnerability: null,
        securityVulnerabilityResponse: null,
      },
    };

    const result = buildEvaluationDetail(row, metricList, allMetricData);

    result.evaluationDetail.forEach((dimension) => {
      expect(dimension.score).toBe(0);
      expect(Number.isFinite(dimension.score)).toBe(true);
    });
    expect(result.score).toBe(0);
    expect(Number.isFinite(result.score)).toBe(true);
    expect(result.name).toBe('all-null-report');
  });

  it('keeps the existing arithmetic for dimensions with scored metrics', () => {
    const row = {
      name: 'partial-report',
      tpcSoftwareReportMetric: {
        complianceLicense: 0.5,
        complianceDco: 1,
        ecologyCodeMaintenance: null,
        ecologySoftwareQuality: null,
        lifecycleVersionLifecycle: null,
        securityVulnerability: null,
        securityVulnerabilityResponse: null,
      },
    };

    const result = buildEvaluationDetail(row, metricList, allMetricData);

    // (0.5 + 1) / 2 * 10 = 7.5 -> toFixed(..., 0) = 8
    expect(result.evaluationDetail[0].score).toBe(8);
    // remaining dimensions have no scored metrics
    expect(result.evaluationDetail.slice(1).map((d) => d.score)).toEqual([
      0, 0, 0,
    ]);
    // overall total: 8 / 4 = 2
    expect(result.score).toBe(2);
    expect(Number.isFinite(result.score)).toBe(true);
  });

  it('returns a finite total when some dimensions are empty and others valid', () => {
    const row = {
      name: 'mixed-report',
      tpcSoftwareReportMetric: {
        complianceLicense: 1,
        complianceDco: 1,
        ecologyCodeMaintenance: 0.5,
        ecologySoftwareQuality: 0.5,
        lifecycleVersionLifecycle: null,
        securityVulnerability: 1,
        securityVulnerabilityResponse: null,
      },
    };

    const result = buildEvaluationDetail(row, metricList, allMetricData);

    expect(result.evaluationDetail.map((d) => d.score)).toEqual([10, 5, 0, 10]);
    // overall total: (10 + 5 + 0 + 10) / 4 = 6.25 -> toFixed(..., 0) = 6
    expect(result.score).toBe(6);
    expect(Number.isFinite(result.score)).toBe(true);
  });
});
