import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import GovernanceProject from './GovernancePlatform/Overview/Project';
import OverviewProject from './DataView/Overview/Project';

jest.mock('next-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock('antd', () => ({
  Modal: ({ children, open, onCancel }) => {
    const React = require('react');
    const wasOpen = React.useRef(false);
    if (open) wasOpen.current = true;
    return React.createElement(
      'div',
      null,
      React.createElement('button', { onClick: onCancel }, 'Close detail'),
      wasOpen.current ? children : null
    );
  },
  Breadcrumb: () => null,
  message: { error: jest.fn() },
}));

jest.mock('@ant-design/icons', () => ({ HomeOutlined: () => null }));

jest.mock('./GovernancePlatform/Overview/utils', () => ({
  getProjectDisplayName: () => 'Project',
}));
jest.mock('./DataView/Overview/utils', () => ({
  getProjectDisplayName: () => 'Project',
  fetchProjectData: jest.fn(() => new Promise(() => {})),
  processRawData: () => [],
}));

jest.mock(
  './GovernancePlatform/Overview/Project/PanoramaChart',
  () => () => null
);
jest.mock(
  './GovernancePlatform/Overview/Project/DeveloperRegionChart',
  () => () => null
);
jest.mock('./GovernancePlatform/Overview/Project/RepoTable', () => () => null);
jest.mock(
  './GovernancePlatform/Overview/Project/OrganizationTable',
  () => () => null
);
jest.mock(
  './GovernancePlatform/Overview/Project/DeveloperTable',
  () =>
    function MockDeveloperTable({ onViewDetail }) {
      const React = require('react');
      return React.createElement(
        'button',
        { onClick: () => onViewDetail({ 用户ID: 'github:alice' }) },
        'Open detail'
      );
    }
);
jest.mock(
  './GovernancePlatform/Overview/Project/DetailPage',
  () =>
    function MockDetailPage({ data }) {
      const React = require('react');
      return React.createElement('div', null, data.用户ID);
    }
);

jest.mock('./DataView/Overview/Project/DeveloperRegionChart', () => () => null);
jest.mock('./DataView/Overview/Project/OrganizationTable', () => () => null);
jest.mock(
  './DataView/Overview/Project/DeveloperTable',
  () =>
    function MockDeveloperTable({ onViewDetail }) {
      const React = require('react');
      return React.createElement(
        'button',
        { onClick: () => onViewDetail({ 用户ID: 'github:alice' }) },
        'Open detail'
      );
    }
);
jest.mock(
  './DataView/Overview/Project/DetailPage',
  () =>
    function MockDetailPage({ data }) {
      const React = require('react');
      return React.createElement('div', null, data.用户ID);
    }
);

describe.each([
  ['governance platform', GovernanceProject],
  ['project overview', OverviewProject],
])('%s detail modal', (_, Project) => {
  it('does not render a null detail record during the close transition', () => {
    render(<Project projectType="Flutter" />);
    fireEvent.click(screen.getByText('Open detail'));
    expect(screen.getByText('github:alice')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Close detail'));
    expect(screen.queryByText('github:alice')).not.toBeInTheDocument();
  });
});
