// path: src/pages/Diffusion.tsx
// ---
import { useState } from 'react';
import Card from '../components/Card';
import { diffusion } from '../lib/api';

export default function Diffusion() {
  const [samples, setSamples] = useState(16);
  const [seed, setSeed] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [outPath, setOutPath] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generate() {
    setLoading(true);
    setError(null);
    setStatus('sampling');
    try {
      const payload: { n?: number; nrow?: number; seed?: number } = {
        n: samples,
      };
      if (seed.trim() !== '') {
        const s = Number(seed);
        if (!Number.isNaN(s)) payload.seed = s;
      }
      const res = await diffusion.sampleMnist(payload);
      setImage(res.image);
      setOutPath(res.out_path ?? null);
      setStatus('ok');
    } catch (err: any) {
      console.error(err);
      setError(err?.message ?? 'Failed to sample diffusion model.');
      setStatus('error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Card title="MNIST Diffusion (DDPM-Mini)">
        <div className="space-y-4 text-sm text-[#9aa3ab]">
          <p>
            This playground samples a tiny diffusion model (<code>DDPM-Mini</code>)
            trained on MNIST digits. It uses the same code as{' '}
            <code>scripts/generative/train_ddpm_mini.py</code> and a checkpoint
            under <code>outputs/ddpm_mini.pth</code>.
          </p>

          <div className="grid md:grid-cols-3 gap-4 items-end">
            <div className="space-y-1">
              <label className="block text-xs uppercase tracking-wide text-[#6b7280]">
                Samples (grid size)
              </label>
              <input
                type="number"
                min={1}
                max={64}
                value={samples}
                onChange={(e) => setSamples(Number(e.target.value) || 1)}
                className="w-full bg-black/20 border border-edge rounded p-2 text-sm"
              />
              <p className="text-[0.7rem] text-[#6b7280]">
                Number of images to draw from noise (arranged in a square-ish grid).
              </p>
            </div>

            <div className="space-y-1">
              <label className="block text-xs uppercase tracking-wide text-[#6b7280]">
                Seed (optional)
              </label>
              <input
                type="number"
                value={seed}
                onChange={(e) => setSeed(e.target.value)}
                placeholder="random"
                className="w-full bg-black/20 border border-edge rounded p-2 text-sm"
              />
              <p className="text-[0.7rem] text-[#6b7280]">
                Set for reproducible samples; leave blank for random.
              </p>
            </div>

            <div className="flex items-center justify-end">
              <button
                onClick={generate}
                disabled={loading}
                className="px-4 py-2 rounded bg-accent text-black font-semibold disabled:opacity-50"
              >
                {loading ? 'Sampling…' : 'Generate Grid'}
              </button>
            </div>
          </div>

          {status && (
            <div className="text-xs">
              Status:{' '}
              <span
                className={
                  status === 'error'
                    ? 'text-red-400'
                    : status === 'sampling'
                    ? 'text-accent'
                    : 'text-emerald-400'
                }
              >
                {status}
              </span>
            </div>
          )}

          {outPath && (
            <div className="text-[0.7rem] text-[#6b7280]">
              Saved under <code>outputs/{outPath}</code> (browse via the{' '}
              <b>Runs</b> page).
            </div>
          )}

          {error && (
            <div className="text-xs text-red-400 mt-1">
              {error}
            </div>
          )}
        </div>
      </Card>

      <Card title="Sample Grid">
        {image ? (
          <div className="flex justify-center">
            <img
              src={image}
              alt="DDPM-Mini MNIST grid"
              className="max-w-full rounded-lg border border-edge"
            />
          </div>
        ) : (
          <p className="text-sm text-[#9aa3ab]">
            Click <b>Generate Grid</b> to sample digits from the DDPM-Mini model.
          </p>
        )}
      </Card>
    </div>
  );
}
