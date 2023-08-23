import { alignValuesWithDates } from './dataHandle';
import jsonData from './test-data/metric-compare.json';
import jsonDataAligned from './test-data/metric-compare-aligned.json';

it('helper', function () {
  expect(alignValuesWithDates(jsonData)).toEqual(jsonDataAligned);
});
