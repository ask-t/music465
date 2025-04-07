/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NODE_ENV === 'production' ? '/music465' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/music465' : '',
};

export default nextConfig;
