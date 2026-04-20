import {
  formatBenchmarkValue,
  formatMetricValue,
  getActionStatus,
  getExperienceGradeLabelFromScore,
  getJourneyStepIcon,
  getPainLabel,
  getPainLevelFromScore,
  getStepPresentation,
  getToneByScore,
  getToolLabel,
} from '../helpers';
import { SDX_METRIC_NAME_MAP } from './sdxMetricNameMap';
import {
  ActionDetailRecord,
  BackendAction,
  BackendJourneyStep,
  BackendMetric,
  BackendReportData,
  JourneyRecommendation,
  JourneyStep,
  OverviewMetric,
  ReportMetadataItem,
  StepMetric,
  UserJourneyProjectData,
} from '../types';
import {
  USER_JOURNEY_AGENT_GENERATOR,
  USER_JOURNEY_DEFAULT_DEVELOPER_TYPE,
  USER_JOURNEY_DEFAULT_HARDWARE,
  USER_JOURNEY_DEFAULT_MODE,
  USER_JOURNEY_DEFAULT_PERSONA,
  USER_JOURNEY_DEVELOPER_TYPE_OPTIONS,
  USER_JOURNEY_MODE_OPTIONS,
} from './constants';

const overviewMetricConfig: Record<
  string,
  Pick<OverviewMetric, 'key' | 'title' | 'color'>
> = {
  SDX_E2E_SUCCESS_RATE: {
    key: 'e2e-success-rate',
    title: '端到端成功率',
    color: '#7c3aed',
  },
  SDX_E2E_TOTAL_TIME_SEC: {
    key: 'e2e-total-time',
    title: '工具执行总耗时',
    color: '#0f766e',
  },
  SDX_E2E_TOKEN_USAGE: {
    key: 'e2e-token-usage',
    title: 'Token总消耗',
    color: '#ea580c',
  },
};

const normalizeText = (value: string | null | undefined) => {
  if (!value) {
    return '';
  }

  const normalizedValue = value.trim();

  return normalizedValue === '-' ? '' : normalizedValue;
};

const uniqueStrings = (values: Array<string | undefined>) =>
  Array.from(new Set(values.filter(Boolean) as string[]));

const getMetricScore = (metric: BackendMetric) => {
  if (typeof metric.score === 'number') {
    return metric.score;
  }

  if (
    metric.metric_id === 'SDX_E2E_TOTAL_TIME_SEC' &&
    typeof metric.value === 'number' &&
    typeof metric.benchmark_value === 'number'
  ) {
    return metric.value <= metric.benchmark_value ? 100 : 60;
  }

  if (
    metric.metric_id === 'SDX_E2E_TOKEN_USAGE' &&
    typeof metric.value === 'number' &&
    typeof metric.benchmark_value === 'number'
  ) {
    return metric.value <= metric.benchmark_value ? 100 : 50;
  }

  return null;
};

const getOverviewMetricValue = (metric: BackendMetric) => {
  if (
    metric.metric_id === 'SDX_E2E_TOTAL_TIME_SEC' &&
    typeof metric.value === 'number'
  ) {
    return {
      value: String(Number((metric.value / 60).toFixed(1))),
      suffix: '分钟',
    };
  }

  if (
    metric.metric_id === 'SDX_E2E_SUCCESS_RATE' &&
    typeof metric.value === 'number'
  ) {
    return {
      value: String(Math.round(metric.value)),
      suffix: '%',
    };
  }

  if (
    metric.metric_id === 'SDX_E2E_TOKEN_USAGE' &&
    typeof metric.value === 'number'
  ) {
    return {
      value: metric.value.toLocaleString('en-US'),
      suffix: 'tokens',
    };
  }

  return {
    value: String(metric.value ?? 'N/A'),
    suffix: undefined,
  };
};

