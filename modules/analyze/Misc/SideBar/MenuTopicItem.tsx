import React, { PropsWithChildren } from 'react';
import classnames from 'classnames';

const TopicItem: React.FC<
  PropsWithChildren<{
    hash: string;
    active?: boolean;
    bold: boolean;
    icon: React.ReactNode;
    menus?: React.ReactNode;
  }>
> = ({ bold = false, active = false, hash, children, menus, icon }) => {
  return (
    <>
      <div className="group px-4">
        <a
          href={`#${hash}`}
          className={classnames(
            'mb-0.5 flex cursor-pointer items-center rounded py-2 px-2 hover:bg-gray-100 hover:text-black',
            { 'bg-gray-100 !text-black': active }
          )}
        >
          {icon}
          <h3
            className={classnames('text-sm line-clamp-1', {
              'font-medium': bold,
            })}
          >
            {children}
          </h3>
        </a>
      </div>
      {menus}
    </>
  );
};

export default TopicItem;
