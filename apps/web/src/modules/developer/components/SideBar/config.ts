import { useTranslation } from 'next-i18next';

export enum Topic {
  Overview = 'topic_overview',
  Productivity = 'topic_productivity',
  Robustness = 'topic_robustness',
  NicheCreation = 'topic_niche_creation',
}
export const useTopic = () => {
  const { t } = useTranslation();
  const selection = [
    {
      name: t('developer:contribution_overview'),
      id: 'contribution_overview',
    },
    {
      name: t('developer:contributor_language'),
      id: 'contributor_language',
    },
    {
      name: t('developer:contributor_repos_rank'),
      id: 'contributor_repos_rank',
    },
    {
      name: t('developer:contribution_type'),
      id: 'contribution_type',
    },
    {
      name: t('developer:repo_graph'),
      id: 'repo_graph',
    },
    {
      name: t('developer:repo_graph_details'),
      id: 'repo_graph_details',
    },
    {
      name: t('developer:contributor_collaboration'),
      id: 'contributor_collaboration',
    },
    {
      name: t('developer:commit_frequency'),
      id: 'commit_frequency',
    },
    {
      name: t('developer:issue_count'),
      id: 'issue_count',
    },
    {
      name: t('developer:issue_comments_count'),
      id: 'issue_comments_count',
    },
  ];
  return {
    selection,
  };
};
