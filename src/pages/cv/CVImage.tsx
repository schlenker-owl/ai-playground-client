import { useEffect, useState } from 'react';
import Card from '../../components/Card';
import { cv } from '../../lib/api';

export default function CVImage(){
  const [models, setModels] = useState<string[]>([]);
  const [file, setFile] = useState<File|null>(null);
  const [modelId, setModelId] = useState('yolov8n.pt');
  const [conf, setConf] = useState(0.25);
  const [iou, setIou] = useState(0.45);
  const [imgsz, setImgSz] = useState(640);
  const [preview, setPreview] = useState<string>('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string>('');

  useEffect(() => { cv.models().then(r => setModels(r.models)).catch(console.error); }, []);

  async function run(){
    if(!file){ setMsg('Pick an image'); return; }
    setMsg(''); setBusy(true); setPreview('');
    const fd = new FormData();
    fd.append('file', file);
    fd.append('model_id', modelId);
    fd.append('task', 'detect');
    fd.append('conf', String(conf));
    fd.append('iou', String(iou));
    fd.append('imgsz', String(imgsz));
    try{
      const res = await cv.inferImage(fd);
      setPreview(res.preview);
      setMsg(`Saved to: ${res.artifact_dir}`);
    }catch(e:any){
      setMsg(`Error: ${e.message}`);
    }finally{
      setBusy(false);
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card title="Image Inference">
        <div className="space-y-3">
          <input type="file" accept="image/*" onChange={e=> setFile(e.target.files?.[0]||null)} />
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
          <button disabled={busy} onClick={run} className="px-4 py-2 rounded-lg bg-accent text-black font-medium">
            {busy ? 'Running…' : 'Run'}
          </button>
          <div className="text-sm text-[#9aa3ab]">{msg}</div>
        </div>
      </Card>

      <Card title="Preview">
        {preview
          ? <img src={preview} alt="preview" className="max-h-[640px] rounded-lg border border-[#1c2025]" />
          : <div className="text-[#9aa3ab]">Upload an image and click Run.</div>
        }
      </Card>
    </div>
  );
}
