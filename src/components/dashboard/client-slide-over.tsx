'use client';

import { useState } from 'react';
import { X, Mail, Building2, FileText, Target, MessageSquare, Receipt, Download, MoreHorizontal } from 'lucide-react';
import { SlideOver } from '@/components/ui/slide-over';
import { Avatar } from '@/components/ui/avatar';
import { Badge, StatusBadge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs } from '@/components/ui/tabs';
import { EmptyState } from '@/components/ui/empty-state';
import { useSlideOver, useModal } from '@/components/providers';
import {
  getClientById,
  getDeliverablesByClient,
  getMilestonesByClient,
  getUpdatesByClient,
  getInvoicesByClient,
  formatRelativeTime,
  formatCurrency,
  formatFileSize,
} from '@/lib/mock-data';

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'documents', label: 'Documents' },
  { id: 'milestones', label: 'Milestones' },
  { id: 'updates', label: 'Updates' },
  { id: 'invoices', label: 'Invoices' },
];

export function ClientSlideOver() {
  const { isOpen, selectedClientId, closeSlideOver } = useSlideOver();
  const { openModal } = useModal();
  const [activeTab, setActiveTab] = useState('overview');

  const client = selectedClientId ? getClientById(selectedClientId) : null;
  const deliverables = selectedClientId ? getDeliverablesByClient(selectedClientId) : [];
  const milestones = selectedClientId ? getMilestonesByClient(selectedClientId) : [];
  const updates = selectedClientId ? getUpdatesByClient(selectedClientId) : [];
  const invoices = selectedClientId ? getInvoicesByClient(selectedClientId) : [];

  if (!client) return null;

  const completedMilestones = milestones.filter(m => m.status === 'complete').length;
  const totalOutstanding = invoices.filter(i => i.status !== 'paid').reduce((sum, i) => sum + i.amount, 0);

  return (
    <SlideOver isOpen={isOpen} onClose={closeSlideOver}>
      <div className="flex flex-col h-full">
        <div className="p-6 border-b border-border-light flex-shrink-0">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <Avatar name={client.name} size="xl" />
              <div>
                <h2 className="font-display text-xl font-semibold text-neutral-primary">{client.name}</h2>
                <p className="text-sm text-neutral-secondary">{client.company}</p>
                <div className="mt-2">
                  <StatusBadge status={client.status} />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm">Edit</Button>
              <button className="p-2 rounded-lg hover:bg-warm-cream text-neutral-secondary">
                <MoreHorizontal className="w-4 h-4" />
              </button>
              <button onClick={closeSlideOver} className="p-2 rounded-lg hover:bg-warm-cream text-neutral-secondary">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'overview' && (
            <OverviewTab client={client} deliverables={deliverables} milestones={milestones} completedMilestones={completedMilestones} totalOutstanding={totalOutstanding} />
          )}
          {activeTab === 'documents' && (
            <DocumentsTab deliverables={deliverables} onUpload={() => openModal('upload-deliverable', { clientId: client.id })} />
          )}
          {activeTab === 'milestones' && (
            <MilestonesTab milestones={milestones} completedMilestones={completedMilestones} />
          )}
          {activeTab === 'updates' && (
            <UpdatesTab updates={updates} onPost={() => openModal('post-update', { clientId: client.id })} />
          )}
          {activeTab === 'invoices' && (
            <InvoicesTab invoices={invoices} onCreate={() => openModal('create-invoice', { clientId: client.id })} />
          )}
        </div>
      </div>
    </SlideOver>
  );
}

