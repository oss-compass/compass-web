import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useModifyUserMutation } from '@oss-compass/graphql';
import { userInfoStore } from '@modules/auth/UserInfoStore';
import ProfileForm from './ProfileForm';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));
jest.mock('@oss-compass/graphql', () => ({ useModifyUserMutation: jest.fn() }));
jest.mock('@common/gqlClient', () => ({ __esModule: true, default: {} }));
jest.mock('@modules/auth', () => ({
  useUserInfo: () => ({ providerUser: null }),
}));
jest.mock('@modules/auth/UserInfoStore', () => ({
  userInfoStore: {},
  userEvent: {},
}));
jest.mock('valtio', () => ({ useSnapshot: (store) => store }));
jest.mock('./SendVerificationEmail', () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock('@common/components/Tooltip', () => ({
  __esModule: true,
  default: ({ children }) => children,
}));
jest.mock('@oss-compass/ui', () => ({
  Button: ({ loading, children, ...props }) => (
    <button {...props}>{children}</button>
  ),
}));

const user = {
  name: 'Tester',
  email: 'tester@example.org',
  language: 'zh-CN',
  emailVerified: true,
};

describe('profile language form state', () => {
  let mutate: jest.Mock;
  const originalResizeObserver = global.ResizeObserver;
  beforeAll(() => {
    global.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    } as any;
  });
  afterAll(() => {
    global.ResizeObserver = originalResizeObserver;
  });
  beforeEach(() => {
    mutate = jest.fn();
    (userInfoStore as any).currentUser = user;
    (useModifyUserMutation as jest.Mock).mockReturnValue({
      mutate,
      isLoading: false,
    });
  });

  it('keeps an unchanged profile pristine after populating saved values', async () => {
    render(<ProfileForm />);
    expect(screen.getByRole('radio', { name: '简体中文' })).toBeChecked();
    await waitFor(() =>
      expect(
        screen.getByRole('button', { name: 'common:btn.save' })
      ).toBeDisabled()
    );
  });

  it('updates the selected language when user information arrives after mount', async () => {
    (userInfoStore as any).currentUser = undefined;
    const { rerender } = render(<ProfileForm />);
    (userInfoStore as any).currentUser = user;
    rerender(<ProfileForm />);
    await waitFor(() =>
      expect(screen.getByRole('radio', { name: '简体中文' })).toBeChecked()
    );
  });

  it('submits the saved language when editing only the name', async () => {
    render(<ProfileForm />);
    fireEvent.change(
      screen.getByPlaceholderText('setting:profile.form.name_placeholder'),
      {
        target: { value: 'New name' },
      }
    );
    fireEvent.click(screen.getByRole('button', { name: 'common:btn.save' }));
    await waitFor(() =>
      expect(mutate).toHaveBeenCalledWith({
        name: 'New name',
        email: user.email,
        language: 'zh-CN',
      })
    );
  });

  it('submits an explicitly changed language', async () => {
    render(<ProfileForm />);
    fireEvent.click(screen.getByRole('radio', { name: 'English' }));
    fireEvent.click(screen.getByRole('button', { name: 'common:btn.save' }));
    await waitFor(() =>
      expect(mutate).toHaveBeenCalledWith({
        name: user.name,
        email: user.email,
        language: 'en',
      })
    );
  });
});
