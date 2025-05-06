import React, { PropsWithChildren } from 'react';
import classnames from 'classnames';

const MenuTopicItem: React.FC<
  PropsWithChildren<{
    hash: string;
    active?: boolean;
    icon?: React.ReactNode;
    menus?: React.ReactNode;
  }>
> = ({ active = false, hash, children, menus, icon }) => {
  return (
    <>
      <div className="group px-4">
        <a
          href={`#${hash}`}
          className={classnames(
            'mb-0.5 flex cursor-pointer items-center rounded py-2 px-2 hover:bg-gray-100 hover:text-black',
            { '!text-primary bg-gray-100': active }
          )}
        >
          {icon}
          <h3 className={classnames('line-clamp-1 text-sm font-medium')}>
            {children}
          </h3>
        </a>
      </div>
      {menus}
    </>
  );
};

export default MenuTopicItem;
