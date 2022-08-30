import { Dispatch, SetStateAction, createContext, useContext } from 'react';

export interface TimePickerValue {
  startTime: string;
  endTime: string;
}

export interface TimePicker {
  value: TimePickerValue;
  update: Dispatch<SetStateAction<TimePickerValue>>;
}

export const DEFAULT_TIMEPICKER_VALUE = {
  startTime: '',
  endTime: '',
};

export const TimePickerContext = createContext<TimePicker>({
  value: DEFAULT_TIMEPICKER_VALUE,
  update: () => DEFAULT_TIMEPICKER_VALUE,
});

export function useTimePickerContext() {
  return useContext(TimePickerContext);
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
