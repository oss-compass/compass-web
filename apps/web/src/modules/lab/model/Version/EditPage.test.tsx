import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import { useLabModelDetail, useLabModelVersion } from '../hooks';
import { actions, formState } from '../Form/state';
import ModelVersionEdit from './EditPage';
import EditRoute from '../../../../pages/lab/model/[model]/version/[version]/edit';
import ModelVersionProvider from '../Provider/ModelVersionProvider';

jest.mock('@common/utils/getLocalesFile', () => jest.fn());
jest.mock(
  '@common/components/NoSsr',
  () =>
    ({ children }) =>
      children
);
jest.mock(
  '@modules/auth/AuthRequire',
  () =>
    ({ children }) =>
      children
);
jest.mock('@common/components/Header', () => () => null);
jest.mock('@modules/lab/model/components/MyModelsBanner', () => () => null);

jest.mock('next/router', () => ({ useRouter: jest.fn() }));
jest.mock('@common/gqlClient', () => ({ __esModule: true, default: {} }));
jest.mock('@oss-compass/graphql', () => ({
  useUpdateLabModelVersionMutation: () => ({
    mutate: mockMutate,
    isLoading: false,
  }),
}));
jest.mock('../hooks', () => ({
  useLabModelDetail: jest.fn(),
  useLabModelVersion: jest.fn(),
}));
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));
jest.mock('../Form', () => {
  const { useSnapshot } = jest.requireActual('valtio');
  const { formState } = jest.requireActual('../Form/state');
  const MockForm = ({
    loading,
    onSubmit,
  }: {
    loading: boolean;
    onSubmit: () => void;
  }) => {
    const snapshot = useSnapshot(formState, { sync: true });
    if (loading) return <div role="status">Loading</div>;
    return (
      <>
        <input
          aria-label="Version"
          value={snapshot.version}
          onChange={(event) => {
            formState.version = event.target.value;
          }}
        />
        <output aria-label="Fields">{JSON.stringify(snapshot)}</output>
        <button onClick={onSubmit}>Save</button>
      </>
    );
  };
  return { __esModule: true, default: MockForm };
});

const detail = {
  labModelDetail: {
    id: 1,
    name: 'Model',
    description: 'Description',
    isPublic: false,
  },
};
const version = (id = 10) => ({
  labModelVersion: {
    id,
    version: `Version ${id}`,
    algorithm: { ident: `algorithm-${id}` },
    isScore: false,
    metrics: [
      {
        id: id + 100,
        metricId: id + 200,
        ident: `metric-${id}`,
        category: 'activity',
        defaultThreshold: 5,
        defaultWeight: 100,
        threshold: id,
        weight: 100,
      },
    ],
  },
});
const mockMutate = jest.fn();
const setDetail = (
  data: { labModelDetail?: typeof detail.labModelDetail | null } | null,
  isLoading = false,
  error: Error | null = null
) =>
  (useLabModelDetail as jest.Mock).mockReturnValue({ data, isLoading, error });
const setVersion = (
  data: {
    labModelVersion?: ReturnType<typeof version>['labModelVersion'] | null;
  } | null,
  isLoading = false,
  error: Error | null = null
) =>
  (useLabModelVersion as jest.Mock).mockReturnValue({ data, isLoading, error });
const setRoute = (model = '1', version = '10') =>
  (useRouter as jest.Mock).mockReturnValue({ query: { model, version } });

async function expectForm(id = 10, name = `Version ${id}`) {
  await waitFor(() =>
    expect(screen.getByLabelText('Version')).toHaveValue(name)
  );
  expect(
    JSON.parse(screen.getByLabelText('Fields').textContent || '{}')
  ).toMatchObject({
    name: 'Model',
    description: 'Description',
    isPublic: false,
    version: name,
    isScore: false,
    algorithm: `algorithm-${id}`,
    metricSet: version(id).labModelVersion.metrics,
  });
}

function expectSubmit(id = 10, name = `Version ${id}`, modelId = 1) {
  fireEvent.click(screen.getByRole('button', { name: 'Save' }));
  expect(mockMutate).toHaveBeenLastCalledWith({
    modelId,
    versionId: id,
    version: name,
    isScore: false,
    algorithm: `algorithm-${id}`,
    metrics: [{ id: id + 200, versionId: id, threshold: id, weight: 100 }],
  });
}

beforeEach(() => {
  jest.clearAllMocks();
  actions.resetForm();
  setRoute();
  setDetail(null, true);
  setVersion(null, true);
});

it.each(['detail', 'version'])(
  'initializes when %s finishes first',
  async (first) => {
    const versionData = version();
    const { rerender } = render(<ModelVersionEdit />);
    if (first === 'detail') setDetail(detail);
    else setVersion(versionData);
    rerender(<ModelVersionEdit />);
    expect(
      screen.queryByRole('button', { name: 'Save' })
    ).not.toBeInTheDocument();
    setDetail(detail);
    setVersion(versionData);
    rerender(<ModelVersionEdit />);
    await expectForm();
    expectSubmit();
  }
);

