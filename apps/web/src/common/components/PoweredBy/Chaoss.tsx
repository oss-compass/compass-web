import React from 'react';
import { useTranslation } from 'react-i18next';
import ChaossSvg from '@public/images/logos/chaoss.svg';
import Tooltip from '@common/components/Tooltip';

const Chaoss = () => {
  const { t } = useTranslation();
  return (
    <Tooltip title={t('analyze:powered_by_chaoss')} arrow placement="top">
      <span className="ml-2">
        <ChaossSvg />
      </span>
    </Tooltip>
  );
};

export default Chaoss;
