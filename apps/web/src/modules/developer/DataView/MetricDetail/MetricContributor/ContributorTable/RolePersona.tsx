import React from 'react';
import { useTranslation } from 'next-i18next';
import Tooltip from '@common/components/Tooltip';
import { AiOutlineQuestionCircle } from 'react-icons/ai';

const RolePersona = () => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center">
      {t('analyze:metric_detail:role_persona')}
      <Tooltip
        arrow
        title={<>{t('analyze:metric_detail:role_persona_desc')}</>}
        placement="right"
      >
        <span className="ml-2 cursor-pointer text-gray-400">
          <AiOutlineQuestionCircle />
        </span>
      </Tooltip>
    </div>
  );
};

export default RolePersona;
