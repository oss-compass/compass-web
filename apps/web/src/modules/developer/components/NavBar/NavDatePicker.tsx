import React from 'react';
import { BiCalendar, BiCaretDown, BiCheck } from 'react-icons/bi';
import { rangeTags } from '@modules/developer/constant';
import classnames from 'classnames';
import { useToggle } from 'react-use';
import useI18RangeTag from './useI18RangeTag';
import useQueryDateRange from '@modules/developer/hooks/useQueryDateRange';
import useSwitchRange from '@modules/developer/components/NavBar/useSwitchRange';
import { useTranslation } from 'next-i18next';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import DateRangePicker from './DateRangePicker';
import Popper from '@mui/material/Popper';

const DateTagPanel = ({
  togglePickerPanel,
}: {
  togglePickerPanel: (v: boolean) => void;
}) => {
  const { t } = useTranslation();
  const i18RangeTag = useI18RangeTag();
  const { range } = useQueryDateRange();
  const { switchRange } = useSwitchRange();

  // 当 range 不在 rangeTags 范围内时，默认显示自定义日期选择器
  const [showRangePicker, setShowRangePicker] = useToggle(
    !rangeTags.includes(range as any)
  );

  return (
    <div
      className={'bg-base-100 right-0 w-[288px] rounded text-xs drop-shadow-md'}
    >
      <div className="flex flex-wrap justify-between px-4 pt-4">
        {rangeTags.map((t, index) => {
          return (
            <div
              className={classnames(
                { 'bg-primary text-white': range === t && !showRangePicker },
                'mb-2 flex h-8 w-[120px] cursor-pointer justify-between border py-2 pl-3 pr-2 text-xs'
              )}
              key={t}
              onClick={async () => {
                await switchRange(t);
                togglePickerPanel(false);
                setShowRangePicker(false);
              }}
            >
              {i18RangeTag[t]}
              {range === t && !showRangePicker && (
                <div className="h-3.5 w-3.5 rounded-full bg-white">
                  <BiCheck className="text-primary text-sm" />
                </div>
              )}
            </div>
          );
        })}
        <div
          className={classnames(
            'mb-2 flex h-8 w-[120px] cursor-pointer justify-between border py-2 pl-3 pr-2 text-xs',
            {
              'bg-primary text-white': showRangePicker,
              'mb-4': !showRangePicker,
            }
          )}
          onClick={async () => {
            setShowRangePicker(true);
          }}
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
        <DateRangePicker
          onClick={async (t) => {
            await switchRange(t);
            togglePickerPanel(false);
          }}
        />
      </div>
    </div>
  );
};

const NavDatePicker = ({ disable }: { disable?: boolean }) => {
  const i18RangeTag = useI18RangeTag();
  const { range } = useQueryDateRange();
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
          <span className="text-sm">{i18RangeTag[range] || range}</span>
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
          {
            <DateTagPanel
              togglePickerPanel={(v) => {
                togglePickerPanel(v);
              }}
            />
          }
        </Popper>
      </div>
    </ClickAwayListener>
  );
};

export default NavDatePicker;
