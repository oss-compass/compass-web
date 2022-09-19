import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import dynamic from 'next/dynamic';
import { SessionProvider } from 'next-auth/react';
import { gaPageView } from '@common/utils/ga';

import '../styles/globals.scss';

const NextNProgress = dynamic(() => import('nextjs-progressbar'), {
  ssr: false,
});

const isProd = process.env.NODE_ENV === 'production';

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
    if (!isProd) return;
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
        <NextNProgress startPosition={0.15} color="#000" />
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
