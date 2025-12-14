'use client';

import { BarChart3, TrendingUp, Users, DollarSign, Lock } from 'lucide-react';
import { Header } from '@/components/dashboard/header';
import { Card, StatCard } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockClients, mockInvoices, formatCurrency } from '@/lib/mock-data';
import { usePlan } from '@/lib/plan-context';
import { useModal } from '@/components/providers';

export default function AnalyticsPage() {
  const { hasFeature } = usePlan();
  const { openModal } = useModal();
  const hasAnalytics = hasFeature('advancedAnalytics');

  const activeClients = mockClients.filter(c => c.status === 'active').length;
  const totalRevenue = mockInvoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0);
  const avgEngagementValue = totalRevenue / mockClients.length || 0;

  const monthlyData = [
    { month: 'Jul', revenue: 8500 },
    { month: 'Aug', revenue: 12000 },
    { month: 'Sep', revenue: 9800 },
    { month: 'Oct', revenue: 15200 },
    { month: 'Nov', revenue: 11500 },
    { month: 'Dec', revenue: totalRevenue },
  ];

  const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));

  if (!hasAnalytics) {
    return (
      <div>
        <Header title="Analytics" />
        <div className="p-6">
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 blur-sm pointer-events-none select-none">
              <StatCard
                icon={<DollarSign className="w-5 h-5 text-emerald-600" />}
                iconBg="bg-emerald-50"
                label="Total Revenue"
                value="$8,000"
                change={{ value: '12%', positive: true }}
              />
              <StatCard
                icon={<Users className="w-5 h-5 text-blue-600" />}
                iconBg="bg-blue-50"
                label="Active Clients"
                value="5"
                change={{ value: '2', positive: true }}
              />
              <StatCard
                icon={<TrendingUp className="w-5 h-5 text-teal-600" />}
                iconBg="bg-teal-50"
                label="Avg Engagement Value"
                value="$1,600"
              />
              <StatCard
                icon={<BarChart3 className="w-5 h-5 text-amber-600" />}
                iconBg="bg-amber-50"
                label="Renewal Rate"
                value="94%"
                change={{ value: '3%', positive: true }}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 blur-sm pointer-events-none select-none">
              <Card className="p-6">
                <h3 className="font-display text-lg font-semibold text-neutral-primary mb-6">Revenue Over Time</h3>
                <div className="h-64 flex items-end justify-between gap-4">
                  {[40, 60, 50, 80, 55, 70].map((height, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center">
                      <div
                        className="w-full bg-gradient-to-t from-forest to-forest-light rounded-t"
                        style={{ height: `${height}%` }}
                      />
                      <span className="text-xs text-neutral-secondary mt-2">
                        {['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][idx]}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-display text-lg font-semibold text-neutral-primary mb-6">Client Status Distribution</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-neutral-secondary">Active</span>
                      <span className="font-medium text-neutral-primary">5</span>
                    </div>
                    <div className="h-3 bg-warm-cream rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full w-4/5" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-neutral-secondary">Completed</span>
                      <span className="font-medium text-neutral-primary">1</span>
                    </div>
                    <div className="h-3 bg-warm-cream rounded-full overflow-hidden">
                      <div className="h-full bg-gray-400 rounded-full w-1/5" />
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <Card className="p-8 text-center max-w-md shadow-xl">
                <div className="w-14 h-14 bg-forest-pale rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-7 h-7 text-forest" />
                </div>
                <h3 className="font-display text-xl font-semibold text-neutral-primary mb-2">
                  Advanced Analytics
                </h3>
                <p className="text-neutral-secondary mb-6">
                  Get deeper insights into your practice performance with charts, trends, and client analytics.
                </p>
                <Button onClick={() => openModal('upgrade', { feature: 'Advanced Analytics', recommendedPlan: 'team' })}>
                  Upgrade to Team - $79/mo
                </Button>
                <button className="block mx-auto mt-3 text-sm text-forest hover:underline">
                  Learn more
                </button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header title="Analytics" />

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={<DollarSign className="w-5 h-5 text-emerald-600" />}
            iconBg="bg-emerald-50"
            label="Total Revenue"
            value={formatCurrency(totalRevenue)}
            change={{ value: '12%', positive: true }}
          />
          <StatCard
            icon={<Users className="w-5 h-5 text-blue-600" />}
            iconBg="bg-blue-50"
            label="Active Clients"
            value={activeClients}
            change={{ value: '2', positive: true }}
          />
          <StatCard
            icon={<TrendingUp className="w-5 h-5 text-teal-600" />}
            iconBg="bg-teal-50"
            label="Avg Engagement Value"
            value={formatCurrency(avgEngagementValue)}
          />
          <StatCard
            icon={<BarChart3 className="w-5 h-5 text-amber-600" />}
            iconBg="bg-amber-50"
            label="Renewal Rate"
            value="94%"
            change={{ value: '3%', positive: true }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="font-display text-lg font-semibold text-neutral-primary mb-6">Revenue Over Time</h3>
            <div className="h-64 flex items-end justify-between gap-4">
              {monthlyData.map((data) => (
                <div key={data.month} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-gradient-to-t from-forest to-forest-light rounded-t transition-all hover:opacity-80"
                    style={{ height: `${(data.revenue / maxRevenue) * 100}%` }}
                  />
                  <span className="text-xs text-neutral-secondary mt-2">{data.month}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-display text-lg font-semibold text-neutral-primary mb-6">Client Status Distribution</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-neutral-secondary">Active</span>
                  <span className="font-medium text-neutral-primary">{mockClients.filter(c => c.status === 'active').length}</span>
                </div>
                <div className="h-3 bg-warm-cream rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${(mockClients.filter(c => c.status === 'active').length / mockClients.length) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-neutral-secondary">Completed</span>
                  <span className="font-medium text-neutral-primary">{mockClients.filter(c => c.status === 'completed').length}</span>
                </div>
                <div className="h-3 bg-warm-cream rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gray-400 rounded-full"
                    style={{ width: `${(mockClients.filter(c => c.status === 'completed').length / mockClients.length) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-neutral-secondary">Archived</span>
                  <span className="font-medium text-neutral-primary">{mockClients.filter(c => c.status === 'archived').length}</span>
                </div>
                <div className="h-3 bg-warm-cream rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gray-300 rounded-full"
                    style={{ width: `${(mockClients.filter(c => c.status === 'archived').length / mockClients.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <Card className="p-6">
            <h3 className="font-display text-lg font-semibold text-neutral-primary mb-4">Top Clients by Revenue</h3>
            <div className="space-y-3">
              {mockInvoices
                .filter(i => i.status === 'paid')
                .slice(0, 4)
                .map((invoice, idx) => {
                  const client = mockClients.find(c => c.id === invoice.clientId);
                  return (
                    <div key={invoice.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-forest-pale text-forest text-xs flex items-center justify-center font-medium">
                          {idx + 1}
                        </span>
                        <span className="text-sm text-neutral-primary">{client?.company || client?.name}</span>
                      </div>
                      <span className="text-sm font-medium text-neutral-primary">{formatCurrency(invoice.amount)}</span>
                    </div>
                  );
                })}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-display text-lg font-semibold text-neutral-primary mb-4">Invoice Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                <span className="text-sm text-emerald-700">Paid</span>
                <span className="text-sm font-medium text-emerald-700">
                  {mockInvoices.filter(i => i.status === 'paid').length}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                <span className="text-sm text-amber-700">Pending</span>
                <span className="text-sm font-medium text-amber-700">
                  {mockInvoices.filter(i => i.status === 'pending').length}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <span className="text-sm text-red-700">Overdue</span>
                <span className="text-sm font-medium text-red-700">
                  {mockInvoices.filter(i => i.status === 'overdue').length}
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-display text-lg font-semibold text-neutral-primary mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-neutral-secondary mb-1">Avg Days to Payment</p>
                <p className="text-2xl font-bold text-neutral-primary">12 days</p>
              </div>
              <div>
                <p className="text-sm text-neutral-secondary mb-1">Outstanding Amount</p>
                <p className="text-2xl font-bold text-neutral-primary">
                  {formatCurrency(
                    mockInvoices
                      .filter(i => i.status !== 'paid')
                      .reduce((sum, i) => sum + i.amount, 0)
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-secondary mb-1">Collection Rate</p>
                <p className="text-2xl font-bold text-neutral-primary">87%</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
