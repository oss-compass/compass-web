import React from 'react';
import { render, screen } from '@testing-library/react';
import DetailHeaderFilter from './DetailHeaderFilter';

jest.mock('next-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock('./CommunityFilter', () => ({
  __esModule: true,
  default: () => <div data-testid="community-filter" />,
}));

describe('DetailHeaderFilter', () => {
  it('renders the community repo filter on the issue tab at community level', () => {
    // 回归点：曾经错误比较 level === 'community1'（不存在的枚举值），
    // 导致社区级报告的 issue / pr 页签永远不显示仓库筛选器
    render(
      <DetailHeaderFilter
        type="issue"
        level="community"
        label="octocat/hello"
      />
    );

    expect(screen.getByTestId('community-filter')).toBeInTheDocument();
  });

  it('renders the community repo filter on the pr tab at community level', () => {
    render(
      <DetailHeaderFilter type="pr" level="community" label="octocat/hello" />
    );

    expect(screen.getByTestId('community-filter')).toBeInTheDocument();
  });

  it('does not render the repo filter at project / repo level', () => {
    render(
      <DetailHeaderFilter type="issue" level="project" label="octocat/hello" />
    );

    expect(screen.queryByTestId('community-filter')).toBeNull();
  });

  it('renders the bot select on the contributor tab with the repo filter at community level', () => {
    render(
      <DetailHeaderFilter
        type="contributor"
        level="community"
        label="octocat/hello"
        isBot={false}
      />
    );

    expect(screen.getByTestId('community-filter')).toBeInTheDocument();
  });
});
