'use client';

import { useState } from 'react';
import { Plus, Receipt, Send, MoreHorizontal } from 'lucide-react';
import { Header } from '@/components/dashboard/header';
import { Card } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs } from '@/components/ui/tabs';
import { EmptyState } from '@/components/ui/empty-state';
import { useModal, useToast } from '@/components/providers';
import { mockInvoices, mockClients, formatCurrency } from '@/lib/mock-data';

const tabs = [
  { id: 'all', label: 'All', count: mockInvoices.length },
  { id: 'pending', label: 'Pending', count: mockInvoices.filter(i => i.status === 'pending').length },
  { id: 'paid', label: 'Paid', count: mockInvoices.filter(i => i.status === 'paid').length },
  { id: 'overdue', label: 'Overdue', count: mockInvoices.filter(i => i.status === 'overdue').length },
];

export default function InvoicesPage() {
  const { openModal } = useModal();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('all');

  const filteredInvoices = mockInvoices.filter((invoice) => {
    if (activeTab === 'all') return true;
    return invoice.status === activeTab;
  });

  const getClient = (clientId: string) => mockClients.find(c => c.id === clientId);

  const handleSendReminder = (invoiceNumber: string) => {
    addToast('success', `Reminder sent for ${invoiceNumber}`);
  };

  return (
    <div>
      <Header title="Invoices" />

      <div className="p-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
          <Button onClick={() => openModal('create-invoice')}>
            <Plus className="w-4 h-4 mr-1" /> Create Invoice
          </Button>
        </div>

        {filteredInvoices.length === 0 ? (
          <EmptyState
            icon={<Receipt className="w-8 h-8" />}
            title={activeTab === 'all' ? 'No invoices yet' : `No ${activeTab} invoices`}
            description={activeTab === 'all' ? 'Create your first invoice to get started.' : 'No invoices match this filter.'}
            action={activeTab === 'all' && (
              <Button onClick={() => openModal('create-invoice')}>Create your first invoice</Button>
            )}
          />
        ) : (
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border-light bg-warm-cream">
                    <th className="text-left text-xs font-medium text-neutral-secondary uppercase tracking-wider px-4 py-3">Invoice</th>
                    <th className="text-left text-xs font-medium text-neutral-secondary uppercase tracking-wider px-4 py-3">Client</th>
                    <th className="text-left text-xs font-medium text-neutral-secondary uppercase tracking-wider px-4 py-3">Amount</th>
                    <th className="text-left text-xs font-medium text-neutral-secondary uppercase tracking-wider px-4 py-3">Status</th>
                    <th className="text-left text-xs font-medium text-neutral-secondary uppercase tracking-wider px-4 py-3">Due Date</th>
                    <th className="text-right text-xs font-medium text-neutral-secondary uppercase tracking-wider px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light">
                  {filteredInvoices.map((invoice) => {
                    const client = getClient(invoice.clientId);
                    return (
                      <tr key={invoice.id} className="hover:bg-warm-cream transition-colors">
                        <td className="px-4 py-4">
                          <span className="font-medium text-neutral-primary">{invoice.invoiceNumber}</span>
                        </td>
                        <td className="px-4 py-4">
                          <div>
                            <p className="text-sm text-neutral-primary">{client?.name}</p>
                            <p className="text-xs text-neutral-secondary">{client?.company}</p>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="font-medium text-neutral-primary">{formatCurrency(invoice.amount)}</span>
                        </td>
                        <td className="px-4 py-4">
                          <StatusBadge status={invoice.status} />
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-sm text-neutral-secondary">
                            {invoice.dueDate.toLocaleDateString()}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {invoice.status === 'pending' && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleSendReminder(invoice.invoiceNumber)}
                              >
                                <Send className="w-4 h-4 mr-1" /> Remind
                              </Button>
                            )}
                            <button className="p-1.5 rounded-md hover:bg-warm-cream text-neutral-secondary">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
