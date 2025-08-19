import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DateRangeType } from '@common/components/DateRangePicker';
import { subMonths, subYears } from 'date-fns';

export interface DateState {
  range: DateRangeType | string;
  timeStart: Date;
  timeEnd: Date;
}

export interface DateContextType {
  dateState: DateState;
  setDateState: (state: DateState) => void;
  updateDateRange: (
    range: DateRangeType | string,
    start?: Date,
    end?: Date
  ) => void;
}

// 创建时间范围计算函数
const getTimeRange = (rangeType: DateRangeType) => {
  const now = new Date();
  const end = now;
  let start: Date;

  switch (rangeType) {
    case '7d':
      start = subMonths(now, 0.25); // 约7天
      break;
    case '30d':
    case '1M':
      start = subMonths(now, 1);
      break;
    case '90d':
    case '3M':
      start = subMonths(now, 3);
      break;
    case '6M':
      start = subMonths(now, 6);
      break;
    case '1y':
    case '1Y':
      start = subYears(now, 1);
      break;
    case '3Y':
      start = subYears(now, 3);
      break;
    case '5Y':
      start = subYears(now, 5);
      break;
    case 'Since 2000':
      start = new Date(2000, 0, 1);
      break;
    default:
      start = subMonths(now, 1);
  }

  return { start, end };
};

const defaultDateState: DateState = {
  range: '1M' as DateRangeType,
  timeStart: getTimeRange('1M').start,
  timeEnd: getTimeRange('1M').end,
};

const DateContext = createContext<DateContextType | undefined>(undefined);

export const DateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [dateState, setDateState] = useState<DateState>(defaultDateState);

  const updateDateRange = (
    range: DateRangeType | string,
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
    } else if (start && end) {
      // 直接提供开始和结束时间
      setDateState({
        range,
        timeStart: start,
        timeEnd: end,
      });
    } else {
      // 预设时间范围
      const rangeType = range as DateRangeType;
      const timeRange = getTimeRange(rangeType);
      setDateState({
        range: rangeType,
        timeStart: timeRange.start,
        timeEnd: timeRange.end,
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
