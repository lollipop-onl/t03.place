const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { merge } = require('webpack-merge');

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['placehold.jp']
  },
  exportPathMap() {
    return {};
  },
  webpack: (config) =>
    merge(config, {
      resolve: {
        plugins: [new TsconfigPathsPlugin()],
      },
    }),
};
