// path: src/pages/TrainLora.tsx
// ---
import { useEffect, useState } from 'react';
import Card from '../components/Card';
import { api } from '../lib/api';

const POLL_INTERVAL_FOREGROUND_MS = 3000; // 3s while you're watching it
const POLL_INTERVAL_BACKGROUND_MS = 15000; // 15s if tab is hidden

// Normalize raw log lines so each logical line is on its own row.
// - Split on \r / \n
// - Strip ANSI color codes
// - Drop empty fragments
function normalizeLogs(raw: string[]): string {
  const ansiRegex = /\x1b\[[0-9;]*m/g;

  const lines: string[] = [];
  for (const line of raw) {
    const parts = line.split(/\r\n|\r|\n/);
    for (let p of parts) {
      p = p.replace(ansiRegex, ''); // strip color codes
      if (p.trim().length === 0) continue;
      lines.push(p);
    }
  }
  return lines.join('\n');
}

export default function TrainLoRA() {
  const [configPath, setConfigPath] = useState(
    'configs/slm/qwen05b_lora_fast_plain.yaml'
  );

  const [jobId, setJobId] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [status, setStatus] = useState<string | null>(null);
  const [outputDir, setOutputDir] = useState<string | null>(null);

  // Poll job status
  useEffect(() => {
    if (!jobId) return;

    let cancelled = false;

    const poll = async () => {
      if (cancelled) return;
      try {
        const res = await api.jobStatus(jobId);
        if (cancelled) return;

        setLogs(res.lines || []);
        setStatus(res.status);
        setOutputDir(res.output_dir || null);

        if (res.status === 'running') {
          const isHidden =
            typeof document !== 'undefined' &&
            document.visibilityState === 'hidden';
          const delay = isHidden
            ? POLL_INTERVAL_BACKGROUND_MS
            : POLL_INTERVAL_FOREGROUND_MS;
          setTimeout(poll, delay);
        }
      } catch (err) {
        if (!cancelled) {
          console.error(err);
          // you could setStatus('error') here if you want to surface it
        }
      }
    };

    // initial kick
    poll();

    return () => {
      cancelled = true;
    };
  }, [jobId]);

  async function startJob() {
    setJobId(null);
    setLogs([]);
    setStatus(null);
    setOutputDir(null);

    try {
      const res = await api.startLoRA({ config_path: configPath });
      setJobId(res.job_id);
      setStatus('starting');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  }

  const running = status === 'running' || status === 'starting';
  const displayLogs =
    logs.length > 0
      ? normalizeLogs(logs)
      : 'After starting a job, logs will appear here in real time.';

  return (
    <div className="space-y-6">
      {/* Controls card */}
      <Card title="Start LoRA Training">
        <div className="space-y-4">
          <div className="text-sm text-[#9aa3ab]">
            This will invoke your training script:
            <pre className="mt-1 p-2 bg-black/20 rounded text-[0.7rem]">
              scripts/slm/qwen05b_lora_train.py
            </pre>
          </div>

          <label className="block text-xs text-[#9aa3ab]">
            Config path (relative to repo):
          </label>
          <input
            className="w-full bg-black/20 border border-edge rounded p-2 text-sm"
            value={configPath}
            onChange={(e) => setConfigPath(e.target.value)}
          />

          <button
            onClick={startJob}
            disabled={running}
            className="px-4 py-2 rounded bg-accent text-black font-semibold disabled:opacity-50"
          >
            {running ? 'Training…' : 'Start Training'}
          </button>

          {status && (
            <div className="text-xs text-[#9aa3ab]">
              Status:{' '}
              <span
                className={
                  status === 'error'
                    ? 'text-red-400'
                    : status === 'completed'
                    ? 'text-emerald-400'
                    : 'text-accent'
                }
              >
                {status}
              </span>
            </div>
          )}

          {outputDir && status === 'completed' && (
            <div className="mt-3 text-xs text-[#9aa3ab]">
              Output directory:
              <pre className="p-2 bg-black/20 rounded text-[0.7rem]">
                {outputDir}
              </pre>
              <p className="mt-1">
                You can explore this run in the <b>Runs</b> section.
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Logs card — full width */}
      <Card title="Training Logs">
        <pre className="whitespace-pre text-[#dfe7ee] max-h-[600px] overflow-auto text-xs leading-snug font-mono">
          {displayLogs}
        </pre>
      </Card>
    </div>
  );
}
