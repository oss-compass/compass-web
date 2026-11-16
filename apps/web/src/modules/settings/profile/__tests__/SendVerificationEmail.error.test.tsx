import React from 'react';
import { createServer } from 'node:http';
import type { Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createInstance } from 'i18next';
import type { i18n as I18nInstance } from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { toast, Toaster } from 'react-hot-toast';
import client from '@common/gqlClient';
import { storageGetResendEmailTime } from '@common/utils/storage';
import commonEn from '../../../../../i18n/en/common.json';
import settingEn from '../../../../../i18n/en/setting.json';
import SendVerificationEmail from '../SendVerificationEmail';

type Reply = { status: number; body: unknown };
type Wire = { method: string; url: string; query: unknown; variables: unknown };

const cooldownKey = 'auth.email.resend.time';
const fallbackKey = 'common:error.something_went_wrong';
const resendKey = 'setting:profile.resend_verification_email';
const sentKey = 'setting:profile.email_sent';

describe('SendVerificationEmail request failures', () => {
  let server: Server;
  let endpoint: string;
  let translations: I18nInstance;
  let queryClient: QueryClient;
  let reply: Reply | undefined;
  let requests: Wire[] = [];
  let serverErrors: string[] = [];
  let savedCooldown: string | null = null;
  let hasSavedCooldown = false;
  let endpointChanged = false;
  let originalMatchMedia: PropertyDescriptor | undefined;
  let installedMatchMedia = false;

  beforeAll(async () => {
    translations = createInstance();
    await translations.use(initReactI18next).init({
      lng: 'en',
      fallbackLng: 'en',
      defaultNS: 'common',
      ns: ['common', 'setting'],
      resources: { en: { common: commonEn, setting: settingEn } },
      interpolation: { escapeValue: false },
    });
    for (const key of [fallbackKey, resendKey, sentKey]) {
      expect(translations.exists(key)).toBe(true);
    }

    // JSDOM lacks this browser API. Keep the real Toaster and restore the
    // original descriptor; no product hook, toast handler or layout is mocked.
    originalMatchMedia = Object.getOwnPropertyDescriptor(window, 'matchMedia');
    if (typeof window.matchMedia !== 'function') {
      installedMatchMedia = true;
      Object.defineProperty(window, 'matchMedia', {
        configurable: true,
        writable: true,
        value: (query: string): MediaQueryList => ({
          matches: false,
          media: query,
          onchange: null,
          addListener: () => {},
          removeListener: () => {},
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => false,
        }),
      });
    }

    server = createServer((request, response) => {
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.setHeader('Access-Control-Allow-Headers', 'content-type');
      response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
      response.setHeader('Connection', 'close');
      if (request.method === 'OPTIONS') {
        response.writeHead(204);
        response.end();
        return;
      }
      const chunks: Buffer[] = [];
      request.on('data', (chunk: Buffer) => chunks.push(chunk));
      request.on('end', () => {
        try {
          if (request.method !== 'POST' || request.url !== '/api/graphql') {
            throw new Error('Unexpected GraphQL request endpoint');
          }
          const parsed: { query?: unknown; variables?: unknown } = JSON.parse(
            Buffer.concat(chunks).toString('utf8')
          );
          requests.push({
            method: request.method,
            url: request.url,
            query: parsed.query,
            variables: parsed.variables,
          });
          if (!reply)
            throw new Error('No response configured for this request');
          response.writeHead(reply.status, {
            'Content-Type': 'application/json',
          });
          response.end(JSON.stringify(reply.body));
        } catch (error) {
          serverErrors.push(String(error));
          response.writeHead(500, { 'Content-Type': 'application/json' });
          response.end('{}');
        }
      });
    });
    await new Promise<void>((resolve, reject) => {
      server.once('error', reject);
      server.listen(0, '127.0.0.1', () => {
        server.off('error', reject);
        resolve();
      });
    });
    endpoint =
      'http://127.0.0.1:' +
      (server.address() as AddressInfo).port +
      '/api/graphql';
  });

  beforeEach(() => {
    hasSavedCooldown = false;
    endpointChanged = false;
    savedCooldown = sessionStorage.getItem(cooldownKey);
    hasSavedCooldown = true;
    sessionStorage.removeItem(cooldownKey);
    toast.remove();
    reply = undefined;
    requests = [];
    serverErrors = [];
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          refetchOnReconnect: false,
          retry: false,
        },
      },
    });
    // Only the HTTP destination changes; the real singleton/client/hook run.
    client.setEndpoint(endpoint);
    endpointChanged = true;
  });

  afterEach(() => {
    try {
      expect(serverErrors).toEqual([]);
      if (queryClient) expect(queryClient.isMutating()).toBe(0);
    } finally {
      try {
        cleanup();
        toast.remove();
        queryClient?.clear();
      } finally {
        if (endpointChanged) client.setEndpoint('/api/graphql');
        if (hasSavedCooldown) {
          if (savedCooldown === null) sessionStorage.removeItem(cooldownKey);
          else sessionStorage.setItem(cooldownKey, savedCooldown);
        }
      }
    }
  });

  afterAll(async () => {
    try {
      if (server?.listening) {
        await new Promise<void>((resolve, reject) => {
          server.close((error) => (error ? reject(error) : resolve()));
        });
      }
    } finally {
      if (installedMatchMedia) {
        if (originalMatchMedia) {
          Object.defineProperty(window, 'matchMedia', originalMatchMedia);
        } else {
          Reflect.deleteProperty(window, 'matchMedia');
        }
      }
    }
  });

  function mount() {
    return render(
      <I18nextProvider i18n={translations}>
        <QueryClientProvider client={queryClient}>
          <SendVerificationEmail email="owner@example.test" />
          <Toaster />
        </QueryClientProvider>
      </I18nextProvider>
    );
  }

  async function resend() {
    fireEvent.click(screen.getByText(String(translations.t(resendKey))));
    await waitFor(() => expect(requests).toHaveLength(1));
    await waitFor(() => expect(queryClient.isMutating()).toBe(0));
    expect(requests[0].method).toBe('POST');
    expect(requests[0].url).toBe('/api/graphql');
    expect(requests[0].query).toEqual(
      expect.stringContaining('mutation sendEmailVerify')
    );
    expect(requests[0].variables).toEqual({});
  }

  async function expectRetryableError(message: string) {
    expect(await screen.findByRole('status')).toHaveTextContent(message);
    expect(screen.getByText(String(translations.t(resendKey)))).toBeVisible();
    expect(
      screen.queryByText(String(translations.t(sentKey)))
    ).not.toBeInTheDocument();
    expect(storageGetResendEmailTime()).toBeNull();
  }

  it('shows the GraphQL rejection message without starting a cooldown', async () => {
    const message = 'Verification request was rejected';
    reply = { status: 200, body: { errors: [{ message }] } };
    mount();

    await resend();

    await expectRetryableError(message);
  });

  it('uses the existing localized fallback for an empty GraphQL message', async () => {
    reply = { status: 200, body: { errors: [{ message: '' }] } };
    mount();

    await resend();

    await expectRetryableError(String(translations.t(fallbackKey)));
  });

  it('uses the existing localized fallback for a failed HTTP response', async () => {
    reply = { status: 503, body: {} };
    mount();

    await resend();

    await expectRetryableError(String(translations.t(fallbackKey)));
  });

  it('keeps the successful string status and one-minute cooldown', async () => {
    reply = {
      status: 200,
      body: { data: { sendEmailVerify: { status: 'true', message: null } } },
    };
    mount();
    const before = Date.now();

    await resend();

    expect(
      await screen.findByText(String(translations.t(sentKey)))
    ).toBeVisible();
    expect(
      screen.queryByText(String(translations.t(resendKey)))
    ).not.toBeInTheDocument();
    const saved = storageGetResendEmailTime();
    expect(saved).not.toBeNull();
    const deadline = Number(saved);
    expect(Number.isFinite(deadline)).toBe(true);
    expect(deadline).toBeGreaterThanOrEqual(before + 60_000);
    expect(deadline).toBeLessThanOrEqual(Date.now() + 60_000);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('keeps the existing false business-status message and retry state', async () => {
    const message = 'Please try again later';
    reply = {
      status: 200,
      body: { data: { sendEmailVerify: { status: 'false', message } } },
    };
    mount();

    await resend();

    await expectRetryableError(message);
  });
});
