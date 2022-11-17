export type PopContent = {
  title: string;
  content: string;
  hash: string;
};
export type PlantList = {
  top: number;
  left: number;
  size: number;
  color: 'productivity' | 'robustness' | 'nicheCreation';
  bottom?: boolean;
  right?: boolean;
  popContent: PopContent;
};

export const plantList: PlantList[] = [
  {
    top: -107,
    left: -427,
    size: 78,
    color: 'productivity',
    popContent: {
      title: 'Contributor Count',
      content:
        'Determine how many active pr creators, code reviewers, commit authors there are in the past 90 days.',
      hash: '/docs/metrics-models/productivity/code-quality-guarantee#contributor-count',
    },
  },
  {
    top: 102,
    left: -232,
    size: 78,
    color: 'productivity',
    popContent: {
      title: 'Commit Frequency',
      content:
        'Determine the average number of commits per week in the past 90 days.',
      hash: '/docs/metrics-models/productivity/code-quality-guarantee#commit-frequency',
    },
  },
  {
    top: 91,
    left: -325,
    size: 70,
    color: 'productivity',
    popContent: {
      title: 'Is Maintained',
      content:
        'Percentage of weeks with at least one code commit in the past 90 days(single repository). Percentage of code repositories with at least one code commit in the last 30 days(multiple repositories).',
      hash: '/docs/metrics-models/productivity/code-quality-guarantee#is-maintained',
    },
  },
  {
    top: 127,
    left: -394,
    size: 66,
    color: 'productivity',
    popContent: {
      title: 'Commit PR Linked Ratio',
      content:
        'Determine the percentage of new code commit link pull request in the last 90 days.',
      hash: '/docs/metrics-models/productivity/code-quality-guarantee#contributor-count',
    },
  },
  {
    top: 24,
    left: -196,
    size: 62,
    color: 'productivity',
    popContent: {
      title: 'PR Issue Linked Ratio',
      content:
        'Determine the percentage of new pull request link issues in the last 90 days.',
      hash: '/docs/metrics-models/productivity/code-quality-guarantee#pr-issue-linked-ratio',
    },
  },
  {
    top: 42,
    left: -120,
    size: 62,
    color: 'productivity',
    popContent: {
      title: 'Code Review Ratio',
      content:
        'Determine the percentage of code commits with at least one reviewer (not PR creator) in the last 90 days.',
      hash: '/docs/metrics-models/productivity/code-quality-guarantee#code-review-ratio',
    },
  },
  {
    top: -103,
    left: -160,
    size: 60,
    color: 'productivity',
    popContent: {
      title: 'Code Merge Ratio',
      content:
        'Determine the percentage of PR Mergers and PR authors who are not the same person in the last 90 days of commits.',
      hash: '/docs/metrics-models/productivity/code-quality-guarantee#code-merge-ratio',
    },
  },
  {
    top: -196,
    left: -492,
    size: 60,
    color: 'productivity',
    popContent: {
      title: 'Lines of Code Frequency',
      content:
        'Determine the average number of lines touched (lines added plus lines removed) per week in the past 90 days.',
      hash: '/docs/metrics-models/productivity/code-quality-guarantee#lines-of-code-frequency',
    },
  },
  {
    top: -42,
    left: -611,
    size: 54,
    color: 'productivity',
    popContent: {
      title: 'Updated Issues Count',
      content: 'Determine the number of issues updated in the last 90 days.',
      hash: '/docs/metrics-models/productivity/niche-creation#updated-issues-count',
    },
  },
  {
    top: 206,
    left: -109,
    size: 50,
    color: 'productivity',
    popContent: {
      title: 'Close PR Count',
      content: 'The number of PR accepted and declined in the last 90 days.',
      hash: '/docs/metrics-models/productivity/niche-creation#close-pr-count',
    },
  },
  {
    top: 329,
    left: -349,
    size: 48,
    color: 'productivity',
    bottom: true,
    popContent: {
      title: 'Issue First Response',
      content:
        "Average/Median first comments response (in days) for new issues created in the last 90 days. This excludes bot responses, the creator's own comment, or an action assigned by the issue. If the issue has been unanswered, the first response time is not counted.",
      hash: '/docs/metrics-models/productivity/niche-creation#issue-first-response',
    },
  },
  {
    top: 285,
    left: -17,
    size: 38,
    color: 'productivity',
    bottom: true,
    popContent: {
      title: 'Bug Issue Open Time',
      content:
        'Average/Median time (days) that bug issues have been opened for issues created in the last 90 days.',
      hash: '/docs/metrics-models/productivity/niche-creation#bug-issue-open-time',
    },
  },
  {
    top: 88,
    left: -503,
    size: 36,
    color: 'productivity',
    bottom: true,
    popContent: {
      title: 'PR Open Time',
      content:
        'Average/Median processing time (days) for new change requests created in the last 90 days, including closed/accepted change requests and unresolved change requests.',
      hash: '/docs/metrics-models/productivity/niche-creation#pr-open-time',
    },
  },
  {
    top: -189,
    left: -370,
    size: 34,
    color: 'productivity',
    popContent: {
      title: 'Comment Frequency',
      content:
        'Determine the average number of comments per issue created in the last 90 days.',
      hash: '/docs/metrics-models/productivity/niche-creation#comment-frequency',
    },
  },
  {
    top: 8,
    left: -159,
    size: 24,
    color: 'productivity',
    popContent: {
      title: 'Code Review Count',
      content:
        'Determine the average number of review comments per pull request created in the last 90 days.',
      hash: '/docs/metrics-models/productivity/niche-creation#code-review-count',
    },
  },

  {
    top: -213,
    left: 73,
    size: 66,
    color: 'robustness',
    popContent: {
      title: 'Contributor Count',
      content:
        'Determine how many active code commit authors, pr authors, review participants, issue authors, and issue comments participants there are in the past 90 days.',
      hash: '/docs/metrics-models/robustness/activity#contributor-count',
    },
  },
  {
    top: -250,
    left: -267,
    size: 64,
    color: 'robustness',
    popContent: {
      title: 'Commit Frequency',
      content:
        'Determine the average number of commits per week in the past 90 days.',
      hash: '/docs/metrics-models/robustness/activity#commit-frequency',
    },
  },
  {
    top: -132,
    left: 98,
    size: 58,
    color: 'robustness',
    popContent: {
      title: 'Updated Since',
      content:
        'Determine the average time per repository since the repository was last updated (in months).',
      hash: '/docs/metrics-models/robustness/activity#updated-since',
    },
  },
  {
    top: -176,
    left: -254,
    size: 48,
    color: 'robustness',
    popContent: {
      title: 'Organization Count',
      content:
        'Number of organizations to which active code contributors belong in the past 90 days.',
      hash: '/docs/metrics-models/robustness/activity#organization-count',
    },
  },
  {
    top: -407,
    left: 470,
    size: 58,
    color: 'robustness',
    right: true,
    popContent: {
      title: 'Created Since',
      content:
        'Determine how long a repository has existed since it was created (in months).',
      hash: '/docs/metrics-models/robustness/activity#created-since',
    },
  },
  {
    top: -395,
    left: 262,
    size: 46,
    color: 'robustness',
    popContent: {
      title: 'Comment Frequency',
      content:
        'Determine the average number of comments per issue created in the last 90 days.',
      hash: '/docs/metrics-models/robustness/activity#comment-frequency',
    },
  },
  {
    top: -381,
    left: 7,
    size: 46,
    color: 'robustness',
    popContent: {
      title: 'Code Review Count',
      content:
        'Determine the average number of review comments per pull request created in the last 90 days.',
      hash: '/docs/metrics-models/robustness/activity#code-review-count',
    },
  },
  {
    top: -427,
    left: -200,
    size: 46,
    color: 'robustness',
    popContent: {
      title: 'Updated Issues Count',
      content: 'Determine the number of issues updated in the last 90 days.',
      hash: '/docs/metrics-models/robustness/activity#updated-issues-count',
    },
  },
  {
    top: -390,
    left: -402,
    size: 46,
    color: 'robustness',
    popContent: {
      title: 'Recent Releases Count',
      content: 'Determine the number of releases in the last year.',
      hash: '/docs/metrics-models/robustness/activity#recent-releases-count',
    },
  },
  {
    top: -291,
    left: -141,
    size: 44,
    color: 'robustness',
    popContent: {
      title: 'Maintainer Count',
      content: 'Determine the average number of maintainers per repository.',
      hash: '/docs/metrics-models/robustness/activity#maintainer-count',
    },
  },
  {
    top: -224,
    left: 318,
    size: 40,
    color: 'robustness',
    popContent: {
      title: 'Meeting Count',
      content: 'Determine the number of meetings held in the last 90 days.',
      hash: '/docs/metrics-models/robustness/activity#meeting-count',
    },
  },
  {
    top: -270,
    left: -326,
    size: 31,
    color: 'robustness',
    popContent: {
      title: 'Meeting Attendee Count',
      content:
        'Determine the average number of attendees per meeting in the last 90 days.',
      hash: '/docs/metrics-models/robustness/activity#meeting-attendee-count',
    },
  },
  {
    top: -189,
    left: -101,
    size: 29,
    color: 'robustness',
    popContent: {
      title: 'Closed Issues Count',
      content: 'Determine the number of issues closed in the last 90 days.',
      hash: '/docs/metrics-models/robustness/activity#closed-issues-count',
    },
  },

  {
    top: 3,
    left: 410,
    size: 71,
    color: 'nicheCreation',
    popContent: {
      title: 'Org Count',
      content:
        'Number of organizations to which active code contributors belong in the past 90 days.',
      hash: '/docs/metrics-models/niche-creation/developer-retention#org-count',
    },
  },
  {
    top: 11,
    left: 147,
    size: 66,
    color: 'nicheCreation',
    popContent: {
      title: 'Contributor Count',
      content:
        'Number of active code contributors with organization affiliation in the past 90 days.',
      hash: '/docs/metrics-models/niche-creation/developer-retention#contributor-count',
    },
  },
  {
    top: -149,
    left: 332,
    size: 64,
    color: 'nicheCreation',
    popContent: {
      title: 'Commit Frequency',
      content:
        'Definition: Determine the average number of commits with organization affiliation per week in the past 90 days.',
      hash: '/docs/metrics-models/niche-creation/developer-retention#commit-frequency',
    },
  },
  {
    top: 330,
    left: 161,
    size: 64,
    color: 'nicheCreation',
    bottom: true,
    popContent: {
      title: 'Contribution Last',
      content:
        'Total contribution time of all organizations to the community in the past 90 days (weeks).',
      hash: '/docs/metrics-models/niche-creation/developer-retention#contribution-last',
    },
  },
  {
    top: 240,
    left: 518,
    size: 50,
    color: 'nicheCreation',
    right: true,
    popContent: {
      title: 'Contributor Count',
      content:
        'Determine how many active pr creators, code reviewers, commit authors there are in the past 90 days.',
      hash: '/docs/metrics-models/robustness/activity#contributor-count',
    },
  },
  {
    top: -133,
    left: 197,
    size: 48,
    color: 'nicheCreation',
    popContent: {
      title: 'Contributor Count',
      content:
        'Determine how many active pr creators, code reviewers, commit authors there are in the past 90 days.',
      hash: '/docs/metrics-models/robustness/activity#contributor-count',
    },
  },
  {
    top: -89,
    left: 598,
    size: 36,
    color: 'nicheCreation',
    right: true,
    popContent: {
      title: 'Contributor Count',
      content:
        'Determine how many active pr creators, code reviewers, commit authors there are in the past 90 days.',
      hash: '/docs/metrics-models/robustness/activity#contributor-count',
    },
  },
];
