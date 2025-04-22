import { useTranslation } from 'next-i18next';

export enum CollaborationDevelopment {
  Overview = 'collaboration_development_index_overview',
  ContributorCount = 'code_quality_contributor_count',
  CommitFrequency = 'code_quality_commit_frequency',
  IsMaintained = 'code_quality_is_maintained',
  CommitPRLinkedRatio = 'code_quality_commit_pr_linked_ratio',
  PRIssueLinkedRatio = 'code_quality_pr_issue_linked_ratio',
  CodeReviewRatio = 'code_quality_code_review_ratio',
  CodeMergeRatio = 'code_quality_code_merge_ratio',
  LocFrequency = 'code_quality_loc_frequency',
}

export enum Support {
  Overview = 'support_overview',
  IssueFirstResponse = 'support_issue_first_response',
  BugIssueOpenTime = 'support_issue_open_time',
  CommentFrequency = 'support_comment_frequency',
  UpdatedIssuesCount = 'support_updated_issues_count',
  PrOpenTime = 'support_pr_open_time',
  CodeReviewCount = 'support_code_review_count',
  ClosedPrsCount = 'support_closed_prs_count',
}

export enum Activity {
  Overview = 'activity_overview',
  ContributorCount = 'activity_contributor_count',
  CommitFrequency = 'activity_commit_frequency',
  UpdatedSince = 'activity_updated_since',
  OrgCount = 'activity_org_count',
  CreatedSince = 'activity_created_since',
  CommentFrequency = 'activity_comment_frequency',
  CodeReviewCount = 'activity_code_review_count',
  UpdatedIssuesCount = 'activity_updated_issues_count',
  RecentReleasesCount = 'activity_recent_releases_count',
}

export enum Organizations {
  Overview = 'organizations_activity_overview',
  ContributorCount = 'organizations_activity_contributor_count',
  CommitFrequency = 'organizations_activity_commit_frequency',
  OrgCount = 'organizations_activity_org_count',
  ContributionLast = 'organizations_activity_contribution_last',
  // MaintainerCount = "MaintainerCount",
  // MeetingFrequency= 'MeetingFrequency',
  // MeetingAttendeeCount = "MeetingAttendeeCount"
}
export enum ContributorMilestonePersona {
  Overview = 'milestone_persona_overview',
  ActivityCasualCount = 'activity_casual_contributor_count',
  ActivityCasualContribution = 'activity_casual_contribution_per_person',
  ActivityRegularCount = 'activity_regular_contributor_count',
  ActivityRegularContribution = 'activity_regular_contribution_per_person',
  ActivityCoreCount = 'activity_core_contributor_count',
  ActivityCoreContribution = 'activity_core_contribution_per_person',
}
export enum ContributorRolePersona {
  Overview = 'role_persona_overview',
  ActivityOrganizationCount = 'activity_organization_contributor_count',
  ActivityOrganizationContribution = 'activity_organization_contribution_per_person',
  ActivityIndividualCount = 'activity_individual_contributor_count',
  ActivityIndividualContribution = 'activity_individual_contribution_per_person',
}
export enum ContributorDomainPersona {
  Overview = 'domain_persona_overview',
  ActivityObservationCount = 'activity_observation_contributor_count',
  ActivityObservationContribution = 'activity_observation_contribution_per_person',
  ActivityCodeCount = 'activity_code_contributor_count',
  ActivityCodeContribution = 'activity_code_contribution_per_person',
  ActivityIssueCount = 'activity_issue_contributor_count',
  ActivityIssueContribution = 'activity_issue_contribution_per_person',
}

export enum Topic {
  Overview = 'topic_overview',
  Productivity = 'topic_productivity',
  Robustness = 'topic_robustness',
  NicheCreation = 'topic_niche_creation',
}

export enum Section {
  CollaborationDevelopmentIndex = 'collaboration_development_index',
  CommunityServiceAndSupport = 'community_service_support',
  CommunityActivity = 'community_activity',
  OrganizationsActivity = 'organizations_activity',
  ContributorMilestonePersona = 'contributor_milestone_persona',
  ContributorDomainPersona = 'contributor_domain_persona',
  ContributorRolePersona = 'contributor_role_persona',
}