const buildOverviewMetrics = (report: BackendReportData): OverviewMetric[] => {
  const overviewMetrics: OverviewMetric[] = [
    {
      key: 'overall-composite-score',
      title: '综合体验评分',
      value: String(Number(report.overall_scores.composite_score.toFixed(1))),
      suffix: '/100',
      description: report.key_insight,
      stage: '综合评估',
      recentValues: `评级 ${getExperienceGradeLabelFromScore(
        report.overall_scores.composite_score
      )}`,
      tone: getToneByScore(report.overall_scores.composite_score),
      color: '#2563eb',
    },
  ];

  report.e2e_metrics.forEach((metric) => {
    const config = overviewMetricConfig[metric.metric_id];

    if (!config) {
      return;
    }

    const metricValue = getOverviewMetricValue(metric);

    overviewMetrics.push({
      key: config.key,
      title: config.title || metric.metric_name,
      value: metricValue.value,
      suffix: metricValue.suffix,
      description: metric.evidence || metric.metric_name,
      stage: '端到端指标',
      tone: getToneByScore(getMetricScore(metric)),
      color: config.color,
    });
  });

  return overviewMetrics;
};

const getFixedOverviewMetricById = (
  report: BackendReportData,
  metricId: string
) => report.e2e_metrics.find((metric) => metric.metric_id === metricId);

const getFixedOverviewMetricValue = (metric?: BackendMetric) => {
  if (!metric) {
    return {
      value: 'N/A',
      suffix: undefined as string | undefined,
    };
  }

  if (
    metric.metric_id === 'SDX_E2E_TOTAL_TIME_SEC' &&
    typeof metric.value === 'number'
  ) {
    return {
      value: String(Number((metric.value / 60).toFixed(1))),
      suffix: '分钟',
    };
  }

  if (
    metric.metric_id === 'SDX_E2E_SUCCESS_RATE' &&
    typeof metric.value === 'number'
  ) {
    return {
      value: String(Math.round(metric.value)),
      suffix: '%',
    };
  }

  if (
    metric.metric_id === 'SDX_E2E_TOKEN_USAGE' &&
    typeof metric.value === 'number'
  ) {
    return {
      value: metric.value.toLocaleString('en-US'),
      suffix: undefined as string | undefined,
    };
  }

  return {
    value: String(metric.value ?? 'N/A'),
    suffix: undefined as string | undefined,
  };
};

