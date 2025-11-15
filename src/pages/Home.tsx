import Card from '../components/Card';

export default function Home() {
  return (
    <Card title="Welcome">
      <p className="text-[#9aa3ab]">
        This app showcases my applied AI work: local LoRA/DoRA training on small models,
        TinyGPT experiments, and a chat UI against a local FastAPI server.
      </p>
      <ul className="mt-4 list-disc list-inside text-[#9aa3ab] space-y-1">
        <li><b>Chat:</b> interact with the local model (Qwen 0.5B + LoRA or merged).</li>
        <li><b>Runs:</b> browse <code>outputs/</code> (time_metrics/logs) as jobs complete.</li>
        <li><b>Train LoRA:</b> submit a config path and watch the log tail.</li>
      </ul>
    </Card>
  );
}
