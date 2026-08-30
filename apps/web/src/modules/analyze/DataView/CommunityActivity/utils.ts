import { convertMonthsToDays } from '@common/utils/format';
import { DataContainerResult } from '@modules/analyze/type';

// convert months to days.
export const convertResult = (result: DataContainerResult) => {
  result.summaryMean = result.summaryMean.map((value) =>
    convertMonthsToDays(value)
  );
  result.summaryMedian = result.summaryMedian.map((value) =>
    convertMonthsToDays(value)
  );
  result.yResults = result.yResults.map((item) => {
    item.data = item.data.map((value) => convertMonthsToDays(value));
    return item;
  });
  return result;
};
