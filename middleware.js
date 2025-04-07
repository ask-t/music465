// middleware.js または middleware.ts
import { NextResponse } from 'next/server';

export function middleware(request) {
  // リクエストのURLを取得
  const url = request.nextUrl.clone();
  const { pathname } = url;
  const host = request.headers.get('host');
  
  console.log(`Middleware running - Host: ${host}, Path: ${pathname}`);

  // 相対パスのリンクを処理する場合（例：/songs へのリンククリック時）
  // オリジンがask-t.vercel.appの場合は/music465/pathに書き換える
  if (host === 'ask-t.vercel.app') {
    console.log(`Host matches ask-t.vercel.app`);
    if (!pathname.startsWith('/music465')) {
      console.log(`Redirecting from ${pathname} to /music465${pathname}`);
      url.pathname = `/music465${pathname}`;
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// ミドルウェアを適用するパスを指定
export const config = {
  matcher: [
    // すべてのパスに適用（より広範囲に）
    '/:path*',
  ],
};