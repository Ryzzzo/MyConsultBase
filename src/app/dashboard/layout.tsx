'use client';

import { useEffect } from 'react';
import { Sidebar } from '@/components/dashboard/sidebar';
import { ToastContainer } from '@/components/ui/toast';
import { useUser, useSidebar } from '@/components/providers';
import { AddClientModal } from '@/components/modals/add-client-modal';
import { CreateInvoiceModal } from '@/components/modals/create-invoice-modal';
import { UploadDeliverableModal } from '@/components/modals/upload-deliverable-modal';
import { PostUpdateModal } from '@/components/modals/post-update-modal';
import { UpgradeModal } from '@/components/modals/upgrade-modal';
import { InviteMemberModal } from '@/components/modals/invite-member-modal';
import { ClientSlideOver } from '@/components/dashboard/client-slide-over';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loginAsTestUser } = useUser();
  const { isSidebarOpen, closeSidebar } = useSidebar();

  useEffect(() => {
    if (!user) {
      loginAsTestUser();
    }
  }, [user, loginAsTestUser]);

  if (!user) {
    return (
      <div className="min-h-screen bg-warm-bg flex items-center justify-center">
        <div className="animate-pulse text-neutral-secondary">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-bg lg:flex">
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <main className="flex-1 min-w-0 lg:ml-0">
        {children}
      </main>
      <ToastContainer />
      <AddClientModal />
      <CreateInvoiceModal />
      <UploadDeliverableModal />
      <PostUpdateModal />
      <UpgradeModal />
      <InviteMemberModal />
      <ClientSlideOver />
    </div>
  );
}
