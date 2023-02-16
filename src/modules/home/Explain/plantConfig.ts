import { useTranslation } from 'next-i18next';

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

export type ModelList = {
  name: string;
  top: number;
  left: number;
  width: number;
  height: number;
  color: string;
};

const useCodeQualityGuarantee = (): PlantList[] => {
  const { t } = useTranslation();
  return [
    {
      top: 199,
      left: -377,
      size: 76,
      color: 'productivity',
      popContent: {
        title: t(
          'metrics_models:collaboration_development_index.metrics.contributor_count'
        ),
        content: t(
          'metrics_models:collaboration_development_index.metrics.contributor_count_desc'
        ),
        hash: '/docs/metrics-models/productivity/collaboration-development-index#code-contributor-count',
      },
    },
    {
      top: 214,
      left: -232,
      size: 66,
      color: 'productivity',
      popContent: {
        title: t(
          'metrics_models:collaboration_development_index.metrics.commit_frequency'
        ),
        content: t(
          'metrics_models:collaboration_development_index.metrics.commit_frequency_desc'
        ),
        hash: '/docs/metrics-models/productivity/collaboration-development-index#commit-frequency',
      },
    },
    {
      top: 117,
      left: -300,
      size: 62,
      color: 'productivity',
      popContent: {
        title: t(
          'metrics_models:collaboration_development_index.metrics.is_maintained'
        ),
        content: t(
          'metrics_models:collaboration_development_index.metrics.is_maintained_desc'
        ),
        hash: '/docs/metrics-models/productivity/collaboration-development-index#is-maintained',
      },
    },
    {
      top: 127,
      left: -228,
      size: 59,
      color: 'productivity',
      popContent: {
        title: t(
          'metrics_models:collaboration_development_index.metrics.commit_pr_linked_ratio'
        ),
        content: t(
          'metrics_models:collaboration_development_index.metrics.commit_pr_linked_ratio_desc'
        ),
        hash: '/docs/metrics-models/productivity/collaboration-development-index#contributor-count',
      },
    },
    {
      top: 184,
      left: -201,
      size: 47,
      color: 'productivity',
      popContent: {
        title: t(
          'metrics_models:collaboration_development_index.metrics.pr_issue_linked_ratio'
        ),
        content: t(
          'metrics_models:collaboration_development_index.metrics.pr_issue_linked_ratio_desc'
        ),
        hash: '/docs/metrics-models/productivity/collaboration-development-index#pr-issue-linked-ratio',
      },
    },
    {
      top: 222,
      left: -309,
      size: 46,
      color: 'productivity',
      popContent: {
        title: t(
          'metrics_models:collaboration_development_index.metrics.code_review_ratio'
        ),
        content: t(
          'metrics_models:collaboration_development_index.metrics.code_review_ratio_desc'
        ),
        hash: '/docs/metrics-models/productivity/collaboration-development-index#code-review-ratio',
      },
    },
    {
      top: 166,
      left: -157,
      size: 38,
      color: 'productivity',
      popContent: {
        title: t(
          'metrics_models:collaboration_development_index.metrics.code_merge_ratio'
        ),
        content: t(
          'metrics_models:collaboration_development_index.metrics.code_merge_ratio_desc'
        ),
        hash: '/docs/metrics-models/productivity/collaboration-development-index#code-merge-ratio',
      },
    },
    {
      top: 154,
      left: -369,
      size: 34,
      color: 'productivity',
      popContent: {
        title: t(
          'metrics_models:collaboration_development_index.metrics.lines_of_code_frequency'
        ),
        content: t(
          'metrics_models:collaboration_development_index.metrics.lines_of_code_frequency_desc'
        ),
        hash: '/docs/metrics-models/productivity/collaboration-development-index#lines-of-code-frequency',
      },
    },
  ];
};

