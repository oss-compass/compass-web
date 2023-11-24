import { useTranslation } from 'react-i18next';

export const useStateType = () => {
  const { t } = useTranslation();

  return [
    {
      text: t('analyze:metric_detail:open'),
      value: 'open',
    },
    {
      text: t('analyze:metric_detail:closed'),
      value: 'closed',
    },
    {
      text: t('analyze:metric_detail:progressing'),
      value: 'progressing',
    },
    {
      text: t('analyze:metric_detail:rejected'),
      value: 'rejected',
    },
  ];
};
