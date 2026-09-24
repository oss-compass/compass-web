/**
 * Helpers behind the "contribution domain persona" floating window that the
 * deep insight contribution pie charts display when an individual developer
 * slice is hovered.
 *
 * The module deliberately has no React/echarts dependency: the charts only
 * feed it the raw echarts event payload, which keeps the helpers easy to unit
 * test and reusable by every pie chart rendering contributors.
 */
import type { ContributorDetail } from '@oss-compass/graphql';

/** Only the echarts event payload fields that are actually relied on. */
export interface ContributorSliceParams {
  name?: string;
  data?: {
    name?: string;
    parentName?: string;
    [key: string]: unknown;
  } | null;
  event?: {
    event?: { clientX?: number; clientY?: number } | null;
    offsetX?: number;
    offsetY?: number;
  } | null;
}

/** Zero sized element accepted by MUI Popper as its `anchorEl`. */
export interface VirtualAnchor {
  getBoundingClientRect: () => DOMRect;
}

export interface ContributorDetailQueryContext {
  label: string;
  level: string;
  beginDate: Date;
  endDate: Date;
}

/**
 * In the contribution pie charts only the outer ring represents contributors,
 * and it is the only series whose data carries the ecological `parentName`.
 * The inner ecological ring and the labels must not open the persona window.
 */
export const isContributorSlice = (
  params?: ContributorSliceParams | null
): boolean => Boolean(params?.data?.parentName);

/** Name of the contributor the cursor currently points at. */
export const getContributorName = (
  params?: ContributorSliceParams | null
): string => params?.data?.name || params?.name || '';

/**
 * echarts wraps the native DOM event and the pointer position can be missing
 * when the event is triggered programmatically, so both the viewport
 * coordinates and the canvas relative offsets are supported.
 */
export const getPointerPosition = (
  params?: ContributorSliceParams | null
): { x: number; y: number } => ({
  x: params?.event?.event?.clientX ?? params?.event?.offsetX ?? 0,
  y: params?.event?.event?.clientY ?? params?.event?.offsetY ?? 0,
});

/**
 * MUI Popper follows a virtual element, anchoring it on the pointer lets the
 * persona window open right next to the hovered slice.
 */
export const createVirtualAnchor = (
  clientX: number,
  clientY: number
): VirtualAnchor => ({
  getBoundingClientRect: () =>
    ({
      x: clientX,
      y: clientY,
      top: clientY,
      left: clientX,
      right: clientX,
      bottom: clientY,
      width: 0,
      height: 0,
      toJSON: () => ({}),
    } as DOMRect),
});

/**
 * Variables used to look up a single contributor. The floating window only
 * needs the domain persona of the slice below the cursor, hence the request is
 * limited to the first item of the existing contributor detail list query.
 */
export const buildContributorDetailVariables = (
  context: ContributorDetailQueryContext,
  contributor: string
) => ({
  label: context.label,
  level: context.level,
  beginDate: context.beginDate,
  endDate: context.endDate,
  page: 1,
  per: 1,
  filterOpts: [{ type: 'contributor', values: [contributor] }],
});

/** Read the contributor detail and its git platform from the query result. */
export const getContributorDetailFromResult = (result?: {
  contributorsDetailList?: {
    items?: ContributorDetail[];
    origin?: string;
  } | null;
}): { detail: ContributorDetail | null; origin: string } => {
  const page = result?.contributorsDetailList;
  return {
    detail: page?.items?.[0] ?? null,
    origin: page?.origin ?? '',
  };
};

/**
 * react-query keeps the previous response while the next contributor is being
 * fetched, so the window is only opened once the loaded detail really belongs
 * to the contributor below the cursor.
 */
export const isDetailOfContributor = (
  detail: ContributorDetail | null | undefined,
  contributor: string
): boolean => {
  if (!detail) return false;
  if (!detail.contributor) return true;
  return detail.contributor.toLowerCase() === contributor.toLowerCase();
};
