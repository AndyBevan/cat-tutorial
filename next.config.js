/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/cat-tutorial',
  assetPrefix: '/cat-tutorial/',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
