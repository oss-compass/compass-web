// 模型指标映射配置 - 使用与 API ident 一致的指标 ID
// 这个配置被 Create.tsx, Home.tsx, ModelSelectionModal.tsx 共享

export interface MetricConfig {
  id: string;
  i18nKey: string; // 国际化 key
}

export interface ModelConfig {
  id: string;
  i18nKey: string; // 模型名称的国际化 key
  metrics: MetricConfig[];
}

// 所有模型及其指标的配置
export const MODEL_CONFIGS: ModelConfig[] = [
  {
    id: 'collaboration_development_index_overview',
    i18nKey: 'metrics_models:collaboration_development_index.title',
    metrics: [
      {
        id: 'contributor_count',
        i18nKey:
          'metrics_models:collaboration_development_index.metrics.contributor_count',
      },
      {
        id: 'commit_frequency',
        i18nKey:
          'metrics_models:collaboration_development_index.metrics.commit_frequency',
      },
      {
        id: 'is_maintained',
        i18nKey:
          'metrics_models:collaboration_development_index.metrics.is_maintained',
      },
      {
        id: 'commit_pr_linked_ratio',
        i18nKey:
          'metrics_models:collaboration_development_index.metrics.commit_pr_linked_ratio',
      },
      {
        id: 'pr_issue_linked_ratio',
        i18nKey:
          'metrics_models:collaboration_development_index.metrics.pr_issue_linked_ratio',
      },
      {
        id: 'code_review_ratio',
        i18nKey:
          'metrics_models:collaboration_development_index.metrics.code_review_ratio',
      },
      {
        id: 'code_merge_ratio',
        i18nKey:
          'metrics_models:collaboration_development_index.metrics.code_merge_ratio',
      },
      {
        id: 'lines_of_code_frequency',
        i18nKey:
          'metrics_models:collaboration_development_index.metrics.lines_of_code_frequency',
      },
    ],
  },
  {
    id: 'support_overview',
    i18nKey: 'metrics_models:community_service_and_support.title',
    metrics: [
      {
        id: 'updated_issues_count',
        i18nKey:
          'metrics_models:community_service_and_support.metrics.updated_issues_count',
      },
      {
        id: 'close_pr_count',
        i18nKey:
          'metrics_models:community_service_and_support.metrics.close_pr_count',
      },
      {
        id: 'issue_first_reponse',
        i18nKey:
          'metrics_models:community_service_and_support.metrics.issue_first_response',
      },
      {
        id: 'bug_issue_open_time',
        i18nKey:
          'metrics_models:community_service_and_support.metrics.bug_issue_open_time',
      },
      {
        id: 'pr_open_time',
        i18nKey:
          'metrics_models:community_service_and_support.metrics.pr_open_time',
      },
      {
        id: 'comment_frequency',
        i18nKey:
          'metrics_models:community_service_and_support.metrics.comment_frequency',
      },
      {
        id: 'code_review_count',
        i18nKey:
          'metrics_models:community_service_and_support.metrics.code_review_count',
      },
    ],
  },
  {
    id: 'activity_overview',
    i18nKey: 'metrics_models:community_activity.title',
    metrics: [
      {
        id: 'contributor_count',
        i18nKey: 'metrics_models:community_activity.metrics.contributor_count',
      },
      {
        id: 'commit_frequency',
        i18nKey: 'metrics_models:community_activity.metrics.commit_frequency',
      },
      {
        id: 'updated_since',
        i18nKey: 'metrics_models:community_activity.metrics.updated_since',
      },
      {
        id: 'org_count',
        i18nKey: 'metrics_models:community_activity.metrics.organization_count',
      },
      {
        id: 'comment_frequency',
        i18nKey: 'metrics_models:community_activity.metrics.comment_frequency',
      },
      {
        id: 'code_review_count',
        i18nKey: 'metrics_models:community_activity.metrics.code_review_count',
      },
      {
        id: 'updated_issues_count',
        i18nKey:
          'metrics_models:community_activity.metrics.updated_issues_count',
      },
      {
        id: 'recent_releases_count',
        i18nKey:
          'metrics_models:community_activity.metrics.recent_releases_count',
      },
    ],
  },
  {
    id: 'organizations_activity_overview',
    i18nKey: 'metrics_models:organization_activity.title',
    metrics: [
      {
        id: 'org_contributor_count',
        i18nKey:
          'metrics_models:organization_activity.metrics.contributor_count',
      },
      {
        id: 'org_commit_frequency',
        i18nKey:
          'metrics_models:organization_activity.metrics.commit_frequency',
      },
      {
        id: 'org_count',
        i18nKey: 'metrics_models:organization_activity.metrics.org_count',
      },
      {
        id: 'org_contribution_last',
        i18nKey:
          'metrics_models:organization_activity.metrics.contribution_last',
      },
    ],
  },
  {
    id: 'milestone_persona_overview',
    i18nKey: 'metrics_models:contributor_milestone_persona.title',
    metrics: [
      {
        id: 'activity_core_contributor_count',
        i18nKey:
          'metrics_models:contributor_milestone_persona.metrics.activity_core_contributor_count',
      },
      {
        id: 'activity_core_contribution_per_person',
        i18nKey:
          'metrics_models:contributor_milestone_persona.metrics.activity_core_contribution_per_person',
      },
      {
        id: 'activity_regular_contributor_count',
        i18nKey:
          'metrics_models:contributor_milestone_persona.metrics.activity_regular_contributor_count',
      },
      {
        id: 'activity_regular_contribution_per_person',
        i18nKey:
          'metrics_models:contributor_milestone_persona.metrics.activity_regular_contribution_per_person',
      },
      {
        id: 'activity_casual_contributor_count',
        i18nKey:
          'metrics_models:contributor_milestone_persona.metrics.activity_casual_contributor_count',
      },
      {
        id: 'activity_casual_contribution_per_person',
        i18nKey:
          'metrics_models:contributor_milestone_persona.metrics.activity_casual_contribution_per_person',
      },
    ],
  },
  {
    id: 'role_persona_overview',
    i18nKey: 'metrics_models:contributor_role_persona.title',
    metrics: [
      {
        id: 'activity_organization_contributor_count',
        i18nKey:
          'metrics_models:contributor_role_persona.metrics.activity_organization_contributor_count',
      },
      {
        id: 'activity_organization_contribution_per_person',
        i18nKey:
          'metrics_models:contributor_role_persona.metrics.activity_organization_contribution_per_person',
      },
      {
        id: 'activity_individual_contributor_count',
        i18nKey:
          'metrics_models:contributor_role_persona.metrics.activity_individual_contributor_count',
      },
      {
        id: 'activity_individual_contribution_per_person',
        i18nKey:
          'metrics_models:contributor_role_persona.metrics.activity_individual_contribution_per_person',
      },
    ],
  },
  {
    id: 'domain_persona_overview',
    i18nKey: 'metrics_models:contributor_domain_persona.title',
    metrics: [
      {
        id: 'activity_observation_contributor_count',
        i18nKey:
          'metrics_models:contributor_domain_persona.metrics.activity_observation_contributor_count',
      },
      {
        id: 'activity_observation_contribution_per_person',
        i18nKey:
          'metrics_models:contributor_domain_persona.metrics.activity_observation_contribution_per_person',
      },
      {
        id: 'activity_code_contributor_count',
        i18nKey:
          'metrics_models:contributor_domain_persona.metrics.activity_code_contributor_count',
      },
      {
        id: 'activity_code_contribution_per_person',
        i18nKey:
          'metrics_models:contributor_domain_persona.metrics.activity_code_contribution_per_person',
      },
      {
        id: 'activity_issue_contributor_count',
        i18nKey:
          'metrics_models:contributor_domain_persona.metrics.activity_issue_contributor_count',
      },
      {
        id: 'activity_issue_contribution_per_person',
        i18nKey:
          'metrics_models:contributor_domain_persona.metrics.activity_issue_contribution_per_person',
      },
    ],
  },
];

// 构建指标ID到国际化key的映射
export const METRIC_I18N_MAP: Record<string, string> = {};
MODEL_CONFIGS.forEach((model) => {
  model.metrics.forEach((metric) => {
    // 如果同一个 id 有多个 key，保留第一个
    if (!METRIC_I18N_MAP[metric.id]) {
      METRIC_I18N_MAP[metric.id] = metric.i18nKey;
    }
  });
});

// 构建模型ID到指标ID数组的映射
export const MODEL_METRICS_MAP: Record<string, string[]> = {};
MODEL_CONFIGS.forEach((model) => {
  MODEL_METRICS_MAP[model.id] = model.metrics.map((m) => m.id);
});

// 获取指标的国际化名称
export const getMetricI18nKey = (metricId: string): string | null => {
  return METRIC_I18N_MAP[metricId] || null;
};
