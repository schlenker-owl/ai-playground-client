// path: src/pages/Datasets.tsx
// ---
import Card from '../components/Card';

export default function Datasets() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card title="Datasets (coming soon)">
        <p className="text-[#9aa3ab] text-sm">
          This panel will surface curated datasets that power local training
          runs (LoRA, CV, and beyond).
        </p>
        <ul className="mt-3 list-disc list-inside text-[#9aa3ab] text-sm space-y-1">
          <li>List local dataset directories with basic stats.</li>
          <li>Show sample rows/snippets for quick inspection.</li>
          <li>Tag datasets by task (chat, instruction, CV, ReID, etc.).</li>
        </ul>
        <p className="mt-4 text-xs text-[#6b7280]">
          The goal: make it obvious how data flows into each training job,
          tying the UI back to your <code>configs/</code> and{' '}
          <code>outputs/</code> structure.
        </p>
      </Card>

      <Card title="Planned Features">
        <ul className="list-disc list-inside text-[#9aa3ab] text-sm space-y-1">
          <li>Link datasets directly to LoRA configs.</li>
          <li>Basic quality checks (size, class balance, etc.).</li>
          <li>Quick filters to create training subsets.</li>
        </ul>
      </Card>
    </div>
  );
}
