import { Section } from '@modules/analyze/components/SideBar/config';
import {
  BADGE_IMAGE_ALT,
  BADGE_LOGO,
  BADGE_METRIC,
  BADGE_METRIC_ANCHOR,
  BADGE_METRICS,
  BADGE_TOPICS,
  BadgeMetric,
  BadgeSnippetFormat,
  buildBadgeImageUrl,
  buildBadgeSnippet,
  buildBadgeSrc,
  buildBadgeTargetUrl,
  isBadgeMetric,
  parseBadgeMetric,
} from './badgeConfig';

const location = {
  origin: 'https://oss-compass.org',
  pathname: '/analyze/S1',
};

describe('badge metric metadata', () => {
  it('links every badge metric to a unique analyze section', () => {
    const anchors = BADGE_METRICS.map((metric) => BADGE_METRIC_ANCHOR[metric]);
    expect(new Set(anchors).size).toBe(BADGE_METRICS.length);
    expect(BADGE_METRIC_ANCHOR[BADGE_METRIC.COLLAB_DEV_INDEX]).toBe(
      Section.CollaborationDevelopmentIndex
    );
    expect(BADGE_METRIC_ANCHOR[BADGE_METRIC.COMMUNITY]).toBe(
      Section.CommunityServiceAndSupport
    );
    expect(BADGE_METRIC_ANCHOR[BADGE_METRIC.ACTIVITY]).toBe(
      Section.CommunityActivity
    );
    expect(BADGE_METRIC_ANCHOR[BADGE_METRIC.ORGANIZATIONS_ACTIVITY]).toBe(
      Section.OrganizationsActivity
    );
  });

  it('groups every metric into exactly one dialog topic', () => {
    const grouped = BADGE_TOPICS.reduce<BadgeMetric[]>(
      (acc, topic) => acc.concat(topic.metrics),
      []
    );
    expect(grouped.sort()).toEqual([...BADGE_METRICS].sort());
  });

  it('rejects values that are not a known metric', () => {
    expect(isBadgeMetric(BADGE_METRIC.ACTIVITY)).toBe(true);
    expect(isBadgeMetric('organizations')).toBe(false);
    expect(isBadgeMetric('')).toBe(false);
    expect(isBadgeMetric(null)).toBe(false);
    expect(isBadgeMetric(undefined)).toBe(false);
  });
});

describe('buildBadgeSrc', () => {
  it('builds the plain badge url for the logo selection', () => {
    expect(buildBadgeSrc('S1')).toBe('/badge/S1.svg');
    expect(buildBadgeSrc('S1', BADGE_LOGO)).toBe('/badge/S1.svg');
  });

  it('builds a metric badge url for every metric', () => {
    expect(buildBadgeSrc('S1', BADGE_METRIC.COMMUNITY)).toBe(
      '/badge/S1.svg?metric=community'
    );
    expect(buildBadgeSrc('S1', BADGE_METRIC.ORGANIZATIONS_ACTIVITY)).toBe(
      '/badge/S1.svg?metric=organizations_activity'
    );
  });

  it('returns an empty url while the slug is not resolved yet', () => {
    expect(buildBadgeSrc(undefined, BADGE_METRIC.ACTIVITY)).toBe('');
    expect(buildBadgeSrc('', BADGE_METRIC.ACTIVITY)).toBe('');
    expect(buildBadgeSrc(null)).toBe('');
  });
});

