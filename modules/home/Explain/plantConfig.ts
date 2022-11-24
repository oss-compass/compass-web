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
    top: 199,
    left: -377,
    size: 76,
    color: 'productivity',
    popContent: {
      title: 'Contributor Count',
      content:
        'Determine how many active pr creators, code reviewers, commit authors there are in the past 90 days.',
      hash: '/docs/metrics-models/productivity/code-quality-guarantee#contributor-count',
    },
  },
  {
    top: 214,
    left: -232,
    size: 66,
    color: 'productivity',
    popContent: {
      title: 'Commit Frequency',
      content:
        'Determine the average number of commits per week in the past 90 days.',
      hash: '/docs/metrics-models/productivity/code-quality-guarantee#commit-frequency',
    },
  },
  {
    top: 117,
    left: -300,
    size: 62,
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
    left: -228,
    size: 59,
    color: 'productivity',
    popContent: {
      title: 'Commit PR Linked Ratio',
      content:
        'Determine the percentage of new code commit link pull request in the last 90 days.',
      hash: '/docs/metrics-models/productivity/code-quality-guarantee#contributor-count',
    },
  },
  {
    top: 184,
    left: -201,
    size: 47,
    color: 'productivity',
    popContent: {
      title: 'PR Issue Linked Ratio',
      content:
        'Determine the percentage of new pull request link issues in the last 90 days.',
      hash: '/docs/metrics-models/productivity/code-quality-guarantee#pr-issue-linked-ratio',
    },
  },
  {
    top: 222,
    left: -309,
    size: 46,
    color: 'productivity',
    popContent: {
      title: 'Code Review Ratio',
      content:
        'Determine the percentage of code commits with at least one reviewer (not PR creator) in the last 90 days.',
      hash: '/docs/metrics-models/productivity/code-quality-guarantee#code-review-ratio',
    },
  },
  {
    top: 166,
    left: -157,
    size: 38,
    color: 'productivity',
    popContent: {
      title: 'Code Merge Ratio',
      content:
        'Determine the percentage of PR Mergers and PR authors who are not the same person in the last 90 days of commits.',
      hash: '/docs/metrics-models/productivity/code-quality-guarantee#code-merge-ratio',
    },
  },
  {
    top: 154,
    left: -369,
    size: 34,
    color: 'productivity',
    popContent: {
      title: 'Lines of Code Frequency',
      content:
        'Determine the average number of lines touched (lines added plus lines removed) per week in the past 90 days.',
      hash: '/docs/metrics-models/productivity/code-quality-guarantee#lines-of-code-frequency',
    },
  },

  {
    top: 9,
    left: -348,
    size: 76,
    color: 'productivity',
    popContent: {
      title: 'Updated Issues Count',
      content: 'Determine the number of issues updated in the last 90 days.',
      hash: '/docs/metrics-models/productivity/niche-creation#updated-issues-count',
    },
  },
  {
    top: -69,
    left: -382,
    size: 68,
    color: 'productivity',
    popContent: {
      title: 'Close PR Count',
      content: 'The number of PR accepted and declined in the last 90 days.',
      hash: '/docs/metrics-models/productivity/niche-creation#close-pr-count',
    },
  },
  {
    top: -63,
    left: -508,
    size: 55,
    color: 'productivity',
    popContent: {
      title: 'Issue First Response',
      content:
        "Average/Median first comments response (in days) for new issues created in the last 90 days. This excludes bot responses, the creator's own comment, or an action assigned by the issue. If the issue has been unanswered, the first response time is not counted.",
      hash: '/docs/metrics-models/productivity/niche-creation#issue-first-response',
    },
  },
  {
    top: 22,
    left: -510,
    size: 56,
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
    top: -17,
    left: -533,
    size: 46,
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
    top: 75,
    left: -410,
    size: 30,
    color: 'productivity',
    popContent: {
      title: 'Comment Frequency',
      content:
        'Determine the average number of comments per issue created in the last 90 days.',
      hash: '/docs/metrics-models/productivity/niche-creation#comment-frequency',
    },
  },
  {
    top: 60,
    left: -461,
    size: 23,
    color: 'productivity',
    popContent: {
      title: 'Code Review Count',
      content:
        'Determine the average number of review comments per pull request created in the last 90 days.',
      hash: '/docs/metrics-models/productivity/niche-creation#code-review-count',
    },
  },

  {
    top: -330,
    left: -74,
    size: 64,
    color: 'robustness',
    popContent: {
      title: 'Contributor Count',
      content:
        'Determine how many active code commit authors, pr authors, review participants, issue authors, and issue comments participants there are in the past 90 days.',
      hash: '/docs/metrics-models/robustness/activity#contributor-count',
    },
  },
  {
    top: -358,
    left: -20,
    size: 60,
    color: 'robustness',
    popContent: {
      title: 'Commit Frequency',
      content:
        'Determine the average number of commits per week in the past 90 days.',
      hash: '/docs/metrics-models/robustness/activity#commit-frequency',
    },
  },
  {
    top: -250,
    left: -58,
    size: 56,
    color: 'robustness',
    popContent: {
      title: 'Updated Since',
      content:
        'Determine the average time per repository since the repository was last updated (in months).',
      hash: '/docs/metrics-models/robustness/activity#updated-since',
    },
  },
  {
    top: -313,
    left: 97,
    size: 55,
    color: 'robustness',
    popContent: {
      title: 'Organization Count',
      content:
        'Number of organizations to which active code contributors belong in the past 90 days.',
      hash: '/docs/metrics-models/robustness/activity#organization-count',
    },
  },
  {
    top: -252,
    left: 93,
    size: 46,
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
    top: -226,
    left: 20,
    size: 45,
    color: 'robustness',
    popContent: {
      title: 'Comment Frequency',
      content:
        'Determine the average number of comments per issue created in the last 90 days.',
      hash: '/docs/metrics-models/robustness/activity#comment-frequency',
    },
  },
  {
    top: -341,
    left: 64,
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
    top: -264,
    left: 58,
    size: 38,
    color: 'robustness',
    popContent: {
      title: 'Updated Issues Count',
      content: 'Determine the number of issues updated in the last 90 days.',
      hash: '/docs/metrics-models/robustness/activity#updated-issues-count',
    },
  },
  {
    top: -291,
    left: -108,
    size: 30,
    color: 'robustness',
    popContent: {
      title: 'Recent Releases Count',
      content: 'Determine the number of releases in the last year.',
      hash: '/docs/metrics-models/robustness/activity#recent-releases-count',
    },
  },

  // {
  //   top: -351,
  //   left: -318,
  //   size: 55,
  //   color: 'robustness',
  //   popContent: {
  //     title: 'Maintainer Count',
  //     content: 'Determine the average number of maintainers per repository.',
  //     hash: '/docs/metrics-models/robustness/activity#maintainer-count',
  //   },
  // },
  // {
  //   top: -352,
  //   left: -166,
  //   size: 46,
  //   color: 'robustness',
  //   popContent: {
  //     title: 'Meeting Count',
  //     content: 'Determine the number of meetings held in the last 90 days.',
  //     hash: '/docs/metrics-models/robustness/activity#meeting-count',
  //   },
  // },
  // {
  //   top: -422,
  //   left: -176,
  //   size: 46,
  //   color: 'robustness',
  //   popContent: {
  //     title: 'Meeting Attendee Count',
  //     content:
  //       'Determine the average number of attendees per meeting in the last 90 days.',
  //     hash: '/docs/metrics-models/robustness/activity#meeting-attendee-count',
  //   },
  // },
  // {
  //   top: -346,
  //   left: 179,
  //   size: 44,
  //   color: 'robustness',
  //   popContent: {
  //     title: 'Closed Issues Count',
  //     content: 'Determine the number of issues closed in the last 90 days.',
  //     hash: '/docs/metrics-models/robustness/activity#closed-issues-count',
  //   },
  // },
  // {
  //   top: -366,
  //   left: 236,
  //   size: 44,
  //   color: 'robustness',
  //   popContent: {
  //     title: 'Closed Issues Count',
  //     content: 'Determine the number of issues closed in the last 90 days.',
  //     hash: '/docs/metrics-models/robustness/activity#closed-issues-count',
  //   },
  // },
  // {
  //   top: -412,
  //   left: 234,
  //   size: 38,
  //   color: 'robustness',
  //   popContent: {
  //     title: 'Closed Issues Count',
  //     content: 'Determine the number of issues closed in the last 90 days.',
  //     hash: '/docs/metrics-models/robustness/activity#closed-issues-count',
  //   },
  // },
  // {
  //   top: -391,
  //   left: 123,
  //   size: 29,
  //   color: 'robustness',
  //   popContent: {
  //     title: 'Closed Issues Count',
  //     content: 'Determine the number of issues closed in the last 90 days.',
  //     hash: '/docs/metrics-models/robustness/activity#closed-issues-count',
  //   },
  // },

  {
    top: 48,
    left: 257,
    size: 61,
    color: 'nicheCreation',
    popContent: {
      title: 'Org Count',
      content:
        'Number of organizations to which active code contributors belong in the past 90 days.',
      hash: '/docs/metrics-models/niche-creation/developer-retention#org-count',
    },
  },
  {
    top: 118,
    left: 171,
    size: 60,
    color: 'nicheCreation',
    popContent: {
      title: 'Contributor Count',
      content:
        'Number of active code contributors with organization affiliation in the past 90 days.',
      hash: '/docs/metrics-models/niche-creation/developer-retention#contributor-count',
    },
  },
  {
    top: 113,
    left: 413,
    size: 50,
    color: 'nicheCreation',
    popContent: {
      title: 'Commit Frequency',
      content:
        'Definition: Determine the average number of commits with organization affiliation per week in the past 90 days.',
      hash: '/docs/metrics-models/niche-creation/developer-retention#commit-frequency',
    },
  },
  {
    top: 174,
    left: 329,
    size: 46,
    color: 'nicheCreation',
    // bottom: true,
    popContent: {
      title: 'Contribution Last',
      content:
        'Total contribution time of all organizations to the community in the past 90 days (weeks).',
      hash: '/docs/metrics-models/niche-creation/developer-retention#contribution-last',
    },
  },

  // {
  //   top: 222,
  //   left: 453,
  //   size: 56,
  //   color: 'nicheCreation',
  //   right: true,
  //   popContent: {
  //     title: 'Contributor Count',
  //     content:
  //       'Determine how many active pr creators, code reviewers, commit authors there are in the past 90 days.',
  //     hash: '/docs/metrics-models/robustness/activity#contributor-count',
  //   },
  // },
  // {
  //   top: 206,
  //   left: 580,
  //   size: 56,
  //   color: 'nicheCreation',
  //   right: true,
  //   popContent: {
  //     title: 'Contributor Count',
  //     content:
  //       'Determine how many active pr creators, code reviewers, commit authors there are in the past 90 days.',
  //     hash: '/docs/metrics-models/robustness/activity#contributor-count',
  //   },
  // },
  // {
  //   top: 182,
  //   left: 537,
  //   size: 33,
  //   color: 'nicheCreation',
  //   right: true,
  //   popContent: {
  //     title: 'Contributor Count',
  //     content:
  //       'Determine how many active pr creators, code reviewers, commit authors there are in the past 90 days.',
  //     hash: '/docs/metrics-models/robustness/activity#contributor-count',
  //   },
  // },
];
