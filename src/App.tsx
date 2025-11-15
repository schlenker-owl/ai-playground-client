import { NavLink, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Runs from './pages/Runs';
import TrainLoRA from './pages/TrainLora';
import { clsx } from 'clsx';

const nav = [
  { to: '/', label: 'Home' },
  { to: '/chat', label: 'Chat' },
  { to: '/runs', label: 'Runs' },
  { to: '/train/lora', label: 'Train LoRA' },
];

export default function App() {
  return (
    <div className="min-h-full grid grid-cols-[260px_1fr]">
      <aside className="h-full p-6 bg-black/40 border-r border-edge">
        <div className="text-xl font-semibold mb-6">
          <span className="text-accent">AI</span> Showcase
        </div>
        <nav className="space-y-2">
          {nav.map(n => (
            <NavLink key={n.to} to={n.to}
              className={({isActive}) =>
                clsx(
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
        </Routes>
      </main>
    </div>
  );
}
