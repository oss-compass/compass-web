import React from 'react';
import { AiOutlineAppstore } from 'react-icons/ai';

const Item = () => {
  return (
    <a
      href="#trend"
      className="flex h-8 cursor-pointer items-center rounded p-2 text-zinc-600 hover:bg-slate-100 hover:text-black"
    >
      <AiOutlineAppstore className="mr-2 " />
      <h3 className="text-sm">Overview</h3>
    </a>
  );
};

const Divider = () => <div className="m-2 border-b"></div>;

const SideBar = () => {
  return (
    <aside className="w-64 flex-shrink-0 border-r">
      <div className="sticky top-14 p-6">
        <Item />

        <Divider />
        <h2 className="m-2 text-xs text-gray-400">Productivity</h2>
        <Item />
        <Item />
        <Item />

        <Divider />
        <h2 className="m-2 text-xs text-gray-400">Productivity</h2>
        <Item />
        <Item />
        <Item />
      </div>
    </aside>
  );
};

export default SideBar;
