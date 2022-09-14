import { subMonths, subYears } from 'date-fns';

export const quickSelectRange = [
  '3M',
  '6M',
  '1Y',
  '2Y',
  '3Y',
  '5Y',
  'Since 2000',
];

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
