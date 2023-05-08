import { useRouter } from 'next/router';
import Script from 'next/script';
import * as React from 'react';

export const isClient = typeof document !== 'undefined';

declare global {
  interface Window {
    gtag: undefined | ((...args: any[]) => void);
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string, id?: string) => {
  if (!window.gtag) {
    console.warn('window.gtag is not defined');
    return;
  }

  if (!(id || window._gaTrackingId)) {
    console.warn('gaTrackingId is not defined');
    return;
  }

  window.gtag('config', id || window._gaTrackingId, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value: string;
}) => {
  if (!window.gtag) {
    console.warn('window.gtag is not defined');
    return;
  }

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Put this in _document.tsx
export const GAScripts = ({ id }: { id: string }) => {
  React.useEffect(() => {
    window._gaTrackingId = id;
  }, [id]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${id}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
};

// Use this hook in _app.tsx
export const useAppGA = (gaTrackingId: string) => {
  const router = useRouter();

  React.useEffect(() => {
    const handleRouteChange = (url: string) => {
      console.log('routeChange', url);
      pageview(url, gaTrackingId);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [gaTrackingId, router.events]);
};
