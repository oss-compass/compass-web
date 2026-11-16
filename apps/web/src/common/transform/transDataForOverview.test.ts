import { transDataForOverview } from './transDataForOverview';
import overviewData from './testdata/overview.json';
import overviewOutputData from './testdata/overview_output.json';

const opts = [
  {
    type: 'metricCodequality',
    key: 'codeQualityGuarantee',
    legendName: 'collaboration development index',
  },
  {
    type: 'metricCommunity',
    key: 'communitySupportScore',
    legendName: 'community support score',
  },
  {
    type: 'metricActivity',
    key: 'activityScore',
    legendName: 'activity score',
  },
  {
    type: 'metricGroupActivity',
    key: 'organizationsActivity',
    legendName: 'organizations activity',
  },
];

const dateKey = 'grimoireCreationDate';

describe('transDataForOverview', () => {
  it('transDataForOverview', function () {
    const result = transDataForOverview(overviewData.data, opts, dateKey);
    // console.log(JSON.stringify(result, null, 2));
    expect(result).toEqual(overviewOutputData);
  });

  it('skips a metric type that has no data instead of indexing undefined', function () {
    const data = {
      metricCommunity: [
        { grimoireCreationDate: '2024-01-01T00:00:00.000Z', value: 1 },
      ],
    };
    const opts = [
      { type: 'metricCommunity', key: 'value', legendName: 'community' },
      { type: 'metricActivity', key: 'value', legendName: 'activity' },
    ];
    // @ts-ignore
    const result = transDataForOverview(data, opts, 'grimoireCreationDate');
    expect(result.xAxis.length).toBeGreaterThan(0);
  });
});
