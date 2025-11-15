import { useEffect, useState } from 'react';
import Card from '../components/Card';
import { api } from '../lib/api';

type Item = { name:string; path:string; type:'dir'|'file' };

export default function Runs() {
  const [items, setItems] = useState<Item[]>([]);
  const [content, setContent] = useState<string>("");

  useEffect(() => { api.listArtifacts().then(res => setItems(res.items)).catch(console.error); }, []);

  async function open(path: string) {
    const res = await api.readArtifact(path);
    setContent(res.content || '');
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card title="Artifacts">
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
        <pre className="whitespace-pre-wrap text-[#dfe7ee] max-h-[600px] overflow-auto">
          {content || 'Select a file from the left.'}
        </pre>
      </Card>
    </div>
  );
}
