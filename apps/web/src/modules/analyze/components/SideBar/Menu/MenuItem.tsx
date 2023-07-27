import React, { PropsWithChildren, useRef, useState } from 'react';
import classnames from 'classnames';
import Popper from '@mui/material/Popper';

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
  const popoverAnchor = useRef<HTMLDivElement>(null);
  const [openedPopover, setOpenedPopover] = useState(false);

  return (
    <div className="group mb-0.5 px-4">
      <div
        ref={popoverAnchor}
        className="w-full"
        onMouseEnter={(event) => {
          setOpenedPopover(true);
        }}
        onMouseLeave={() => {
          setOpenedPopover(false);
        }}
      >
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
      </div>
      <Popper
        open={openedPopover}
        anchorEl={popoverAnchor.current}
        placement="right-start"
        className="z-modal"
      >
        <div
          className={classnames(
            'rounded bg-white py-2 drop-shadow-lg',
            'md:hidden'
          )}
          onMouseEnter={(event) => {
            setOpenedPopover(true);
          }}
          onMouseLeave={() => {
            setOpenedPopover(false);
          }}
        >
          {subMenu}
        </div>
      </Popper>
    </div>
  );
};

export default MenuItem;
