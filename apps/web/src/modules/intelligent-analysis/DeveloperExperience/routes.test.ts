import {
  buildCiExperienceHref,
  buildCommunityOnboardingHref,
  buildExperienceOverviewHref,
  buildIssueContributionHref,
  getExperienceModuleSwitchQuery,
} from './routes';

describe('DeveloperExperience routes', () => {
  it('builds an org-scoped community route and keeps repeated projects ordered', () => {
    expect(
      buildCommunityOnboardingHref(
        { org: 'cann team' },
        { project: ['runtime-v2', 'ops-nn-v1'], sig: 'compiler' }
      )
    ).toBe(
      '/intelligent-analysis/cann%20team/experience/community-onboarding?project=runtime-v2&project=ops-nn-v1&sig=compiler'
    );
  });

  it('builds the unscoped overview route', () => {
    expect(buildExperienceOverviewHref()).toBe(
      '/intelligent-analysis/experience/overview'
    );
  });

  it('keeps only compatible platform context between Issue and CI', () => {
    expect(
      getExperienceModuleSwitchQuery({
        sourceType: 'issue-contribution',
        targetType: 'ci-experience',
        query: {
          platform: 'gitcode',
          repo: 'runtime',
          period: '2026W29',
          dimension: 'response',
          adminToken: 'secret',
        },
      })
    ).toEqual({
      platform: 'gitcode',
    });
  });

  it('drops module-specific query when entering community onboarding', () => {
    expect(
      getExperienceModuleSwitchQuery({
        sourceType: 'ci-experience',
        targetType: 'community-onboarding',
        query: {
          platform: 'gitcode',
          repo: 'runtime',
          period: '2026W29',
          workflow: 'runtime_action',
        },
      })
    ).toEqual({});
  });

  it('does not guess a repository when leaving community onboarding', () => {
    expect(
      getExperienceModuleSwitchQuery({
        sourceType: 'community-onboarding',
        targetType: 'ci-experience',
        query: {
          project: ['runtime-v2', 'ops-nn-v1'],
          repo: 'runtime',
          adminToken: 'secret',
        },
      })
    ).toEqual({});
  });

  it('filters community-only query from a CI route', () => {
    expect(
      buildCiExperienceHref(
        { org: 'cann' },
        {
          repo: 'runtime',
          period: '2026W29',
          adminToken: 'secret',
          project: ['runtime-v2', 'ops-nn-v1'],
        }
      )
    ).toBe(
      '/intelligent-analysis/cann/experience/ci-experience?repo=runtime&period=2026W29'
    );
  });

  it('keeps the selected report version on an Issue contribution route', () => {
    expect(
      buildIssueContributionHref(
        {},
        {
          platform: 'gitcode',
          repo: 'cann/cann-samples',
          period: '2026_w28',
          version: 'v3',
          workflow: 'ignored',
        }
      )
    ).toBe(
      '/intelligent-analysis/experience/issue-contribution?platform=gitcode&repo=cann%2Fcann-samples&period=2026_w28&version=v3'
    );
  });
});
