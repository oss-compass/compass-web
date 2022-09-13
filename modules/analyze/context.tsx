import { Dispatch, SetStateAction, createContext, useContext } from 'react';
import { quickSelectRange, timeRange } from '@modules/analyze/constant';

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

export interface CompareUrlsValue {
  urls: string[];
}

export const DEFAULT_COMPARE_URLS_VALUE = {
  urls: [],
};

export interface CompareUrls {
  value: CompareUrlsValue;
  update: Dispatch<SetStateAction<CompareUrlsValue>>;
}

export const CompareUrlsContext = createContext<CompareUrls>({
  value: DEFAULT_COMPARE_URLS_VALUE,
  update: () => DEFAULT_COMPARE_URLS_VALUE,
});

export function useCompareUrlsContext() {
  return useContext(CompareUrlsContext);
}
