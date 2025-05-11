import React, { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import { useTranslation } from 'react-i18next';

export const FormItemLabel: React.FC<
  PropsWithChildren<{ className?: string }>
> = ({ children, className }) => {
  return (
    <div className={twMerge('mb-3 font-medium', className)}>{children}</div>
  );
};

export const MetricName = ({
  category,
  ident,
}: {
  category: string;
  ident: string;
}) => {
  const { t } = useTranslation();
  const nameKey = `lab_metrics:${category}.${ident}`;
  const name = t(nameKey);
  return <>{name}</>;
};

export const MetricDesc = ({
  category,
  ident,
}: {
  category: string;
  ident: string;
}) => {
  const { t } = useTranslation();
  const nameKey = `lab_metrics:${category}.${ident}_desc`;
  const name = t(nameKey);
  return <>{name}</>;
};

export const MetricThresholdRanges = ({ threshold }: { threshold: number }) => {
  const { t } = useTranslation();
  return (
    <>
      {threshold === 0
        ? ''
        : t('lab:weight_threshold_settings.between', {
            end: threshold,
          })}
    </>
  );
};
