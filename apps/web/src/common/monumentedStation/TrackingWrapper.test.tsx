import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import TrackingWrapper from './TrackingWrapper';

jest.mock('./hooks', () => {
  const reportAction = jest.fn();
  return {
    useModuleAction: () => ({ reportAction }),
    __mockReportAction: reportAction,
  };
});

const getReportAction = () =>
  (jest.requireMock('./hooks') as { __mockReportAction: jest.Mock })
    .__mockReportAction;

interface RenderOptions {
  onClick?: () => void;
  validate?: () => boolean | Promise<boolean>;
  onValidationFailed?: () => void;
  disabled?: boolean;
}

function renderWrappedButton({
  onClick,
  validate,
  onValidationFailed,
  disabled,
}: RenderOptions) {
  render(
    <TrackingWrapper
      module="test-module"
      type="test-type"
      content={{ foo: 'bar' }}
      disabled={disabled}
      validate={validate}
      onValidationFailed={onValidationFailed}
    >
      <button onClick={onClick}>wrapped</button>
    </TrackingWrapper>
  );
  return screen.getByRole('button', { name: /wrapped/i });
}

describe('TrackingWrapper', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('does not run the wrapped onClick or report when validate returns false', async () => {
    const onClick = jest.fn();
    const onValidationFailed = jest.fn();
    const validate = jest.fn(() => false);

    const view = renderWrappedButton({
      onClick,
      validate,
      onValidationFailed,
    });
    fireEvent.click(view);
    await waitFor(() => expect(onValidationFailed).toHaveBeenCalledTimes(1));

    expect(onClick).not.toHaveBeenCalled();
    expect(getReportAction()).not.toHaveBeenCalled();
  });

  it('runs the wrapped onClick and reports when validate returns true', async () => {
    const onClick = jest.fn();
    const onValidationFailed = jest.fn();
    const validate = jest.fn(() => true);

    const view = renderWrappedButton({
      onClick,
      validate,
      onValidationFailed,
    });
    fireEvent.click(view);
    await waitFor(() => expect(onClick).toHaveBeenCalledTimes(1));

    expect(getReportAction()).toHaveBeenCalledTimes(1);
    expect(getReportAction()).toHaveBeenCalledWith({
      module: 'test-module',
      type: 'test-type',
      content: { foo: 'bar' },
    });
    expect(onValidationFailed).not.toHaveBeenCalled();
  });

  it('fails closed when validate rejects', async () => {
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const onClick = jest.fn();
    const onValidationFailed = jest.fn();
    const validate = jest.fn(() => Promise.reject(new Error('boom')));

    const view = renderWrappedButton({
      onClick,
      validate,
      onValidationFailed,
    });
    fireEvent.click(view);
    await waitFor(() => expect(onValidationFailed).toHaveBeenCalledTimes(1));

    expect(onClick).not.toHaveBeenCalled();
    expect(getReportAction()).not.toHaveBeenCalled();
    expect(consoleError).toHaveBeenCalled();
    consoleError.mockRestore();
  });

  it('still runs the wrapped onClick but does not report when disabled', async () => {
    const onClick = jest.fn();

    const view = renderWrappedButton({ onClick, disabled: true });
    fireEvent.click(view);
    await waitFor(() => expect(onClick).toHaveBeenCalledTimes(1));

    expect(getReportAction()).not.toHaveBeenCalled();
  });

  it('runs the wrapped onClick and reports when no validate is provided', async () => {
    const onClick = jest.fn();

    const view = renderWrappedButton({ onClick });
    fireEvent.click(view);
    await waitFor(() => expect(onClick).toHaveBeenCalledTimes(1));

    expect(getReportAction()).toHaveBeenCalledTimes(1);
  });
});
