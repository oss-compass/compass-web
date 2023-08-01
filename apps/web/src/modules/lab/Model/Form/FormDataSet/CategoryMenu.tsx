import React, { useState, ReactNode, PropsWithChildren } from 'react';
import classnames from 'classnames';
import BadgeCount from './BadgeCount';
import SubMenu from './SubMenu';

const CategoryMenu = () => {
  const [collapse, setCollapse] = useState(false);
  const count = 1;
  return (
    <div className="w-60">
      <div
        className="bg-smoke border-silver flex h-10 cursor-pointer  cursor-pointer items-center justify-between border-b pl-4 pr-4 font-medium "
        onClick={() => {
          setCollapse((p) => !p);
        }}
      >
        <div>Operation System</div>
        {count ? <BadgeCount count={count} /> : null}
      </div>
      <div
        className={classnames('border-silver overflow-hidden  transition', [
          collapse ? 'border-b' : 'h-0 ',
        ])}
      >
        <SubMenu active count={1}>
          Desktop operation system
        </SubMenu>
        <SubMenu>Server operation system</SubMenu>
        <SubMenu>Embedded operation system</SubMenu>
        <SubMenu>Server operation system</SubMenu>
      </div>
    </div>
  );
};

export default CategoryMenu;
