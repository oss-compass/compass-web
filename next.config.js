const path = require('path');
const { i18n } = require('./next-i18next.config');
const execSync = require('child_process').execSync;

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

console.log();
console.log('process.env.API_URL:', process.env.API_URL);
console.log();

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
  async rewrites() {
    return [
      {
        source: '/api/graphql',
        destination: `${process.env.API_URL}/api/graphql`,
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
