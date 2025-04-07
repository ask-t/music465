/** @type {import('next').NextConfig} */
const nextConfig = {
  // 開発環境では空、本番環境では/music465をベースパスとして設定
  basePath: process.env.NODE_ENV === 'production' ? '/music465' : '',
  // 静的アセットのURLプレフィックスも同様に設定
  assetPrefix: process.env.NODE_ENV === 'production' ? '/music465' : '',
  // クロスオリジン設定
  crossOrigin: 'anonymous',
  // リンクの書き換えを行う設定
  async rewrites() {
    return {
      beforeFiles: [
        // アプリケーション内のリンクをmusic465プレフィックス付きで処理
        {
          source: '/songs',
          destination: '/music465/songs'
        },
        // 他のルートも同様に追加可能
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: 'ask-t.vercel.app',
            },
          ],
          destination: '/music465/:path*',
        },
      ],
    };
  },
};

export default nextConfig;
