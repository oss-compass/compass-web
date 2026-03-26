import { buildUserJourneyProjectData } from './transform';
import { BackendReportData } from '../types';

const report: BackendReportData = {
  meta: {
    report_id: 'test-report',
    report_title: '',
    generated_at: '2026-03-25 14:37:55',
    agent_version: '1.0.0',
    purpose: 'test purpose',
    persona: {
      role: 'tester',
      background: 'new user',
      hardware_access: 'standard environment',
      language: 'zh',
    },
  },
  project: {
    project_id: 'test-project',
    project_name: 'test/project',
    repo_url: 'https://example.com/test/project',
    platform: 'github',
    description: '',
  },
  overall_scores: {
    sdx_avg_score: 88,
    obj_avg_score: 0,
    composite_score: 88,
    grade: 'A',
  },
  e2e_metrics: [
    {
      metric_id: 'SDX_E2E_TOTAL_TIME_SEC',
      metric_name: 'end to end total time',
      value: 120,
      unit: 'seconds',
      benchmark_value: 900,
      score: 100,
      evidence: 'tool execution time',
      applicable: true,
    },
    {
      metric_id: 'SDX_E2E_SUCCESS_RATE',
      metric_name: 'success rate',
      value: 100,
      unit: 'percentage',
      benchmark_value: 100,
      score: 100,
      evidence: '1/1 succeeded',
      applicable: true,
    },
    {
      metric_id: 'SDX_E2E_TOKEN_USAGE',
      metric_name: 'token usage',
      value: 2048,
      unit: 'tokens',
      benchmark_value: 50000,
      score: 100,
      evidence: 'token usage evidence',
      applicable: true,
    },
  ],
  journey_steps: [
    {
      step_id: 'S0_DISCOVER',
      step_name: 'Discover',
      step_description: 'Find the project',
      expected_duration_minutes: 1,
      per_project_assessments: [
        {
          project_id: 'test-project',
          actual_path: {
            actions: [
              {
                action_type: 'web_search',
                detail: 'search for project',
                duration: '5s',
                timestamp: '5s',
                success: true,
                error_message: null,
              },
            ],
            total_duration_seconds: 5,
            retry_count: 0,
          },
          subjective: {
            pain_level: 'P4_TRIVIAL',
            pain_summary: 'quick to find',
            narrative: 'navigation is straightforward',
            metrics: [
              {
                metric_id: 'SDX_SEARCH_TIME_SEC',
                metric_name: 'search time',
                value: 5,
                unit: 'seconds',
                benchmark_value: 60,
                score: 100,
                evidence: 'completed quickly',
                applicable: true,
              },
            ],
          },
          objective: {
            metrics: [],
          },
          pros: 'easy to find',
          cons: '',
        },
      ],
    },
  ],
  recommendations: [
    {
      priority: 'high',
      category: 'discover',
      title: 'Improve project discovery',
      description: 'Add a clearer quickstart entry in the repository root.',
      expected_improvement: '',
      related_metric_ids: ['SDX_SEARCH_TIME_SEC'],
      affected_metrics: ['SDX_SEARCH_TIME_SEC'],
    },
  ],
  divergence_alerts: [],
  key_insight: 'overall insight',
};

describe('buildUserJourneyProjectData', () => {
  it('adds grade to the overall score card and renames duration card', () => {
    const result = buildUserJourneyProjectData(report);

    expect(result.overviewMetrics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          key: 'overall-score',
          recentValues: '评级 良好',
        }),
        expect.objectContaining({
          key: 'e2e-duration',
          title: '\u5de5\u5177\u6267\u884c\u603b\u8017\u65f6',
        }),
      ])
    );

    expect(result.recommendations).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          priority: 'high',
          title: 'Improve project discovery',
          description: 'Add a clearer quickstart entry in the repository root.',
        }),
      ])
    );
  });

  it('keeps detail score and panorama score aligned across all assessments', () => {
    const step = report.journey_steps[0];
    const result = buildUserJourneyProjectData({
      ...report,
      journey_steps: [
        {
          ...step,
          per_project_assessments: [
            ...step.per_project_assessments,
            {
              project_id: 'another-project',
              actual_path: {
                actions: [],
                total_duration_seconds: 8,
                retry_count: 0,
              },
              subjective: {
                pain_level: 'P2_MAJOR',
                pain_summary: 'harder path',
                narrative: 'second assessment',
                metrics: [
                  {
                    metric_id: 'SDX_SEARCH_TIME_SEC',
                    metric_name: 'search time',
                    value: 20,
                    unit: 'seconds',
                    benchmark_value: 60,
                    score: 40,
                    evidence: 'slower run',
                    applicable: true,
                  },
                ],
              },
              objective: {
                metrics: [],
              },
              pros: '',
              cons: '',
            },
          ],
        },
      ],
    });

    expect(result.journeySteps[0]).toEqual(
      expect.objectContaining({
        painNarrative: 'navigation is straightforward',
        score: 70,
        panoramaScore: 70,
      })
    );
  });

  it('preserves textual action results and maps boolean false to failed', () => {
    const result = buildUserJourneyProjectData({
      ...report,
      journey_steps: [
        {
          ...report.journey_steps[0],
          per_project_assessments: [
            {
              ...report.journey_steps[0].per_project_assessments[0],
              actual_path: {
                ...report.journey_steps[0].per_project_assessments[0]
                  .actual_path,
                actions: [
                  {
                    action_type: 'web_search',
                    detail: 'search result not matched',
                    duration: '3s',
                    timestamp: '3s',
                    success: '\u672a\u547d\u4e2d',
                    error_message: null,
                  },
                  {
                    action_type: 'retry',
                    detail: 'retry command',
                    duration: '2s',
                    timestamp: '5s',
                    success: false,
                    error_message: null,
                  },
                ],
              },
            },
          ],
        },
      ],
    });

    expect(result.journeySteps[0].executionPath).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          result: '\u672a\u547d\u4e2d',
          status: 'failed',
          statusLabel: '\u672a\u547d\u4e2d',
        }),
        expect.objectContaining({
          result: false,
          status: 'failed',
          statusLabel: '\u5931\u8d25',
        }),
      ])
    );
  });
});
