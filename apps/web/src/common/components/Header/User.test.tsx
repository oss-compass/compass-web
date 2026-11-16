import React from 'react';
import { render, screen } from '@testing-library/react';
import User from './User';

jest.mock('next/router', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={props.src} alt={props.alt} />;
  },
}));

jest.mock('@modules/auth', () => ({
  useUserInfo: () => ({
    providerUser: { avatarUrl: 'https://example.com/a.png', name: 'alice' },
    roleLevel: 0,
    dashboardRole: false,
  }),
}));

jest.mock('@modules/auth/UserInfoStore', () => ({
  resetUserInfo: jest.fn(),
}));

jest.mock('@oss-compass/graphql', () => ({
  useSignOutMutation: () => ({ mutate: jest.fn() }),
}));

describe('Header User menu', () => {
  it('exposes the avatar as a focusable menu trigger button', () => {
    render(<User />);

    const trigger = screen.getByRole('button', { name: 'alice' });
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
  });

  it('exposes the sign-out action as a button', () => {
    render(<User />);

    expect(
      screen.getByRole('button', { name: /common:signout/i })
    ).toBeInTheDocument();
  });

  it('renders the menu entries as links reachable after the trigger', () => {
    render(<User />);

    expect(
      screen.getByRole('link', { name: /common:profile_setting/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /common:subscribe/i })
    ).toBeInTheDocument();
  });
});
