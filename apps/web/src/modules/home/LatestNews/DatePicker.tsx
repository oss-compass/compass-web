import React, { useRef, useState } from 'react';
import { DayClickEventHandler, DayPicker } from 'react-day-picker';
import { enGB, zhCN } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';
import { useTranslation } from 'react-i18next';
import Popper from '@mui/material/Popper';
import { useClickAway } from 'react-use';
import { format } from 'date-fns';

const eventList = [
  {
    titleCn: 'OSS-Compass 技术研讨周会; 腾讯会议号：513-5733-3878',
    titleEn:
      'OSS-Compass Technical Seminar Weekly Meeting; Tencent Conference No.:513-5733-3878  ',
    time: '14:15 - 15:15 (UTC+8)',
  },
  {
    titleCn: 'Compass Talk——Open Source Summit Europe 2023',
    titleEn: 'Compass Talk——Open Source Summit Europe 2023',
    time: '11:00 - 11:40 (UTC+2)',
    key: '2023-08-23',
  },
  {
    titleCn: 'OSS Compass社区2023年会及晚宴',
    titleEn: 'OSS Compass Community 2023 Annual Meeting and Dinner',
    time: '13:00 - 18:00 (UTC+8)',
    key: '2023-12-13',
  },
];

const DatePicker = () => {
  const { t, i18n } = useTranslation();
  const [selected, setSelected] = useState<Date>();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const bookedDays = [
    (date) => {
      return date.getDay() === 2 || date.getDay() === 4;
    },
    new Date(2023, 7, 23),
    new Date(2023, 11, 13),
  ];
  const bookedStyle = {
    border: '1px solid #3A5BEF',
    borderRadius: 'none',
    height: '30px',
    width: '30px',
    marginLeft: '5px',
  };
  useClickAway(popoverRef, () => {
    setOpen(false);
  });
  const handleDayClick: DayClickEventHandler = (day, modifiers, e) => {
    if (modifiers.booked) {
      setAnchorEl(e.currentTarget as HTMLElement);
      setOpen(true);
    }
  };
  const selectEvent = eventList.filter(({ key }, index) => {
    if (index === 0) {
      return selected?.getDay() === 2 || selected?.getDay() === 4;
    } else {
      return selected && format(selected, 'yyyy-MM-dd') === key;
    }
  });
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
          className="flex w-[240px] overflow-hidden rounded bg-black px-2 pt-2 pb-2 text-[#fff] drop-shadow-2xl"
          ref={popoverRef}
        >
          {selectEvent.map((item) => {
            return (
              <div key={item.titleCn} className="mt-1 flex justify-around">
                <div className="mt-1 mr-2 h-2 w-2 rounded-full bg-[#00B400]"></div>
                <div className="w-[220px] text-xs">
                  {i18n.language === 'en' ? item.titleEn : item.titleCn}
                  <div className="mt-1 mb-1 text-xs text-[#727272]">
                    {item.time}
                  </div>
                </div>
              </div>
            );
          })}
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
