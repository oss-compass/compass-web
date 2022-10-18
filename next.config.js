const path = require('path');
const execSync = require('child_process').execSync;
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const lastCommitCommand = 'git rev-parse HEAD';
const isDevelopment = process.env.NODE_ENV === 'development';

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
});

/** @type {import("next").NextConfig} */
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
      isDevelopment
        ? {
            source: '/api/graphql',
            destination: `/api/proxy`,
          }
        : {
            source: '/api/:path*',
            destination: `${process.env.API_URL}/api/:path*`,
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
    return execSync(lastCommitCommand).toString().trim();
  },
};

module.exports = withBundleAnalyzer(
  withMDX({
    ...nextConfig,
    // Append the default value with md extensions
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  })
);