it.each(['1', '2'])(
  'resets on navigation to model %s and another version',
  async (model) => {
    setDetail(detail);
    setVersion(version());
    const { rerender } = render(<ModelVersionEdit />);
    await expectForm();
    setRoute(model, '20');
    setVersion(null, true);
    if (model === '2') setDetail(null, true);
    rerender(<ModelVersionEdit />);
    expect(
      screen.queryByRole('button', { name: 'Save' })
    ).not.toBeInTheDocument();
    expect(formState.version).toBe('');
    expect(formState.metricSet).toEqual([]);
    setDetail({
      labModelDetail: { ...detail.labModelDetail, id: Number(model) },
    });
    setVersion(version(20));
    rerender(<ModelVersionEdit />);
    await expectForm(20);
    expectSubmit(20, 'Version 20', Number(model));
  }
);

it('preserves edits across repeated detail and version refreshes', async () => {
  setDetail(detail);
  setVersion(version());
  const { rerender } = render(<ModelVersionEdit />);
  await expectForm();
  fireEvent.change(screen.getByLabelText('Version'), {
    target: { value: 'My edit' },
  });
  for (let refresh = 0; refresh < 2; refresh++) {
    setDetail({
      labModelDetail: { ...detail.labModelDetail, description: 'Refreshed' },
    });
    setVersion(version());
    rerender(<ModelVersionEdit />);
    await expectForm(10, 'My edit');
    expectSubmit(10, 'My edit');
  }
});

it.each(['detail', 'version'])(
  'shows a terminal error when %s fails and recovers on retry',
  async (failed) => {
    const { rerender } = render(<ModelVersionEdit />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    setDetail(detail);
    setVersion(version());
    if (failed === 'detail')
      setDetail(null, false, new Error('Request failed'));
    else setVersion(null, false, new Error('Request failed'));
    rerender(<ModelVersionEdit />);
    expect(screen.getByRole('alert')).toHaveTextContent('404 not found');
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Save' })
    ).not.toBeInTheDocument();
    expect(mockMutate).not.toHaveBeenCalled();
    setDetail(detail);
    setVersion(version());
    rerender(<ModelVersionEdit />);
    await expectForm();
    expectSubmit();
  }
);

it.each([
  ['missing detail', null, version()],
  ['empty detail', {}, version()],
  ['null detail', { labModelDetail: null }, version()],
  ['missing version', detail, null],
  ['empty version', detail, {}],
  ['null version', detail, { labModelVersion: null }],
] as const)(
  'shows an unavailable state for %s',
  (_name, modelData, versionData) => {
    formState.version = 'Previous edit';
    setDetail(modelData);
    setVersion(versionData);
    render(<ModelVersionEdit />);
    expect(screen.getByRole('alert')).toHaveTextContent('Forbidden');
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Save' })
    ).not.toBeInTheDocument();
    expect(mockMutate).not.toHaveBeenCalled();
  }
);

it('preserves the route editor draft after a failed background refresh recovers', async () => {
  setDetail(detail);
  setVersion(version());
  const { rerender } = render(<EditRoute />);
  await expectForm();
  fireEvent.change(screen.getByLabelText('Version'), {
    target: { value: 'My draft' },
  });
  setDetail(detail, false, new Error('Refresh failed'));
  rerender(<EditRoute />);
  expect(screen.getByRole('alert')).toHaveTextContent('404 not found');
  expect(
    screen.queryByRole('button', { name: 'Save' })
  ).not.toBeInTheDocument();
  setDetail(detail);
  rerender(<EditRoute />);
  await expectForm(10, 'My draft');
  expectSubmit(10, 'My draft');
});

it('keeps the analysis provider loading UI and query gating contract', () => {
  const Content = () => (
    <ModelVersionProvider
      loadingClassName="custom-loading"
      loadingUi={<span>Fetching</span>}
    >
      <div>Analysis</div>
    </ModelVersionProvider>
  );
  const { rerender } = render(<Content />);
  expect(screen.getByRole('status')).toHaveClass('custom-loading');
  expect(screen.getByRole('status')).toHaveTextContent('Fetching');
  expect(screen.queryByText('Analysis')).not.toBeInTheDocument();
  setDetail(detail);
  setVersion(null, false, new Error('Failed'));
  rerender(<Content />);
  expect(screen.getByRole('alert')).toHaveTextContent('404 not found');
  setVersion({});
  rerender(<Content />);
  expect(screen.getByRole('alert')).toHaveTextContent('Forbidden');
  setVersion(version());
  rerender(<Content />);
  expect(screen.getByText('Analysis')).toBeInTheDocument();
});
