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

  it('tolerates a metric type missing from the data (partial response)', () => {
    const partialData = {
      metricActivity: (overviewData.data as any).metricActivity,
    };

    const result = transDataForOverview(partialData, opts, dateKey);

    const activity = result.yAxisResult.find((r) => r.name === 'activityScore');
    const codeQuality = result.yAxisResult.find(
      (r) => r.name === 'codeQualityGuarantee'
    );
    expect(activity.data.length).toBe(result.xAxis.length);
    expect(activity.data.some((v) => v !== null)).toBe(true);
    expect(codeQuality.data.every((v) => v === null)).toBe(true);
  });

  it('tolerates a metric type that is null in the data (partial response)', () => {
    const partialData = {
      ...(overviewData.data as any),
      metricCommunity: null,
    };

    const result = transDataForOverview(partialData, opts, dateKey);

    const community = result.yAxisResult.find(
      (r) => r.name === 'communitySupportScore'
    );
    expect(community.data.every((v) => v === null)).toBe(true);
    expect(result.xAxis.length).toBeGreaterThan(0);
  });
});
