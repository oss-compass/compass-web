import React, { useEffect, useRef, useState } from 'react';
import { DayClickEventHandler, DayPicker } from 'react-day-picker';
import { enGB, zhCN } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';
import { useTranslation } from 'react-i18next';
import Popper from '@mui/material/Popper';
import { useClickAway } from 'react-use';

const DatePicker = () => {
  const { t, i18n } = useTranslation();
  const [selected, setSelected] = useState<Date>();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const bookedDays = [new Date(2023, 8, 21)];
  const bookedStyle = { border: '2px solid #3A5BEF', borderRadius: 'none' };

  useClickAway(popoverRef, () => {
    setOpen(false);
  });
  const handleDayClick: DayClickEventHandler = (day, modifiers, e) => {
    if (modifiers.booked) {
      setAnchorEl(e.currentTarget as HTMLElement);
      setOpen(true);
    }
  };
  return (
    <>
      <Popper
        id={'1'}
        open={open}
        anchorEl={anchorEl}
        modifiers={[
          {
            name: 'arrow',
            enabled: true,
          },
        ]}
      >
        <div
          className="flex w-[240px] justify-around overflow-hidden rounded bg-black px-2 pt-2 pb-2 text-[#fff] drop-shadow-2xl"
          ref={popoverRef}
        >
          <div className="mt-1.5 h-2 w-2 rounded-full bg-[#00B400]"></div>
          <div className="w-[200px] text-xs">
            Compass Talk——Open Source Summit Europe 2023
            <div className="mt-1 text-xs text-[#727272]">
              11:00 - 11:40 (UTC+2)
            </div>
          </div>
        </div>
      </Popper>
      <DayPicker
        locale={i18n.language === 'en' ? enGB : zhCN}
        mode="single"
        selected={selected}
        onSelect={setSelected}
        modifiers={{ booked: bookedDays }}
        modifiersStyles={{ booked: bookedStyle }}
        onDayClick={handleDayClick}
      />
    </>
  );
};
export default DatePicker;
