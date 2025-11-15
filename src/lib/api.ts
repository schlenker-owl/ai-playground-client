// src/lib/api.ts

const BASE = import.meta.env.VITE_AI_SERVER_URL || 'http://localhost:8000'; // e.g. "http://localhost:8000"
// If BASE is set, call the server directly; otherwise use the /api proxy.
async function jfetch<T>(path: string, init?: RequestInit): Promise<T> {
  const url = BASE ? `${BASE}${path}` : `/api${path}`;
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
    ...init,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status} ${res.statusText}: ${text}`);
  }
  return res.json();
}

export const api = {
  chat: (user: string, system?: string, opts?: { temperature?: number; max_new_tokens?: number }) =>
    jfetch<{ answer: string }>(`/chat`, {
      method: 'POST',
      body: JSON.stringify({ user, system, ...(opts || {}) }),
    }),

  listArtifacts: () =>
    jfetch<{ items: Array<{ name: string; path: string; type: 'dir' | 'file' }> }>(`/artifacts/list`),

  readArtifact: (path: string) =>
    jfetch<{ content: string }>(`/artifacts/file?path=${encodeURIComponent(path)}`),

  startLoRA: (payload: { config_path: string }) =>
    jfetch<{ job_id: string }>(`/jobs/train/lora`, { method: 'POST', body: JSON.stringify(payload) }),

  jobStatus: (id: string) => jfetch<{ id: string; status: string; lines: string[] }>(`/jobs/${id}`),
};
