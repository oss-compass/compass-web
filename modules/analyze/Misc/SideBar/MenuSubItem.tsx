import React, { PropsWithChildren } from 'react';
import classnames from 'classnames';

const SubMenuItem: React.FC<PropsWithChildren<{ id: string }>> = ({
  id,
  children,
}) => {
  return (
    <a
      href={`#${id}`}
      className={classnames(
        'block min-w-[180px] cursor-pointer border-b py-2 px-4 text-xs text-gray-600 last:border-b-0',
        'hover:bg-gray-100 hover:text-black'
      )}
    >
      {children}
    </a>
  );
};

export default SubMenuItem;
