import { renderHook } from '@testing-library/react';
import { useRouter } from 'next/router';
import { useGetSvgUrl } from './useGetSvgUrl';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@modules/analyze/hooks/useVerifyDetailRangeQuery', () => ({
  __esModule: true,
  default: () => ({ isLoading: false, data: undefined }),
}));

const mockRouter = (query: Record<string, string>) => {
  (useRouter as jest.Mock).mockReturnValue({ query });
};

describe('useGetSvgUrl', () => {
  it('joins params with a single leading ? for mapped metrics', () => {
    mockRouter({ range: '6M' });
    const { result } = renderHook(() =>
      useGetSvgUrl(
        'abc123',
        'commit_frequency',
        true,
        true,
        'metricActivity.commitFrequency'
      )
    );

    expect(result.current).toBe(
      '/chart/abc123.svg?metric=activity&field=commit_frequency&range=6M'
    );
  });

  it('starts the query string with ? when the metric has no mapping', () => {
    // 回归点：贡献者画像指标不在 queryMap 中，旧实现会把第一个参数
    // 以 & 拼进路径，生成 /chart/<slug>.svg&field=... 的非法 URL
    mockRouter({ range: '6M' });
    const { result } = renderHook(() =>
      useGetSvgUrl(
        'abc123',
        'activity_core_count',
        true,
        true,
        'metricMilestonePersona.activityCoreContributorCount'
      )
    );

    expect(result.current).toBe(
      '/chart/abc123.svg?field=activity_core_contributor_count&range=6M'
    );
  });

  it('builds the overview url and keeps param order', () => {
    mockRouter({ range: '6M' });
    const { result } = renderHook(() =>
      useGetSvgUrl('abc123', 'topic_overview', false, false, 'metricActivity.x')
    );

    expect(result.current).toBe(
      '/chart/abc123.svg?metric=overview&y_trans=1&y_abs=1&range=6M'
    );
  });

  it('appends chart=bar for bar chart cards', () => {
    mockRouter({ range: '6M' });
    const { result } = renderHook(() =>
      useGetSvgUrl(
        'abc123',
        'code_quality_is_maintained',
        true,
        true,
        'metricCodequality.isMaintained'
      )
    );

    expect(result.current).toBe(
      '/chart/abc123.svg?metric=collab_dev_index&field=is_maintained&chart=bar&range=6M'
    );
  });
});
