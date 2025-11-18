// path: src/components/ServerStatusBadge.tsx
// ---
import { ServerStatus } from '../hooks/useServerMeta';

type Props = {
  status: ServerStatus;
  className?: string;
};

export default function ServerStatusBadge({ status, className }: Props) {
  const label =
    status === 'checking'
      ? 'Checking…'
      : status === 'starting'
      ? 'Starting…'
      : status === 'online'
      ? 'Online'
      : 'Offline';

  const dotColor =
    status === 'checking'
      ? 'bg-yellow-400/80 animate-pulse'
      : status === 'starting'
      ? 'bg-yellow-400/80'
      : status === 'online'
      ? 'bg-emerald-400'
      : 'bg-red-500';

  return (
    <div
      className={
        className ??
        'mt-2 flex items-center gap-2 text-[0.7rem] text-[#9aa3ab]'
      }
    >
      <span className={`inline-flex h-2.5 w-2.5 rounded-full ${dotColor}`} />
      <span>
        AI server:{' '}
        <span className="text-text/80">
          {label}
        </span>
      </span>
    </div>
  );
}