export const useCollaborationDevelopmentIndex = () => {
  const { t } = useTranslation();
  return {
    topic: Topic.Productivity,
    name: t('metrics_models:collaboration_development_index.title'),
    id: CollaborationDevelopment.Overview,
    groups: [
      // { name: 'Overview', id: CodeQuality.Overview },
      {
        name: t(
          'metrics_models:collaboration_development_index.metrics.contributor_count'
        ),
        id: CollaborationDevelopment.ContributorCount,
      },
      {
        name: t(
          'metrics_models:collaboration_development_index.metrics.commit_frequency'
        ),
        id: CollaborationDevelopment.CommitFrequency,
      },
      {
        name: t(
          'metrics_models:collaboration_development_index.metrics.is_maintained'
        ),
        id: CollaborationDevelopment.IsMaintained,
      },
      {
        name: t(
          'metrics_models:collaboration_development_index.metrics.commit_pr_linked_ratio'
        ),
        id: CollaborationDevelopment.CommitPRLinkedRatio,
      },
      {
        name: t(
          'metrics_models:collaboration_development_index.metrics.pr_issue_linked_ratio'
        ),
        id: CollaborationDevelopment.PRIssueLinkedRatio,
      },
      {
        name: t(
          'metrics_models:collaboration_development_index.metrics.code_review_ratio'
        ),
        id: CollaborationDevelopment.CodeReviewRatio,
      },
      {
        name: t(
          'metrics_models:collaboration_development_index.metrics.code_merge_ratio'
        ),
        id: CollaborationDevelopment.CodeMergeRatio,
      },
      {
        name: t(
          'metrics_models:collaboration_development_index.metrics.lines_of_code_frequency'
        ),
        id: CollaborationDevelopment.LocFrequency,
      },
    ],
  };
};

export const useCommunityServiceAndSupport = () => {
  const { t } = useTranslation();
  return {
    topic: Topic.Productivity,
    name: t('metrics_models:community_service_and_support.title'),
    id: Support.Overview,
    groups: [
      // { name: 'Overview', id: Support.Overview },
      {
        name: t(
          'metrics_models:community_service_and_support.metrics.updated_issues_count'
        ),
        id: Support.UpdatedIssuesCount,
      },
      {
        name: t(
          'metrics_models:community_service_and_support.metrics.close_pr_count'
        ),
        id: Support.ClosedPrsCount,
      },
      {
        name: t(
          'metrics_models:community_service_and_support.metrics.issue_first_response'
        ),
        id: Support.IssueFirstResponse,
      },
      {
        name: t(
          'metrics_models:community_service_and_support.metrics.bug_issue_open_time'
        ),
        id: Support.BugIssueOpenTime,
      },
      {
        name: t(
          'metrics_models:community_service_and_support.metrics.pr_open_time'
        ),
        id: Support.PrOpenTime,
      },
      {
        name: t(
          'metrics_models:community_service_and_support.metrics.comment_frequency'
        ),
        id: Support.CommentFrequency,
      },
      {
        name: t(
          'metrics_models:community_service_and_support.metrics.code_review_count'
        ),
        id: Support.CodeReviewCount,
      },
    ],
  };
};

export const useCommunityActivity = () => {
  const { t } = useTranslation();
  return {
    topic: Topic.Robustness,
    name: t('metrics_models:community_activity.title'),
    id: Activity.Overview,
    groups: [
      // { name: 'Overview', id: Activity.Overview },
      {
        name: t('metrics_models:community_activity.metrics.contributor_count'),
        id: Activity.ContributorCount,
      },
      {
        name: t('metrics_models:community_activity.metrics.commit_frequency'),
        id: Activity.CommitFrequency,
      },
      {
        name: t('metrics_models:community_activity.metrics.updated_since'),
        id: Activity.UpdatedSince,
      },
      {
        name: t('metrics_models:community_activity.metrics.organization_count'),
        id: Activity.OrgCount,
      },
      // {
      //   name: t('metrics_models:community_activity.metrics.created_since'),
      //   id: Activity.CreatedSince,
      // },
      {
        name: t('metrics_models:community_activity.metrics.comment_frequency'),
        id: Activity.CommentFrequency,
      },
      {
        name: t('metrics_models:community_activity.metrics.code_review_count'),
        id: Activity.CodeReviewCount,
      },
      {
        name: t(
          'metrics_models:community_activity.metrics.updated_issues_count'
        ),
        id: Activity.UpdatedIssuesCount,
      },
      {
        name: t(
          'metrics_models:community_activity.metrics.recent_releases_count'
        ),
        id: Activity.RecentReleasesCount,
      },
    ],
  };
};

