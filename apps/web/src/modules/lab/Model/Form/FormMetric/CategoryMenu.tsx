import React, { useState, ReactNode, PropsWithChildren } from 'react';
import classnames from 'classnames';
import { BadgeCount } from '../styled';

const CategoryMenu = () => {
  const [collapse, setCollapse] = useState(false);
  const count = 1;
  return (
    <div className="w-60">
      <div
        className=" border-silver flex h-10 cursor-pointer  cursor-pointer items-center justify-between border-b pl-4 pr-4 font-medium "
        onClick={() => {
          setCollapse((p) => !p);
        }}
      >
        <div>Operation System</div>
        {count ? <BadgeCount count={count} /> : null}
      </div>
    </div>
  );
};

export default CategoryMenu;
