import { alignValuesWithDates } from './dataHandle';
import jsonData from './test-data/metric-compare.json';
import jsonDataAligned from './test-data/metric-compare-aligned.json';

it('helper', function () {
  expect(alignValuesWithDates(jsonData)).toEqual(jsonDataAligned);
});

it('does not add comparison dates to the source report', () => {
  const source = [
    {
      label: 'first',
      level: 'repo',
      chartType: 'line',
      dates: ['2023-01-01'],
      values: [7],
    },
    {
      label: 'second',
      level: 'repo',
      chartType: 'line',
      dates: ['2023-02-01'],
      values: [0],
    },
  ];
  const original = JSON.parse(JSON.stringify(source));
  const aligned = alignValuesWithDates(source);
  expect(aligned.map(({ dates, values }) => ({ dates, values }))).toEqual([
    { dates: ['2023-01-01', '2023-02-01'], values: [7, null] },
    { dates: ['2023-01-01', '2023-02-01'], values: [null, 0] },
  ]);
  expect(source).toEqual(original);
  // Removing the other comparison must not leave its dates in this report.
  expect(alignValuesWithDates([source[0]])[0].dates).toEqual(['2023-01-01']);
});

it('can align read-only cached arrays', () => {
  const source = [
    {
      label: 'first',
      level: 'repo',
      chartType: 'line',
      dates: ['2023-01-01'],
      values: [7],
    },
    {
      label: 'second',
      level: 'repo',
      chartType: 'line',
      dates: ['2023-02-01'],
      values: [8],
    },
  ];
  source.forEach(({ dates, values }) => {
    Object.freeze(dates);
    Object.freeze(values);
  });
  expect(() => alignValuesWithDates(source)).not.toThrow();
});
