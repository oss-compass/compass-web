import { Section } from '@modules/analyze/components/SideBar/config';

/**
 * Metric identifiers understood by the Compass badge service.
 *
 * A badge image is served at `/badge/<slug>.svg` and the metric it renders is
 * selected with the `metric` query parameter. The identifiers below are shared
 * with the analyze page, so when the metrics model evolves (a metric gets
 * renamed, dropped, or a new dimension is introduced) this is the single place
 * that has to be updated: the badge url, the section anchor used by the
 * generated Markdown snippet and the dialog grouping all derive from it.
 *
 * `badgeConfig.test.ts` pins every entry to its analyze section. That is what
 * catches regressions here: the previous lookup used `String.endsWith()` and
 * silently mapped `organizations_activity` to the `activity` anchor because
 * `'organizations_activity'.endsWith('activity')` is true.
 */
export const BADGE_METRIC = {
  COLLAB_DEV_INDEX: 'collab_dev_index',
  COMMUNITY: 'community',
  ACTIVITY: 'activity',
  ORGANIZATIONS_ACTIVITY: 'organizations_activity',
} as const;

export type BadgeMetric = (typeof BADGE_METRIC)[keyof typeof BADGE_METRIC];

/** Query parameter that selects the metric rendered by the badge service. */
export const BADGE_METRIC_QUERY_KEY = 'metric';

/** Pseudo metric for the plain project badge without any metric. */
export const BADGE_LOGO = 'logo';

export type BadgeSelection = typeof BADGE_LOGO | BadgeMetric;

export const BADGE_METRICS: BadgeMetric[] = Object.values(BADGE_METRIC);

export const isBadgeMetric = (
  value: string | null | undefined
): value is BadgeMetric =>
  typeof value === 'string' && (BADGE_METRICS as string[]).includes(value);

/**
 * Analyze section each badge points back to. The values are the DOM ids
 * rendered by `<SectionTitle id={...}>`, so they must stay in sync with the
 * `Section` enum used by the analyze sections.
 */
export const BADGE_METRIC_ANCHOR: Record<BadgeMetric, Section> = {
  [BADGE_METRIC.COLLAB_DEV_INDEX]: Section.CollaborationDevelopmentIndex,
  [BADGE_METRIC.COMMUNITY]: Section.CommunityServiceAndSupport,
  [BADGE_METRIC.ACTIVITY]: Section.CommunityActivity,
  [BADGE_METRIC.ORGANIZATIONS_ACTIVITY]: Section.OrganizationsActivity,
};

export type BadgeTopic = {
  /** i18n key of the dimension the badges belong to. */
  topicKey: string;
  metrics: BadgeMetric[];
};

/**
 * Grouping shown in the badge dialog. Keeping it next to the metric metadata
 * means a new model only needs one entry here instead of edits spread across
 * the JSX.
 */
export const BADGE_TOPICS: BadgeTopic[] = [
  {
    topicKey: 'analyze:topic.productivity',
    metrics: [BADGE_METRIC.COLLAB_DEV_INDEX, BADGE_METRIC.COMMUNITY],
  },
  {
    topicKey: 'analyze:topic.robustness',
    metrics: [BADGE_METRIC.ACTIVITY],
  },
  {
    topicKey: 'analyze:topic.niche_creation',
    metrics: [BADGE_METRIC.ORGANIZATIONS_ACTIVITY],
  },
];

/** Builds the badge image url for a slug and a metric selection. */
export const buildBadgeSrc = (
  slug: string | undefined | null,
  selection: BadgeSelection = BADGE_LOGO
): string => {
  if (!slug) {
    return '';
  }
  const badgePath = `/badge/${slug}.svg`;
  if (selection === BADGE_LOGO || !isBadgeMetric(selection)) {
    return badgePath;
  }
  return `${badgePath}?${BADGE_METRIC_QUERY_KEY}=${selection}`;
};

/**
 * Reads the metric back from a badge url. Parsing the query string explicitly
 * avoids the suffix matching that used to map `organizations_activity` to the
 * community-activity anchor.
 */
export const parseBadgeMetric = (
  badgeSrc: string | undefined | null
): BadgeMetric | undefined => {
  if (!badgeSrc) {
    return undefined;
  }
  const queryIndex = badgeSrc.indexOf('?');
  if (queryIndex === -1) {
    return undefined;
  }
  const params = new URLSearchParams(badgeSrc.slice(queryIndex + 1));
  const metric = params.get(BADGE_METRIC_QUERY_KEY);
  return isBadgeMetric(metric) ? metric : undefined;
};

export type BadgeLocation = {
  origin: string;
  pathname: string;
};

/** Absolute url of the badge image used inside the generated snippets. */
export const buildBadgeImageUrl = (badgeSrc: string, origin: string): string =>
  `${origin}${badgeSrc || ''}`;

/**
 * Url a badge click should lead to: the current analyze page plus the anchor of
 * the section the selected metric belongs to. Badges without a metric (the
 * plain project badge) simply link to the page.
 */
export const buildBadgeTargetUrl = (
  badgeSrc: string,
  location: BadgeLocation
): string => {
  const pageUrl = `${location.origin}${location.pathname}`;
  const metric = parseBadgeMetric(badgeSrc);
  const anchor = metric ? BADGE_METRIC_ANCHOR[metric] : undefined;
  return anchor ? `${pageUrl}#${anchor}` : pageUrl;
};

export type BadgeSnippetFormat = 'Markdown' | 'HTML' | 'Link';

export const BADGE_SNIPPET_FORMATS: BadgeSnippetFormat[] = [
  'Markdown',
  'HTML',
  'Link',
];

export const BADGE_IMAGE_ALT = 'OSS Compass Analyze';

/** Renders the copyable snippet for the selected tab. */
export const buildBadgeSnippet = (
  badgeSrc: string,
  format: BadgeSnippetFormat,
  location: BadgeLocation
): string => {
  const imageUrl = buildBadgeImageUrl(badgeSrc, location.origin);
  switch (format) {
    case 'Markdown': {
      return `[![${BADGE_IMAGE_ALT}](${imageUrl})](${buildBadgeTargetUrl(
        badgeSrc,
        location
      )})`;
    }
    case 'HTML': {
      return `<img src="${imageUrl}" alt="${BADGE_IMAGE_ALT}" />`;
    }
    case 'Link': {
      return imageUrl;
    }
    default: {
      return '';
    }
  }
};
