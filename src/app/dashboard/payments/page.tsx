'use client';

import { CreditCard, CheckCircle } from 'lucide-react';
import { Header } from '@/components/dashboard/header';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockInvoices, mockClients, formatCurrency } from '@/lib/mock-data';

export default function PaymentsPage() {
  const paidInvoices = mockInvoices.filter(i => i.status === 'paid');
  const getClient = (clientId: string) => mockClients.find(c => c.id === clientId);

  const totalReceived = paidInvoices.reduce((sum, i) => sum + i.amount, 0);

  return (
    <div>
      <Header title="Payments" />

      <div className="p-6">
        <Card className="p-6 mb-6 bg-gradient-to-r from-forest to-forest-light text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80 mb-1">Total Received</p>
              <p className="text-3xl font-bold">{formatCurrency(totalReceived)}</p>
            </div>
            <CreditCard className="w-12 h-12 opacity-50" />
          </div>
        </Card>

        <h2 className="font-display text-lg font-semibold text-neutral-primary mb-4">Payment History</h2>

        {paidInvoices.length === 0 ? (
          <Card className="p-8 text-center">
            <CheckCircle className="w-12 h-12 text-neutral-tertiary mx-auto mb-4" />
            <h3 className="font-display text-lg font-semibold text-neutral-primary mb-1">No payments yet</h3>
            <p className="text-sm text-neutral-secondary">Payments will appear here once invoices are paid.</p>
          </Card>
        ) : (
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border-light bg-warm-cream">
                    <th className="text-left text-xs font-medium text-neutral-secondary uppercase tracking-wider px-4 py-3">Invoice</th>
                    <th className="text-left text-xs font-medium text-neutral-secondary uppercase tracking-wider px-4 py-3">Client</th>
                    <th className="text-left text-xs font-medium text-neutral-secondary uppercase tracking-wider px-4 py-3">Amount</th>
                    <th className="text-left text-xs font-medium text-neutral-secondary uppercase tracking-wider px-4 py-3">Paid On</th>
                    <th className="text-left text-xs font-medium text-neutral-secondary uppercase tracking-wider px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light">
                  {paidInvoices.map((invoice) => {
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
                          <span className="font-medium text-emerald-600">{formatCurrency(invoice.amount)}</span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-sm text-neutral-secondary">
                            {invoice.paidAt?.toLocaleDateString()}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <Badge variant="success">Paid</Badge>
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
