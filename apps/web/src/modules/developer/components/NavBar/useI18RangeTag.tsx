import { RangeTag } from '@modules/developer/constant';
import { useTranslation } from 'react-i18next';

const useI18RangeTag = () => {
  const { t } = useTranslation();
  const i18RangeTag: Record<RangeTag, string> = {
    '1M': t('common:range.1M'),
    '3M': t('common:range.3M'),
    '6M': t('common:range.6M'),
    '1Y': t('common:range.1Y'),
    // '2Y': t('common:range.2Y'),
    '3Y': t('common:range.3Y'),
    '5Y': t('common:range.5Y'),
    'Since 2000': t('common:range.Since2000'),
  };

  return i18RangeTag;
};

export default useI18RangeTag;
