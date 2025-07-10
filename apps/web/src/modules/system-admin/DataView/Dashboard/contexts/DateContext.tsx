import React, { createContext, useContext, useState, ReactNode } from 'react';
import { RangeTag, timeRange } from '@modules/developer/constant';

export interface DateState {
  range: RangeTag | string;
  timeStart: Date;
  timeEnd: Date;
}

export interface DateContextType {
  dateState: DateState;
  setDateState: (state: DateState) => void;
  updateDateRange: (range: RangeTag | string, start?: Date, end?: Date) => void;
}

const defaultDateState: DateState = {
  range: '1M' as RangeTag,
  timeStart: timeRange['1M'].start,
  timeEnd: timeRange['1M'].end,
};

const DateContext = createContext<DateContextType | undefined>(undefined);

export const DateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [dateState, setDateState] = useState<DateState>(defaultDateState);

  const updateDateRange = (
    range: RangeTag | string,
    start?: Date,
    end?: Date
  ) => {
    if (typeof range === 'string' && range.includes(' ~ ')) {
      // 自定义日期范围
      const [startStr, endStr] = range.split(' ~ ');
      setDateState({
        range,
        timeStart: new Date(startStr),
        timeEnd: new Date(endStr),
      });
    } else if (range in timeRange) {
      // 预设时间范围
      const rangeTag = range as RangeTag;
      setDateState({
        range: rangeTag,
        timeStart: timeRange[rangeTag].start,
        timeEnd: timeRange[rangeTag].end,
      });
    } else if (start && end) {
      // 直接提供开始和结束时间
      setDateState({
        range,
        timeStart: start,
        timeEnd: end,
      });
    }
  };

  return (
    <DateContext.Provider
      value={{
        dateState,
        setDateState,
        updateDateRange,
      }}
    >
      {children}
    </DateContext.Provider>
  );
};

export const useDateContext = () => {
  const context = useContext(DateContext);
  if (context === undefined) {
    throw new Error('useDateContext must be used within a DateProvider');
  }
  return context;
};
