import React, { PropsWithChildren } from 'react';
import classnames from 'classnames';
import { Stack, Skeleton } from '@chakra-ui/react';

const BaseCard: React.FC<
  PropsWithChildren<{
    loading?: boolean;
    className?: string;
    title?: string;
    description?: string;
  }>
> = ({
  className = '',
  children,
  loading = false,
  title = '',
  description = '',
}) => {
  const cls = classnames(className, 'rounded-lg bg-white p-6 drop-shadow-md');

  if (loading) {
    return (
      <div className={classnames(cls, 'p-10')}>
        <Stack>
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      </div>
    );
  }

  return (
    <div className={cls}>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm">{description}</p>
      {children}
    </div>
  );
};

export default BaseCard;
