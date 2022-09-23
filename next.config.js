const path = require('path');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const isDevelopment = process.env.NODE_ENV === 'development';

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['portrait.gitee.com'],
  },
  async rewrites() {
    return [
      isDevelopment
        ? {
            source: '/api/graphql',
            destination: `/api/proxy`,
          }
        : {
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
};

module.exports = withBundleAnalyzer(nextConfig);
