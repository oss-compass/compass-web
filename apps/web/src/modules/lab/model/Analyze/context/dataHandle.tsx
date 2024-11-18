import { ModelMetric, Diagram } from '@oss-compass/graphql';
import { Level } from '@common/constant';
import first from 'lodash/first';
import uniq from 'lodash/uniq';
import parseISO from 'date-fns/parseISO';
import { formatISO, toFixed } from '@common/utils';
import getUnixTime from 'date-fns/getUnixTime';
import { DataResults } from '../type';

export const pickTabs = (
  slugsData: {
    label: string;
    level: Level;
    metric?: ModelMetric | null;
    __typename?: 'Panel';
    diagrams?: Array<Diagram> | null;
  }[]
): { label: string; value: string }[] => {
  const firstSlugItem = first(slugsData);
  const diagrams = firstSlugItem?.diagrams;

  return diagrams?.map?.((i) => ({
    label: i.tabIdent,
    value: i.tabIdent,
  }));
};

export const pickDataByTab = (
  slugsData: {
    label: string;
    level: Level;
    metric?: ModelMetric | null;
    __typename?: 'Panel';
    diagrams?: Array<Diagram> | null;
  }[],
  tab: string
): {
  label: string;
  level: Level;
  chartType: string;
  tab: string;
  dates: string[];
  values: number[];
}[] => {
  return slugsData.map(({ diagrams, level, label }) => {
    const diagram = diagrams?.find((i) => i.tabIdent === tab);
    return {
      label,
      level,
      chartType: diagram?.type,
      tab: diagram?.tabIdent,
      dates: diagram?.dates as string[],
      values: diagram?.values,
    };
  });
};

export function alignValuesWithDates(data: DataResults) {
  let allDates = [];
  data.forEach((repoItem) => {
    allDates = allDates.concat(repoItem.dates);
  });

  const alignDates = uniq(allDates).sort((a, b) => {
    return getUnixTime(parseISO(a)) - getUnixTime(parseISO(b));
  });

  return data.map(({ dates, values, ...rest }) => {
    alignDates.forEach((date, index) => {
      if (dates?.indexOf(date) === -1) {
        dates?.splice(index, 0, date);
        values.splice(index, 0, null);
      }
    });
    return {
      ...rest,
      dates,
      values,
    };
  });
}

export function formatData(data: DataResults) {
  return data.map((item) => {
    return {
      ...item,
      values: item.values?.map((i) => toFixed(i, 2)),
      dates: item.dates?.map((i) => formatISO(i)),
    };
  });
}
