import { subMonths, subYears } from 'date-fns';

export const timeRange = {
  '3M': {
    start: subMonths(new Date(), 3),
    end: new Date(),
  },
  '6M': {
    start: subMonths(new Date(), 6),
    end: new Date(),
  },
  '1Y': {
    start: subYears(new Date(), 1),
    end: new Date(),
  },
  '2Y': {
    start: subYears(new Date(), 2),
    end: new Date(),
  },
  '3Y': {
    start: subYears(new Date(), 3),
    end: new Date(),
  },
  '5Y': {
    start: subYears(new Date(), 5),
    end: new Date(),
  },
  'Since 2000': {
    start: new Date('2000'),
    end: new Date(),
  },
};

export type RangeTag = keyof typeof timeRange;

export const getTimeRangeTags = () =>
  Object.keys(timeRange) as unknown as RangeTag[];

export const defaultDatePicker = {
  timeStart: timeRange['3M'].start,
  timeEnd: timeRange['3M'].end,
};

export enum Level {
  PROJECT = 'project',
  REPO = 'repo',
}

export const checkIsPadding = (status: string) =>
  ['pending', 'progress'].indexOf(status) > -1;
