// path: src/pages/Diffusion.tsx
// ---
import Card from '../components/Card';

export default function Diffusion() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card title="Diffusion Playground (coming soon)">
        <p className="text-[#9aa3ab] text-sm">
          This space will host local diffusion demos:
        </p>
        <ul className="mt-3 list-disc list-inside text-[#9aa3ab] text-sm space-y-1">
          <li>Text → image generation with local models.</li>
          <li>Prompt + seed controls for reproducible runs.</li>
          <li>Gallery of generated images tied to their configs.</li>
        </ul>
        <p className="mt-4 text-xs text-[#6b7280]">
          The UI is wired now; once the FastAPI diffusion endpoints are ready,
          we&apos;ll plug them into this page.
        </p>
      </Card>

      <Card title="Gallery (future)">
        <p className="text-[#9aa3ab] text-sm">
          Once wired, this panel will show a grid of recent generations from
          <code className="text-accent"> outputs/diffusion/</code> with prompts,
          seeds, and model parameters.
        </p>
      </Card>
    </div>
  );
}
