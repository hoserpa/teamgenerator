/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/teamgenerator' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/teamgenerator/' : '',
  images: {
    unoptimized: true
  },
  trailingSlash: true,
}

module.exports = nextConfig
