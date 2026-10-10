import type { IssueOverviewTopPain } from '../../types';
import { isResolvedPain, progressBucket } from './painProgress';

describe('overview pain progress', () => {
  it.each([1, 2, 3, 5, 7])(
    'classifies observe status %s as historical',
    (trackingStatus) => {
      const pain = {
        trackingType: 'observe',
        trackingStatus,
      } as IssueOverviewTopPain;
      expect(progressBucket(pain)).toBe('historical');
      expect(isResolvedPain(pain)).toBe(false);
    }
  );

  it.each([
    [1, 'pending'],
    [2, 'inProgress'],
    [3, 'inProgress'],
    [5, 'resolved'],
    [6, 'excluded'],
    [7, 'inProgress'],
  ])('keeps fix status %s in %s', (trackingStatus, bucket) => {
    expect(
      progressBucket({
        trackingType: 'fix',
        trackingStatus,
      } as IssueOverviewTopPain)
    ).toBe(bucket);
  });
});