const buildFixedOverviewMetrics = (
  report: BackendReportData,
  compositeScore: number | null
): OverviewMetric[] => {
  const successMetric = getFixedOverviewMetricById(
    report,
    'SDX_E2E_SUCCESS_RATE'
  );
  const durationMetric = getFixedOverviewMetricById(
    report,
    'SDX_E2E_TOTAL_TIME_SEC'
  );
  const tokenMetric = getFixedOverviewMetricById(report, 'SDX_E2E_TOKEN_USAGE');
  const successValue = getFixedOverviewMetricValue(successMetric);
  const durationValue = getFixedOverviewMetricValue(durationMetric);
  const tokenValue = getFixedOverviewMetricValue(tokenMetric);

  const displayScore = compositeScore !== null ? compositeScore : 0;

  const overviewMetrics = [
    {
      key: 'overall-score',
      title: '综合体验评分',
      value: String(Number(displayScore.toFixed(1))),
      suffix: '/100',
      description:
        '来自七步旅程综合评分，最能反映外部开发者从零跑通的真实体验。',
      stage: '全链路结果',
      // recentValues: '近五次数据',
      tone: getToneByScore(displayScore),
      color: '#2563eb',
    },
    {
      key: 'e2e-success',
      title: '端到端成功率',
      value: successValue.value,
      suffix: successValue.suffix,
      description:
        '这是最直接的结果指标，比通用成功率更贴近用户是否真的能把 Quick Start 跑起来。',
      stage: 'S6 运行验证',
      // recentValues: '近五次数据',
      tone: successMetric
        ? getToneByScore(getMetricScore(successMetric))
        : 'neutral',
      color: '#7c3aed',
    },
    {
      key: 'e2e-duration',
      title: '平均端到端总耗时',
      value: durationValue.value,
      suffix: durationValue.suffix,
      description:
        '覆盖从环境准备到最终验证的完整首次跑通时长，比单步耗时更有决策价值。',
      stage: 'S6 运行验证',
      // recentValues: '近五次数据',
      tone: durationMetric
        ? getToneByScore(getMetricScore(durationMetric))
        : 'neutral',
      color: '#0f766e',
    },
    {
      key: 'avg-token-cost',
      title: '平均 token 消耗量',
      value: tokenValue.value,
      suffix: tokenValue.suffix,
      description:
        '用近五次任务的平均 token 消耗量观察分析成本，辅助判断任务复杂度和调用负担。',
      stage: '全链路成本',
      // recentValues: '近五次数据',
      tone: tokenMetric
        ? getToneByScore(getMetricScore(tokenMetric))
        : 'neutral',
      color: '#ea580c',
    },
  ];

  return overviewMetrics.map((metric) => {
    if (metric.key === 'overall-score') {
      return {
        ...metric,
        recentValues: `评级 ${getExperienceGradeLabelFromScore(displayScore)}`,
      };
    }

    if (metric.key === 'e2e-duration') {
      return {
        ...metric,
        title: '\u5de5\u5177\u6267\u884c\u603b\u8017\u65f6',
        description:
          '\u7edf\u8ba1\u672c\u6b21\u7528\u6237\u65c5\u7a0b\u4e2d\u5404\u6b65\u9aa4\u5de5\u5177\u6267\u884c\u7684\u7d2f\u8ba1\u8017\u65f6\uff0c\u7528\u4e8e\u8861\u91cf\u5b8c\u6210\u4efb\u52a1\u6240\u9700\u7684\u5b9e\u9645\u64cd\u4f5c\u6210\u672c\u3002',
      };
    }

    return metric;
  });
};

const buildPurpose = (report: BackendReportData) => {
  if (normalizeText(report.meta.purpose)) {
    return report.meta.purpose as string;
  }

  if (report.project.project_id === 'CANN/ops-math') {
    return '横向对比 CANN/ops-math 与 CUDA/cuda-samples 的开发者体验';
  }

  return `诊断 ${report.project.project_name} 的开发者体验`;
};

const buildPersonaLabel = (report: BackendReportData) => {
  const persona = report.meta.persona;

  if (!persona) {
    return USER_JOURNEY_DEFAULT_PERSONA;
  }

  const value = [normalizeText(persona.role), normalizeText(persona.background)]
    .filter(Boolean)
    .join(' / ');

  return value || USER_JOURNEY_DEFAULT_PERSONA;
};

const buildHardwareLabel = (report: BackendReportData) =>
  normalizeText(report.meta.persona?.hardware_access) ||
  USER_JOURNEY_DEFAULT_HARDWARE;

const buildAgentVersionLabel = (report: BackendReportData) => {
  const agentVersion = normalizeText(report.meta.agent_version);

  return agentVersion
    ? `${USER_JOURNEY_AGENT_GENERATOR} ${agentVersion}`
    : USER_JOURNEY_AGENT_GENERATOR;
};

const buildReportMetadata = (
  report: BackendReportData
): ReportMetadataItem[] => [
    {
      key: 'persona',
      label: '模拟角色',
      value: buildPersonaLabel(report),
    },
    {
      key: 'hardware',
      label: '硬件环境',
      value: buildHardwareLabel(report),
    },
    {
      key: 'purpose',
      label: '目的',
      value: buildPurpose(report),
    },
    {
      key: 'agent-version',
      label: 'Agent版本',
      value: buildAgentVersionLabel(report),
      tone: 'mono',
    },
  ];

