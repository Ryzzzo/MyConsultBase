'use client';

import { cn } from '@/lib/utils';

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  success: 'bg-emerald-50 text-emerald-700',
  warning: 'bg-amber-50 text-amber-700',
  error: 'bg-red-50 text-red-700',
  info: 'bg-blue-50 text-blue-700',
  neutral: 'bg-gray-100 text-gray-700',
};

export function Badge({ children, variant = 'neutral', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: 'active' | 'completed' | 'archived' | 'pending' | 'paid' | 'overdue' }) {
  const config: Record<string, { variant: BadgeVariant; label: string }> = {
    active: { variant: 'success', label: 'Active' },
    completed: { variant: 'neutral', label: 'Completed' },
    archived: { variant: 'neutral', label: 'Archived' },
    pending: { variant: 'warning', label: 'Pending' },
    paid: { variant: 'success', label: 'Paid' },
    overdue: { variant: 'error', label: 'Overdue' },
  };

  const { variant, label } = config[status] || { variant: 'neutral', label: status };

  return <Badge variant={variant}>{label}</Badge>;
}