const useCommunityServiceAndSupport = (): PlantList[] => {
  const { t } = useTranslation();
  return [
    {
      top: 9,
      left: -348,
      size: 76,
      color: 'productivity',
      popContent: {
        title: t(
          'metrics_models:community_service_and_support.metrics.updated_issues_count'
        ),
        content: t(
          'metrics_models:community_service_and_support.metrics.updated_issues_count_desc'
        ),
        hash: '/docs/metrics-models/productivity/community-service-and-support#updated-issues-count',
      },
    },
    {
      top: -69,
      left: -382,
      size: 68,
      color: 'productivity',
      popContent: {
        title: t(
          'metrics_models:community_service_and_support.metrics.close_pr_count'
        ),
        content: t(
          'metrics_models:community_service_and_support.metrics.close_pr_count_desc'
        ),
        hash: '/docs/metrics-models/productivity/community-service-and-support#close-pr-count',
      },
    },
    {
      top: -63,
      left: -508,
      size: 55,
      color: 'productivity',
      popContent: {
        title: t(
          'metrics_models:community_service_and_support.metrics.issue_first_response'
        ),
        content: t(
          'metrics_models:community_service_and_support.metrics.issue_first_response_desc'
        ),
        hash: '/docs/metrics-models/productivity/community-service-and-support#issue-first-response',
      },
    },
    {
      top: 22,
      left: -510,
      size: 56,
      color: 'productivity',
      bottom: true,
      popContent: {
        title: t(
          'metrics_models:community_service_and_support.metrics.bug_issue_open_time'
        ),
        content: t(
          'metrics_models:community_service_and_support.metrics.bug_issue_open_time_desc'
        ),
        hash: '/docs/metrics-models/productivity/community-service-and-support#bug-issue-open-time',
      },
    },
    {
      top: -17,
      left: -533,
      size: 46,
      color: 'productivity',
      bottom: true,
      popContent: {
        title: t(
          'metrics_models:community_service_and_support.metrics.pr_open_time'
        ),
        content: t(
          'metrics_models:community_service_and_support.metrics.pr_open_time_desc'
        ),
        hash: '/docs/metrics-models/productivity/community-service-and-support#pr-open-time',
      },
    },
    {
      top: 75,
      left: -410,
      size: 30,
      color: 'productivity',
      popContent: {
        title: t(
          'metrics_models:community_service_and_support.metrics.comment_frequency'
        ),
        content: t(
          'metrics_models:community_service_and_support.metrics.comment_frequency_desc'
        ),
        hash: '/docs/metrics-models/productivity/community-service-and-support#comment-frequency',
      },
    },
    {
      top: 60,
      left: -461,
      size: 23,
      color: 'productivity',
      popContent: {
        title: t(
          'metrics_models:community_service_and_support.metrics.code_review_count'
        ),
        content: t(
          'metrics_models:community_service_and_support.metrics.code_review_count_desc'
        ),
        hash: '/docs/metrics-models/productivity/community-service-and-support#code-review-count',
      },
    },
  ];
};

const useCommunityActivity = (): PlantList[] => {
  const { t } = useTranslation();
  return [
    {
      top: -330,
      left: -74,
      size: 64,
      color: 'robustness',
      popContent: {
        title: t('metrics_models:community_activity.metrics.contributor_count'),
        content: t(
          'metrics_models:community_activity.metrics.contributor_count_desc'
        ),
        hash: '/docs/metrics-models/robustness/activity#contributor-count',
      },
    },
    {
      top: -358,
      left: -20,
      size: 60,
      color: 'robustness',
      popContent: {
        title: t('metrics_models:community_activity.metrics.commit_frequency'),
        content: t(
          'metrics_models:community_activity.metrics.commit_frequency_desc'
        ),
        hash: '/docs/metrics-models/robustness/activity#commit-frequency',
      },
    },
    {
      top: -250,
      left: -58,
      size: 56,
      color: 'robustness',
      popContent: {
        title: t('metrics_models:community_activity.metrics.updated_since'),
        content: t(
          'metrics_models:community_activity.metrics.updated_since_desc'
        ),
        hash: '/docs/metrics-models/robustness/activity#updated-since',
      },
    },
    {
      top: -313,
      left: 97,
      size: 55,
      color: 'robustness',
      popContent: {
        title: t(
          'metrics_models:community_activity.metrics.organization_count'
        ),
        content: t(
          'metrics_models:community_activity.metrics.organization_count_desc'
        ),
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
        title: t('metrics_models:community_activity.metrics.created_since'),
        content: t(
          'metrics_models:community_activity.metrics.created_since_desc'
        ),
        hash: '/docs/metrics-models/robustness/activity#created-since',
      },
    },
    {
      top: -226,
      left: 20,
      size: 45,
      color: 'robustness',
      popContent: {
        title: t('metrics_models:community_activity.metrics.comment_frequency'),
        content: t(
          'metrics_models:community_activity.metrics.comment_frequency_desc'
        ),
        hash: '/docs/metrics-models/robustness/activity#comment-frequency',
      },
    },
    {
      top: -341,
      left: 64,
      size: 46,
      color: 'robustness',
      popContent: {
        title: t('metrics_models:community_activity.metrics.code_review_count'),
        content: t(
          'metrics_models:community_activity.metrics.code_review_count_desc'
        ),
        hash: '/docs/metrics-models/robustness/activity#code-review-count',
      },
    },
    {
      top: -264,
      left: 58,
      size: 38,
      color: 'robustness',
      popContent: {
        title: t(
          'metrics_models:community_activity.metrics.updated_issues_count'
        ),
        content: t(
          'metrics_models:community_activity.metrics.updated_issues_count_desc'
        ),
        hash: '/docs/metrics-models/robustness/activity#updated-issues-count',
      },
    },
    {
      top: -291,
      left: -108,
      size: 30,
      color: 'robustness',
      popContent: {
        title: t(
          'metrics_models:community_activity.metrics.recent_releases_count'
        ),
        content: t(
          'metrics_models:community_activity.metrics.recent_releases_count_desc'
        ),
        hash: '/docs/metrics-models/robustness/activity#recent-releases-count',
      },
    },
  ];
};

