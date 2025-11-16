// path: src/App.tsx
// ---
// src/App.tsx
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Runs from './pages/Runs';
import TrainLoRA from './pages/TrainLora';

// CV pages
import CVHub from './pages/cv/CVHub';
import CVImage from './pages/cv/CVImage';
import CVVideo from './pages/cv/CVVideo';
import CVArtifacts from './pages/cv/CVArtifacts';

// New high-level pages
import Diffusion from './pages/Diffusion';
import Datasets from './pages/Datasets';
import SystemStatus from './pages/SystemStatus';

// Layout
import AppShell from './components/layout/AppShell';

export default function App() {
  return (
    <AppShell>
      <Routes>
        {/* Playgrounds */}
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/cv" element={<CVHub />} />
        <Route path="/cv/image" element={<CVImage />} />
        <Route path="/cv/video" element={<CVVideo />} />

        {/* Training */}
        <Route path="/train/lora" element={<TrainLoRA />} />

        {/* Observability */}
        <Route path="/runs" element={<Runs />} />
        <Route path="/cv/artifacts" element={<CVArtifacts />} />
        <Route path="/system" element={<SystemStatus />} />

        {/* Future capabilities */}
        <Route path="/diffusion" element={<Diffusion />} />
        <Route path="/datasets" element={<Datasets />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
}
