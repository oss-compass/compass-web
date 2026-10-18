import React from 'react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { createInstance } from 'i18next';
import { I18nextProvider } from 'react-i18next';
import client from '@common/gqlClient';
import ReportDialog from './ReportDialog';
import { ReportSelection } from './snapshot';
import { renderReport, waitForReportAssets } from './renderReport';
import enAnalyze from '../../../../../i18n/en/analyze.json';
import enCommon from '../../../../../i18n/en/common.json';
import enMetrics from '../../../../../i18n/en/metrics_models.json';

jest.mock('./renderReport', () => ({
  renderReport: jest.fn(),
  waitForReportAssets: jest.fn(),
}));

const selection: ReportSelection = {
  projects: [
    {
      label: 'https://github.com/example/one',
      level: 'repo',
      shortCode: 'one',
    },
  ],
  start: '2026-01-01T00:00:00.000Z',
  end: '2026-03-31T23:59:59.999Z',
  dateLabel: '2026-01-01 ~ 2026-03-31',
  language: 'en',
  topic: 'collaboration',
  repoType: 'software-artifact',
  model: 'all',
};
const empty = {
  metricCodequality: [],
  metricCommunity: [],
  metricActivity: [],
  metricGroupActivity: [],
};
const html = '<!doctype html><html><body>Frozen report</body></html>';
let i18n: ReturnType<typeof createInstance>;
let request: jest.SpyInstance;

beforeEach(async () => {
  i18n = createInstance();
  await i18n.init({
    lng: 'en',
    fallbackLng: false,
    defaultNS: 'common',
    resources: {
      en: { analyze: enAnalyze, common: enCommon, metrics_models: enMetrics },
    },
  });
  request = jest
    .spyOn(client, 'request')
    .mockImplementation(async ({ document }: any) =>
      document.includes('query statusVerify')
        ? {
            analysisStatusVerify: {
              ...selection.projects[0],
              status: 'success',
            },
          }
        : empty
    );
  jest.mocked(renderReport).mockResolvedValue(html);
  jest.mocked(waitForReportAssets).mockResolvedValue(undefined);
});
afterEach(() => {
  jest.restoreAllMocks();
  jest.clearAllMocks();
  jest.useRealTimers();
});
const mount = () =>
  render(
    <I18nextProvider i18n={i18n}>
      <ReportDialog selection={selection} onClose={jest.fn()} />
    </I18nextProvider>
  );
const prepare = () =>
  fireEvent.click(screen.getByRole('button', { name: 'Prepare report' }));
const print = () => screen.getByRole('button', { name: 'Print / Save as PDF' });

test('does not print before all requests, rendering and image/font readiness complete', async () => {
  let ready!: () => void;
  jest.mocked(waitForReportAssets).mockReturnValue(
    new Promise((resolve) => {
      ready = resolve;
    })
  );
  mount();
  expect(
    screen.getByRole('dialog', { name: 'Model and metric report' })
  ).toBeVisible();
  expect(print()).toBeDisabled();
  prepare();
  expect(screen.getByRole('status')).toHaveTextContent('Preparing');
  const frame = await screen.findByTitle('Model and metric report');
  fireEvent.load(frame);
  await waitFor(() => expect(waitForReportAssets).toHaveBeenCalled());
  expect(print()).toBeDisabled();
  await act(async () => ready());
  expect(print()).toBeEnabled();
  expect(frame).toHaveAttribute('srcdoc', html);
  expect(frame).toHaveAttribute('sandbox', 'allow-same-origin allow-modals');
  expect(request).toHaveBeenCalledTimes(2);
});

test('shows a retryable error and never enables printing for partial failures', async () => {
  request.mockRejectedValueOnce(new Error('network'));
  mount();
  prepare();
  expect(await screen.findByRole('alert')).toHaveTextContent(
    'could not be prepared'
  );
  expect(print()).toBeDisabled();
  expect(renderReport).not.toHaveBeenCalled();
  prepare();
  fireEvent.load(await screen.findByTitle('Model and metric report'));
  await waitFor(() => expect(print()).toBeEnabled());
});

test('reports unfinished analysis separately from request errors', async () => {
  request.mockResolvedValueOnce({
    analysisStatusVerify: { ...selection.projects[0], status: 'progress' },
  });
  mount();
  prepare();
  expect(await screen.findByRole('alert')).toHaveTextContent(
    'Analysis is not complete'
  );
  expect(renderReport).not.toHaveBeenCalled();
  expect(print()).toBeDisabled();
});

test('cancels a stale render when the model changes, then uses the new model', async () => {
  let finish!: (html: string) => void;
  jest.mocked(renderReport).mockReturnValueOnce(
    new Promise((resolve) => {
      finish = resolve;
    })
  );
  mount();
  prepare();
  await waitFor(() => expect(renderReport).toHaveBeenCalledTimes(1));
  const signal = jest.mocked(renderReport).mock.calls[0][2]!;
  fireEvent.change(screen.getByRole('combobox', { name: 'Models' }), {
    target: { value: 'metricActivity' },
  });
  expect(signal.aborted).toBe(true);
  await act(async () => finish('Stale report'));
  expect(
    screen.queryByTitle('Model and metric report')
  ).not.toBeInTheDocument();
  expect(print()).toBeDisabled();
  prepare();
  fireEvent.load(await screen.findByTitle('Model and metric report'));
  await waitFor(() => expect(print()).toBeEnabled());
  expect(jest.mocked(renderReport).mock.calls[1][0].selection.model).toBe(
    'metricActivity'
  );
});

test('aborts outstanding requests when the dialog unmounts', async () => {
  request.mockReturnValue(new Promise(() => {}));
  const view = mount();
  prepare();
  const signal = request.mock.calls[0][0].signal as AbortSignal;
  view.unmount();
  expect(signal.aborted).toBe(true);
});

test('times out a stalled request and allows a fresh attempt', async () => {
  jest.useFakeTimers();
  request.mockReturnValue(new Promise(() => {}));
  mount();
  prepare();
  const signal = request.mock.calls[0][0].signal as AbortSignal;
  act(() => jest.advanceTimersByTime(30000));
  expect(screen.getByRole('alert')).toHaveTextContent('could not be prepared');
  expect(signal.aborted).toBe(true);
  expect(print()).toBeDisabled();
  expect(screen.getByRole('button', { name: 'Prepare report' })).toBeEnabled();
});

test('does not print an image that failed to decode', async () => {
  jest
    .mocked(waitForReportAssets)
    .mockRejectedValue(new Error('decode failed'));
  mount();
  prepare();
  fireEvent.load(await screen.findByTitle('Model and metric report'));
  expect(await screen.findByRole('alert')).toHaveTextContent(
    'could not be prepared'
  );
  expect(print()).toBeDisabled();
});
