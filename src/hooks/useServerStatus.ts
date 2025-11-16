// path: src/hooks/useServerStatus.ts
// ---
import { useEffect, useState } from 'react';
import { cv } from '../lib/api';

export type ServerStatus = 'checking' | 'online' | 'offline';

/**
 * Simple hook that pings the AI server once on mount.
 * Uses /cv/models, which is light and already exists on the FastAPI side.
 */
export function useServerStatus(): ServerStatus {
  const [status, setStatus] = useState<ServerStatus>('checking');

  useEffect(() => {
    let cancelled = false;

    async function ping() {
      try {
        await cv.models();
        if (!cancelled) setStatus('online');
      } catch {
        if (!cancelled) setStatus('offline');
      }
    }

    ping();
    return () => {
      cancelled = true;
    };
  }, []);

  return status;
}
