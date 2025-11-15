import { ReactNode } from 'react';
import { clsx } from 'clsx';

export default function Card({ title, children, className }:{
  title?: string; children: ReactNode; className?: string
}) {
  return (
    <div className={clsx("panel p-6", className)}>
      {title && <h2 className="text-xl font-semibold mb-3">{title}</h2>}
      {children}
    </div>
  );
}
