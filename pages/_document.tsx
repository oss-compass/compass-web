import { Html, Head, Main, NextScript } from 'next/document';
import { PUBLIC_GA_ID } from '@common/utils/ga';

const isProduction = process.env.NODE_ENV === 'production';

export default function Document() {
  return (
    <Html>
      <Head />
      {isProduction && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${PUBLIC_GA_ID}`}
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${PUBLIC_GA_ID}');`,
            }}
          ></script>
        </>
      )}
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
