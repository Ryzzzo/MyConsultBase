'use client';

import { cn } from '@/lib/utils';

interface Tab {
  id: string;
  label: string;
  count?: number;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
}

export function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div className="border-b border-border-light">
      <nav className="flex gap-6" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative py-3 text-sm font-medium transition-colors',
              activeTab === tab.id
                ? 'text-forest'
                : 'text-neutral-secondary hover:text-neutral-primary'
            )}
          >
            <span className="flex items-center gap-2">
              {tab.label}
              {tab.count !== undefined && (
                <span
                  className={cn(
                    'px-2 py-0.5 rounded-full text-xs',
                    activeTab === tab.id
                      ? 'bg-forest-pale text-forest'
                      : 'bg-gray-100 text-neutral-secondary'
                  )}
                >
                  {tab.count}
                </span>
              )}
            </span>
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-forest" />
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}
