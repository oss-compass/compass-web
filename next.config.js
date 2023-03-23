// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
const { withSentryConfig } = require('@sentry/nextjs');
const isDocker = require('./script/is-docker');
const path = require('path');
const { i18n } = require('./next-i18next.config');
const execSync = require('child_process').execSync;

const inDocker = isDocker();
console.log({ inDocker });

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  compress: false,
  output: 'standalone',
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  images: {
    domains: ['portrait.gitee.com', 'avatars.githubusercontent.com'],
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
};

module.exports = withBundleAnalyzer({
  ...nextConfig,
  i18n,
});

module.exports = withSentryConfig(
  module.exports,
  { silent: !inDocker },
  { hideSourceMaps: true }
);
