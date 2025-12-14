'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import {
  LayoutDashboard,
  Users,
  FileText,
  CreditCard,
  BarChart3,
  Settings,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/ui/avatar';
import { useUser, useSidebar } from '@/components/providers';
import { mockClients, mockInvoices } from '@/lib/mock-data';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/clients', icon: Users, label: 'Clients', badge: mockClients.filter(c => c.status === 'active').length },
  { href: '/dashboard/deliverables', icon: FileText, label: 'Deliverables' },
  { href: '/dashboard/invoices', icon: CreditCard, label: 'Billing', badge: mockInvoices.filter(i => i.status === 'pending').length },
  { href: '/dashboard/analytics', icon: BarChart3, label: 'Insights' },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useUser();
  const { isCollapsed, toggleCollapsed } = useSidebar();

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
          'fixed inset-y-0 left-0 z-50 bg-white border-r border-border-light',
          'transform transition-all duration-300 ease-in-out',
          'lg:translate-x-0 lg:static',
          'h-screen flex flex-col',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          isCollapsed ? 'lg:w-20' : 'lg:w-60',
          'w-[280px] sm:w-[260px]'
        )}
      >
        <div className={cn(
          'p-4 border-b border-border-light flex items-center',
          isCollapsed ? 'lg:justify-center' : 'justify-between'
        )}>
          <Link href="/dashboard" className="flex items-center" onClick={handleNavClick}>
            <div className={cn('hidden lg:flex w-10 h-10 rounded-lg bg-gradient-to-br from-forest to-forest-light items-center justify-center', !isCollapsed && 'lg:hidden')}>
              <span className="text-white font-display font-bold text-xl">C</span>
            </div>
            <img
              src="/consultbase-logo.svg"
              alt="ConsultBase"
              className={cn('h-8 w-auto', isCollapsed && 'lg:hidden')}
            />
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-warm-cream text-neutral-secondary touch-manipulation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1 no-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors touch-manipulation',
                  isActive
                    ? 'bg-forest-pale text-forest'
                    : 'text-neutral-secondary hover:bg-warm-cream hover:text-neutral-primary active:bg-warm-cream',
                  isCollapsed && 'lg:justify-center lg:px-0'
                )}
                title={isCollapsed ? item.label : undefined}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className={cn('flex-1', isCollapsed && 'lg:hidden')}>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && !isCollapsed && (
                  <span className={cn(
                    'px-2 py-0.5 rounded-full text-xs font-medium lg:block',
                    isActive ? 'bg-forest text-white' : 'bg-gray-100 text-neutral-secondary',
                    isCollapsed && 'lg:hidden'
                  )}>
                    {item.badge}
                  </span>
                )}
                {item.badge !== undefined && item.badge > 0 && isCollapsed && (
                  <span className="hidden lg:block absolute top-1 right-1 w-2 h-2 bg-forest rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border-light space-y-3">
          <button
            onClick={toggleCollapsed}
            className={cn(
              'hidden lg:flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium',
              'text-neutral-secondary hover:bg-warm-cream hover:text-neutral-primary transition-colors',
              isCollapsed && 'justify-center px-0'
            )}
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <>
                <ChevronLeft className="w-5 h-5" />
                <span>Collapse</span>
              </>
            )}
          </button>

          <div className={cn(
            'flex items-center gap-3 p-3 rounded-lg bg-warm-cream',
            isCollapsed && 'lg:justify-center lg:p-2'
          )}>
            <Avatar name={user?.name || 'User'} size="sm" />
            <div className={cn('flex-1 min-w-0', isCollapsed && 'lg:hidden')}>
              <p className="text-sm font-medium text-neutral-primary truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-neutral-secondary truncate">{user?.businessName || 'Your Business'}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
