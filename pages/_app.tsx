import { useState } from 'react';
import type { AppProps } from 'next/app';
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from '@tanstack/react-query';
import dynamic from 'next/dynamic';

import '../styles/globals.scss';

const NextNProgress = dynamic(() => import('nextjs-progressbar'), {
  ssr: false,
});

function MyApp({ Component, pageProps }: AppProps) {
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

  return (
    <QueryClientProvider client={queryClient} contextSharing>
      <NextNProgress startPosition={0.15} color="#000" />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
