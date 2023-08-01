import React, { useState, ReactNode, PropsWithChildren } from 'react';
import classnames from 'classnames';
import BadgeCount from './BadgeCount';

const SubMenu = ({
  children,
  active,
  count,
}: {
  children?: ReactNode | undefined;
  active?: boolean;
  count?: number;
}) => {
  return (
    <div className="hover:bg-smoke flex cursor-pointer items-center justify-between bg-white py-2 pl-6 pr-4">
      <div className={classnames('truncate', [active ? 'text-primary' : ''])}>
        {children}
      </div>
      {count ? <BadgeCount count={count} /> : null}
    </div>
  );
};

export default SubMenu;