const getRecommendationPriorityRank = (priority: string) => {
  const normalizedPriority = priority.trim().toLowerCase();

  if (
    normalizedPriority.includes('critical') ||
    normalizedPriority.includes('high') ||
    priority.includes('高')
  ) {
    return 0;
  }

  if (
    normalizedPriority.includes('medium') ||
    normalizedPriority.includes('mid') ||
    priority.includes('中')
  ) {
    return 1;
  }

  if (normalizedPriority.includes('low') || priority.includes('低')) {
    return 2;
  }

  return 3;
};

const buildProjectRecommendations = (
  report: BackendReportData
): JourneyRecommendation[] =>
  report.recommendations
    .map((recommendation, index) => ({
      key: `${recommendation.category || 'recommendation'}-${index}`,
      priority: normalizeText(recommendation.priority) || 'normal',
      title: normalizeText(recommendation.title) || `建议 ${index + 1}`,
      description:
        normalizeText(recommendation.description) ||
        normalizeText(recommendation.expected_improvement) ||
        report.key_insight,
      relatedStepIds: recommendation.related_step_ids,
      relatedMetricIds: [
        ...(recommendation.related_metric_ids ?? []),
        ...(recommendation.affected_metrics ?? []),
      ].filter((v, i, arr) => arr.indexOf(v) === i),
    }))
    .sort((left, right) => {
      const priorityDiff =
        getRecommendationPriorityRank(left.priority) -
        getRecommendationPriorityRank(right.priority);

      if (priorityDiff !== 0) {
        return priorityDiff;
      }

      return left.key.localeCompare(right.key);
    });

const buildActionDetailRecord = (action: BackendAction): ActionDetailRecord => {
  const result =
    typeof action.success === 'string'
      ? normalizeText(action.success) || null
      : action.success;
  const status =
    typeof result === 'boolean'
      ? result
        ? 'success'
        : 'failed'
      : result
        ? 'failed'
        : getActionStatus(undefined, action.error_message);

  return {
    label: action.action_type,
    description: action.detail,
    duration: action.duration,
    result,
    status,
    statusLabel:
      typeof result === 'boolean'
        ? result
          ? '\u6210\u529f'
          : '\u5931\u8d25'
        : result || (action.error_message ? '\u5931\u8d25' : '\u8b66\u544a'),
    taskId: action.task_id,
  };
};

const buildStepMetrics = (
  step: BackendJourneyStep,
  totalDurationSeconds: number,
  actionCount: number,
  retryCount: number,
  subjectiveMetrics: BackendMetric[]
): StepMetric[] => {
  const mappedMetrics = subjectiveMetrics.map((metric) => {
    // 处理 true/false 值的展示
    const rawValue = metric.value;
    const displayValue =
      metric.ui?.display_value ??
      (rawValue === (true as unknown)
        ? '成功'
        : rawValue === (false as unknown)
          ? '失败'
          : formatMetricValue(rawValue as string | number | null, metric.unit));
    return {
      label: metric.metric_name,
      value: displayValue,
      benchmark:
        metric.ui?.display_benchmark ??
        formatBenchmarkValue(metric.benchmark_value, metric.unit),
      note: (metric.ui?.note ?? metric.evidence) || metric.metric_id,
      tone: metric.ui?.tone ?? getToneByScore(metric.score),
      trend: metric.ui?.trend,
      score: metric.score,
      metricId: metric.metric_id,
    };
  });
  const hasRichMetrics = subjectiveMetrics.some((metric) => Boolean(metric.ui));
  const durationMetric: StepMetric = {
    label: '\u5b9e\u9645\u8017\u65f6',
    value: formatMetricValue(totalDurationSeconds, 'seconds'),
    benchmark: `\u9884\u8ba1 ${step.expected_duration_minutes} \u5206\u949f`,
    note: `\u5171\u6267\u884c ${actionCount} \u4e2a\u52a8\u4f5c\uff0c\u91cd\u8bd5 ${retryCount} \u6b21\u3002`,
    tone:
      totalDurationSeconds > step.expected_duration_minutes * 60
        ? 'warning'
        : 'positive',
  };

  return hasRichMetrics ? mappedMetrics : [durationMetric, ...mappedMetrics];
};

