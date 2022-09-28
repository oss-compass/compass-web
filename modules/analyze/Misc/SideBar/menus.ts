// be used to marking charts id
export enum CodeQuality {
  Overview = 'code_quality_overview',
  ContributorCount = 'code_quality_contributor_count',
  CommitFrequency = 'code_quality_commit_frequency',
  IsMaintained = 'code_quality_is_maintained',
  PRIssueLinked = 'code_quality_pr_issue_linked',
  CodeReview = 'code_quality_code_review',
  CodeMerge = 'code_quality_code_merge',
  LocFrequency = 'code_quality_loc_frequency',
}

export enum CommunitySupport {
  Overview = 'community_support_overview',
  IssueFirstResponse = 'community_support_issue_first_response',
  IssueOpenTime = 'community_support_issue_open_time',
  IssueCommentFrequency = 'community_support_issue_comment_frequency',
  UpdatedIssuesCount = 'community_support_updated_issues_count',
  PrOpenTime = 'community_support_pr_open_time',
  CodeReviewCount = 'community_support_code_review_count',
  ClosedPrsCount = 'community_support_closed_prs_count',
}

export enum CommunityActivity {
  Overview = 'community_activity_overview',
  ContributorCount = 'community_activity_contributor_count',
  CommitFrequency = 'community_activity_commit_frequency',
  CodeReviewCount = 'community_activity_code_review_count',
  CreatedSince = 'community_activity_created_since',
  UpdatedSince = 'community_activity_updated_since',
  CommentFrequency = 'community_activity_comment_frequency',
}

const SideBarConfig = [
  {
    name: 'Code Quality ',
    groups: [
      { name: 'Overview', id: CodeQuality.Overview },
      { name: 'Contributors', id: CodeQuality.ContributorCount },
      { name: 'Commit frequency', id: CodeQuality.CommitFrequency },
      { name: 'Is Maintained', id: CodeQuality.IsMaintained },
      { name: 'PR Issue Linked', id: CodeQuality.PRIssueLinked },
      { name: 'Code review', id: CodeQuality.CodeReview },
      { name: 'Code merge', id: CodeQuality.CodeMerge },
      { name: 'Loc frequency', id: CodeQuality.LocFrequency },
    ],
  },
  {
    name: 'Community Service and Support',
    groups: [
      { name: 'Overview', id: CommunitySupport.Overview },
      { name: 'Issue first response', id: CommunitySupport.IssueFirstResponse },
      { name: 'Issue open time', id: CommunitySupport.IssueOpenTime },
      {
        name: 'Issue comment count',
        id: CommunitySupport.IssueCommentFrequency,
      },
      { name: 'Updated issues count', id: CommunitySupport.UpdatedIssuesCount },
      { name: 'PR open time', id: CommunitySupport.PrOpenTime },
      { name: 'Code review count', id: CommunitySupport.CodeReviewCount },
      { name: 'Closed PR count', id: CommunitySupport.ClosedPrsCount },
    ],
  },
  {
    name: 'Community Activity ',
    groups: [
      { name: 'Overview', id: CommunityActivity.Overview },
      { name: 'Contributor Count', id: CommunityActivity.ContributorCount },
      { name: 'Commit Frequency', id: CommunityActivity.CommitFrequency },
      { name: 'Code Review Count', id: CommunityActivity.CodeReviewCount },
      { name: 'Created Since', id: CommunityActivity.CreatedSince },
      { name: 'Updated Since', id: CommunityActivity.UpdatedSince },
      { name: 'Comment Frequency', id: CommunityActivity.CommentFrequency },
    ],
  },
];

export default SideBarConfig;
