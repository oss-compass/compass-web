import React, { useId, useRef } from 'react';
import ChartDisplaySetting from '@modules/analyze/components/NavBar/ChartDisplaySetting';
import RepoFilter from '@modules/analyze/components/NavBar/RepoFilter';
import { AiOutlineSetting } from 'react-icons/ai';
import Popper from '@mui/material/Popper';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import useLevel from '@modules/analyze/hooks/useLevel';
import useCompareItems from '@modules/analyze/hooks/useCompareItems';
import Badge from '../Badge';
import { useTranslation } from 'next-i18next';

const NavbarSetting: React.FC = () => {
  const { t } = useTranslation();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popperId = useId();
  const level = useLevel();
  const { compareItems } = useCompareItems();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [dropdownOpen, toggleDropdown] = React.useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    toggleDropdown((pre) => !pre);
  };

  return (
    <ClickAwayListener
      onClickAway={() => {
        if (!dropdownOpen) return;
        toggleDropdown(() => false);
      }}
    >
      <div>
        <button
          type="button"
          ref={triggerRef}
          aria-label={t('analyze:display')}
          aria-expanded={dropdownOpen}
          aria-controls={dropdownOpen ? popperId : undefined}
          className="focus-visible:outline-primary mx-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[#CFCFCF] focus-visible:outline focus-visible:outline-2"
          onClick={(e) => handleClick(e)}
        >
          <AiOutlineSetting className="text-xl" aria-hidden="true" />
        </button>
        <Popper
          id={popperId}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              event.stopPropagation();
              toggleDropdown(false);
              triggerRef.current?.focus();
            }
          }}
          open={dropdownOpen}
          style={{
            zIndex: 1000,
          }}
          placement={'bottom-end'}
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
          <div className="bg-base-100 w-[150px] rounded py-2 text-xs drop-shadow-md">
            <ChartDisplaySetting />
            {level === 'community' && <RepoFilter />}
            {compareItems.length === 1 ? <Badge /> : null}
          </div>
        </Popper>
      </div>
    </ClickAwayListener>
  );
};

export default NavbarSetting;