const buildRecommendation = (
  step: BackendJourneyStep,
  metricIds: string[],
  fallbackText: string,
  report: BackendReportData
) => {
  const matchedAlerts = report.divergence_alerts
    .filter((alert) => alert.step_id === step.step_id)
    .map((alert) => alert.message);

  if (matchedAlerts.length) {
    return matchedAlerts.join('；');
  }

  const matchedRecommendation = report.recommendations.find(
    (recommendation) => {
      const relatedMetricIds = [
        ...(recommendation.related_metric_ids ?? []),
        ...(recommendation.affected_metrics ?? []),
      ];

      return relatedMetricIds.some((metricId) => metricIds.includes(metricId));
    }
  );

  if (matchedRecommendation) {
    return matchedRecommendation.description;
  }

  return fallbackText || report.key_insight;
};

/**
 * 体验系数配置：
 *   - 任务达成率 < 100%  → 0（强制置零）
 *   - 达成率 100% + 有重试（actions 中存在 success=false）：
 *       S0/S4/S5 → 0.8，S1/S2/S3 → 0.6
 *   - S0 额外判定：达成率 100% 且无 actions 重试时，
 *     若 SDX_SEARCH_ROUNDS > 2 也视为有重试 → 0.8
 *   - 达成率 100% + 无重试 → 1
 */
const RETRY_COEFFICIENT_HIGH = 0.8; // S0,  S4, S5
const RETRY_COEFFICIENT_LOW = 0.6; // S1,S2, S3

const HIGH_COEFFICIENT_STEPS = new Set([
  'S0_DISCOVERY',
  'S4_TESTING',
  'S5_CONTRIBUTION',
]);

/** S0 搜索轮次阈值：超过此值视为发生了搜索重试 */
const S0_SEARCH_ROUNDS_THRESHOLD = 2;

/**
 * 计算阶段体验系数。
 * @param stepId  后端 step_id，如 "S1_SETUP"
 * @param assessment  当前阶段的 per_project_assessment 条目
 */
const getExperienceCoefficient = (
  stepId: string,
  assessment: BackendReportData['journey_steps'][number]['per_project_assessments'][number]
): number => {
  const metrics = assessment.subjective.metrics;

  // 1. 找到任务达成率指标
  const achievementMetric = metrics.find(
    (m) => m.metric_id === 'SDX_TASK_ACHIEVEMENT_RATE'
  );

  // 无达成率指标时（未评估阶段），返回 1 由外层判断
  if (!achievementMetric) {
    return 1;
  }

  const achievementValue =
    typeof achievementMetric.value === 'number'
      ? achievementMetric.value
      : null;

  // 2. 达成率 < 100% → 系数为 0
  if (achievementValue === null || achievementValue < 100) {
    return 0;
  }

  // 3. 达成率 100%，检查是否有重试（actions 中存在 success === false）
  const hasActionRetry = (assessment.actual_path.actions ?? []).some(
    (action) => action.success === false
  );

  if (hasActionRetry) {
    // 4. 有重试，按阶段返回系数
    return HIGH_COEFFICIENT_STEPS.has(stepId)
      ? RETRY_COEFFICIENT_HIGH
      : RETRY_COEFFICIENT_LOW;
  }

  // 5. S0 额外判定：搜索轮次 > 阈值时也视为有重试 → 0.8
  if (stepId === 'S0_DISCOVERY') {
    const searchRoundsMetric = metrics.find(
      (m) => m.metric_id === 'SDX_SEARCH_ROUNDS'
    );
    const searchRoundsValue =
      typeof searchRoundsMetric?.value === 'number'
        ? searchRoundsMetric.value
        : null;

    if (
      searchRoundsValue !== null &&
      searchRoundsValue > S0_SEARCH_ROUNDS_THRESHOLD
    ) {
      return RETRY_COEFFICIENT_HIGH;
    }
  }

  return 1;
};

