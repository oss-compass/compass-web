import React from 'react';
import { render } from '@testing-library/react';
import MetricDetail from './index';

jest.mock('next-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { slugs: 'abc123' },
    asPath: '/analyze/insight/abc123',
  }),
}));

jest.mock('@modules/analyze/hooks/useVerifyDetailRangeQuery', () => ({
  __esModule: true,
  default: () => ({ isLoading: false, data: undefined }),
}));

jest.mock('@modules/analyze/hooks/useHandleQueryParams', () => ({
  useHandleQueryParams: () => ({ handleQueryParams: jest.fn() }),
}));

jest.mock('@modules/analyze/components/NavBar/MerticDatePicker', () => ({
  __esModule: true,
  default: () => <div />,
}));

jest.mock('@modules/analyze/components/NavBar/LabelItems', () => ({
  __esModule: true,
  default: () => <div />,
}));

jest.mock('@common/components/Tab', () => ({
  __esModule: true,
  default: ({ value }: { value: string }) => (
    <div data-testid="my-tab">{value}</div>
  ),
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

const useLabelStatusMock = jest.fn();
jest.mock('@modules/analyze/hooks/useLabelStatus', () => ({
  __esModule: true,
  default: () => useLabelStatusMock(),
}));

const verifiedItem = {
  label: 'octocat/hello-world',
  level: 'community',
  status: 'success',
  shortCode: 'abc123',
} as any;

describe('MetricDetail', () => {
  it('renders nothing when no verified item exists', () => {
    // 回归点：verifiedItems 为空（无效 shortCode / 分析失败）时必须渲染 null。
    // 旧代码 length > 1 才拦下，空数组继续渲染，子组件解构 verifiedItems[0] 崩溃
    useLabelStatusMock.mockReturnValue({
      isLoading: false,
      status: '',
      notFound: true,
      verifiedItems: [],
    });

    const { container } = render(<MetricDetail />);

    expect(container.innerHTML).toBe('');
  });

  it('renders the contributor tab for a single verified item', () => {
    useLabelStatusMock.mockReturnValue({
      isLoading: false,
      status: 'success',
      notFound: false,
      verifiedItems: [verifiedItem],
    });

    const { getByTestId } = render(<MetricDetail />);

    expect(getByTestId('metric-contributor')).toBeInTheDocument();
  });

  it('renders nothing in compare mode (more than one verified item)', () => {
    useLabelStatusMock.mockReturnValue({
      isLoading: false,
      status: 'progress',
      notFound: false,
      verifiedItems: [verifiedItem, verifiedItem],
    });

    const { container } = render(<MetricDetail />);

    expect(container.innerHTML).toBe('');
  });
});
