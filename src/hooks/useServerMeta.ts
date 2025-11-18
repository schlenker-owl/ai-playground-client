// path: src/hooks/useServerMeta.ts
// ---
import { useEffect, useState } from 'react';

export type ServerStatus = 'checking' | 'starting' | 'online' | 'offline';

export interface ServerMeta {
  modelId: string;
  device: string;
  hasPeft: boolean;
  usingLora: boolean;
  loraAdaptersDir?: string;
  maxNewTokensDefault: number;
  temperatureDefault: number;
  ready: boolean;
  serverVersion: string;
}

interface RawMeta {
  model_id: string;
  device: string;
  has_peft: boolean;
  lora_adapters_dir: string | null;
  using_lora: boolean;
  max_new_tokens_default: number;
  temperature_default: number;
  ready: boolean;
  server_version: string;
}

/**
 * Fetches /api/meta once on mount and returns:
 *  - status: derived from ready/error
 *  - meta: mapped, camelCased metadata
 *  - error: optional error message
 */
export function useServerMeta() {
  const [status, setStatus] = useState<ServerStatus>('checking');
  const [meta, setMeta] = useState<ServerMeta | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchMeta() {
      try {
        const res = await fetch('/api/meta');
        if (cancelled) return;

        if (!res.ok) {
          throw new Error(`meta returned HTTP ${res.status}`);
        }

        const raw = (await res.json()) as RawMeta;
        const mapped: ServerMeta = {
          modelId: raw.model_id,
          device: raw.device,
          hasPeft: raw.has_peft,
          usingLora: raw.using_lora,
          loraAdaptersDir: raw.lora_adapters_dir ?? undefined,
          maxNewTokensDefault: raw.max_new_tokens_default,
          temperatureDefault: raw.temperature_default,
          ready: raw.ready,
          serverVersion: raw.server_version,
        };

        setMeta(mapped);
        setStatus(raw.ready ? 'online' : 'starting');
        setError(null);
      } catch (err: any) {
        if (cancelled) return;
        setStatus('offline');
        setMeta(null);
        setError(err?.message ?? 'Failed to fetch /api/meta');
      }
    }

    fetchMeta();

    return () => {
      cancelled = true;
    };
  }, []);

  return { status, meta, error };
}
