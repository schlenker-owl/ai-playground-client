import Card from '../../components/Card';
import { Link } from 'react-router-dom';

export default function CVHub(){
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card title="Applied CV — Overview">
        <p className="text-[#9aa3ab]">
          Run local detection/segmentation on images or process videos as background jobs.
          Artifacts (preview + JSON/CSV) are saved under <code>outputs/cv/</code>.
        </p>
        <ul className="mt-4 list-disc list-inside text-[#9aa3ab] space-y-1">
          <li><Link to="/cv/image" className="text-accent hover:underline">Image Inference</Link> — upload → preview with overlays.</li>
          <li><Link to="/cv/video" className="text-accent hover:underline">Video Inference</Link> — upload → job → processed outputs.</li>
          <li><Link to="/cv/artifacts" className="text-accent hover:underline">Browse Artifacts</Link> — list & inline preview.</li>
        </ul>
      </Card>
      <Card title="Models & Tips">
        <ul className="list-disc list-inside text-[#9aa3ab] space-y-1">
          <li>YOLO models listed from <code>CV_MODELS</code> or defaults (n/seg).</li>
          <li>Adjust <b>conf</b>, <b>iou</b>, <b>imgsz</b> to balance perf/quality.</li>
          <li>If Ultralytics is not installed, a stub will return a dummy box—UI still works.</li>
        </ul>
      </Card>
    </div>
  );
}
