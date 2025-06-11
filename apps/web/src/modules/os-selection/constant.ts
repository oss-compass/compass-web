import { useTranslation } from 'next-i18next';

export const useStatusMap = () => {
  const { t } = useTranslation();
  return {
    success: t('os-selection:my_reports.status_map.success'),
    again_progress: t('os-selection:my_reports.status_map.again_progress'),
    default: t('os-selection:my_reports.status_map.generating'),
  };
};
export const useLanguagesList = () => {
  const { t } = useTranslation();

  return [
    {
      id: 'npm',
      name: 'JavaScript/npm',
    },
    {
      id: 'c_cpp',
      name: 'C/C++',
    },
    {
      id: 'ohpm',
      name: 'ArkTs/ohpm',
    },
    {
      id: 'selected.github',
      name: t('os-selection:constant.github_selected'),
    },
    {
      id: 'selected.gitee',
      name: t('os-selection:constant.gitee_selected'),
    },
  ];
};
