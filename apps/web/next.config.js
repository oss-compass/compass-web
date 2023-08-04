// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
const { withSentryConfig } = require('@sentry/nextjs');
const path = require('path');
const { i18n } = require('./next-i18next.config');
const execSync = require('child_process').execSync;

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const silent = !process.env.SENTRY_LOG_ENABLE;

const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ['ahooks', '@oss-compass/graphql', '@oss-compass/ui'],
  swcMinify: true,
  compress: false,
  output: 'standalone',
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  images: {
    domains: [
      'portrait.gitee.com',
      'foruda.gitee.com',
      'avatars.githubusercontent.com',
    ],
  },
  async rewrites() {
    return [
      {
        source: '/compare/:path*',
        destination: '/analyze/:path*',
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/lab/model',
        destination: '/lab/model/my',
        permanent: false,
      },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  generateBuildId: async () => {
    if (process.env.NEXT_PUBLIC_GIT_COMMIT) {
      return process.env.NEXT_PUBLIC_GIT_COMMIT;
    }
    return execSync('git rev-parse HEAD').toString().trim();
  },
  experimental: {
    scrollRestoration: true,
  },
};

module.exports = withBundleAnalyzer({
  ...nextConfig,
  i18n,
});

// module.exports = withSentryConfig(
//   module.exports,
//   { silent },
//   { hideSourceMaps: true }
// );
