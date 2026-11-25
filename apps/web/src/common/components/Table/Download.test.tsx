import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import Download from './Download';
import { apiDownloadFiles } from '@modules/analyze/DataView/MetricDetail/tableDownload';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));
jest.mock('@common/components/Tooltip', () => ({
  __esModule: true,
  default: ({ children }) => <>{children}</>,
}));
jest.mock('@modules/analyze/DataView/MetricDetail/tableDownload', () => ({
  ...jest.requireActual('@modules/analyze/DataView/MetricDetail/tableDownload'),
  apiDownloadFiles: jest.fn((_path, _name, onFinish) => onFinish()),
}));

const pending = { data: { code: 200, status: 'pending', uuid: 'export-id' } };
const clickDownload = async () => {
  fireEvent.click(screen.getByText('analyze:metric_detail.download_data'));
  await act(async () => {
    await Promise.resolve();
  });
};
const advance = async (ms: number) => {
  await act(async () => {
    jest.advanceTimersByTime(ms);
  });
};

beforeEach(() => {
  jest.useFakeTimers();
  jest.clearAllMocks();
});
afterEach(() => {
  jest.useRealTimers();
});

it('stops failed polling and makes the download control usable again', async () => {
  const begin = jest.fn().mockResolvedValue(pending);
  const poll = jest.fn().mockRejectedValue(new Error('network unavailable'));
  render(
    <Download beginFun={begin} pollingFun={poll} query={{}} fileName="report" />
  );
  await clickDownload();
  await advance(2000);
  expect(poll).toHaveBeenCalledTimes(1);
  await advance(9000);
  expect(poll).toHaveBeenCalledTimes(1);
  await clickDownload();
  expect(begin).toHaveBeenCalledTimes(2);
});

it('cancels a scheduled first poll on unmount', async () => {
  const poll = jest.fn();
  const { unmount } = render(
    <Download
      beginFun={jest.fn().mockResolvedValue(pending)}
      pollingFun={poll}
      query={{}}
      fileName="report"
    />
  );
  await clickDownload();
  unmount();
  await advance(2000);
  expect(poll).not.toHaveBeenCalled();
});

it('does not start polling when the initial request resolves after unmount', async () => {
  let resolveBegin: (value: typeof pending) => void;
  const begin = jest.fn(
    () =>
      new Promise((resolve) => {
        resolveBegin = resolve;
      })
  );
  const poll = jest.fn();
  const { unmount } = render(
    <Download beginFun={begin} pollingFun={poll} query={{}} fileName="report" />
  );
  await clickDownload();
  unmount();
  await act(async () => {
    resolveBegin(pending);
  });
  await advance(2000);
  expect(poll).not.toHaveBeenCalled();
});

it('still downloads a completed export and stops polling', async () => {
  const poll = jest.fn().mockResolvedValue({
    data: { status: 'complete', download_path: '/report.csv' },
  });
  render(
    <Download
      beginFun={jest.fn().mockResolvedValue(pending)}
      pollingFun={poll}
      query={{}}
      fileName="report"
    />
  );
  await clickDownload();
  await advance(2000);
  expect(apiDownloadFiles).toHaveBeenCalledWith(
    '/report.csv',
    'report',
    expect.any(Function)
  );
  await advance(9000);
  expect(poll).toHaveBeenCalledTimes(1);
});
