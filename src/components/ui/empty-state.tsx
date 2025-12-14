'use client';

import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 px-4 text-center', className)}>
      <div className="w-16 h-16 bg-warm-cream rounded-full flex items-center justify-center mb-4 text-neutral-tertiary">
        {icon}
      </div>
      <h3 className="font-display text-lg font-semibold text-neutral-primary mb-1">{title}</h3>
      <p className="text-sm text-neutral-secondary max-w-sm mb-4">{description}</p>
      {action}
    </div>
  );
}
