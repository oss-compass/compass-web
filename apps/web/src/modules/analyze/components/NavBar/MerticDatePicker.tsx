import React from 'react';
import { BiCalendar, BiCaretDown } from 'react-icons/bi';
import classnames from 'classnames';
import useI18RangeTag from './useI18RangeTag';
import useVerifyDateRange from '@modules/analyze/DataView/MetricDetail/useVerifyDateRange';
import 'react-datepicker/dist/react-datepicker.css';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import Popper from '@mui/material/Popper';
import ContributorDateTagPanel from './ContributorDateTagPanel';

const NavDatePicker = ({ disable }: { disable?: boolean }) => {
  const i18RangeTag = useI18RangeTag();
  const { range } = useVerifyDateRange();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [pickerPanelOpen, togglePickerPanel] = React.useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (disable) return;
    setAnchorEl(event.currentTarget);
    togglePickerPanel((pre) => !pre);
  };

  return (
    <ClickAwayListener
      onClickAway={() => {
        if (!pickerPanelOpen) return;
        togglePickerPanel(() => false);
      }}
    >
      <div>
        <div
          className={classnames('flex h-10 items-center', [
            disable ? 'cursor-not-allowed' : 'cursor-pointer',
          ])}
          onClick={(e) => handleClick(e)}
        >
          <BiCalendar className="mr-2.5 text-xl" />
          <span className="text-sm md:hidden">
            {i18RangeTag[range] || range}
          </span>
          {disable ? null : <BiCaretDown className="ml-1 text-sm" />}
        </div>
        <Popper
          open={pickerPanelOpen}
          style={{
            zIndex: 1000,
          }}
          placement={'bottom'}
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
          <ContributorDateTagPanel
            togglePickerPanel={(v) => {
              togglePickerPanel(v);
            }}
          />
        </Popper>
      </div>
    </ClickAwayListener>
  );
};

export default NavDatePicker;
