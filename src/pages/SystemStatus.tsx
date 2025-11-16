// path: src/pages/SystemStatus.tsx
// ---
import Card from '../components/Card';

const MODE = import.meta.env.MODE;
const DEV_TARGET = import.meta.env.VITE_AI_SERVER_URL || 'http://localhost:8000';

export default function SystemStatus() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card title="Runtime">
        <div className="space-y-2 text-[#9aa3ab] text-sm">
          <p>
            <b>Mode:</b> <code className="text-accent">{MODE}</code>
          </p>
          <p>
            <b>AI server (dev target):</b>{' '}
            <code className="text-accent">{DEV_TARGET}</code>
          </p>
          <p>
            <b>API base (from client):</b>{' '}
            <code className="text-accent">/api</code>
          </p>
          <p className="text-xs text-[#6b7280]">
            This panel is UI-only for now. In a later step, we&apos;ll wire it
            to a FastAPI <code>/meta</code> or <code>/healthz</code> endpoint
            to report the active model, device, and CV capabilities.
          </p>
        </div>
      </Card>

      <Card title="Capabilities Snapshot">
        <ul className="list-disc list-inside text-[#9aa3ab] text-sm space-y-1">
          <li>Local LLM chat via <code>/chat</code>.</li>
          <li>LoRA training jobs via <code>/jobs/train/lora</code>.</li>
          <li>
            Artifacts under <code>outputs/</code> and{' '}
            <code>outputs/cv/</code> exposed through the UI.
          </li>
          <li>
            Applied CV (image &amp; video) powered by YOLO or a graceful stub
            when CV libs aren&apos;t installed.
          </li>
        </ul>
        <p className="mt-3 text-xs text-[#6b7280]">
          Think of this as the control center header for your local AI lab.
          We&apos;ll evolve it as we add metrics and health checks.
        </p>
      </Card>
    </div>
  );
}
