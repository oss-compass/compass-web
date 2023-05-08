import { useState, useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import App, { AppContext, AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import i18nextConfig from 'next-i18next.config.js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from 'next-auth/react';
import { useAppGA, GAScripts } from '@common/lib/ga';
import { browserLanguageDetectorAndReload } from '@common/utils/getLocale';

import '../styles/globals.scss';

const NextNProgress = dynamic(() => import('nextjs-progressbar'), {
  ssr: false,
});

type TProps = AppProps & {
  gaTrackingId: string;
};

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
  gaTrackingId,
}: TProps) {
  useAppGA(gaTrackingId);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            retry: false,
          },
        },
      })
  );

  useEffect(() => {
    browserLanguageDetectorAndReload();
    console.table?.({
      APP_NAME: 'compass-web',
      GIT_COMMIT: process.env.NEXT_PUBLIC_GIT_COMMIT || 'unknown',
    });
  }, []);

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient} contextSharing>
        <Head>
          <title>OSS Compass</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width" />
          <meta name="keywords" content={''} />
          <meta name="description" content={''} />
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <GAScripts id={gaTrackingId} />
        <NextNProgress
          startPosition={0.15}
          color="#3A5BEF"
          options={{ showSpinner: false }}
        />
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  );
}

MyApp.getInitialProps = async (context: AppContext) => {
  const initialProps = await App.getInitialProps(context);

  // most projects use NEXT_PUBLIC_ prefix for Google Analytics id env
  // but this project use GOOGLE_ANALYTICS as a runtime env
  const gaId = process.env.GOOGLE_ANALYTICS;

  return { ...initialProps, gaTrackingId: gaId };
};

export default appWithTranslation(MyApp, i18nextConfig);
