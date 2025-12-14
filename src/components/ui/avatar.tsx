'use client';

import { cn } from '@/lib/utils';

interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
};

const colorPairs = [
  { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  { bg: 'bg-blue-100', text: 'text-blue-700' },
  { bg: 'bg-amber-100', text: 'text-amber-700' },
  { bg: 'bg-rose-100', text: 'text-rose-700' },
  { bg: 'bg-violet-100', text: 'text-violet-700' },
  { bg: 'bg-teal-100', text: 'text-teal-700' },
];

function getColorFromName(name: string) {
  const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colorPairs.length;
  return colorPairs[index];
}

function getInitials(name: string): string {
  const parts = name.trim().split(' ').filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

export function Avatar({ name, size = 'md', className }: AvatarProps) {
  const initials = getInitials(name);
  const colors = getColorFromName(name);

  return (
    <div
      className={cn(
        'rounded-full flex items-center justify-center font-medium',
        sizeClasses[size],
        colors.bg,
        colors.text,
        className
      )}
    >
      {initials}
    </div>
  );
}