function OverviewTab({ client, deliverables, milestones, completedMilestones, totalOutstanding }: {
  client: NonNullable<ReturnType<typeof getClientById>>;
  deliverables: ReturnType<typeof getDeliverablesByClient>;
  milestones: ReturnType<typeof getMilestonesByClient>;
  completedMilestones: number;
  totalOutstanding: number;
}) {
  return (
    <div className="space-y-6">
      <div className="card p-4">
        <h3 className="font-medium text-neutral-primary mb-3">Contact Information</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-sm">
            <Mail className="w-4 h-4 text-neutral-tertiary" />
            <span className="text-neutral-secondary">{client.email}</span>
          </div>
          {client.company && (
            <div className="flex items-center gap-3 text-sm">
              <Building2 className="w-4 h-4 text-neutral-tertiary" />
              <span className="text-neutral-secondary">{client.company}</span>
            </div>
          )}
        </div>
      </div>

      {client.engagementName && (
        <div className="card p-4">
          <h3 className="font-medium text-neutral-primary mb-3">Current Engagement</h3>
          <p className="text-sm text-neutral-secondary">{client.engagementName}</p>
          <p className="text-xs text-neutral-tertiary mt-1">Started {formatRelativeTime(client.createdAt)}</p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        <div className="card p-4 text-center">
          <p className="text-2xl font-semibold text-neutral-primary">{deliverables.length}</p>
          <p className="text-xs text-neutral-secondary">Documents</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-semibold text-neutral-primary">{completedMilestones}/{milestones.length}</p>
          <p className="text-xs text-neutral-secondary">Milestones</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-semibold text-neutral-primary">{formatCurrency(totalOutstanding)}</p>
          <p className="text-xs text-neutral-secondary">Outstanding</p>
        </div>
      </div>
    </div>
  );
}

function DocumentsTab({ deliverables, onUpload }: { deliverables: ReturnType<typeof getDeliverablesByClient>; onUpload: () => void }) {
  if (deliverables.length === 0) {
    return (
      <EmptyState
        icon={<FileText className="w-8 h-8" />}
        title="No documents yet"
        description="Upload your first deliverable for this client."
        action={<Button onClick={onUpload}>Upload Document</Button>}
      />
    );
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button onClick={onUpload} size="sm">Upload Document</Button>
      </div>
      <div className="space-y-2">
        {deliverables.map((doc) => (
          <div key={doc.id} className="card p-3 flex items-center gap-3">
            <div className="w-10 h-10 bg-forest-pale rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-forest" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-neutral-primary truncate">{doc.title}</p>
              <p className="text-xs text-neutral-secondary">{formatFileSize(doc.fileSize)} &bull; {formatRelativeTime(doc.uploadedAt)}</p>
            </div>
            <button className="p-2 rounded-lg hover:bg-warm-cream text-neutral-secondary">
              <Download className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function MilestonesTab({ milestones, completedMilestones }: { milestones: ReturnType<typeof getMilestonesByClient>; completedMilestones: number }) {
  const progress = milestones.length > 0 ? (completedMilestones / milestones.length) * 100 : 0;

  if (milestones.length === 0) {
    return (
      <EmptyState
        icon={<Target className="w-8 h-8" />}
        title="No milestones yet"
        description="Add milestones to track project progress."
        action={<Button>Add Milestone</Button>}
      />
    );
  }

  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-neutral-secondary">{completedMilestones} of {milestones.length} complete</span>
          <span className="font-medium text-forest">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-warm-cream rounded-full overflow-hidden">
          <div className="h-full bg-forest rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="space-y-2">
        {milestones.map((milestone) => (
          <div key={milestone.id} className="card p-3 flex items-center gap-3">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
              milestone.status === 'complete' ? 'bg-emerald-100 text-emerald-700' :
              milestone.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
              'bg-gray-100 text-gray-500'
            }`}>
              {milestone.status === 'complete' ? '✓' : milestone.order}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-neutral-primary">{milestone.name}</p>
            </div>
            <Badge variant={
              milestone.status === 'complete' ? 'success' :
              milestone.status === 'in_progress' ? 'info' : 'neutral'
            }>
              {milestone.status === 'not_started' ? 'Not Started' :
               milestone.status === 'in_progress' ? 'In Progress' : 'Complete'}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

function UpdatesTab({ updates, onPost }: { updates: ReturnType<typeof getUpdatesByClient>; onPost: () => void }) {
  if (updates.length === 0) {
    return (
      <EmptyState
        icon={<MessageSquare className="w-8 h-8" />}
        title="No updates yet"
        description="Post updates to keep your client informed."
        action={<Button onClick={onPost}>Post Update</Button>}
      />
    );
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button onClick={onPost} size="sm">Post Update</Button>
      </div>
      <div className="space-y-4">
        {updates.map((update) => (
          <div key={update.id} className="card p-4">
            <p className="text-xs text-neutral-tertiary mb-2">{formatRelativeTime(update.createdAt)}</p>
            <p className="text-sm text-neutral-primary whitespace-pre-wrap">{update.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function InvoicesTab({ invoices, onCreate }: { invoices: ReturnType<typeof getInvoicesByClient>; onCreate: () => void }) {
  if (invoices.length === 0) {
    return (
      <EmptyState
        icon={<Receipt className="w-8 h-8" />}
        title="No invoices yet"
        description="Create your first invoice for this client."
        action={<Button onClick={onCreate}>Create Invoice</Button>}
      />
    );
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button onClick={onCreate} size="sm">Create Invoice</Button>
      </div>
      <div className="space-y-2">
        {invoices.map((invoice) => (
          <div key={invoice.id} className="card p-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-primary">{invoice.invoiceNumber}</p>
              <p className="text-xs text-neutral-secondary">Due {invoice.dueDate.toLocaleDateString()}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-medium text-neutral-primary">{formatCurrency(invoice.amount)}</span>
              <StatusBadge status={invoice.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
