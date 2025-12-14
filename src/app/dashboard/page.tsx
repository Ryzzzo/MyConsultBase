'use client';

import { Users, CreditCard, DollarSign, FileText, Plus, Upload, Receipt, MessageSquare, ArrowRight } from 'lucide-react';
import { Header } from '@/components/dashboard/header';
import { StatCard, Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { StatusBadge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useUser, useModal, useSlideOver } from '@/components/providers';
import { mockClients, mockActivities, mockInvoices, mockDeliverables, formatRelativeTime, formatCurrency } from '@/lib/mock-data';

export default function DashboardPage() {
  const { user } = useUser();
  const { openModal } = useModal();
  const { openSlideOver } = useSlideOver();

  const activeClients = mockClients.filter(c => c.status === 'active').length;
  const pendingInvoices = mockInvoices.filter(i => i.status === 'pending');
  const pendingAmount = pendingInvoices.reduce((sum, i) => sum + i.amount, 0);
  const paidThisMonth = mockInvoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0);
  const activeDeliverables = mockDeliverables.length;

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const recentClients = [...mockClients]
    .sort((a, b) => b.lastActivityAt.getTime() - a.lastActivityAt.getTime())
    .slice(0, 5);

  return (
    <div>
      <Header title="Dashboard" />

      <div className="p-6">
        <div className="mb-8">
          <h2 className="font-display text-2xl font-semibold text-neutral-primary">
            {greeting()}, {user?.name?.split(' ')[0] || 'there'}
          </h2>
          <p className="text-neutral-secondary mt-1">
            Here&apos;s what&apos;s happening with your practice today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={<Users className="w-5 h-5 text-emerald-600" />}
            iconBg="bg-emerald-50"
            label="Active Clients"
            value={activeClients}
            change={{ value: '2', positive: true }}
          />
          <StatCard
            icon={<CreditCard className="w-5 h-5 text-amber-600" />}
            iconBg="bg-amber-50"
            label="Pending Invoices"
            value={formatCurrency(pendingAmount)}
          />
          <StatCard
            icon={<DollarSign className="w-5 h-5 text-emerald-600" />}
            iconBg="bg-emerald-50"
            label="Revenue This Month"
            value={formatCurrency(paidThisMonth)}
            change={{ value: '12%', positive: true }}
          />
          <StatCard
            icon={<FileText className="w-5 h-5 text-blue-600" />}
            iconBg="bg-blue-50"
            label="Active Deliverables"
            value={activeDeliverables}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="p-0">
              <div className="flex items-center justify-between p-4 border-b border-border-light">
                <h3 className="font-display text-lg font-semibold text-neutral-primary">Recent Clients</h3>
                <Button size="sm" onClick={() => openModal('add-client')}>
                  <Plus className="w-4 h-4 mr-1" /> Add Client
                </Button>
              </div>

              <div className="divide-y divide-border-light">
                {recentClients.map((client) => (
                  <div
                    key={client.id}
                    onClick={() => openSlideOver(client.id)}
                    className="flex items-center justify-between p-4 hover:bg-warm-cream cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar name={client.name} />
                      <div>
                        <p className="text-sm font-medium text-neutral-primary">{client.name}</p>
                        <p className="text-xs text-neutral-secondary">{client.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <StatusBadge status={client.status} />
                      <span className="text-xs text-neutral-tertiary hidden sm:block">
                        {formatRelativeTime(client.lastActivityAt)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-border-light">
                <a href="/dashboard/clients" className="text-sm text-forest font-medium flex items-center gap-1 hover:text-forest-light">
                  View all clients <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-0">
              <div className="p-4 border-b border-border-light">
                <h3 className="font-display text-lg font-semibold text-neutral-primary">Recent Activity</h3>
              </div>
              <div className="divide-y divide-border-light">
                {mockActivities.slice(0, 5).map((activity) => (
                  <div key={activity.id} className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        activity.type === 'invoice' ? 'bg-amber-50 text-amber-600' :
                        activity.type === 'deliverable' ? 'bg-blue-50 text-blue-600' :
                        activity.type === 'milestone' ? 'bg-emerald-50 text-emerald-600' :
                        activity.type === 'update' ? 'bg-violet-50 text-violet-600' :
                        'bg-gray-50 text-gray-600'
                      }`}>
                        {activity.type === 'invoice' && <Receipt className="w-4 h-4" />}
                        {activity.type === 'deliverable' && <FileText className="w-4 h-4" />}
                        {activity.type === 'milestone' && <FileText className="w-4 h-4" />}
                        {activity.type === 'update' && <MessageSquare className="w-4 h-4" />}
                        {activity.type === 'client' && <Users className="w-4 h-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-neutral-primary">{activity.description}</p>
                        {activity.clientName && (
                          <p className="text-xs text-neutral-secondary mt-0.5">{activity.clientName}</p>
                        )}
                        <p className="text-xs text-neutral-tertiary mt-1">{formatRelativeTime(activity.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-display text-lg font-semibold text-neutral-primary mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => openModal('add-client')}
                  className="p-3 rounded-lg border border-border-light hover:bg-warm-cream text-left transition-colors"
                >
                  <Users className="w-5 h-5 text-forest mb-2" />
                  <span className="text-sm font-medium text-neutral-primary block">Add Client</span>
                </button>
                <button
                  onClick={() => openModal('upload-deliverable')}
                  className="p-3 rounded-lg border border-border-light hover:bg-warm-cream text-left transition-colors"
                >
                  <Upload className="w-5 h-5 text-forest mb-2" />
                  <span className="text-sm font-medium text-neutral-primary block">Upload File</span>
                </button>
                <button
                  onClick={() => openModal('create-invoice')}
                  className="p-3 rounded-lg border border-border-light hover:bg-warm-cream text-left transition-colors"
                >
                  <Receipt className="w-5 h-5 text-forest mb-2" />
                  <span className="text-sm font-medium text-neutral-primary block">Create Invoice</span>
                </button>
                <button
                  onClick={() => openModal('post-update')}
                  className="p-3 rounded-lg border border-border-light hover:bg-warm-cream text-left transition-colors"
                >
                  <MessageSquare className="w-5 h-5 text-forest mb-2" />
                  <span className="text-sm font-medium text-neutral-primary block">Post Update</span>
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
