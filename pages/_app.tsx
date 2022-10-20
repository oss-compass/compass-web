import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import { SessionProvider } from 'next-auth/react';
import { gaPageView, PUBLIC_GA_ID } from '@common/utils/ga';

import '../styles/globals.scss';

console.table?.({
  APP_NAME: 'compass-web',
  APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION || 'unknown',
  GIT_COMMIT: process.env.NEXT_PUBLIC_GIT_COMMIT || 'unknown',
});

const NextNProgress = dynamic(() => import('nextjs-progressbar'), {
  ssr: false,
});

const isProduction = process.env.NODE_ENV === 'production';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();
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
    if (!isProduction) return;
    const handleRouteChange = (url: string) => {
      gaPageView(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient} contextSharing>
        <Head>
          <title>OSS Compass</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
          />
          <meta name="keywords" content={''} />
          <meta name="description" content={''} />
          <meta name="applicable-device" content="pc,mobile" />
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <NextNProgress
          startPosition={0.15}
          color="#cccccc"
          options={{ showSpinner: false }}
        />
        {isProduction && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${PUBLIC_GA_ID}`}
            ></Script>
            <Script id="google-analytics">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${PUBLIC_GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
