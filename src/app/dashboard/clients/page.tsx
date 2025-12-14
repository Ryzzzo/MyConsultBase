'use client';

import { useState } from 'react';
import { Plus, Search, Users } from 'lucide-react';
import { Header } from '@/components/dashboard/header';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { StatusBadge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input, Select } from '@/components/ui/input';
import { EmptyState } from '@/components/ui/empty-state';
import { useModal, useSlideOver } from '@/components/providers';
import { usePlan } from '@/lib/plan-context';
import { mockClients, formatRelativeTime } from '@/lib/mock-data';

function ClientLimitIndicator() {
  const { currentPlan, clientCount, getRemainingClients } = usePlan();

  if (currentPlan.clientLimit === null) {
    return (
      <span className="text-sm text-neutral-secondary">
        {clientCount} clients
      </span>
    );
  }

  const remaining = getRemainingClients() ?? 0;
  const percentage = (clientCount / currentPlan.clientLimit) * 100;
  const isWarning = percentage >= 80;
  const isAtLimit = remaining === 0;

  return (
    <div className="flex items-center gap-3">
      <span className={`text-sm font-medium ${
        isAtLimit ? 'text-red-600' : isWarning ? 'text-amber-600' : 'text-neutral-secondary'
      }`}>
        {clientCount} of {currentPlan.clientLimit} clients
      </span>
      <div className="w-24 h-2 bg-neutral-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${
            isAtLimit ? 'bg-red-500' : isWarning ? 'bg-amber-500' : 'bg-forest'
          }`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
}

export default function ClientsPage() {
  const { openModal } = useModal();
  const { openSlideOver } = useSlideOver();
  const { canAddClient } = usePlan();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredClients = mockClients.filter((client) => {
    const matchesSearch = client.name.toLowerCase().includes(search.toLowerCase()) ||
      client.company?.toLowerCase().includes(search.toLowerCase()) ||
      client.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
    { value: 'archived', label: 'Archived' },
  ];

  const handleAddClient = () => {
    if (canAddClient()) {
      openModal('add-client');
    } else {
      openModal('upgrade', { feature: 'More Clients', recommendedPlan: 'team' });
    }
  };

  return (
    <div>
      <Header title="Clients" />

      <div className="p-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search clients..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-64 pl-9"
              />
              <Search className="w-4 h-4 text-neutral-tertiary absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-40"
            />
            <ClientLimitIndicator />
          </div>
          <div className="relative group">
            <Button
              onClick={handleAddClient}
              className={!canAddClient() ? 'opacity-70' : ''}
            >
              <Plus className="w-4 h-4 mr-1" /> Add Client
            </Button>
            {!canAddClient() && (
              <div className="absolute right-0 top-full mt-2 w-48 p-2 bg-neutral-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                Client limit reached. Upgrade to add more.
              </div>
            )}
          </div>
        </div>

        {filteredClients.length === 0 ? (
          <EmptyState
            icon={<Users className="w-8 h-8" />}
            title={search || statusFilter !== 'all' ? 'No clients found' : 'No clients yet'}
            description={search || statusFilter !== 'all' ? 'Try adjusting your search or filters.' : 'Add your first client to get started.'}
            action={!search && statusFilter === 'all' && (
              <Button onClick={handleAddClient}>Add your first client</Button>
            )}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredClients.map((client) => (
              <Card
                key={client.id}
                hover
                onClick={() => openSlideOver(client.id)}
                className="p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={client.name} size="lg" />
                    <div>
                      <p className="font-medium text-neutral-primary">{client.name}</p>
                      <p className="text-sm text-neutral-secondary">{client.company}</p>
                    </div>
                  </div>
                  <StatusBadge status={client.status} />
                </div>

                {client.engagementName && (
                  <p className="text-sm text-neutral-secondary mb-3 line-clamp-1">{client.engagementName}</p>
                )}

                <div className="flex items-center justify-between text-xs text-neutral-tertiary pt-3 border-t border-border-light">
                  <span>{client.email}</span>
                  <span>{formatRelativeTime(client.lastActivityAt)}</span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
