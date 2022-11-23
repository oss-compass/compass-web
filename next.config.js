const path = require('path');
const { i18n } = require('./next-i18next.config');
const execSync = require('child_process').execSync;

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['portrait.gitee.com', 'avatars.githubusercontent.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/graphql',
        destination: `/api/proxy`,
      },
      {
        source: '/api/workflow',
        destination: `/api/proxy`,
      },
      {
        source: '/api/hook',
        destination: `/api/proxy`,
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
