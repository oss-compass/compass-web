import React, { PropsWithChildren } from 'react';
import classnames from 'classnames';

const Center: React.FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  return (
    <div className={classnames('mx-auto w-[1200px]', 'lg:w-full', className)}>
      {children}
    </div>
  );
};
export default Center;
