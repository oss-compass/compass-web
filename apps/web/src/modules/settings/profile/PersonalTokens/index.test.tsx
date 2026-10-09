import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import {
  useCreateAuthTokenMutation,
  useDeleteAuthTokenMutation,
  useTokenListQuery,
} from '@oss-compass/graphql';
import PersonalTokens from './index';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));
jest.mock('@common/gqlClient', () => ({ __esModule: true, default: {} }));
jest.mock('@oss-compass/graphql', () => ({
  useCreateAuthTokenMutation: jest.fn(),
  useDeleteAuthTokenMutation: jest.fn(),
  useTokenListQuery: jest.fn(),
}));
jest.mock('antd', () => ({
  Modal: ({ open, title, children, footer }) =>
    open ? (
      <section aria-label={title} role="dialog">
        {children}
        {footer}
      </section>
    ) : null,
  Input: (props) => <input {...props} />,
  Select: () => null,
  Button: ({ children, loading, disabled, type, ...props }) => (
    <button type="button" disabled={disabled || loading} {...props}>
      {children}
    </button>
  ),
  message: { success: jest.fn(), error: jest.fn() },
}));

describe('personal token creation requests', () => {
  let mutate: jest.Mock;
  let options: any;
  let pending: boolean;
  beforeEach(() => {
    mutate = jest.fn();
    pending = false;
    (useCreateAuthTokenMutation as jest.Mock).mockImplementation(
      (_client, config) => {
        options = config;
        return { mutate, isLoading: pending };
      }
    );
    (useDeleteAuthTokenMutation as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
    });
    (useTokenListQuery as jest.Mock).mockReturnValue({
      data: { tokenList: [] },
      refetch: jest.fn(),
    });
  });

  function fillForm() {
    fireEvent.click(screen.getByText('setting:token.add_private_token'));
    fireEvent.change(screen.getByPlaceholderText('setting:token.token_name'), {
      target: { value: 'test token' },
    });
    return screen.getByRole('button', { name: 'common:btn.save' });
  }

  it('submits only once for repeated clicks before loading state is rendered', () => {
    render(<PersonalTokens />);
    const save = fillForm();
    fireEvent.click(save);
    fireEvent.click(save);
    expect(mutate).toHaveBeenCalledTimes(1);
    expect(mutate).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'test token',
        expiresAt: expect.any(String),
      })
    );
  });

  it('disables the save action while the mutation is loading', () => {
    const { rerender } = render(<PersonalTokens />);
    fillForm();
    pending = true;
    rerender(<PersonalTokens />);
    expect(
      screen.getByRole('button', { name: 'common:btn.save' })
    ).toBeDisabled();
  });

  it('allows a retry after the request settles unsuccessfully', () => {
    render(<PersonalTokens />);
    const save = fillForm();
    fireEvent.click(save);
    act(() => options.onSettled?.(undefined, new Error('network failure')));
    fireEvent.click(save);
    expect(mutate).toHaveBeenCalledTimes(2);
  });
});
