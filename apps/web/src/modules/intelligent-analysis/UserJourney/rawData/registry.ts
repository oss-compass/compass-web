export const USER_JOURNEY_PROJECT_REGISTRY = {
  cann_ops_math_20260323_1500: {
    projectKey: 'cann_ops_math',
    label: 'cann/ops-math',
    reportPath:
      '/data/intelligent-analysis/user-journey/cann_ops-math-20260323-1500.json',
    version: 'DHDX-20260323-1500',
  },
  cann_ops_math_20260325_2335: {
    projectKey: 'cann_ops_math',
    label: 'cann/ops-math',
    reportPath:
      '/data/intelligent-analysis/user-journey/cann_ops-math-20260325-2335.json',
    version: 'DHDX-20260325-2335',
  },
  nvidia_cuda_samples_20260325_1920: {
    projectKey: 'nvidia_cuda_samples',
    label: 'nvidia/cuda-samples',
    reportPath:
      '/data/intelligent-analysis/user-journey/nvidia_cuda-samples-20260325-1920.json',
    version: 'DHDX-20260325-1920',
  },
  cann_cann_samples_20260325_1931: {
    projectKey: 'cann_cann_samples',
    label: 'cann/cann-samples',
    reportPath:
      '/data/intelligent-analysis/user-journey/cann_cann-samples-20260325-1931.json',
    version: 'DHDX-20260325-1931',
  },
} as const;

export type UserJourneyProjectFileKey =
  keyof typeof USER_JOURNEY_PROJECT_REGISTRY;

export type UserJourneyProjectKey =
  (typeof USER_JOURNEY_PROJECT_REGISTRY)[UserJourneyProjectFileKey]['projectKey'];

const registryEntries = Object.entries(USER_JOURNEY_PROJECT_REGISTRY) as Array<
  [
    UserJourneyProjectFileKey,
    (typeof USER_JOURNEY_PROJECT_REGISTRY)[UserJourneyProjectFileKey]
  ]
>;

export const USER_JOURNEY_PROJECT_REPORT_MAP = registryEntries.reduce(
  (acc, [fileKey, entry]) => {
    acc[fileKey] = entry.reportPath;

    return acc;
  },
  {} as Record<UserJourneyProjectFileKey, string>
);

export const USER_JOURNEY_PROJECT_KEY_MAP = registryEntries.reduce(
  (acc, [fileKey, entry]) => {
    acc[fileKey] = entry.projectKey as UserJourneyProjectKey;

    return acc;
  },
  {} as Record<UserJourneyProjectFileKey, UserJourneyProjectKey>
);

export const USER_JOURNEY_PROJECT_LABEL_MAP = registryEntries.reduce(
  (acc, [, entry]) => {
    const projectKey = entry.projectKey as UserJourneyProjectKey;

    if (!acc[projectKey]) {
      acc[projectKey] = entry.label;
    }

    return acc;
  },
  {} as Record<UserJourneyProjectKey, string>
);

export const USER_JOURNEY_PROJECT_VERSION_MAP = registryEntries.reduce(
  (acc, [fileKey, entry]) => {
    acc[fileKey] = entry.version;

    return acc;
  },
  {} as Record<UserJourneyProjectFileKey, string>
);

export const USER_JOURNEY_PROJECT_DEFAULT_FILE_MAP = registryEntries.reduce(
  (acc, [fileKey, entry]) => {
    const projectKey = entry.projectKey as UserJourneyProjectKey;

    if (!acc[projectKey]) {
      acc[projectKey] = fileKey;
    }

    return acc;
  },
  {} as Record<UserJourneyProjectKey, UserJourneyProjectFileKey>
);

export const USER_JOURNEY_FALLBACK_PROJECT: UserJourneyProjectFileKey =
  'cann_ops_math_20260323_1500';

export const USER_JOURNEY_PROJECT_OPTIONS = Object.entries(
  USER_JOURNEY_PROJECT_LABEL_MAP
).map(([projectKey, label]) => ({
  value: projectKey as UserJourneyProjectKey,
  label: `项目 ${label}`,
}));

export const USER_JOURNEY_PROJECT_VERSION_OPTIONS_MAP = Object.keys(
  USER_JOURNEY_PROJECT_LABEL_MAP
).reduce(
  (acc, currentProjectKey) => {
    const projectKey = currentProjectKey as UserJourneyProjectKey;

    acc[projectKey] = registryEntries
      .filter(([, entry]) => entry.projectKey === projectKey)
      .map(([fileKey, entry]) => ({
        value: fileKey,
        label: `\u7248\u672c ${entry.version}`,
      }));

    return acc;
  },
  {} as Record<
    UserJourneyProjectKey,
    Array<{
      value: UserJourneyProjectFileKey;
      label: string;
    }>
  >
);

export const USER_JOURNEY_COMPARE_PROJECT_OPTIONS = registryEntries.map(
  ([fileKey, entry]) => ({
    value: fileKey,
    label: `${entry.label}\uff08${entry.version}\uff09`,
  })
);
