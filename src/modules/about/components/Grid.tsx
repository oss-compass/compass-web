import React, { PropsWithChildren } from 'react';
import classnames from 'classnames';

export const Grid: React.FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => (
  <div
    className={classnames(
      'px- grid grid-cols-3 gap-8',
      'md:grid-cols-1',
      className
    )}
  >
    {children}
  </div>
);
