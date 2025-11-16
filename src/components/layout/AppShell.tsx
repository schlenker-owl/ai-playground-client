// path: src/components/layout/AppShell.tsx
// ---
import { ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import ServerStatusBadge from '../ServerStatusBadge';

type NavItem = {
  to: string;
  label: string;
};

type NavSection = {
  label: string;
  items: NavItem[];
};

const NAV_SECTIONS: NavSection[] = [
  {
    label: 'Playgrounds',
    items: [
      { to: '/', label: 'Overview' },
      { to: '/chat', label: 'LLM Chat' },
      { to: '/cv', label: 'Vision Hub' },
      { to: '/diffusion', label: 'Diffusion (soon)' },
    ],
  },
  {
    label: 'Training',
    items: [
      { to: '/train/lora', label: 'LoRA Training' },
      { to: '/datasets', label: 'Datasets (soon)' },
    ],
  },
  {
    label: 'Observability',
    items: [
      { to: '/runs', label: 'Runs' },
      { to: '/cv/artifacts', label: 'CV Artifacts' },
      { to: '/system', label: 'System Status' },
    ],
  },
];

export function AppShell({ children }: { children: ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-full grid grid-cols-[260px_1fr]">
      <aside className="h-full p-6 bg-black/40 border-r border-edge flex flex-col">
        {/* Brand */}
        <div className="mb-8">
          <div className="text-xs font-semibold tracking-wide text-accent/80 mb-1">
            Local AI Lab
          </div>
          <div className="text-2xl font-semibold leading-tight">
            AI <span className="text-accent">Showcase</span>
          </div>
          <p className="mt-2 text-xs text-[#9aa3ab]">
            Run, train, and inspect local LLM & CV pipelines.
          </p>
        </div>

        {/* Nav sections */}
        <nav className="space-y-6 flex-1 overflow-y-auto pr-1">
          {NAV_SECTIONS.map((section) => (
            <div key={section.label}>
              <div className="text-[0.65rem] uppercase tracking-[0.18em] text-[#6b7280] mb-2">
                {section.label}
              </div>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      clsx(
                        'block px-3 py-2 rounded-lg text-sm transition-all duration-150',
                        isActive
                          ? 'bg-accent/10 text-accent'
                          : 'text-text/80 hover:bg-white/5 hover:text-text'
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer / route hint + server status */}
        <div className="mt-6 pt-4 border-t border-edge text-[0.7rem] text-[#9aa3ab]">
          <div>
            Server: <code className="text-accent">/api</code>
          </div>
          <div className="mt-1 truncate">
            Route:{' '}
            <span className="text-text/70">{location.pathname || '/'}</span>
          </div>
          <ServerStatusBadge />
        </div>
      </aside>

      <main className="p-8 space-y-8 overflow-y-auto">{children}</main>
    </div>
  );
}

export default AppShell;
