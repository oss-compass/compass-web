import React, { PropsWithChildren } from 'react';
import classnames from 'classnames';
import { BiChart } from 'react-icons/bi';

const MenuItem: React.FC<
  PropsWithChildren<{ hash: string; active?: boolean }>
> = ({ active = false, hash, children }) => {
  return (
    <a
      href={`#${hash}`}
      className={classnames(
        'mb-0.5 flex h-8 cursor-pointer items-center rounded p-2 text-zinc-600 hover:bg-slate-100 hover:text-black',
        { 'bg-slate-100 !text-black': active }
      )}
    >
      <BiChart className="mr-2 flex-shrink-0" />
      <h3 className="text-sm line-clamp-1">{children}</h3>
    </a>
  );
};

export default MenuItem;
