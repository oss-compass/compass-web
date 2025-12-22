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
  transpilePackages: [
    'ahooks',
    '@oss-compass/graphql',
    '@oss-compass/ui',
    'i18next',
    'react-i18next',
    'next-i18next',
  ],
  compress: false,
  output: 'standalone',
  // 为 next-i18next 15.x 设置配置文件路径
  env: {
    NEXT_I18NEXT_CONFIG_PATH: path.resolve('./next-i18next.config.js'),
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'portrait.gitee.com',
      },
      {
        protocol: 'https',
        hostname: 'foruda.gitee.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'compass.gitee.co',
      },
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
