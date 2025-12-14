'use client';

import { useState } from 'react';
import { Modal, ModalFooter } from '@/components/ui/modal';
import { Input, Textarea } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useModal, useToast } from '@/components/providers';
import { usePlan } from '@/lib/plan-context';

export function AddClientModal() {
  const { activeModal, closeModal, openModal } = useModal();
  const { addToast } = useToast();
  const { canAddClient, getRemainingClients, currentPlan } = usePlan();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    engagementName: '',
    notes: '',
  });

  const isOpen = activeModal === 'add-client';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!canAddClient()) {
      closeModal();
      openModal('upgrade', { feature: 'More Clients', recommendedPlan: 'team' });
      return;
    }

    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 500));

    addToast('success', `Client "${formData.name}" created successfully`);
    setFormData({ name: '', email: '', company: '', engagementName: '', notes: '' });
    closeModal();
    setLoading(false);
  };

  const handleClose = () => {
    setFormData({ name: '', email: '', company: '', engagementName: '', notes: '' });
    closeModal();
  };

  const remaining = getRemainingClients();

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add New Client" size="md">
      <form onSubmit={handleSubmit}>
        {remaining !== null && remaining <= 2 && remaining > 0 && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800">
              You have {remaining} client slot{remaining !== 1 ? 's' : ''} remaining on your {currentPlan.name} plan.
            </p>
          </div>
        )}

        <div className="space-y-4">
          <Input
            label="Client Name"
            placeholder="John Smith"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Email"
            type="email"
            placeholder="john@company.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <Input
            label="Company Name"
            placeholder="Acme Corp"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />
          <Input
            label="Project/Engagement Name"
            placeholder="GSA Schedule Consulting"
            value={formData.engagementName}
            onChange={(e) => setFormData({ ...formData, engagementName: e.target.value })}
          />
          <Textarea
            label="Notes"
            placeholder="Any additional notes about this client..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />
        </div>

        <ModalFooter>
          <Button type="button" variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            Create Client
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
