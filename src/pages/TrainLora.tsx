import { useState, useRef, useEffect } from 'react';
import Card from '../components/Card';
import { api } from '../lib/api';

export default function TrainLoRA() {
  const [configPath, setConfigPath] = useState("configs/slm/qwen05b_lora_fast.yaml");
  const [jobId, setJobId] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [lines, setLines] = useState<string[]>([]);
  const timer = useRef<any>(null);

  async function start() {
    setStatus('starting...');
    setLines([]);
    const res = await api.startLoRA({ config_path: configPath });
    setJobId(res.job_id);
    setStatus('running');
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(async () => {
      const s = await api.jobStatus(res.job_id);
      setStatus(s.status);
      setLines(s.lines);
      if (s.status === 'done' || s.status === 'error') {
        clearInterval(timer.current);
      }
    }, 2000);
  }

  useEffect(() => () => { if (timer.current) clearInterval(timer.current); }, []);

  return (
    <Card title="Train LoRA">
      <label className="block text-sm text-[#9aa3ab]">Config path</label>
      <input className="w-full rounded-lg bg-muted p-3 outline-none" value={configPath} onChange={e=>setConfigPath(e.target.value)} />
      <button onClick={start} className="mt-3 px-4 py-2 rounded-lg bg-accent text-black font-medium">Start job</button>

      {jobId && (
        <div className="mt-6">
          <div className="text-sm text-[#9aa3ab]">Job ID: <code className="text-accent">{jobId}</code></div>
          <div className="text-sm text-[#9aa3ab]">Status: <b>{status}</b></div>
          <pre className="mt-3 whitespace-pre-wrap text-[#dfe7ee] max-h-[360px] overflow-auto">{lines.join('\n')}</pre>
        </div>
      )}
    </Card>
  );
}