/**
 * 根据新算法计算 panoramaScore：
 *   阶段内 subjective.metrics（排除达成率指标本身）有效得分均值 × 体验系数
 *   - 无有效指标（未评估）→ null
 *   - 系数为 0 → 0
 */
const computePanoramaScore = (
  stepId: string,
  assessment:
    | BackendReportData['journey_steps'][number]['per_project_assessments'][number]
    | undefined
): number | null => {
  if (!assessment) return null;

  const metrics = assessment.subjective.metrics;

  // 未评估：无指标
  if (metrics.length === 0) return null;

  // 收集非达成率指标的得分
  const scoreCandidates = metrics
    .filter((m) => m.metric_id !== 'SDX_TASK_ACHIEVEMENT_RATE')
    .map((m) => m.score)
    .filter((s): s is number => typeof s === 'number');

  if (scoreCandidates.length === 0) return null;

  const avgScore =
    scoreCandidates.reduce((sum, s) => sum + s, 0) / scoreCandidates.length;

  const coefficient = getExperienceCoefficient(stepId, assessment);

  return Math.round(avgScore * coefficient);
};

const buildJourneyStep = (
  step: BackendJourneyStep,
  report: BackendReportData,
  totalJourneyDuration: number
): JourneyStep => {
  const assessment =
    step.per_project_assessments.find(
      (item) => item.project_id === report.project.project_id
    ) ?? step.per_project_assessments[0];
  const presentation = getStepPresentation(step.step_id);
  const actionDetails = (assessment?.actual_path.actions ?? []).map(
    buildActionDetailRecord
  );
  const subjectiveMetrics = assessment?.subjective.metrics ?? [];
  const metricIds = subjectiveMetrics.map((metric) => metric.metric_id);

  // 使用新算法计算 panoramaScore：均值 × 体验系数
  const panoramaScore = computePanoramaScore(step.step_id, assessment);
  const narrative = normalizeText(assessment?.subjective.narrative);
  const shortPainSummary = normalizeText(assessment?.subjective.pain_summary);
  const painLevel = getPainLevelFromScore(panoramaScore);
  const painPoints = uniqueStrings([
    narrative,
    normalizeText(assessment?.cons),
    shortPainSummary,
  ]);
  const recommendation = buildRecommendation(
    step,
    metricIds,
    normalizeText(assessment?.cons) || narrative,
    report
  );
  const totalDurationSeconds =
    assessment?.actual_path.total_duration_seconds ?? 0;

  // actions: 优先从 JSON 中 actions 的 detail 提取，作为步骤实际执行动作列表
  const resolvedActions = actionDetails.length
    ? actionDetails.map((action) => action.description)
    : [];

  const fallbackActionCards = actionDetails.length
    ? actionDetails.map((action, index) => ({
      title: resolvedActions[index] ?? action.description,
      summary: action.description,
      actionType: action.label === 'step_action' ? undefined : action.label,
      duration: action.duration || undefined,
      status: action.status,
      statusLabel: action.statusLabel,
      details: [action],
    }))
    : undefined;

  // tools: 直接从 actions 的 tool_name 字段提取（JSON 新增字段），fallback 到 action_type
  const resolvedTools = uniqueStrings(
    (assessment?.actual_path.actions ?? []).map(
      (action) =>
        action.tool_name || getToolLabel(action.action_type, action.detail)
    )
  );

  const derivedTimeShare = totalJourneyDuration
    ? `~${Math.max(
      1,
      Math.round((totalDurationSeconds / totalJourneyDuration) * 100)
    )}%`
    : '~0%';

  return {
    key: presentation.key,
    code: step.step_id,
    title: step.step_name,
    summary: shortPainSummary || step.step_name,
    description: normalizeText(step.step_description) || step.step_name,
    iconKey: presentation.iconKey,
    icon: getJourneyStepIcon(presentation.iconKey),
    color: presentation.color,
    score: panoramaScore,
    panoramaScore,
    benchmarkScore: 100,
    timeShare: derivedTimeShare,
    painLevel,
    painLabel: getPainLabel(painLevel),
    actions: resolvedActions,
    actionCards: fallbackActionCards,
    executionPath: actionDetails,
    tools: resolvedTools,
    painNarrative: narrative,
    painSummary: narrative || shortPainSummary || report.key_insight,
    painPoints: painPoints.length ? painPoints : [report.key_insight],
    recommendation,
    metrics: buildStepMetrics(
      step,
      totalDurationSeconds,
      actionDetails.length,
      assessment?.actual_path.retry_count ?? 0,
      subjectiveMetrics
    ),
  };
};

