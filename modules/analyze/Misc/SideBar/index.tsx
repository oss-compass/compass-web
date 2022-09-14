import React, { PropsWithChildren, Fragment } from 'react';
import { BiChart } from 'react-icons/bi';
import classnames from 'classnames';
import SideBarConfig from './SideBarConfig';

const MenuItem: React.FC<PropsWithChildren<{ hash: string }>> = ({
  hash,
  children,
}) => {
  return (
    <a
      href={`#anchor_${hash}`}
      className="flex h-8 cursor-pointer items-center rounded p-2 text-zinc-600 hover:bg-slate-100 hover:text-black"
    >
      <BiChart className="mr-2 flex-shrink-0 " />
      <h3 className="text-sm line-clamp-1">{children}</h3>
    </a>
  );
};

const Divider = () => <div className="m-2 border-b"></div>;

const SideBar = () => {
  return (
    <aside
      className={classnames('hidden w-64 flex-shrink-0 border-r', 'md:block')}
    >
      <div className="sticky top-14 p-6">
        <MenuItem hash={'trending'}>Trending</MenuItem>

        {SideBarConfig.map((g) => {
          return (
            <Fragment key={g.name}>
              <Divider />
              <h2 className="m-2 text-xs text-gray-400">{g.name}</h2>
              {g.groups.map((item) => {
                return (
                  <MenuItem hash={item.id} key={item.name}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Fragment>
          );
        })}
      </div>
    </aside>
  );
};

export default SideBar;
