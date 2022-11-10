import React, { PropsWithChildren } from 'react';
import classnames from 'classnames';

const MenuItem: React.FC<
  PropsWithChildren<{
    id: string;
    disabled?: boolean;
    active?: boolean;
    subMenu?: React.ReactNode;
  }>
> = ({ disabled = false, active = false, id, subMenu, children }) => {
  return (
    <div className="group mb-0.5 px-4">
      <div className={classnames('relative')}>
        <a
          href={`#${id}`}
          className={classnames(
            'block truncate text-xs text-gray-600',
            'cursor-pointer items-center rounded py-2 px-6',
            { '!text-black': active },
            { 'cursor-not-allowed !text-gray-300': disabled },
            { 'group-hover:bg-gray-100 group-hover:text-black': !disabled }
          )}
        >
          {children}
        </a>
        {subMenu && (
          <div
            className={classnames(
              'transition-opacity duration-300 ease-out md:hidden',
              'absolute right-[1000px] top-0 z-10 rounded bg-white py-2 opacity-0 drop-shadow-lg',
              'group-hover:-right-[186px]',
              'group-hover:opacity-100'
            )}
          >
            {subMenu}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuItem;
