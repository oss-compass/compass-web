import React from 'react';
import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import { useCiDatasetsQuery } from '../CiExperience/queries';
import ExperienceOverview from './index';

jest.mock('next/router', () => ({ useRouter: jest.fn() }));
jest.mock('../CiExperience/queries', () => ({ useCiDatasetsQuery: jest.fn() }));
jest.mock(
  '../../UserJourney/OverviewDashboard/useOverviewSummaryQuery',
  () => ({
    useDefaultOverviewSummary: jest.fn(),
  })
);
jest.mock(
  '../IssueContribution/components/IssueOverview/useIssueOverviewSummaryQuery',
  () => ({
    useIssueOverviewSummaryQuery: jest.fn(),
  })
);
jest.mock(
  'next/dynamic',
  () => () =>
    function LoadingDashboard() {
      return <div>看板脚本加载中</div>;
    }
);

beforeEach(() => jest.clearAllMocks());

it('starts CI data while the dashboard script is still loading', () => {
  (useRouter as jest.Mock).mockReturnValue({
    isReady: true,
    query: { module: 'ci' },
  });
  render(<ExperienceOverview />);
  expect(screen.getByText('看板脚本加载中')).toBeInTheDocument();
  expect(useCiDatasetsQuery).toHaveBeenCalledWith(true, {
    reuseFreshData: true,
  });
});

it.each<[boolean, string, string | undefined]>([
  [false, 'ci', undefined],
  [true, 'issue', undefined],
  [true, 'community-onboarding', 'cann'],
  [true, 'ci', 'nvidia'],
])(
  'does not fetch CI data outside a ready supported CI overview',
  (isReady, module, org) => {
    (useRouter as jest.Mock).mockReturnValue({ isReady, query: { module } });
    render(<ExperienceOverview org={org} />);
    expect(useCiDatasetsQuery).toHaveBeenCalledWith(false, {
      reuseFreshData: true,
    });
  }
);
