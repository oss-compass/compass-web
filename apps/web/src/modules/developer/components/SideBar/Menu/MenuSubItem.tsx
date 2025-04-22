import React, { PropsWithChildren } from 'react';
import classnames from 'classnames';

const MenuSubItem: React.FC<
  PropsWithChildren<{ id: string; active?: boolean }>
> = ({ active = false, id, children }) => {
  return (
    <a
      href={`#${id}`}
      className={classnames(
        'block min-w-[180px] cursor-pointer border-b py-2 px-4 text-xs text-gray-600 last:border-b-0',
        'hover:bg-gray-100 hover:text-black',
        { '!text-black': active }
      )}
    >
      {children}
    </a>
  );
};

export default MenuSubItem;
