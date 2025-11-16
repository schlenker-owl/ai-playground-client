import { useEffect, useRef, useState } from 'react';
import Card from '../../components/Card';
import { cv } from '../../lib/api';

export default function CVVideo(){
  const [models, setModels] = useState<string[]>([]);
  const [file, setFile] = useState<File|null>(null);
  const [modelId, setModelId] = useState('yolov8n.pt');
  const [conf, setConf] = useState(0.25);
  const [iou, setIou] = useState(0.45);
  const [imgsz, setImgSz] = useState(640);
  const [job, setJob] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [outDir, setOutDir] = useState<string>('');
  const timer = useRef<any>(null);

  useEffect(() => { cv.models().then(r => setModels(r.models)).catch(console.error); }, []);

  async function start(){
    if(!file){ return; }
    const fd = new FormData();
    fd.append('file', file);
    fd.append('model_id', modelId);
    fd.append('conf', String(conf));
    fd.append('iou', String(iou));
    fd.append('imgsz', String(imgsz));
    const res = await cv.startVideo(fd);
    setJob(res.job_id);
    setStatus('running');
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(async ()=>{
      const s = await cv.job(res.job_id);
      setStatus(s.status);
      if (s.status === 'done' || s.status === 'error'){
        clearInterval(timer.current);
        setOutDir(s.out_dir || '');
      }
    }, 2000);
  }
  useEffect(()=> ()=> { if(timer.current) clearInterval(timer.current); }, []);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card title="Video Inference">
        <div className="space-y-3">
          <input type="file" accept="video/*" onChange={e=> setFile(e.target.files?.[0]||null)} />
          <div className="grid grid-cols-2 gap-3">
            <label className="text-sm text-[#9aa3ab]">Model</label>
            <select className="bg-muted rounded p-2"
              value={modelId} onChange={e=> setModelId(e.target.value)}>
              {models.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <label className="text-sm text-[#9aa3ab]">conf</label>
            <input className="bg-muted rounded p-2" type="number" step="0.01" min="0" max="1" value={conf} onChange={e=>setConf(parseFloat(e.target.value))} />
            <label className="text-sm text-[#9aa3ab]">iou</label>
            <input className="bg-muted rounded p-2" type="number" step="0.01" min="0" max="1" value={iou} onChange={e=>setIou(parseFloat(e.target.value))} />
            <label className="text-sm text-[#9aa3ab]">imgsz</label>
            <input className="bg-muted rounded p-2" type="number" step="1" min="256" max="1920" value={imgsz} onChange={e=>setImgSz(parseInt(e.target.value||"640"))} />
          </div>
          <button onClick={start} className="px-4 py-2 rounded-lg bg-accent text-black font-medium">
            Start
          </button>
          <div className="text-sm text-[#9aa3ab] mt-2">
            Job: {job || '—'} | Status: <b>{status || '—'}</b>
          </div>
        </div>
      </Card>

      <Card title="Result">
        {status === 'done' && outDir
          ? <div className="text-[#9aa3ab]">
              Processed outputs saved under:<br/>
              <code className="text-accent">{outDir}</code>
              <p className="mt-3">Open <b>CV: Artifacts</b> to preview.</p>
            </div>
          : <div className="text-[#9aa3ab]">Start a job and wait for completion.</div>
        }
      </Card>
    </div>
  );
}