export const buildUserJourneyProjectData = (
  report: BackendReportData
): UserJourneyProjectData => {
  const totalJourneyDuration = report.journey_steps.reduce((sum, step) => {
    const assessment =
      step.per_project_assessments.find(
        (item) => item.project_id === report.project.project_id
      ) ?? step.per_project_assessments[0];

    return sum + (assessment?.actual_path.total_duration_seconds ?? 0);
  }, 0);

  const journeySteps = report.journey_steps.map((step) =>
    buildJourneyStep(step, report, totalJourneyDuration)
  );

  // 综合体验得分：仅取已评估步骤（panoramaScore !== null）的均值
  const evaluatedScores = journeySteps
    .map((s) => s.panoramaScore)
    .filter((s): s is number => s !== null && s !== undefined);
  const compositeScore =
    evaluatedScores.length > 0
      ? Math.round(
        evaluatedScores.reduce((sum, s) => sum + s, 0) /
        evaluatedScores.length
      )
      : null;

  // 构建 metric_id → metric_name 映射：以静态 SDX 定义表为基础，再用 JSON 动态数据覆盖
  const metricNameMap: Record<string, string> = { ...SDX_METRIC_NAME_MAP };
  report.journey_steps.forEach((step) => {
    step.per_project_assessments.forEach((assessment) => {
      assessment.subjective.metrics.forEach((metric) => {
        if (metric.metric_id && metric.metric_name) {
          metricNameMap[metric.metric_id] = metric.metric_name;
        }
      });
      assessment.objective.metrics.forEach((metric) => {
        if (metric.metric_id && metric.metric_name) {
          metricNameMap[metric.metric_id] = metric.metric_name;
        }
      });
    });
  });
  report.e2e_metrics.forEach((metric) => {
    if (metric.metric_id && metric.metric_name) {
      metricNameMap[metric.metric_id] = metric.metric_name;
    }
  });

  return {
    projectKey: report.project.project_id,
    agentVersion: buildAgentVersionLabel(report),
    reportUpdatedAt: report.meta.generated_at,
    reportDetailUrl: report.report_detail_url ?? '',
    projectInfo: {
      name: report.project.project_name,
      version: report.version,
    },
    developerTypeOptions: USER_JOURNEY_DEVELOPER_TYPE_OPTIONS,
    defaultDeveloperType: USER_JOURNEY_DEFAULT_DEVELOPER_TYPE,
    journeyModeOptions: USER_JOURNEY_MODE_OPTIONS,
    defaultJourneyMode: USER_JOURNEY_DEFAULT_MODE,
    overviewMetrics: buildFixedOverviewMetrics(report, compositeScore),
    recommendations: buildProjectRecommendations(report),
    reportMetadata: buildReportMetadata(report),
    journeySteps,
    metricNameMap,
  };
};
