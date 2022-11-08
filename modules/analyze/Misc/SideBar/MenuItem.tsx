import React, { PropsWithChildren } from 'react';
import classnames from 'classnames';

const MenuItem: React.FC<
  PropsWithChildren<{
    id: string;
    disabled?: boolean;
    active?: boolean;
    bold?: boolean;
    subMenu?: React.ReactNode;
  }>
> = ({
  bold = false,
  disabled = false,
  active = false,
  id,
  subMenu,
  children,
}) => {
  return (
    <div className="group px-4">
      <div
        className={classnames(
          'relative',
          'mb-0.5 flex cursor-pointer items-center rounded py-2 px-6',
          { 'cursor-not-allowed': disabled },
          { 'bg-gray-100 !text-black': active },
          { 'group-hover:bg-gray-100': !disabled }
        )}
      >
        <a
          href={`#${id}`}
          className={classnames('truncate text-xs text-gray-600', {
            'font-medium': bold,
            '!text-gray-400': disabled,
            'group-hover:text-black': !disabled,
          })}
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
