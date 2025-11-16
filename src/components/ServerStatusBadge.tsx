// path: src/components/ServerStatusBadge.tsx
// ---
import { clsx } from 'clsx';
import { useServerStatus } from '../hooks/useServerStatus';

export default function ServerStatusBadge() {
  const status = useServerStatus();

  const label =
    status === 'checking'
      ? 'Checking…'
      : status === 'online'
      ? 'Online'
      : 'Offline';

  const dotClass = clsx(
    'inline-flex h-2.5 w-2.5 rounded-full',
    status === 'checking' && 'bg-yellow-400/70 animate-pulse',
    status === 'online' && 'bg-emerald-400',
    status === 'offline' && 'bg-red-500'
  );

  return (
    <div className="mt-2 flex items-center gap-2 text-xs text-[#9aa3ab]">
      <span className={dotClass} />
      <span>
        AI server: <span className="text-text/80">{label}</span>
      </span>
    </div>
  );
}
