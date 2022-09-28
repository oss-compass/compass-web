import React, { PropsWithChildren, Fragment } from 'react';
import { BiChart } from 'react-icons/bi';
import menus from './menus';
import { useConfigContext } from '@modules/analyze/context';
import { checkIsPadding } from '@modules/analyze/constant';

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

const MenuPadding = () => (
  <div>
    <div className="mb-8 flex-1 space-y-4">
      <div className="h-4 rounded bg-slate-100"></div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 h-4 rounded bg-slate-100"></div>
        <div className="col-span-1 h-4 rounded bg-slate-100"></div>
      </div>
      <div className="h-4 rounded bg-slate-100"></div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 h-4 rounded bg-slate-100"></div>
        <div className="col-span-2 h-4 rounded bg-slate-100"></div>
      </div>
      <div className="h-4 rounded bg-slate-100"></div>
    </div>
    <div className="mb-8 flex-1 space-y-4">
      <div className="h-4 rounded bg-slate-100"></div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 h-4 rounded bg-slate-100"></div>
        <div className="col-span-1 h-4 rounded bg-slate-100"></div>
      </div>
      <div className="h-4 rounded bg-slate-100"></div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 h-4 rounded bg-slate-100"></div>
        <div className="col-span-2 h-4 rounded bg-slate-100"></div>
      </div>
      <div className="h-4 rounded bg-slate-100"></div>
    </div>
    <div className="mb-8 flex-1 space-y-4">
      <div className="h-4 rounded bg-slate-100"></div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 h-4 rounded bg-slate-100"></div>
        <div className="col-span-1 h-4 rounded bg-slate-100"></div>
      </div>
      <div className="h-4 rounded bg-slate-100"></div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 h-4 rounded bg-slate-100"></div>
        <div className="col-span-2 h-4 rounded bg-slate-100"></div>
      </div>
      <div className="h-4 rounded bg-slate-100"></div>
    </div>
  </div>
);

const Divider = () => <div className="m-2 border-b"></div>;

const SideBarMenu = () => {
  const { status } = useConfigContext();

  if (checkIsPadding(status)) {
    return <MenuPadding />;
  }

  return (
    <>
      <MenuItem hash={'trending'}>Trending</MenuItem>

      {menus.map((g) => {
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
    </>
  );
};

export default SideBarMenu;
