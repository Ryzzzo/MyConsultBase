'use client';

import { Target } from 'lucide-react';
import { Header } from '@/components/dashboard/header';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { mockMilestones, mockClients } from '@/lib/mock-data';

export default function MilestonesPage() {
  const getClient = (clientId: string) => mockClients.find(c => c.id === clientId);

  const groupedMilestones = mockClients.map(client => ({
    client,
    milestones: mockMilestones.filter(m => m.clientId === client.id).sort((a, b) => a.order - b.order),
  })).filter(g => g.milestones.length > 0);

  return (
    <div>
      <Header title="Milestones" />

      <div className="p-6">
        <div className="space-y-6">
          {groupedMilestones.map(({ client, milestones }) => {
            const completed = milestones.filter(m => m.status === 'complete').length;
            const progress = (completed / milestones.length) * 100;

            return (
              <Card key={client.id} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar name={client.name} />
                    <div>
                      <h3 className="font-medium text-neutral-primary">{client.name}</h3>
                      <p className="text-sm text-neutral-secondary">{client.company}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-neutral-primary">{completed} of {milestones.length}</p>
                    <p className="text-xs text-neutral-secondary">milestones complete</p>
                  </div>
                </div>

                <div className="h-2 bg-warm-cream rounded-full overflow-hidden mb-4">
                  <div
                    className="h-full bg-forest rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="space-y-2">
                  {milestones.map((milestone) => (
                    <div key={milestone.id} className="flex items-center gap-3 p-3 bg-warm-cream rounded-lg">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        milestone.status === 'complete' ? 'bg-emerald-100 text-emerald-700' :
                        milestone.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-500'
                      }`}>
                        {milestone.status === 'complete' ? (
                          <span>&#10003;</span>
                        ) : (
                          milestone.order
                        )}
                      </div>
                      <span className="flex-1 text-sm font-medium text-neutral-primary">{milestone.name}</span>
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
              </Card>
            );
          })}

          {groupedMilestones.length === 0 && (
            <div className="text-center py-12">
              <Target className="w-12 h-12 text-neutral-tertiary mx-auto mb-4" />
              <h3 className="font-display text-lg font-semibold text-neutral-primary mb-1">No milestones yet</h3>
              <p className="text-sm text-neutral-secondary">Create milestones from client detail pages.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
