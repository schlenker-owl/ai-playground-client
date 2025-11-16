import { useEffect, useState } from 'react';
import Card from '../../components/Card';
import { cv } from '../../lib/api';

type Item = { name:string; path:string; type:'dir'|'file' };

export default function CVArtifacts(){
  const [items, setItems] = useState<Item[]>([]);
  const [preview, setPreview] = useState<{ kind:string; content:string }|null>(null);

  useEffect(() => { cv.list().then(res => setItems(res.items)).catch(console.error); }, []);

  async function open(path:string) {
    const res = await cv.artifact(path);
    setPreview(res);
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card title="CV Artifacts">
        <ul className="space-y-2">
          {items.map(i => (
            <li key={i.path} className="flex items-center justify-between">
              <span className="text-[#9aa3ab]">{i.type === 'dir' ? '📁' : '📄'} {i.name}</span>
              {i.type === 'file' && (
                <button onClick={() => open(i.path)} className="text-accent hover:underline">open</button>
              )}
            </li>
          ))}
        </ul>
      </Card>
      <Card title="Preview">
        {!preview && <div className="text-[#9aa3ab]">Pick a file on the left.</div>}
        {preview?.kind === 'text' && (
          <pre className="whitespace-pre-wrap text-[#dfe7ee] max-h-[640px] overflow-auto">{preview.content}</pre>
        )}
        {preview?.kind === 'image' && (
          <img src={preview.content} className="max-h-[640px] rounded-lg border border-[#1c2025]" />
        )}
        {preview?.kind === 'bin' && (
          <div className="text-[#9aa3ab]">{preview.content}</div>
        )}
      </Card>
    </div>
  );
}
