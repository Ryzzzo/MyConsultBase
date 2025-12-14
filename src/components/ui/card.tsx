'use client';

import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className, hover, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'card p-4',
        hover && 'card-hover cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: string | number;
  change?: { value: string; positive: boolean };
}

export function StatCard({ icon, iconBg, label, value, change }: StatCardProps) {
  return (
    <Card hover className="p-5">
      <div className="flex items-start justify-between">
        <div className={cn('p-2.5 rounded-lg', iconBg)}>
          {icon}
        </div>
        {change && (
          <span
            className={cn(
              'text-xs font-medium px-2 py-0.5 rounded-full',
              change.positive ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
            )}
          >
            {change.positive ? '+' : ''}{change.value}
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-2xl font-semibold text-neutral-primary">{value}</p>
        <p className="text-sm text-neutral-secondary mt-0.5">{label}</p>
      </div>
    </Card>
  );
}
