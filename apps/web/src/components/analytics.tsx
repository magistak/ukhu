'use client';

import { useEffect } from 'react';

export function Analytics() {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === 'true') {
      console.log('[analytics] loaded');
    }
  }, []);

  return null;
}
