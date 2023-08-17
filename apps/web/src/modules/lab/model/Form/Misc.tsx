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

export const BadgeCount = ({ count = 0 }: { count: number }) => {
  return (
    <span className="bg-primary h-4 min-w-[16px] shrink-0 rounded-full text-center text-xs leading-4 text-white">
      {count}
    </span>
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

export const MetricThresholdRanges = ({
  category,
  ident,
}: {
  category: string;
  ident: string;
}) => {
  const { t } = useTranslation();
  const nameKey = `lab_metrics:${category}.${ident}_value.threshold`;
  const name = t(nameKey);
  return <>{name}</>;
};
