// middleware.js または middleware.ts
import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl.clone();
  const { pathname } = url;
  const host = request.headers.get('host');
  
  console.log(`Middleware running - Host: ${host}, Path: ${pathname}`);

  // ask-t.vercel.appからのアクセスの場合
  if (host === 'ask-t.vercel.app') {
    // music465プレフィックスがない場合はリダイレクト
    if (!pathname.startsWith('/music465')) {
      // ルートパスの場合は/music465へ
      if (pathname === '/') {
        console.log('Redirecting root to /music465');
        return NextResponse.redirect(new URL('/music465', request.url));
      }
      
      // その他のパスは/music465/pathへ
      console.log(`Redirecting ${pathname} to /music465${pathname}`);
      return NextResponse.redirect(new URL(`/music465${pathname}`, request.url));
    }
  }

  return NextResponse.next();
}

// より厳密なマッチャー設定
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};