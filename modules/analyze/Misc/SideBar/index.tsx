import React from 'react';
import classnames from 'classnames';
import SideBarMenu from './SideBarMenu';

const SideBar = () => {
  return (
    <aside className={classnames('w-64 flex-shrink-0 border-r', 'lg:hidden')}>
      <div className="sticky top-14 p-6">
        <SideBarMenu />
      </div>
    </aside>
  );
};

export default SideBar;
