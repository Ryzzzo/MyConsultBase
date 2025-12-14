'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import {
  LayoutDashboard,
  Users,
  FileText,
  Target,
  Receipt,
  CreditCard,
  BarChart3,
  FileBarChart,
  Settings,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/ui/avatar';
import { useUser } from '@/components/providers';
import { mockClients, mockInvoices } from '@/lib/mock-data';

const mainNav = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/clients', icon: Users, label: 'Clients', badge: mockClients.filter(c => c.status === 'active').length },
  { href: '/dashboard/deliverables', icon: FileText, label: 'Deliverables' },
  { href: '/dashboard/milestones', icon: Target, label: 'Milestones' },
];

const billingNav = [
  { href: '/dashboard/invoices', icon: Receipt, label: 'Invoices', badge: mockInvoices.filter(i => i.status === 'pending').length },
  { href: '/dashboard/payments', icon: CreditCard, label: 'Payments' },
];

const insightsNav = [
  { href: '/dashboard/analytics', icon: BarChart3, label: 'Analytics' },
  { href: '/dashboard/reports', icon: FileBarChart, label: 'Reports' },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useUser();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleNavClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="sidebar-overlay opacity-100"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-[280px] sm:w-[260px] bg-white border-r border-border-light',
          'transform transition-transform duration-300 ease-in-out',
          'lg:translate-x-0 lg:static',
          'h-screen flex flex-col',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="p-4 border-b border-border-light flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center" onClick={handleNavClick}>
            <img
              src="/consultbase-logo.svg"
              alt="ConsultBase"
              className="h-8 w-auto"
            />
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-warm-cream text-neutral-secondary touch-manipulation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-6 no-scrollbar">
          <NavSection title="Main" items={mainNav} pathname={pathname} onNavClick={handleNavClick} />
          <NavSection title="Billing" items={billingNav} pathname={pathname} onNavClick={handleNavClick} />
          <NavSection title="Insights" items={insightsNav} pathname={pathname} onNavClick={handleNavClick} />
        </nav>

        <div className="p-3 border-t border-border-light">
          <Link
            href="/dashboard/settings"
            onClick={handleNavClick}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors mb-3 touch-manipulation',
              pathname === '/dashboard/settings'
                ? 'bg-forest-pale text-forest'
                : 'text-neutral-secondary hover:bg-warm-cream hover:text-neutral-primary active:bg-warm-cream'
            )}
          >
            <Settings className="w-4 h-4" />
            Settings
          </Link>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-warm-cream">
            <Avatar name={user?.name || 'User'} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-neutral-primary truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-neutral-secondary truncate">{user?.businessName || 'Your Business'}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

interface NavItem {
  href: string;
  icon: typeof LayoutDashboard;
  label: string;
  badge?: number;
}

function NavSection({
  title,
  items,
  pathname,
  onNavClick
}: {
  title: string;
  items: NavItem[];
  pathname: string;
  onNavClick?: () => void;
}) {
  return (
    <div>
      <p className="px-3 mb-2 text-xs font-semibold text-neutral-tertiary uppercase tracking-wider">{title}</p>
      <ul className="space-y-1">
        {items.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onNavClick}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors touch-manipulation',
                  isActive
                    ? 'bg-forest-pale text-forest'
                    : 'text-neutral-secondary hover:bg-warm-cream hover:text-neutral-primary active:bg-warm-cream'
                )}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                <span className="flex-1">{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={cn(
                    'px-2 py-0.5 rounded-full text-xs font-medium',
                    isActive ? 'bg-forest text-white' : 'bg-gray-100 text-neutral-secondary'
                  )}>
                    {item.badge}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
