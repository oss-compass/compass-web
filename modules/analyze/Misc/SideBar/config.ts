export enum CodeQuality {
  Overview = 'code_quality_overview',
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

export enum Topic {
  Overview = 'topic_overview',
  Productivity = 'topic_productivity',
  Robustness = 'topic_robustness',
  NicheCreation = 'topic_niche_creation',
}

export enum Section {
  CodeQualityGuarantee = 'code_quality_guarantee',
  CommunityServiceAndSupport = 'community_service_support',
  CommunityActivity = 'community_activity',
}

export const CodeQualityGuarantee = {
  topic: Topic.Productivity,
  name: 'Code Quality Guarantee',
  // id: 'code_quality_guarantee',
  id: CodeQuality.Overview,
  groups: [
    // { name: 'Overview', id: CodeQuality.Overview },
    { name: 'Contributor Count', id: CodeQuality.ContributorCount },
    { name: 'Commit Frequency', id: CodeQuality.CommitFrequency },
    { name: 'Is Maintained', id: CodeQuality.IsMaintained },
    { name: 'Commit PR Linked Ratio', id: CodeQuality.CommitPRLinkedRatio },
    { name: 'PR Issue Linked Ratio', id: CodeQuality.PRIssueLinkedRatio },
    { name: 'Code Review Ratio', id: CodeQuality.CodeReviewRatio },
    { name: 'Code Merge Ratio', id: CodeQuality.CodeMergeRatio },
    { name: 'Lines of Code Frequency', id: CodeQuality.LocFrequency },
  ],
};

export const CommunityServiceAndSupport = {
  topic: Topic.Productivity,
  name: 'Community Service and Support',
  // id: 'community_service_support',
  id: Support.Overview,
  groups: [
    // { name: 'Overview', id: Support.Overview },
    { name: 'Updated Issues Count', id: Support.UpdatedIssuesCount },
    { name: 'Close PR Count', id: Support.ClosedPrsCount },
    { name: 'Issue First Response', id: Support.IssueFirstResponse },
    { name: 'Bug Issue Open Time', id: Support.BugIssueOpenTime },
    { name: 'PR Open Time', id: Support.PrOpenTime },
    { name: 'Comment Frequency', id: Support.CommentFrequency },
    { name: 'Code Review Count', id: Support.CodeReviewCount },
  ],
};

export const CommunityActivity = {
  topic: Topic.Robustness,
  name: 'Community Activity ',
  // id: 'community_activity',
  id: Activity.Overview,
  groups: [
    // { name: 'Overview', id: Activity.Overview },
    { name: 'Contributor Count', id: Activity.ContributorCount },
    { name: 'Commit Frequency', id: Activity.CommitFrequency },
    { name: 'Updated Since', id: Activity.UpdatedSince },
    // { name: 'Organization Count', id: Activity.OrgCount },
    { name: 'Created Since', id: Activity.CreatedSince },
    { name: 'Comment Frequency', id: Activity.CommentFrequency },
    { name: 'Code Review Count', id: Activity.CodeReviewCount },
    { name: 'Updated Issues Count', id: Activity.UpdatedIssuesCount },
    { name: 'Recent Releases Count', id: Activity.RecentReleasesCount },
  ],
};
