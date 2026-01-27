import React from 'react';
import { BiCalendar, BiCaretDown, BiCheck } from 'react-icons/bi';
import classnames from 'classnames';
import { useToggle } from 'react-use';
import 'react-datepicker/dist/react-datepicker.css';
import { useTranslation } from 'next-i18next';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import Popper from '@mui/material/Popper';
import DashboardDateRangePicker from './DashboardDateRangePicker';
import type { OsBoardTimeRangePreset } from '../../types';

export interface DashboardDatePickerProps {
  preset: OsBoardTimeRangePreset;
  start?: string;
  end?: string;
  onChange: (
    preset: OsBoardTimeRangePreset,
    start?: string,
    end?: string
  ) => void;
  disable?: boolean;
}

export const rangeTags: OsBoardTimeRangePreset[] = ['7d', '30d', '90d', '1y'];

const DashboardDatePicker = ({
  preset,
  start,
  end,
  onChange,
  disable,
}: DashboardDatePickerProps) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [pickerPanelOpen, togglePickerPanel] = React.useState(false);

  // i18n mapping
  const i18RangeTag: Record<string, string> = {
    '7d': t('os_board:time.7d'),
    '30d': t('os_board:time.30d'),
    '90d': t('os_board:time.90d'),
    '1y': t('os_board:time.1y'),
    custom: t('analyze:custom'),
  };

  const currentLabel =
    preset === 'custom' && start && end
      ? `${start} ~ ${end}`
      : i18RangeTag[preset] || preset;

  const [showRangePicker, setShowRangePicker] = useToggle(preset === 'custom');

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (disable) return;
    setAnchorEl(event.currentTarget);
    togglePickerPanel((pre) => !pre);
  };

  return (
    <ClickAwayListener
      onClickAway={() => {
        if (!pickerPanelOpen) return;
        togglePickerPanel(false);
      }}
    >
      <div>
        <div
          className={classnames(
            'flex cursor-pointer items-center justify-center rounded-none px-3 py-1.5 text-sm hover:bg-gray-100',
            [disable ? 'cursor-not-allowed opacity-50' : 'cursor-pointer']
          )}
          onClick={(e) => handleClick(e)}
        >
          <BiCalendar className="mr-2 text-base text-black" />
          <span className="text-sm text-black">{currentLabel}</span>
          {disable ? null : <BiCaretDown className="ml-1 text-sm text-black" />}
        </div>
        <Popper
          open={pickerPanelOpen}
          style={{ zIndex: 1000 }}
          placement={'bottom'}
          anchorEl={anchorEl}
          modifiers={[{ name: 'offset', options: { offset: [0, 5] } }]}
        >
          <div
            className={
              'bg-base-100 right-0 w-[280px] rounded bg-white text-xs drop-shadow-md'
            }
          >
            <div className="flex flex-wrap justify-between px-4 pt-4">
              {rangeTags.map((tag) => (
                <div
                  key={tag}
                  className={classnames(
                    {
                      'bg-primary text-white':
                        preset === tag && !showRangePicker,
                    },
                    'mb-2 flex h-8 w-[120px] cursor-pointer justify-between border py-2 pl-3 pr-2 text-xs'
                  )}
                  onClick={() => {
                    onChange(tag);
                    togglePickerPanel(false);
                    setShowRangePicker(false);
                  }}
                >
                  {i18RangeTag[tag]}
                  {preset === tag && !showRangePicker && (
                    <div className="h-3.5 w-3.5 rounded-full bg-white">
                      <BiCheck className="text-primary text-sm" />
                    </div>
                  )}
                </div>
              ))}

              {/* Custom Option */}
              <div
                className={classnames(
                  'mb-2 flex h-8 w-[120px] cursor-pointer justify-between border py-2 pl-3 pr-2 text-xs',
                  {
                    'bg-primary text-white': showRangePicker,
                    'mb-4': !showRangePicker,
                  }
                )}
                onClick={() => setShowRangePicker(true)}
              >
                {t('analyze:custom')}
                {showRangePicker && (
                  <div className="h-3.5 w-3.5 rounded-full bg-white">
                    <BiCheck className="text-primary text-sm" />
                  </div>
                )}
              </div>
            </div>

            <div
              className={classnames('h-10 bg-[#F7F7F7] px-4', {
                hidden: !showRangePicker,
              })}
            >
              <DashboardDateRangePicker
                start={start}
                end={end}
                onChange={(s, e) => {
                  onChange('custom', s, e);
                  togglePickerPanel(false);
                }}
              />
            </div>
          </div>
        </Popper>
      </div>
    </ClickAwayListener>
  );
};

export default DashboardDatePicker;
