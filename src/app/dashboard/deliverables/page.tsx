'use client';

import { useState } from 'react';
import { Plus, Search, FileText, Download, Grid, List } from 'lucide-react';
import { Header } from '@/components/dashboard/header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input, Select } from '@/components/ui/input';
import { EmptyState } from '@/components/ui/empty-state';
import { useModal } from '@/components/providers';
import { mockDeliverables, mockClients, formatRelativeTime, formatFileSize } from '@/lib/mock-data';

const fileTypeIcons: Record<string, string> = {
  'application/pdf': 'PDF',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOC',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'XLS',
};

export default function DeliverablesPage() {
  const { openModal } = useModal();
  const [search, setSearch] = useState('');
  const [clientFilter, setClientFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const clientOptions = [
    { value: 'all', label: 'All Clients' },
    ...mockClients.map(c => ({ value: c.id, label: c.name })),
  ];

  const filteredDeliverables = mockDeliverables.filter((deliverable) => {
    const matchesSearch = deliverable.title.toLowerCase().includes(search.toLowerCase()) ||
      deliverable.fileName.toLowerCase().includes(search.toLowerCase());
    const matchesClient = clientFilter === 'all' || deliverable.clientId === clientFilter;
    return matchesSearch && matchesClient;
  });

  const getClient = (clientId: string) => mockClients.find(c => c.id === clientId);

  return (
    <div>
      <Header title="Deliverables" />

      <div className="p-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search deliverables..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-64 pl-9"
              />
              <Search className="w-4 h-4 text-neutral-tertiary absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            <Select
              options={clientOptions}
              value={clientFilter}
              onChange={(e) => setClientFilter(e.target.value)}
              className="w-full sm:w-48"
            />
          </div>
          <div className="flex gap-2">
            <div className="flex border border-border-light rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-forest text-white' : 'bg-white text-neutral-secondary hover:bg-warm-cream'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-forest text-white' : 'bg-white text-neutral-secondary hover:bg-warm-cream'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
            <Button onClick={() => openModal('upload-deliverable')}>
              <Plus className="w-4 h-4 mr-1" /> Upload
            </Button>
          </div>
        </div>

        {filteredDeliverables.length === 0 ? (
          <EmptyState
            icon={<FileText className="w-8 h-8" />}
            title={search || clientFilter !== 'all' ? 'No deliverables found' : 'No deliverables yet'}
            description={search || clientFilter !== 'all' ? 'Try adjusting your search or filters.' : 'Upload your first deliverable to get started.'}
            action={!search && clientFilter === 'all' && (
              <Button onClick={() => openModal('upload-deliverable')}>Upload your first deliverable</Button>
            )}
          />
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredDeliverables.map((deliverable) => {
              const client = getClient(deliverable.clientId);
              return (
                <Card key={deliverable.id} hover className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 bg-forest-pale rounded-lg flex items-center justify-center">
                      <span className="text-xs font-bold text-forest">
                        {fileTypeIcons[deliverable.fileType] || 'FILE'}
                      </span>
                    </div>
                    <button className="p-2 rounded-lg hover:bg-warm-cream text-neutral-secondary">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                  <h3 className="font-medium text-neutral-primary mb-1 line-clamp-1">{deliverable.title}</h3>
                  <p className="text-sm text-neutral-secondary mb-3">{client?.name}</p>
                  <div className="flex items-center justify-between text-xs text-neutral-tertiary pt-3 border-t border-border-light">
                    <span>{formatFileSize(deliverable.fileSize)}</span>
                    <span>{formatRelativeTime(deliverable.uploadedAt)}</span>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border-light bg-warm-cream">
                    <th className="text-left text-xs font-medium text-neutral-secondary uppercase tracking-wider px-4 py-3">File</th>
                    <th className="text-left text-xs font-medium text-neutral-secondary uppercase tracking-wider px-4 py-3">Client</th>
                    <th className="text-left text-xs font-medium text-neutral-secondary uppercase tracking-wider px-4 py-3">Size</th>
                    <th className="text-left text-xs font-medium text-neutral-secondary uppercase tracking-wider px-4 py-3">Uploaded</th>
                    <th className="text-right text-xs font-medium text-neutral-secondary uppercase tracking-wider px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light">
                  {filteredDeliverables.map((deliverable) => {
                    const client = getClient(deliverable.clientId);
                    return (
                      <tr key={deliverable.id} className="hover:bg-warm-cream transition-colors">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-forest-pale rounded-lg flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-bold text-forest">
                                {fileTypeIcons[deliverable.fileType] || 'FILE'}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-neutral-primary">{deliverable.title}</p>
                              <p className="text-xs text-neutral-secondary">{deliverable.fileName}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-sm text-neutral-primary">{client?.name}</span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-sm text-neutral-secondary">{formatFileSize(deliverable.fileSize)}</span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-sm text-neutral-secondary">{formatRelativeTime(deliverable.uploadedAt)}</span>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4 mr-1" /> Download
                          </Button>
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