describe('parseBadgeMetric', () => {
  it('round trips every metric through the generated url', () => {
    BADGE_METRICS.forEach((metric) => {
      expect(parseBadgeMetric(buildBadgeSrc('S1', metric))).toBe(metric);
    });
  });

  it('returns undefined for the plain badge and malformed urls', () => {
    expect(parseBadgeMetric(buildBadgeSrc('S1'))).toBeUndefined();
    expect(parseBadgeMetric('')).toBeUndefined();
    expect(parseBadgeMetric(undefined)).toBeUndefined();
    expect(parseBadgeMetric('/badge/S1.svg')).toBeUndefined();
    expect(parseBadgeMetric('/badge/S1.svg?metric=unknown')).toBeUndefined();
    expect(parseBadgeMetric('/badge/S1.svg?metric=')).toBeUndefined();
    expect(parseBadgeMetric('/badge/S1.svg?foo=community')).toBeUndefined();
  });

  it('accepts the metric when it is not the first query parameter', () => {
    expect(parseBadgeMetric('/badge/S1.svg?theme=dark&metric=activity')).toBe(
      BADGE_METRIC.ACTIVITY
    );
  });

  it('stays stable when called repeatedly', () => {
    const badgeSrc = buildBadgeSrc('S1', BADGE_METRIC.COMMUNITY);
    expect(parseBadgeMetric(badgeSrc)).toBe(BADGE_METRIC.COMMUNITY);
    expect(parseBadgeMetric(badgeSrc)).toBe(BADGE_METRIC.COMMUNITY);
  });
});

describe('buildBadgeTargetUrl', () => {
  it('anchors the niche creation badge to the organizations section', () => {
    const badgeSrc = buildBadgeSrc('S1', BADGE_METRIC.ORGANIZATIONS_ACTIVITY);
    expect(buildBadgeTargetUrl(badgeSrc, location)).toBe(
      'https://oss-compass.org/analyze/S1#organizations_activity'
    );
  });

  it('does not confuse organizations_activity with the activity suffix', () => {
    const activity = buildBadgeTargetUrl(
      buildBadgeSrc('S1', BADGE_METRIC.ACTIVITY),
      location
    );
    const organizations = buildBadgeTargetUrl(
      buildBadgeSrc('S1', BADGE_METRIC.ORGANIZATIONS_ACTIVITY),
      location
    );
    expect(activity).toBe(
      'https://oss-compass.org/analyze/S1#community_activity'
    );
    expect(organizations).not.toBe(activity);
  });

  it('links badges without a metric to the page itself', () => {
    expect(buildBadgeTargetUrl(buildBadgeSrc('S1'), location)).toBe(
      'https://oss-compass.org/analyze/S1'
    );
    expect(buildBadgeTargetUrl('', location)).toBe(
      'https://oss-compass.org/analyze/S1'
    );
    expect(buildBadgeTargetUrl('/badge/S1.svg?metric=nope', location)).toBe(
      'https://oss-compass.org/analyze/S1'
    );
  });
});

describe('badge snippets', () => {
  it('keeps the markdown image anchored to the metric section', () => {
    const badgeSrc = buildBadgeSrc('S1', BADGE_METRIC.ACTIVITY);
    expect(buildBadgeSnippet(badgeSrc, 'Markdown', location)).toBe(
      `[![${BADGE_IMAGE_ALT}](https://oss-compass.org/badge/S1.svg?metric=activity)](https://oss-compass.org/analyze/S1#community_activity)`
    );
  });

  it('renders the html and plain link variants', () => {
    const badgeSrc = buildBadgeSrc('S1');
    expect(buildBadgeSnippet(badgeSrc, 'HTML', location)).toBe(
      `<img src="https://oss-compass.org/badge/S1.svg" alt="${BADGE_IMAGE_ALT}" />`
    );
    expect(buildBadgeSnippet(badgeSrc, 'Link', location)).toBe(
      'https://oss-compass.org/badge/S1.svg'
    );
  });

  it('returns an empty snippet for an unknown tab', () => {
    const unknownTab = 'Unknown' as unknown as BadgeSnippetFormat;
    expect(buildBadgeSnippet(buildBadgeSrc('S1'), unknownTab, location)).toBe(
      ''
    );
  });

  it('does not throw while the slug is still missing', () => {
    expect(buildBadgeImageUrl('', location.origin)).toBe(
      'https://oss-compass.org'
    );
    expect(buildBadgeSnippet('', 'Link', location)).toBe(
      'https://oss-compass.org'
    );
  });
});
