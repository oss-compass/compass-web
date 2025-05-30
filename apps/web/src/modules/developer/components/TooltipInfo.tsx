import React from 'react';
import { useTranslation } from 'next-i18next';

interface TooltipInfoProps {
  tooltipKey: string;
  showDetails?: boolean;
  showDataSource?: boolean;
}

const TooltipInfo: React.FC<TooltipInfoProps> = ({
  tooltipKey,
  showDetails = false,
  showDataSource = false,
}) => {
  const { t } = useTranslation(); // 指定使用 tooltip 命名空间
  const title = t(`${tooltipKey}.title`);
  const description = t(`developer:${tooltipKey}.description`);

  return (
    <div>
      {title && <h3>{t(`developer:${tooltipKey}.title`)}</h3>}
      {description && (
        <>
          <p>{description}</p>
        </>
      )}
      {showDetails && (
        <div className="my-2">
          <ul>{t(`developer:${tooltipKey}.details`)}</ul>
        </div>
      )}
      {showDataSource && (
        <>
          <p>{t(`developer:${tooltipKey}.dataSource`)}</p>
        </>
      )}
    </div>
  );
};

export default TooltipInfo;
