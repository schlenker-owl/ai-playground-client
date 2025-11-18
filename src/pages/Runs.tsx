// path: src/pages/Runs.tsx
// ---
import { useEffect, useState } from 'react';
import Card from '../components/Card';
import { api } from '../lib/api';

type Item = { name: string; path: string; type: 'dir' | 'file' };

export default function Runs() {
  const [items, setItems] = useState<Item[]>([]);
  const [content, setContent] = useState<string>('');
  const [currentPath, setCurrentPath] = useState<string | null>(null);

  // Load items whenever currentPath changes
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await api.listArtifacts(currentPath || undefined);
        if (!cancelled) {
          setItems(res.items);
        }
      } catch (err) {
        if (!cancelled) {
          console.error(err);
          setItems([]);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [currentPath]);

  async function openFile(path: string) {
    try {
      const res = await api.readArtifact(path);
      setContent(res.content || '');
    } catch (err) {
      console.error(err);
      setContent('[error reading file]');
    }
  }

  function enterDir(path: string) {
    setCurrentPath(path);
    setContent('');
  }

  function goUp() {
    if (!currentPath) return;
    const parts = currentPath.split('/');
    parts.pop();
    const parent = parts.join('/') || null;
    setCurrentPath(parent);
    setContent('');
  }

  const locationLabel = `outputs/${currentPath ? currentPath : ''}`;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card title="Artifacts">
        <div className="flex items-center justify-between mb-3 text-[0.7rem] text-[#9aa3ab]">
          <div className="truncate">
            Location:{' '}
            <code className="text-accent">
              {locationLabel}
            </code>
          </div>
          {currentPath && (
            <button
              onClick={goUp}
              className="text-accent hover:underline flex-shrink-0"
            >
              ↑ Up one level
            </button>
          )}
        </div>

        <ul className="space-y-2">
          {items.length === 0 && (
            <li className="text-xs text-[#6b7280]">
              No artifacts found in this directory.
            </li>
          )}
          {items.map((i) => (
            <li
              key={i.path}
              className="flex items-center justify-between gap-2"
            >
              <span className="text-[#9aa3ab] truncate">
                {i.type === 'dir' ? '📁' : '📄'} {i.name}
              </span>
              {i.type === 'dir' ? (
                <button
                  onClick={() => enterDir(i.path)}
                  className="text-accent hover:underline text-xs flex-shrink-0"
                >
                  enter
                </button>
              ) : (
                <button
                  onClick={() => openFile(i.path)}
                  className="text-accent hover:underline text-xs flex-shrink-0"
                >
                  open
                </button>
              )}
            </li>
          ))}
        </ul>
      </Card>

      <Card title="Preview">
        <pre className="whitespace-pre-wrap text-[#dfe7ee] max-h-[600px] overflow-auto text-sm">
          {content || 'Select a file from the left.'}
        </pre>
      </Card>
    </div>
  );
}
