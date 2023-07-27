import React, { PropsWithChildren } from 'react';
import classnames from 'classnames';

const Center: React.FC<
  PropsWithChildren<{ className?: string; widthClassName?: string }>
> = ({ children, className, widthClassName = 'w-[1200px]' }) => {
  return (
    <div
      className={classnames('mx-auto', 'lg:w-full', widthClassName, className)}
    >
      {children}
    </div>
  );
};
export default Center;
