'use client';

import { Search, Bell, Menu } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useSidebar } from '@/components/providers';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const { openSidebar } = useSidebar();

  return (
    <header className="sticky top-0 z-30 bg-warm-bg border-b border-border-light px-4 sm:px-6 py-3 sm:py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={openSidebar}
            className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-warm-cream text-neutral-secondary touch-manipulation"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="page-title">{title}</h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="relative hidden md:block">
            <Input
              type="search"
              placeholder="Search..."
              className="w-48 lg:w-64 pl-9 py-2"
            />
            <Search className="w-4 h-4 text-neutral-tertiary absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <button className="relative p-2 rounded-lg hover:bg-warm-cream text-neutral-secondary transition-colors touch-manipulation">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>
        </div>
      </div>
    </header>
  );
}
