import React, { PropsWithChildren, Fragment, useEffect, useState } from 'react';
import MenuItem from './MenuItem';
import MenuLoading from './MenuLoading';
import { useConfigContext } from '@modules/analyze/context';
import { checkIsPending } from '@modules/analyze/constant';
import menus from './menus';

const Divider = () => <div className="m-2 border-b"></div>;

const Menus = () => {
  const [activeId, setActiveId] = useState(window.location.hash);

  useEffect(() => {
    const hashChangeHandle = () => {
      setActiveId(window.location.hash);
    };
    // hashChangeHandle();
    window.addEventListener('hashchange', hashChangeHandle, false);
    return () => {
      window.removeEventListener('hashchange', hashChangeHandle, false);
    };
  }, []);

  return (
    <>
      <MenuItem hash={'trending'}>Trending</MenuItem>
      {menus.map((g) => {
        return (
          <Fragment key={g.name}>
            <Divider />
            <h2 className="m-2 text-xs text-gray-400">
              <a href={`#${g.id}`}>{g.name}</a>
            </h2>
            {g.groups.map((item) => {
              return (
                <MenuItem
                  hash={item.id}
                  key={item.name}
                  active={activeId === `#${item.id}`}
                >
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

const SideBarMenu = () => {
  const { status } = useConfigContext();

  if (checkIsPending(status)) {
    return <MenuLoading />;
  }

  return <Menus />;
};

export default SideBarMenu;
