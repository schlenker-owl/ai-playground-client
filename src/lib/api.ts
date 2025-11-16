// src/lib/api.ts

// If BASE is set, call the server directly; otherwise use the /api proxy.
// src/lib/api.ts
// All calls go to /api/** so we can proxy to ai-server in dev and nginx in prod.

async function jfetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`/api${path}`, {
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
    ...init
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status} ${res.statusText}: ${text}`);
  }
  return res.json();
}

export const api = {
  // chat
  chat: (user: string, system?: string, opts?: { temperature?: number; max_new_tokens?: number; }) =>
    jfetch<{ answer: string }>(`/chat`, {
      method: 'POST',
      body: JSON.stringify({ user, system, ...(opts||{}) })
    }),

  // runs & artifacts (LoRA jobs)
  listArtifacts: () => jfetch<{ items: Array<{ name: string; path: string; type: 'dir'|'file' }> }>(`/artifacts/list`),
  readArtifact: (path: string) => jfetch<{ content: string }>(`/artifacts/file?path=${encodeURIComponent(path)}`),

  // jobs: lora train
  startLoRA: (payload: { config_path: string }) =>
    jfetch<{ job_id: string }>(`/jobs/train/lora`, { method: 'POST', body: JSON.stringify(payload) }),
  jobStatus: (id: string) => jfetch<{ id: string; status: string; lines: string[] }>(`/jobs/${id}`)
};

// --- CV API client ---
export const cv = {
  models: () => jfetch<{ models: string[] }>(`/cv/models`),

  // multipart form-data image inference
  inferImage: (data: FormData) =>
    fetch(`/api/cv/infer/image`, { method: 'POST', body: data })
      .then(async (r) => { if (!r.ok) throw new Error(await r.text()); return r.json(); }) as Promise<{
        preview: string; boxes: number[][]; labels: string[]; scores: number[]; artifact_dir: string;
      }>,

  // multipart form-data video job
  startVideo: (data: FormData) =>
    fetch(`/api/cv/jobs/infer_video`, { method: 'POST', body: data })
      .then(async (r) => { if (!r.ok) throw new Error(await r.text()); return r.json(); }) as Promise<{ job_id: string }>,

  job: (id: string) => jfetch<{ status: string; out_dir?: string; error?: string }>(`/cv/jobs/${id}`),

  list: () => jfetch<{ items: Array<{ name:string; path:string; type:'dir'|'file' }> }>(`/cv/artifacts`),
  artifact: (path: string) => jfetch<{ kind: string; content: string }>(`/cv/artifact?path=${encodeURIComponent(path)}`)
};
