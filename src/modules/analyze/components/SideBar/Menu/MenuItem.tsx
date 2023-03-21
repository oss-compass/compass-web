import React, { PropsWithChildren } from 'react';
import classnames from 'classnames';

const MenuItem: React.FC<
  PropsWithChildren<{
    id: string;
    disabled?: boolean;
    active?: boolean;
    subMenu?: React.ReactNode;
    leftIcons?: React.ReactNode;
  }>
> = ({
  disabled = false,
  active = false,
  id,
  subMenu,
  children,
  leftIcons,
}) => {
  return (
    <div className="group mb-0.5 px-4">
      <div className={classnames('relative')}>
        <a
          href={`#${id}`}
          className={classnames(
            'flex items-center justify-between  text-xs text-gray-600',
            'cursor-pointer rounded py-2 pl-6 pr-2',
            { '!text-black': active },
            { 'cursor-not-allowed !text-gray-400': disabled },
            { 'group-hover:bg-gray-100 group-hover:text-black': !disabled }
          )}
        >
          <span className="truncate">{children}</span>
          {leftIcons}
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
