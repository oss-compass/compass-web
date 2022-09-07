import { Dispatch, SetStateAction, createContext, useContext } from 'react';

export interface DatePickerValue {
  startTime: string;
  endTime: string;
}

export interface DatePicker {
  value: DatePickerValue;
  update: Dispatch<SetStateAction<DatePickerValue>>;
}

export const DEFAULT_DATEPICKER_VALUE = {
  startTime: '',
  endTime: '',
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
