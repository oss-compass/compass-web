import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  PropsWithChildren,
} from 'react';
import { timeRange } from '@modules/analyze/constant';

export interface DatePickerValue {
  startTime: Date;
  endTime: Date;
}

export interface DatePicker {
  value: DatePickerValue;
  update: Dispatch<SetStateAction<DatePickerValue>>;
}

export const DEFAULT_DATEPICKER_VALUE = {
  startTime: timeRange['3M'].start,
  endTime: timeRange['3M'].end,
};

export const DatePickerContext = createContext<DatePicker>({
  value: DEFAULT_DATEPICKER_VALUE,
  update: () => DEFAULT_DATEPICKER_VALUE,
});

export function useDatePickerContext() {
  return useContext(DatePickerContext);
}

export const DatePickerContextProvider: React.FC<
  PropsWithChildren<{
    value: DatePicker;
  }>
> = ({ value, children }) => {
  return (
    <DatePickerContext.Provider value={value}>
      {children}
    </DatePickerContext.Provider>
  );
};
