// Metric names reuse the analyze charts' translation keys.
export interface ReportMetric {
  field: string;
  title: string;
  qualifier?: string;
  unit?: 'score' | 'days' | 'ratio';
  factor?: number;
}

export interface ReportModel {
  key: string;
  topic: 'collaboration' | 'contributor';
  title: string;
  metrics: ReportMetric[];
}

export const reportModels: ReportModel[] = [
  {
    key: 'metricCodequality',
    topic: 'collaboration',
    title: 'metrics_models:collaboration_development_index.title',
    metrics: [
      {
        field: 'codeQualityGuarantee',
        title: 'metrics_models:collaboration_development_index.title',
        unit: 'score',
      },
      {
        field: 'codeMergeRatio',
        title:
          'metrics_models:collaboration_development_index.metrics.code_merge_ratio',
        qualifier: 'analyze:code_merge_ratio',
        unit: 'ratio',
      },
      {
        field: 'prCount',
        title:
          'metrics_models:collaboration_development_index.metrics.code_merge_ratio',
        qualifier: 'analyze:total_pr',
      },
      {
        field: 'codeMergedCount',
        title:
          'metrics_models:collaboration_development_index.metrics.code_merge_ratio',
        qualifier: 'analyze:code_merge',
      },
      {
        field: 'codeReviewRatio',
        title:
          'metrics_models:collaboration_development_index.metrics.code_review_ratio',
        qualifier: 'analyze:code_review_ratio',
        unit: 'ratio',
      },
      {
        field: 'codeReviewedCount',
        title:
          'metrics_models:collaboration_development_index.metrics.code_review_ratio',
        qualifier: 'analyze:code_review',
      },
      {
        field: 'commitFrequency',
        title:
          'metrics_models:collaboration_development_index.metrics.commit_frequency',
        qualifier:
          'metrics_models:collaboration_development_index.metrics.commit_frequency',
      },
      {
        field: 'gitPrLinkedRatio',
        title:
          'metrics_models:collaboration_development_index.metrics.commit_pr_linked_ratio',
        qualifier: 'analyze:commit_pr_linked_ratio',
        unit: 'ratio',
      },
      {
        field: 'prCommitCount',
        title:
          'metrics_models:collaboration_development_index.metrics.commit_pr_linked_ratio',
        qualifier: 'analyze:commit_pr',
      },
      {
        field: 'prCommitLinkedCount',
        title:
          'metrics_models:collaboration_development_index.metrics.commit_pr_linked_ratio',
        qualifier: 'analyze:commit_pr_linked',
      },
      {
        field: 'contributorCount',
        title:
          'metrics_models:collaboration_development_index.metrics.contributor_count',
        qualifier: 'analyze:total',
      },
      {
        field: 'activeC1PrCommentsContributorCount',
        title:
          'metrics_models:collaboration_development_index.metrics.contributor_count',
        qualifier: 'analyze:code_reviewer',
      },
      {
        field: 'activeC1PrCreateContributorCount',
        title:
          'metrics_models:collaboration_development_index.metrics.contributor_count',
        qualifier: 'analyze:pr_creator',
      },
      {
        field: 'activeC2ContributorCount',
        title:
          'metrics_models:collaboration_development_index.metrics.contributor_count',
        qualifier: 'analyze:commit_author',
      },
      {
        field: 'isMaintained',
        title:
          'metrics_models:collaboration_development_index.metrics.is_maintained',
      },
      {
        field: 'linesAddedFrequency',
        title:
          'metrics_models:collaboration_development_index.metrics.lines_of_code_frequency',
        qualifier: 'analyze:lines_add',
      },
      {
        field: 'linesRemovedFrequency',
        title:
          'metrics_models:collaboration_development_index.metrics.lines_of_code_frequency',
        qualifier: 'analyze:lines_remove',
      },
      {
        field: 'prIssueLinkedRatio',
        title:
          'metrics_models:collaboration_development_index.metrics.pr_issue_linked_ratio',
        qualifier: 'analyze:linked_issue_ratio',
        unit: 'ratio',
      },
      {
        field: 'prIssueLinkedCount',
        title:
          'metrics_models:collaboration_development_index.metrics.pr_issue_linked_ratio',
        qualifier: 'analyze:linked_issue',
      },
    ],
  },
  {
    key: 'metricCommunity',
    topic: 'collaboration',
    title: 'metrics_models:community_service_and_support.title',
    metrics: [
      {
        field: 'communitySupportScore',
        title: 'metrics_models:community_service_and_support.title',
        qualifier: 'metrics_models:community_service_and_support.title',
        unit: 'score',
      },
      {
        field: 'bugIssueOpenTimeAvg',
        title:
          'metrics_models:community_service_and_support.metrics.bug_issue_open_time',
        qualifier: 'analyze:average',
        unit: 'days',
      },
      {
        field: 'bugIssueOpenTimeMid',
        title:
          'metrics_models:community_service_and_support.metrics.bug_issue_open_time',
        qualifier: 'analyze:median',
        unit: 'days',
      },
      {
        field: 'closedPrsCount',
        title:
          'metrics_models:community_service_and_support.metrics.close_pr_count',
        qualifier:
          'metrics_models:community_service_and_support.metrics.close_pr_count',
      },
      {
        field: 'codeReviewCount',
        title:
          'metrics_models:community_service_and_support.metrics.code_review_count',
        qualifier:
          'metrics_models:community_service_and_support.metrics.code_review_count',
      },
      {
        field: 'commentFrequency',
        title:
          'metrics_models:community_service_and_support.metrics.comment_frequency',
        qualifier:
          'metrics_models:community_service_and_support.metrics.comment_frequency',
      },
      {
        field: 'issueFirstReponseAvg',
        title:
          'metrics_models:community_service_and_support.metrics.issue_first_response',
        qualifier: 'analyze:average',
        unit: 'days',
      },
      {
        field: 'issueFirstReponseMid',
        title:
          'metrics_models:community_service_and_support.metrics.issue_first_response',
        qualifier: 'analyze:median',
        unit: 'days',
      },
      {
        field: 'prOpenTimeAvg',
        title:
          'metrics_models:community_service_and_support.metrics.pr_open_time',
        qualifier: 'analyze:average',
        unit: 'days',
      },
      {
        field: 'prOpenTimeMid',
        title:
          'metrics_models:community_service_and_support.metrics.pr_open_time',
        qualifier: 'analyze:median',
        unit: 'days',
      },
      {
        field: 'updatedIssuesCount',
        title:
          'metrics_models:community_service_and_support.metrics.updated_issues_count',
      },
    ],
  },
  {
    key: 'metricActivity',
    topic: 'collaboration',
    title: 'metrics_models:community_activity.title',
    metrics: [
      {
        field: 'activityScore',
        title: 'metrics_models:community_activity.title',
        qualifier: 'metrics_models:community_activity.title',
        unit: 'score',
      },
      {
        field: 'codeReviewCount',
        title: 'metrics_models:community_activity.metrics.code_review_count',
        qualifier:
          'metrics_models:community_activity.metrics.code_review_count',
      },
      {
        field: 'commentFrequency',
        title: 'metrics_models:community_activity.metrics.comment_frequency',
        qualifier:
          'metrics_models:community_activity.metrics.comment_frequency',
      },
      {
        field: 'commitFrequency',
        title: 'metrics_models:community_activity.metrics.commit_frequency',
        qualifier: 'metrics_models:community_activity.metrics.commit_frequency',
      },
      {
        field: 'contributorCount',
        title: 'metrics_models:community_activity.metrics.contributor_count',
        qualifier:
          'metrics_models:community_activity.metrics.contributor_count',
      },
      {
        field: 'orgCount',
        title: 'metrics_models:community_activity.metrics.organization_count',
        qualifier:
          'metrics_models:community_activity.metrics.organization_count',
      },
      {
        field: 'recentReleasesCount',
        title:
          'metrics_models:community_activity.metrics.recent_releases_count',
        qualifier:
          'metrics_models:community_activity.metrics.recent_releases_count',
      },
      {
        field: 'updatedIssuesCount',
        title: 'metrics_models:community_activity.metrics.updated_issues_count',
        qualifier:
          'metrics_models:community_activity.metrics.updated_issues_count',
      },
      {
        field: 'updatedSince',
        title: 'metrics_models:community_activity.metrics.updated_since',
        qualifier: 'metrics_models:community_activity.metrics.updated_since',
        unit: 'days',
        factor: 30,
      },
    ],
  },
  {
    key: 'metricGroupActivity',
    topic: 'collaboration',
    title: 'metrics_models:organization_activity.title',
    metrics: [
      {
        field: 'organizationsActivity',
        title: 'metrics_models:organization_activity.title',
        qualifier: 'metrics_models:organizations_activity.title',
        unit: 'score',
      },
      {
        field: 'commitFrequency',
        title: 'metrics_models:organization_activity.metrics.commit_frequency',
        qualifier:
          'metrics_models:organization_activity.metrics.commit_frequency',
      },
      {
        field: 'contributionLast',
        title: 'metrics_models:organization_activity.metrics.contribution_last',
      },
      {
        field: 'contributorCount',
        title: 'metrics_models:organization_activity.metrics.contributor_count',
        qualifier:
          'metrics_models:organization_activity.metrics.contributor_count',
      },
      {
        field: 'orgCount',
        title: 'metrics_models:organization_activity.metrics.org_count',
      },
    ],
  },
  {
    key: 'metricMilestonePersona',
    topic: 'contributor',
    title: 'metrics_models:contributor_milestone_persona.title',
    metrics: [
      {
        field: 'milestonePersonaScore',
        title: 'metrics_models:contributor_milestone_persona.title',
        unit: 'score',
      },
      {
        field: 'activityCasualContributionPerPerson',
        title:
          'metrics_models:contributor_milestone_persona.metrics.activity_casual_contribution_per_person',
      },
      {
        field: 'activityCasualContributorCount',
        title:
          'metrics_models:contributor_milestone_persona.metrics.activity_casual_contributor_count',
      },
      {
        field: 'activityCoreContributionPerPerson',
        title:
          'metrics_models:contributor_milestone_persona.metrics.activity_core_contribution_per_person',
      },
      {
        field: 'activityCoreContributorCount',
        title:
          'metrics_models:contributor_milestone_persona.metrics.activity_core_contributor_count',
      },
      {
        field: 'activityRegularContributionPerPerson',
        title:
          'metrics_models:contributor_milestone_persona.metrics.activity_regular_contribution_per_person',
      },
      {
        field: 'activityRegularContributorCount',
        title:
          'metrics_models:contributor_milestone_persona.metrics.activity_regular_contributor_count',
      },
    ],
  },
  {
    key: 'metricRolePersona',
    topic: 'contributor',
    title: 'metrics_models:contributor_role_persona.title',
    metrics: [
      {
        field: 'rolePersonaScore',
        title: 'metrics_models:contributor_role_persona.title',
        unit: 'score',
      },
      {
        field: 'activityIndividualContributionPerPerson',
        title:
          'metrics_models:contributor_role_persona.metrics.activity_individual_contribution_per_person',
      },
      {
        field: 'activityIndividualContributorCount',
        title:
          'metrics_models:contributor_role_persona.metrics.activity_individual_contributor_count',
      },
      {
        field: 'activityOrganizationContributionPerPerson',
        title:
          'metrics_models:contributor_role_persona.metrics.activity_organization_contribution_per_person',
      },
      {
        field: 'activityOrganizationContributorCount',
        title:
          'metrics_models:contributor_role_persona.metrics.activity_organization_contributor_count',
      },
    ],
  },
  {
    key: 'metricDomainPersona',
    topic: 'contributor',
    title: 'metrics_models:contributor_domain_persona.title',
    metrics: [
      {
        field: 'domainPersonaScore',
        title: 'metrics_models:contributor_domain_persona.title',
        unit: 'score',
      },
      {
        field: 'activityCodeContributionPerPerson',
        title:
          'metrics_models:contributor_domain_persona.metrics.activity_code_contribution_per_person',
      },
      {
        field: 'activityCodeContributorCount',
        title:
          'metrics_models:contributor_domain_persona.metrics.activity_code_contributor_count',
      },
      {
        field: 'activityIssueContributionPerPerson',
        title:
          'metrics_models:contributor_domain_persona.metrics.activity_issue_contribution_per_person',
      },
      {
        field: 'activityIssueContributorCount',
        title:
          'metrics_models:contributor_domain_persona.metrics.activity_issue_contributor_count',
      },
      {
        field: 'activityObservationContributionPerPerson',
        title:
          'metrics_models:contributor_domain_persona.metrics.activity_observation_contribution_per_person',
      },
      {
        field: 'activityObservationContributorCount',
        title:
          'metrics_models:contributor_domain_persona.metrics.activity_observation_contributor_count',
      },
    ],
  },
];