export const useOrganizationsActivity = () => {
  const { t } = useTranslation();
  return {
    topic: Topic.NicheCreation,
    name: t('metrics_models:organization_activity.title'),
    id: Organizations.Overview,
    groups: [
      {
        name: t(
          'metrics_models:organization_activity.metrics.contributor_count'
        ),
        id: Organizations.ContributorCount,
      },
      {
        name: t(
          'metrics_models:organization_activity.metrics.commit_frequency'
        ),
        id: Organizations.CommitFrequency,
      },
      {
        name: t('metrics_models:organization_activity.metrics.org_count'),
        id: Organizations.OrgCount,
      },
      {
        name: t(
          'metrics_models:organization_activity.metrics.contribution_last'
        ),
        id: Organizations.ContributionLast,
      },
      // { name: 'Maintainer Count', id: Organizations.MaintainerCount },
      // { name: 'MeetingFrequency', id: Organizations.MeetingFrequency },
      // { name: 'Meeting Attendee Count', id: Organizations.MeetingAttendeeCount },
    ],
  };
};
export const useContributorMilestonePersona = () => {
  const { t } = useTranslation();
  return {
    topic: Topic.Productivity,
    name: t('metrics_models:contributor_milestone_persona.title'),
    id: ContributorMilestonePersona.Overview,
    groups: [
      {
        name: t(
          'metrics_models:contributor_milestone_persona.metrics.activity_core_contributor_count'
        ),
        id: ContributorMilestonePersona.ActivityCoreCount,
      },
      {
        name: t(
          'metrics_models:contributor_milestone_persona.metrics.activity_core_contribution_per_person'
        ),
        id: ContributorMilestonePersona.ActivityCoreContribution,
      },
      {
        name: t(
          'metrics_models:contributor_milestone_persona.metrics.activity_regular_contributor_count'
        ),
        id: ContributorMilestonePersona.ActivityRegularCount,
      },
      {
        name: t(
          'metrics_models:contributor_milestone_persona.metrics.activity_regular_contribution_per_person'
        ),
        id: ContributorMilestonePersona.ActivityRegularContribution,
      },
      {
        name: t(
          'metrics_models:contributor_milestone_persona.metrics.activity_casual_contributor_count'
        ),
        id: ContributorMilestonePersona.ActivityCasualCount,
      },
      {
        name: t(
          'metrics_models:contributor_milestone_persona.metrics.activity_casual_contribution_per_person'
        ),
        id: ContributorMilestonePersona.ActivityCasualContribution,
      },
    ],
  };
};
export const useContributorRolePersona = () => {
  const { t } = useTranslation();
  return {
    topic: Topic.Productivity,
    name: t('metrics_models:contributor_role_persona.title'),
    id: ContributorRolePersona.Overview,
    groups: [
      {
        name: t(
          'metrics_models:contributor_role_persona.metrics.activity_organization_contributor_count'
        ),
        id: ContributorRolePersona.ActivityOrganizationCount,
      },
      {
        name: t(
          'metrics_models:contributor_role_persona.metrics.activity_organization_contribution_per_person'
        ),
        id: ContributorRolePersona.ActivityOrganizationContribution,
      },
      {
        name: t(
          'metrics_models:contributor_role_persona.metrics.activity_individual_contributor_count'
        ),
        id: ContributorRolePersona.ActivityIndividualCount,
      },
      {
        name: t(
          'metrics_models:contributor_role_persona.metrics.activity_individual_contribution_per_person'
        ),
        id: ContributorRolePersona.ActivityIndividualContribution,
      },
    ],
  };
};

export const useContributorDomainPersona = () => {
  const { t } = useTranslation();
  return {
    topic: Topic.Productivity,
    name: t('metrics_models:contributor_domain_persona.title'),
    id: ContributorDomainPersona.Overview,
    groups: [
      {
        name: t(
          'metrics_models:contributor_domain_persona.metrics.activity_code_contributor_count'
        ),
        id: ContributorDomainPersona.ActivityCodeCount,
      },
      {
        name: t(
          'metrics_models:contributor_domain_persona.metrics.activity_code_contribution_per_person'
        ),
        id: ContributorDomainPersona.ActivityCodeContribution,
      },
      {
        name: t(
          'metrics_models:contributor_domain_persona.metrics.activity_issue_contributor_count'
        ),
        id: ContributorDomainPersona.ActivityIssueCount,
      },
      {
        name: t(
          'metrics_models:contributor_domain_persona.metrics.activity_issue_contribution_per_person'
        ),
        id: ContributorDomainPersona.ActivityIssueContribution,
      },
      {
        name: t(
          'metrics_models:contributor_domain_persona.metrics.activity_observation_contributor_count'
        ),
        id: ContributorDomainPersona.ActivityObservationCount,
      },
      {
        name: t(
          'metrics_models:contributor_domain_persona.metrics.activity_observation_contribution_per_person'
        ),
        id: ContributorDomainPersona.ActivityObservationContribution,
      },
    ],
  };
};
