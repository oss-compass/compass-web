import { useTranslation } from 'next-i18next';

const useContributionTypeMap = () => {
  const { t } = useTranslation();
  return {
    observe: {
      fork: t('analyze:metric_detail:observe:fork'),
      star: t('analyze:metric_detail:observe:star'),
    },
    issue: {
      issue_creation: t('analyze:metric_detail:issue:issue_creation'),
      issue_comments: t('analyze:metric_detail:issue:issue_comments'),
    },
    'issue admin': {
      issue_labeled: t('analyze:metric_detail:issue_admin:issue_labeled'),
      issue_unlabeled: t('analyze:metric_detail:issue_admin:issue_unlabeled'),
      issue_closed: t('analyze:metric_detail:issue_admin:issue_closed'),
      issue_reopened: t('analyze:metric_detail:issue_admin:issue_reopened'),
      issue_assigned: t('analyze:metric_detail:issue_admin:issue_assigned'),
      issue_unassigned: t('analyze:metric_detail:issue_admin:issue_unassigned'),
      issue_milestoned: t('analyze:metric_detail:issue_admin:issue_milestoned'),
      issue_demilestoned: t(
        'analyze:metric_detail:issue_admin:issue_demilestoned'
      ),
      issue_marked_as_duplicate: t(
        'analyze:metric_detail:issue_admin:issue_marked_as_duplicate'
      ),
      issue_transferred: t(
        'analyze:metric_detail:issue_admin:issue_transferred'
      ),
      issue_renamed_title: t(
        'analyze:metric_detail:issue_admin:issue_renamed_title'
      ),
      issue_change_description: t(
        'analyze:metric_detail:issue_admin:issue_change_description'
      ),
      issue_setting_priority: t(
        'analyze:metric_detail:issue_admin:issue_setting_priority'
      ),
      issue_change_priority: t(
        'analyze:metric_detail:issue_admin:issue_change_priority'
      ),
      issue_link_pull_request: t(
        'analyze:metric_detail:issue_admin:issue_link_pull_request'
      ),
      issue_unlink_pull_request: t(
        'analyze:metric_detail:issue_admin:issue_unlink_pull_request'
      ),
      issue_assign_collaborator: t(
        'analyze:metric_detail:issue_admin:issue_assign_collaborator'
      ),
      issue_unassign_collaborator: t(
        'analyze:metric_detail:issue_admin:issue_unassign_collaborator'
      ),
      issue_change_issue_state: t(
        'analyze:metric_detail:issue_admin:issue_change_issue_state'
      ),
      issue_change_issue_type: t(
        'analyze:metric_detail:issue_admin:issue_change_issue_type'
      ),
      issue_setting_branch: t(
        'analyze:metric_detail:issue_admin:issue_setting_branch'
      ),
      issue_change_branch: t(
        'analyze:metric_detail:issue_admin:issue_change_branch'
      ),
    },
    code: {
      pr_creation: t('analyze:metric_detail:code:pr_creation'),
      pr_comments: t('analyze:metric_detail:code:pr_comments'),
      code_commit: t('analyze:metric_detail:code:code_commit'),
    },
    'code admin': {
      pr_labeled: t('analyze:metric_detail:code_admin:pr_labeled'),
      pr_unlabeled: t('analyze:metric_detail:code_admin:pr_unlabeled'),
      pr_closed: t('analyze:metric_detail:code_admin:pr_closed'),
      pr_assigned: t('analyze:metric_detail:code_admin:pr_assigned'),
      pr_unassigned: t('analyze:metric_detail:code_admin:pr_unassigned'),
      pr_reopened: t('analyze:metric_detail:code_admin:pr_reopened'),
      pr_milestoned: t('analyze:metric_detail:code_admin:pr_milestoned'),
      pr_demilestoned: t('analyze:metric_detail:code_admin:pr_demilestoned'),
      pr_marked_as_duplicate: t(
        'analyze:metric_detail:code_admin:pr_marked_as_duplicate'
      ),
      pr_transferred: t('analyze:metric_detail:code_admin:pr_transferred'),
      pr_renamed_title: t('analyze:metric_detail:code_admin:pr_renamed_title'),
      pr_change_description: t(
        'analyze:metric_detail:code_admin:pr_change_description'
      ),
      pr_setting_priority: t(
        'analyze:metric_detail:code_admin:pr_setting_priority'
      ),
      pr_change_priority: t(
        'analyze:metric_detail:code_admin:pr_change_priority'
      ),
      pr_merged: t('analyze:metric_detail:code_admin:pr_merged'),
      pr_review: t('analyze:metric_detail:code_admin:pr_review'),
      pr_set_tester: t('analyze:metric_detail:code_admin:pr_set_tester'),
      pr_unset_tester: t('analyze:metric_detail:code_admin:pr_unset_tester'),
      pr_check_pass: t('analyze:metric_detail:code_admin:pr_check_pass'),
      pr_test_pass: t('analyze:metric_detail:code_admin:pr_test_pass'),
      pr_reset_assign_result: t(
        'analyze:metric_detail:code_admin:pr_reset_assign_result'
      ),
      pr_reset_test_result: t(
        'analyze:metric_detail:code_admin:pr_reset_test_result'
      ),
      pr_link_issue: t('analyze:metric_detail:code_admin:pr_link_issue'),
      pr_unlink_issue: t('analyze:metric_detail:code_admin:pr_unlink_issue'),
      code_direct_commit: t(
        'analyze:metric_detail:code_admin:code_direct_commit'
      ),
    },
  };
};
export const useContributionTypeLsit = () => {
  const obj = useContributionTypeMap();
  const result = [];

  for (const key in obj) {
    const children = [];
    for (const childKey in obj[key]) {
      children.push({
        text: obj[key][childKey],
        value: childKey,
      });
    }
    result.push({
      text: key,
      value: key,
      children: children,
    });
  }
  return result;
};
export const useGetContributionTypeI18n = () => {
  const obj = useContributionTypeMap();
  const result = {};

  function traverseObject(obj) {
    for (const key in obj) {
      if (typeof obj[key] === 'object') {
        traverseObject(obj[key]);
      } else {
        result[key] = obj[key];
      }
    }
  }

  traverseObject(obj);
  return result;
};
export const useMileageOptions = () => {
  const { t } = useTranslation();

  return [
    { label: t('analyze:metric_detail:core'), value: 'core' },
    { label: t('analyze:metric_detail:regular'), value: 'guest' },
  ];
};
export const useEcologicalType = () => {
  const { t } = useTranslation();

  return [
    {
      text: t('analyze:metric_detail:organization_participant'),
      value: 'organization participant',
    },
    {
      text: t('analyze:metric_detail:organization_manager'),
      value: 'organization manager',
    },
    {
      text: t('analyze:metric_detail:individual_manager'),
      value: 'individual manager',
    },
    {
      text: t('analyze:metric_detail:individual_participant'),
      value: 'individual participant',
    },
  ];
};
