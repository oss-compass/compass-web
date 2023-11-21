import { subMonths, subYears } from 'date-fns';

export const timeRange = {
  '1M': {
    start: subMonths(new Date(), 1),
    end: new Date(),
  },
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
  // '2Y': {
  //   start: subYears(new Date(), 2),
  //   end: new Date(),
  // },
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

const getTimeRangeTags = () => Object.keys(timeRange) as unknown as RangeTag[];

export const rangeTags = getTimeRangeTags();

export enum Level {
  COMMUNITY = 'community',
  PROJECT = 'project',
  REPO = 'repo',
}

// todo: add pages
// pending progress success error canceled unsumbit
export const checkIsPending = (status: string) => !['success'].includes(status);
