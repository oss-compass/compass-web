import React, { PropsWithChildren } from 'react';
import { usePrevious, useWindowScroll } from 'react-use';
import classnames from 'classnames';

const StickyNav: React.FC<PropsWithChildren<{ className: string }>> = ({
  children,
  className,
}) => {
  const { y } = useWindowScroll();
  const preY = usePrevious(y) as number;

  return (
    <div
      className={classnames('z-header sticky flex-shrink-0 transition-all', [
        y < preY ? 'top-0' : className,
      ])}
    >
      {children}
    </div>
  );
};

export default StickyNav;
