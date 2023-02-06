import { RangeTag } from '@modules/analyze/constant';
import { useTranslation } from 'react-i18next';

const useI18RangeTag = () => {
  const { t } = useTranslation();
  const i18RangeTag: Record<RangeTag, string> = {
    '3M': t('analyze:range.3M'),
    '6M': t('analyze:range.6M'),
    '1Y': t('analyze:range.1Y'),
    '2Y': t('analyze:range.2Y'),
    '3Y': t('analyze:range.3Y'),
    '5Y': t('analyze:range.5Y'),
    'Since 2000': t('analyze:range.Since2000'),
  };

  return i18RangeTag;
};

export default useI18RangeTag;
