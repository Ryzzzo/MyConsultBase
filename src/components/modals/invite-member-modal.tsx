'use client';

import { useState } from 'react';
import { Modal, ModalFooter } from '@/components/ui/modal';
import { Input, Select } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useModal, useToast } from '@/components/providers';
import { usePlan } from '@/lib/plan-context';

const roleOptions = [
  { value: 'member', label: 'Member - Can manage clients, deliverables, and invoices' },
  { value: 'owner', label: 'Owner - Full access including billing and team management' },
];

export function InviteMemberModal() {
  const { activeModal, closeModal } = useModal();
  const { addToast } = useToast();
  const { teamMembers, addTeamMember, canInviteTeamMember } = usePlan();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    role: 'member' as 'owner' | 'member',
  });
  const [error, setError] = useState('');

  const isOpen = activeModal === 'invite-member';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.name) {
      setError('Please fill in all required fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    const existingMember = teamMembers.find(
      m => m.email.toLowerCase() === formData.email.toLowerCase()
    );
    if (existingMember) {
      setError('This email is already on your team');
      return;
    }

    if (!canInviteTeamMember()) {
      setError('You have reached your team member limit');
      return;
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    addTeamMember({
      email: formData.email,
      name: formData.name,
      role: formData.role,
      status: 'pending',
    });

    addToast('success', `Invitation sent to ${formData.email}`);
    setFormData({ email: '', name: '', role: 'member' });
    closeModal();
    setLoading(false);
  };

  const handleClose = () => {
    setFormData({ email: '', name: '', role: 'member' });
    setError('');
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Invite Team Member" size="md">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <Input
            label="Full Name"
            placeholder="John Smith"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="john@company.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <Select
            label="Role"
            options={roleOptions}
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value as 'owner' | 'member' })}
          />

          {error && (
            <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</p>
          )}

          <div className="p-4 bg-warm-cream rounded-lg">
            <p className="text-sm text-neutral-secondary">
              <strong>Member:</strong> Can manage clients, deliverables, and invoices. Cannot access billing or team settings.
            </p>
            <p className="text-sm text-neutral-secondary mt-2">
              <strong>Owner:</strong> Full access including billing, team management, and account settings.
            </p>
          </div>
        </div>

        <ModalFooter>
          <Button type="button" variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            Send Invite
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
