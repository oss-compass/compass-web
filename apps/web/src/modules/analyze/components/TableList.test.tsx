import { render } from '@testing-library/react';
import TableList from './TableList';
import { chartUserSettingState } from '@modules/analyze/store';

jest.mock('public/images/analyze/number-100.svg', () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock('public/images/analyze/number-1.svg', () => ({
  __esModule: true,
  default: () => null,
}));

jest.mock('next-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => children,
}));
jest.mock('@tanstack/react-query', () => ({
  useQueries: () => [],
}));
jest.mock('@oss-compass/graphql', () => ({
  useMetricModelsOverviewQuery: { getKey: () => ['k'], fetcher: () => () => null },
}));
jest.mock('@common/gqlClient', () => ({ __esModule: true, default: {} }));
jest.mock('@modules/analyze/hooks/useCompareItems', () => ({
  __esModule: true,
  default: () => ({ compareItems: [] }),
}));
jest.mock('@modules/analyze/hooks/useQueryMetricType', () => ({
  __esModule: true,
  default: () => 'contributor',
}));

describe('TableList', () => {
  it('initializes the score system from the persisted user setting', () => {
    // 用户在导航栏设置过 1 分制并已持久化：概览表格必须与图表一致地以 1 分制
    // 渲染，而不是硬编码百分制再要求用户手动切换。
    chartUserSettingState.onePointSys = true;
    const { container } = render(<TableList />);
    expect(container.textContent).toContain('analyze:mark.point');
    expect(container.textContent).not.toContain('analyze:mark.percentage');
  });
});
