import React, { ReactNode, forwardRef, useImperativeHandle } from 'react';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import PopperBase, { PopperPlacementType } from '@mui/material/Popper';

export interface PopperProps {
  content: ReactNode;
  children: (fn: (event: React.MouseEvent<HTMLElement>) => void) => ReactNode;
  placement?: PopperPlacementType;
}

export interface PopperRefProps {
  toggle: () => void;
}

export const Popper = forwardRef<PopperRefProps, PopperProps>(
  ({ children, placement = 'top', content }, ref) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [showPopper, togglePopper] = React.useState(false);

    const handleTrigger = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
      togglePopper((pre) => !pre);
    };

    useImperativeHandle(ref, () => ({
      toggle: () => {
        togglePopper((p) => !p);
      },
    }));

    return (
      <ClickAwayListener
        onClickAway={() => {
          if (!showPopper) return;
          togglePopper(() => false);
        }}
      >
        <div>
          {children(handleTrigger)}
          <PopperBase
            open={showPopper}
            style={{
              zIndex: 1000,
            }}
            placement={placement}
            anchorEl={anchorEl}
            modifiers={[
              {
                name: 'offset',
                options: {
                  offset: [0, 5],
                },
              },
            ]}
          >
            {content}
          </PopperBase>
        </div>
      </ClickAwayListener>
    );
  }
);

Popper.displayName = 'Popper';
