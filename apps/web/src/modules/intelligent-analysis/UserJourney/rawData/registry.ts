export const USER_JOURNEY_PROJECT_REPORT_MAP = {
  // cann_ops_math: '/data/intelligent-analysis/user-journey/projects.json',
  nvidia_cuda_samples:
    '/data/intelligent-analysis/user-journey/nvidia_cuda_samples.json',
  cann_cann_samples:
    '/data/intelligent-analysis/user-journey/cann_cann_samples.json',
} as const;

export const USER_JOURNEY_PROJECT_LABEL_MAP = {
  // cann_ops_math: 'cann/ops-math',
  cann_cann_samples: 'cann/cann-samples',
  nvidia_cuda_samples: 'nvidia/cuda-samples',
} as const;

export const USER_JOURNEY_PROJECT_VERSION_MAP = {
  cann_cann_samples: 'DHDX-2026-0325-1929',
  nvidia_cuda_samples: 'DHDX-2026-0325-1437',
} as const;

export type UserJourneyProjectFileKey =
  keyof typeof USER_JOURNEY_PROJECT_REPORT_MAP;

export const USER_JOURNEY_FALLBACK_PROJECT: UserJourneyProjectFileKey =
  'cann_cann_samples';

export const USER_JOURNEY_PROJECT_OPTIONS = Object.keys(
  USER_JOURNEY_PROJECT_REPORT_MAP
).map((key) => ({
  value: key as UserJourneyProjectFileKey,
  label: USER_JOURNEY_PROJECT_LABEL_MAP[key as UserJourneyProjectFileKey],
}));

export const USER_JOURNEY_PROJECT_VERSION_OPTIONS_MAP = Object.keys(
  USER_JOURNEY_PROJECT_VERSION_MAP
).reduce(
  (acc, key) => {
    const projectKey = key as UserJourneyProjectFileKey;

    acc[projectKey] = [
      {
        value: USER_JOURNEY_PROJECT_VERSION_MAP[projectKey],
        label: `版本 ${USER_JOURNEY_PROJECT_VERSION_MAP[projectKey]}`,
      },
    ];

    return acc;
  },
  {} as Record<
    UserJourneyProjectFileKey,
    Array<{
      value: string;
      label: string;
    }>
  >
);
