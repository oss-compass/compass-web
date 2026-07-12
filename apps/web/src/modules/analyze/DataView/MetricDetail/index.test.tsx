import { render, screen } from '@testing-library/react';
import VerifyMetricDetail from './index';

jest.mock('@modules/analyze/hooks/useLabelStatus', () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock('@modules/analyze/hooks/useVerifyDetailRangeQuery', () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock('@modules/analyze/hooks/useHandleQueryParams', () => ({
  __esModule: true,
  useHandleQueryParams: () => ({ handleQueryParams: jest.fn() }),
}));
jest.mock('next-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));
jest.mock('next/router', () => ({
  useRouter: () => ({ query: {}, push: jest.fn() }),
}));
jest.mock('./MetricContributor', () => ({
  __esModule: true,
  default: () => <div data-testid="metric-contributor" />,
}));
jest.mock('./MetricIssue', () => ({
  __esModule: true,
  default: () => <div data-testid="metric-issue" />,
}));
jest.mock('./MetricPr', () => ({
  __esModule: true,
  default: () => <div data-testid="metric-pr" />,
}));
jest.mock('@modules/analyze/components/NavBar/MerticDatePicker', () => ({
  __esModule: true,
  default: () => <div data-testid="metric-date-picker" />,
}));
jest.mock('@modules/analyze/components/NavBar/LabelItems', () => ({
  __esModule: true,
  default: () => <div data-testid="label-items" />,
}));

const useLabelStatus = jest.requireMock('@modules/analyze/hooks/useLabelStatus')
  .default as jest.Mock;
const useVerifyDetailRangeQuery = jest.requireMock(
  '@modules/analyze/hooks/useVerifyDetailRangeQuery'
).default as jest.Mock;

const renderWithStatus = (status: string) => {
  useLabelStatus.mockReturnValue({
    isLoading: false,
    verifiedItems: [],
    status,
    notFound: false,
  });
  useVerifyDetailRangeQuery.mockReturnValue({ isLoading: false });
  render(<VerifyMetricDetail />);
};

describe('MetricDetail under-analysis state', () => {
  it('renders the under-analysis indicator when the analysis is still pending', () => {
    renderWithStatus('pending');
    expect(
      screen.getByText(
        'analyze:the_current_project_is_under_analysis_please_visit'
      )
    ).toBeInTheDocument();
  });

  it('also treats the in-progress status as under analysis', () => {
    renderWithStatus('progress');
    expect(
      screen.getByText(
        'analyze:the_current_project_is_under_analysis_please_visit'
      )
    ).toBeInTheDocument();
  });

  it('renders normal metric content instead of the under-analysis indicator once analysis succeeds', () => {
    renderWithStatus('success');
    expect(
      screen.queryByText(
        'analyze:the_current_project_is_under_analysis_please_visit'
      )
    ).not.toBeInTheDocument();
    expect(screen.getByTestId('metric-contributor')).toBeInTheDocument();
  });

  it('does not treat a not-found project as under analysis', () => {
    useLabelStatus.mockReturnValue({
      isLoading: false,
      verifiedItems: [],
      status: 'pending',
      notFound: true,
    });
    useVerifyDetailRangeQuery.mockReturnValue({ isLoading: false });
    render(<VerifyMetricDetail />);
    expect(
      screen.queryByText(
        'analyze:the_current_project_is_under_analysis_please_visit'
      )
    ).not.toBeInTheDocument();
    expect(screen.getByTestId('metric-contributor')).toBeInTheDocument();
  });

  it('shows the loading skeleton instead of metric content while the range query is loading', () => {
    useLabelStatus.mockReturnValue({
      isLoading: false,
      verifiedItems: [],
      status: 'success',
      notFound: false,
    });
    useVerifyDetailRangeQuery.mockReturnValue({ isLoading: true });
    render(<VerifyMetricDetail />);
    expect(
      screen.queryByText(
        'analyze:the_current_project_is_under_analysis_please_visit'
      )
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId('metric-contributor')).not.toBeInTheDocument();
  });
});
