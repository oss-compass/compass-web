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