const useOrganizationActivity = (): PlantList[] => {
  const { t } = useTranslation();
  return [
    {
      top: 48,
      left: 257,
      size: 61,
      color: 'nicheCreation',
      popContent: {
        title: t('metrics_models:organization_activity.metrics.org_count'),
        content: t(
          'metrics_models:organization_activity.metrics.org_count_desc'
        ),
        hash: '/docs/metrics-models/niche-creation/developer-retention#org-count',
      },
    },
    {
      top: 118,
      left: 171,
      size: 60,
      color: 'nicheCreation',
      popContent: {
        title: t(
          'metrics_models:organization_activity.metrics.contributor_count'
        ),
        content: t(
          'metrics_models:organization_activity.metrics.contributor_count_desc'
        ),
        hash: '/docs/metrics-models/niche-creation/developer-retention#contributor-count',
      },
    },
    {
      top: 113,
      left: 413,
      size: 50,
      color: 'nicheCreation',
      popContent: {
        title: t(
          'metrics_models:organization_activity.metrics.commit_frequency'
        ),
        content: t(
          'metrics_models:organization_activity.metrics.commit_frequency_desc'
        ),
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
        title: t(
          'metrics_models:organization_activity.metrics.contribution_last'
        ),
        content: t(
          'metrics_models:organization_activity.metrics.contribution_last_desc'
        ),
        hash: '/docs/metrics-models/niche-creation/developer-retention#contribution-last',
      },
    },
  ];
};

export const usePlantList = (): PlantList[] => {
  const codeQualityGuarantee = useCodeQualityGuarantee();
  const communityServiceAndSupport = useCommunityServiceAndSupport();
  const communityActivity = useCommunityActivity();
  const organizationActivity = useOrganizationActivity();
  return [
    ...codeQualityGuarantee,
    ...communityServiceAndSupport,
    ...communityActivity,
    ...organizationActivity,
  ];
};
export const useModelList = (): ModelList[] => {
  const { t } = useTranslation();
  return [
    {
      name: t('metrics_models:code_security_guarantee.title'),
      top: -165,
      left: -557,
      width: 117,
      height: 40,
      color: '#727fff',
    },
    {
      name: t('metrics_models:community_service_and_support.title'),
      top: 0,
      left: -462,
      width: 129,
      height: 40,
      color: '#727fff',
    },
    {
      name: t('metrics_models:content.title'),
      top: 150,
      left: -564,
      width: 130,
      height: 40,
      color: '#727fff',
    },
    {
      name: t('metrics_models:code_security_guarantee.title'),
      top: 180,
      left: -320,
      width: 130,
      height: 40,
      color: '#727fff',
    },
    {
      name: t('metrics_models:code_compliance_guarantee.title'),
      top: 308,
      left: -150,
      width: 130,
      height: 38,
      color: '#727fff',
    },

    {
      name: t('metrics_models:organization_activity.title'),
      top: 115,
      left: 252,
      width: 130,
      height: 38,
      color: '#b06ffa',
    },
    {
      name: t('metrics_models:developer_attraction.title'),
      top: 215,
      left: 490,
      width: 100,
      height: 38,
      color: '#b06ffa',
    },
    {
      name: t('metrics_models:technological_advancement.title'),
      top: -70,
      left: 453,
      width: 100,
      height: 38,
      color: '#b06ffa',
    },

    {
      name: t('metrics_models:organization_collaboration_relationships.title'),
      top: -348,
      left: -348,
      width: 180,
      height: 38,
      color: '#cea936',
    },
    {
      name: t('metrics_models:inner_connectedness.title'),
      top: -222,
      left: -234,
      width: 130,
      height: 38,
      color: '#cea936',
    },
    {
      name: t('metrics_models:activity.title'),
      top: -285,
      left: -40,
      width: 130,
      height: 38,
      color: '#cea936',
    },
    {
      name: t('metrics_models:activity.title'),
      top: -285,
      left: -40,
      width: 130,
      height: 38,
      color: '#cea936',
    },
    {
      name: t('metrics_models:developer_retention.title'),
      top: -382,
      left: 147,
      width: 100,
      height: 38,
      color: '#cea936',
    },
    {
      name: t('metrics_models:developer_convertion.title'),
      top: -288,
      left: 268,
      width: 100,
      height: 38,
      color: '#cea936',
    },
    {
      name: t('metrics_models:outbound_connectedness.title'),
      top: -200,
      left: 147,
      width: 100,
      height: 38,
      color: '#cea936',
    },
  ];
};
const p = [
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
