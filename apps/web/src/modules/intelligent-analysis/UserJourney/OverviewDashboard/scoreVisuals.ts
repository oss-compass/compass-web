import {
  OVERVIEW_COLORS,
  OVERVIEW_STATUS_COLORS,
  OVERVIEW_TONES,
} from './theme';

export type OverviewScoreBand = {
  key: 'outstanding' | 'excellent' | 'good' | 'fair' | 'risk' | 'critical';
  label: string;
  color: string;
  fill: string;
  textColor: string;
  matches: (score: number) => boolean;
};

/** 社区入门与社区贡献总览共用的评分分档色板。 */
export const OVERVIEW_SCORE_BANDS: OverviewScoreBand[] = [
  {
    key: 'excellent',
    label: '90–100',
    color: OVERVIEW_TONES.success.tagColor,
    fill: OVERVIEW_STATUS_COLORS.resolved.solidBg,
    textColor: OVERVIEW_COLORS.white,
    matches: (score) => score >= 90,
  },
  {
    key: 'good',
    label: '80–89',
    color: OVERVIEW_TONES.primary.tagColor,
    fill: OVERVIEW_STATUS_COLORS.inProgress.solidBg,
    textColor: OVERVIEW_COLORS.white,
    matches: (score) => score >= 80 && score < 90,
  },
  {
    key: 'fair',
    label: '70–79',
    color: OVERVIEW_TONES.neutral.tagColor,
    fill: OVERVIEW_COLORS.slateLight,
    textColor: OVERVIEW_COLORS.white,
    matches: (score) => score >= 70 && score < 80,
  },
  {
    key: 'risk',
    label: '60–69',
    color: OVERVIEW_TONES.warning.tagColor,
    fill: OVERVIEW_STATUS_COLORS.pending.solidBg,
    textColor: OVERVIEW_COLORS.white,
    matches: (score) => score >= 60 && score < 70,
  },
  {
    key: 'critical',
    label: '0–59',
    color: OVERVIEW_TONES.danger.tagColor,
    fill: OVERVIEW_COLORS.priorityBlocker,
    textColor: OVERVIEW_COLORS.white,
    matches: (score) => score < 60,
  },
];

/** 社区入门专用：95 分及以上单独用深绿色标识。 */
export const ONBOARDING_SCORE_BANDS: OverviewScoreBand[] = [
  {
    key: 'outstanding',
    label: '95–100',
    color: OVERVIEW_COLORS.greenDark,
    fill: OVERVIEW_COLORS.greenDark,
    textColor: OVERVIEW_COLORS.white,
    matches: (score) => score >= 95,
  },
  {
    ...OVERVIEW_SCORE_BANDS[0],
    label: '90–<95',
    matches: (score) => score >= 90 && score < 95,
  },
  ...OVERVIEW_SCORE_BANDS.slice(1),
];

export const getOnboardingScoreColor = (score: number) =>
  ONBOARDING_SCORE_BANDS.find((band) => band.matches(score))?.color ??
  OVERVIEW_COLORS.slate;

export const getOverviewScoreColor = (score: number) =>
  OVERVIEW_SCORE_BANDS.find((band) => band.matches(score))?.color ??
  OVERVIEW_COLORS.slate;
