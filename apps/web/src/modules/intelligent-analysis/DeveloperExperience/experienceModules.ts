export type ExperienceType =
  | 'community-onboarding'
  | 'issue-contribution'
  | 'ci-experience';

export type ExperienceModuleStatus = 'available' | 'planned';

export type ExperienceModuleDefinition = {
  type: ExperienceType;
  label: string;
  shortLabel: string;
  status: ExperienceModuleStatus;
  showInOverview: boolean;
};

export const EXPERIENCE_MODULES: ExperienceModuleDefinition[] = [
  {
    type: 'community-onboarding',
    label: '社区入门体验',
    shortLabel: '社区入门',
    status: 'available',
    showInOverview: true,
  },
  {
    type: 'issue-contribution',
    label: 'Issue 贡献体验',
    shortLabel: 'Issue 贡献',
    status: 'available',
    showInOverview: false,
  },
  {
    type: 'ci-experience',
    label: 'CI 体验',
    shortLabel: 'CI 体验',
    status: 'available',
    showInOverview: false,
  },
];

const EXPERIENCE_TYPES = new Set<ExperienceType>(
  EXPERIENCE_MODULES.map((item) => item.type)
);

export const isExperienceType = (value: unknown): value is ExperienceType =>
  typeof value === 'string' && EXPERIENCE_TYPES.has(value as ExperienceType);
