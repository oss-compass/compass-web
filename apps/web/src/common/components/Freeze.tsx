import React, { memo, PropsWithChildren } from 'react';

type Props = PropsWithChildren & { freeze: boolean };

const Freeze = memo(
  ({ children, freeze }: Props) => <>{children}</>,
  (prevProps, nextProps) => {
    if (nextProps.freeze) return true;
    return Object.is(prevProps, nextProps);
  }
);

Freeze.displayName = 'Freeze';

export default Freeze;
