// src/App.tsx
import { NavLink, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Runs from './pages/Runs';
import TrainLoRA from './pages/TrainLora';

// NEW
import CVHub from './pages/cv/CVHub';
import CVImage from './pages/cv/CVImage';
import CVVideo from './pages/cv/CVVideo';
import CVArtifacts from './pages/cv/CVArtifacts';

import { clsx } from 'clsx';

const nav = [
  { to: '/', label: 'Home' },
  { to: '/chat', label: 'Chat' },
  { to: '/runs', label: 'Runs' },
  { to: '/train/lora', label: 'Train LoRA' },
  // --- CV
  { to: '/cv', label: 'CV Hub' },
  { to: '/cv/image', label: 'CV: Image' },
  { to: '/cv/video', label: 'CV: Video' },
  { to: '/cv/artifacts', label: 'CV: Artifacts' },
];

export default function App() {
  return (
    <div className="min-h-full grid grid-cols-[260px_1fr]">
      <aside className="h-full p-6 bg-black/40 border-r border-[#181c21]">
        <div className="text-xl font-semibold mb-6">
          <span className="text-accent">AI</span> Playground
        </div>
        <nav className="space-y-2">
          {nav.map(n => (
            <NavLink key={n.to} to={n.to}
              className={({isActive}) => clsx(
                "block px-3 py-2 rounded-lg transition-colors",
                isActive ? "bg-accent/10 text-accent" : "hover:bg-white/5 text-text"
              )}>
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-10 text-sm text-[#9aa3ab]">
          Server: <code className="text-accent">/api</code>
        </div>
      </aside>
      <main className="p-8 space-y-8">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/chat" element={<Chat/>} />
          <Route path="/runs" element={<Runs/>} />
          <Route path="/train/lora" element={<TrainLoRA/>} />
          {/* CV */}
          <Route path="/cv" element={<CVHub/>} />
          <Route path="/cv/image" element={<CVImage/>} />
          <Route path="/cv/video" element={<CVVideo/>} />
          <Route path="/cv/artifacts" element={<CVArtifacts/>} />
        </Routes>
      </main>
    </div>
  );
}
