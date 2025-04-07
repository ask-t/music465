/** @type {import('next').NextConfig} */
const nextConfig = {
  // 静的アセットのURLプレフィックスを設定
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://music465-unit1.vercel.app' : '',
  // 本番環境でのbasePathは設定しない
  basePath: '',
  // 静的アセットがクロスオリジンで正しく読み込まれるよう設定
  crossOrigin: 'anonymous',
  
  // 追加：画像の最適化設定
  images: {
    domains: ['music465-unit1.vercel.app', 'ask-t.vercel.app'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // カスタムルートの定義
  experimental: {
    // 外部URLへのリダイレクトを有効にする
    allowMiddlewareResponseBody: true,
  }
};

export default nextConfig;
