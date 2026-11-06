import React from 'react';
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { UserinfoQuery } from '@oss-compass/graphql';
import { userInfoStore } from '@modules/auth/UserInfoStore';
import { ProviderItem, type Provider } from './ProviderItem';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock('@oss-compass/ui', () => ({
  Button: ({
    children,
    intent: _intent,
    size: _size,
    loading,
    ...props
  }: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    intent?: string;
    size?: string;
    loading?: boolean;
  }) => (
    <button {...props} disabled={props.disabled || loading}>
      {children}
    </button>
  ),
}));

jest.mock('@common/components/Dialog', () => ({
  __esModule: true,
  default: ({
    open,
    dialogTitle,
    dialogContent,
    dialogActions,
  }: {
    open: boolean;
    dialogTitle: React.ReactNode;
    dialogContent: React.ReactNode;
    dialogActions: React.ReactNode;
  }) =>
    open ? (
      <div role="dialog" aria-label="WeChat binding">
        {dialogTitle}
        {dialogContent}
        {dialogActions}
      </div>
    ) : null,
}));

// Keep QR fetching outside this component-state regression.
jest.mock('./WechatCodeImage', () => ({
  __esModule: true,
  default: () => <span data-testid="wechat-code">QR fixture</span>,
}));

type CurrentUser = NonNullable<UserinfoQuery['currentUser']>;
type LoginBinds = NonNullable<CurrentUser['loginBinds']>;

// These are the five IDs rendered by the production OAuthList.
const providers: Provider[] = [
  { id: 'github', name: 'GitHub', desc: 'GitHub account', icon: null },
  { id: 'gitee', name: 'Gitee', desc: 'Gitee account', icon: null },
  { id: 'gitcode', name: 'AtomGit', desc: 'AtomGit account', icon: null },
  { id: 'slack', name: 'Slack', desc: 'Slack account', icon: null },
  { id: 'wechat', name: 'WeChat', desc: 'WeChat account', icon: null },
];
const ordinaryUserAgent = 'Mozilla/5.0 Firefox/128.0';
const wechatUserAgent = 'Mozilla/5.0 Mobile MicroMessenger/8.0.49 NetType/WIFI';
const originalUserAgentDescriptor = Object.getOwnPropertyDescriptor(
  window.navigator,
  'userAgent'
);
const originalCurrentUser = userInfoStore.currentUser;
let queryClient: QueryClient;

const makeUser = (loginBinds: LoginBinds): CurrentUser => ({
  id: 1,
  name: 'Binding fixture',
  roleLevel: 0,
  email: 'binding@example.invalid',
  language: 'en',
  emailVerified: true,
  loginBinds,
});

const setUserAgent = (value: string) => {
  // The production isWechat helper reads this genuine navigator property.
  Object.defineProperty(window.navigator, 'userAgent', {
    configurable: true,
    value,
  });
};

const providerRows = () => (
  <QueryClientProvider client={queryClient}>
    {providers.map((provider) => (
      <section key={provider.id} aria-label={provider.name}>
        <ProviderItem provider={provider} />
      </section>
    ))}
  </QueryClientProvider>
);

const singleProvider = (provider: Provider) => (
  <QueryClientProvider client={queryClient}>
    <ProviderItem provider={provider} />
  </QueryClientProvider>
);

beforeEach(() => {
  // Real hooks and the real Valtio store remain active. The mutation is idle.
  queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  userInfoStore.currentUser = makeUser([]);
  setUserAgent(ordinaryUserAgent);
});

afterEach(() => {
  cleanup();
  queryClient.clear();
  userInfoStore.currentUser = originalCurrentUser;
  if (originalUserAgentDescriptor) {
    Object.defineProperty(
      window.navigator,
      'userAgent',
      originalUserAgentDescriptor
    );
  } else {
    Reflect.deleteProperty(window.navigator, 'userAgent');
  }
});

describe('ProviderItem WeChat binding dialog ownership', () => {
  it('auto-opens exactly one WeChat dialog for five unbound providers', async () => {
    setUserAgent(wechatUserAgent);
    render(providerRows());

    await waitFor(() => {
      expect(screen.getAllByRole('dialog')).toHaveLength(1);
    });
    expect(
      within(screen.getByRole('region', { name: 'WeChat' })).getByRole('dialog')
    ).toBeInTheDocument();
    for (const provider of providers.filter((item) => item.id !== 'wechat')) {
      expect(
        within(screen.getByRole('region', { name: provider.name })).queryByRole(
          'dialog'
        )
      ).not.toBeInTheDocument();
    }
  });

  it('does not auto-open any dialog when WeChat is already bound', async () => {
    setUserAgent(wechatUserAgent);
    userInfoStore.currentUser = makeUser([
      { provider: 'wechat', nickname: 'Bound WeChat' },
    ]);
    render(providerRows());

    expect(
      within(screen.getByRole('region', { name: 'WeChat' })).getByRole(
        'button',
        { name: 'setting:profile.disconnect' }
      )
    ).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryAllByRole('dialog')).toHaveLength(0);
    });
  });

  it('does not auto-open a dialog in an ordinary browser', async () => {
    render(providerRows());

    await waitFor(() => {
      expect(screen.queryAllByRole('dialog')).toHaveLength(0);
    });
  });

  it('preserves manual WeChat Connect and Cancel in an ordinary browser', () => {
    render(providerRows());

    fireEvent.click(
      within(screen.getByRole('region', { name: 'WeChat' })).getByRole(
        'button',
        { name: 'setting:profile.connect' }
      )
    );
    expect(screen.getAllByRole('dialog')).toHaveLength(1);
    fireEvent.click(
      within(screen.getByRole('dialog')).getByRole('button', {
        name: 'common:btn.cancel',
      })
    );
    expect(screen.queryAllByRole('dialog')).toHaveLength(0);
  });

  it('re-evaluates ownership when the same component changes provider', async () => {
    setUserAgent(wechatUserAgent);
    const view = render(singleProvider(providers[0]));

    await waitFor(() => {
      expect(screen.queryAllByRole('dialog')).toHaveLength(0);
    });
    view.rerender(singleProvider(providers[4]));
    await waitFor(() => {
      expect(screen.getAllByRole('dialog')).toHaveLength(1);
    });
    view.rerender(singleProvider(providers[0]));
    await waitFor(() => {
      expect(screen.queryAllByRole('dialog')).toHaveLength(0);
    });
  });

  it('closes the automatic dialog after the real store receives a WeChat binding', async () => {
    setUserAgent(wechatUserAgent);
    render(singleProvider(providers[4]));

    await waitFor(() => {
      expect(screen.getAllByRole('dialog')).toHaveLength(1);
    });
    await act(async () => {
      userInfoStore.currentUser = makeUser([
        { provider: 'wechat', nickname: 'New binding' },
      ]);
    });
    await waitFor(() => {
      expect(screen.queryAllByRole('dialog')).toHaveLength(0);
    });
    expect(
      screen.getByRole('button', {
        name: 'setting:profile.disconnect',
      })
    ).toBeInTheDocument();
  });
});
