'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CustomLink({ href, children, ...props }) {
  const [modifiedHref, setModifiedHref] = useState(href);
  
  useEffect(() => {
    // クライアントサイドでのみ実行
    if (typeof window !== 'undefined') {
      const isAskTHost = window.location.hostname === 'ask-t.vercel.app';
      
      // 外部リンクでなく、すでに/music465で始まっていない場合
      if (!href.startsWith('http') && !href.startsWith('/music465') && isAskTHost) {
        // 先頭のスラッシュを確認
        const path = href.startsWith('/') ? href : `/${href}`;
        setModifiedHref(`/music465${path}`);
        console.log(`Modified link: ${href} -> /music465${path}`);
      } else {
        setModifiedHref(href);
      }
    }
  }, [href]);
  
  return <Link href={modifiedHref} {...props}>{children}</Link>;
} 