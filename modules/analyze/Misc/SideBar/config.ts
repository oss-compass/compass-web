import Productivity from '@modules/analyze/Misc/SideBar/TopicProductivity';
import Robustness from '@modules/analyze/Misc/SideBar/TopicRobustness';
import NicheCreation from '@modules/analyze/Misc/SideBar/TopicNicheCreation';

export enum CodeQuality {
  Overview = 'code_quality_overview',
  ContributorCount = 'code_quality_contributor_count',
  CommitFrequency = 'code_quality_commit_frequency',
  IsMaintained = 'code_quality_is_maintained',
  PRIssueLinkedRatio = 'code_quality_pr_issue_linked_ratio',
  CodeReviewRatio = 'code_quality_code_review_ratio',
  CodeMergeRatio = 'code_quality_code_merge_ratio',
  LocFrequency = 'code_quality_loc_frequency',
}

export enum Support {
  Overview = 'support_overview',
  IssueFirstResponse = 'support_issue_first_response',
  BugIssueOpenTime = 'support_issue_open_time',
  IssueCommentFrequency = 'support_issue_comment_frequency',
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

export const CodeQualityGuarantee = {
  name: 'Code Quality Guarantee',
  id: 'code_quality_guarantee',
  groups: [
    // { name: 'Overview', id: CodeQuality.Overview },
    { name: 'Contributors', id: CodeQuality.ContributorCount },
    { name: 'Commit frequency', id: CodeQuality.CommitFrequency },
    { name: 'Is maintained', id: CodeQuality.IsMaintained },
    { name: 'PR issue linked ratio', id: CodeQuality.PRIssueLinkedRatio },
    { name: 'Code review ratio', id: CodeQuality.CodeReviewRatio },
    { name: 'Code merge ratio', id: CodeQuality.CodeMergeRatio },
    { name: 'Loc frequency', id: CodeQuality.LocFrequency },
  ],
};

export const CommunityServiceAndSupport = {
  name: 'Community Service and Support',
  id: 'community_service_support',
  groups: [
    // { name: 'Overview', id: Support.Overview },
    { name: 'Issue first response', id: Support.IssueFirstResponse },
    { name: 'Bug issue open time', id: Support.BugIssueOpenTime },
    { name: 'PR open time', id: Support.PrOpenTime },
    { name: 'Updated issues count', id: Support.UpdatedIssuesCount },
    { name: 'Closed PR count', id: Support.ClosedPrsCount },
    { name: 'Comment frequency', id: Support.IssueCommentFrequency },
    { name: 'Code review count', id: Support.CodeReviewCount },
  ],
};

export const CommunityActivity = {
  name: 'Community Activity ',
  id: 'community_activity',
  groups: [
    // { name: 'Overview', id: Activity.Overview },
    { name: 'Contributor count', id: Activity.ContributorCount },
    { name: 'Commit frequency', id: Activity.CommitFrequency },
    { name: 'Updated since', id: Activity.UpdatedSince },
    // { name: 'Org count', id: Activity.OrgCount },
    { name: 'Created since', id: Activity.CreatedSince },
    { name: 'Comment frequency', id: Activity.CommentFrequency },
    { name: 'Code review count', id: Activity.CodeReviewCount },
    { name: 'Updated issues count', id: Activity.UpdatedIssuesCount },
    { name: 'Recent releases count', id: Activity.RecentReleasesCount },
  ],
};
