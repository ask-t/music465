/** @type {import('next').NextConfig} */
const nextConfig = {
  // 静的アセットのURLプレフィックスを設定
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://music465-unit1.vercel.app' : '',
  // 本番環境でのbasePathは設定しない
  basePath: '',
  // 静的アセットがクロスオリジンで正しく読み込まれるよう設定
  crossOrigin: 'anonymous',
};

export default nextConfig;
