import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import type { DatasetCompletionRowStatus } from '@oss-compass/graphql';
import DataSetPanel from './index';

const mockPush = jest.fn();
jest.mock('next/router', () => ({ useRouter: () => ({ push: mockPush }) }));
jest.mock('next-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key, i18n: { language: 'en' } }),
}));
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));
jest.mock('@common/collectionsI18n', () => ({
  getSecondIdentName: (ident: string) => ident,
}));
jest.mock('../TriggerSingleBtn', () => () => null);
jest.mock('@common/components/ImageFallback', () => () => null);
jest.mock('@public/images/lab/compare.svg', () => () => null);

const dataSet = ['alpha', 'beta', 'gamma'].map((shortCode) => ({
  label: `https://github.com/example/${shortCode}`,
  shortCode,
  secondIdent: 'test',
  triggerStatus: 'success',
})) as DatasetCompletionRowStatus[];

function startComparison(strict: boolean) {
  const panel = (
    <DataSetPanel
      model={{ modelId: 7, reportId: 1, versionId: 11, metrics: [] }}
      dataSet={dataSet}
      fullWidth
    />
  );
  render(strict ? <React.StrictMode>{panel}</React.StrictMode> : panel);
  fireEvent.click(screen.getByText('lab:pick_for_compare'));
  return screen.getAllByRole('checkbox');
}

describe.each([false, true])('dataset comparison (StrictMode=%s)', (strict) => {
  beforeEach(() => mockPush.mockClear());

  it('keeps the other repositories selected and compares them after deselection', () => {
    const [alpha, beta, gamma] = startComparison(strict);
    [alpha, beta, gamma].forEach((checkbox) => fireEvent.click(checkbox));
    fireEvent.click(beta);

    expect(alpha).toBeChecked();
    expect(beta).not.toBeChecked();
    expect(gamma).toBeChecked();
    fireEvent.click(screen.getByText('collection:compare'));
    expect(mockPush).toHaveBeenCalledWith(
      '/lab/model/7/version/11/analyze/alpha..gamma?range=1Y'
    );
  });

  it('clears the final selection and keeps comparison unavailable', () => {
    const [alpha] = startComparison(strict);
    fireEvent.click(alpha);
    fireEvent.click(screen.getByText('collection:compare'));
    expect(mockPush).not.toHaveBeenCalled();
    fireEvent.click(alpha);

    screen.getAllByRole('checkbox').forEach((checkbox) => {
      expect(checkbox).not.toBeChecked();
    });
    fireEvent.click(screen.getByText('collection:compare'));
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('resets selections when comparison is cancelled', () => {
    const [alpha, beta] = startComparison(strict);
    fireEvent.click(alpha);
    fireEvent.click(beta);
    fireEvent.click(screen.getByText('collection:cancel'));
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('lab:pick_for_compare'));
    screen.getAllByRole('checkbox').forEach((checkbox) => {
      expect(checkbox).not.toBeChecked();
    });
    fireEvent.click(screen.getByText('collection:compare'));
    expect(mockPush).not.toHaveBeenCalled();
  });
});
