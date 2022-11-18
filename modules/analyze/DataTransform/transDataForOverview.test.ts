import { transDataForOverview } from './transDataForOverview';
import overviewData from './testdata/overview.json';
import overviewOutputData from './testdata/overview_output.json';

const opts = [
  {
    type: 'metricCodequality',
    key: 'codeQualityGuarantee',
    legendName: 'code quality guarantee',
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
    type: 'groupMetricActivity',
    key: 'organizationsActivity',
    legendName: 'organizations activity',
  },
];

const dateKey = 'grimoireCreationDate';

describe('transDataForOverview', () => {
  it('transDataForOverview', function () {
    const result = transDataForOverview(overviewData.data, opts, dateKey);
    expect(result).toEqual(overviewOutputData);
  });
});
