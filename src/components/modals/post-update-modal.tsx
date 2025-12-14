'use client';

import { useState } from 'react';
import { Modal, ModalFooter } from '@/components/ui/modal';
import { Textarea, Select } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useModal, useToast } from '@/components/providers';
import { mockClients } from '@/lib/mock-data';

export function PostUpdateModal() {
  const { activeModal, modalData, closeModal } = useModal();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [clientId, setClientId] = useState('');
  const [content, setContent] = useState('');

  const isOpen = activeModal === 'post-update';

  const clientOptions = [
    { value: '', label: 'Select a client' },
    ...mockClients.map(c => ({ value: c.id, label: `${c.name} - ${c.company || 'No company'}` })),
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 500));

    addToast('success', 'Update posted successfully');
    resetForm();
    closeModal();
    setLoading(false);
  };

  const resetForm = () => {
    setClientId((modalData.clientId as string) || '');
    setContent('');
  };

  const handleClose = () => {
    resetForm();
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Post Update" size="md">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <Select
            label="Client"
            options={clientOptions}
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            required
          />

          <Textarea
            label="Update"
            placeholder="Share progress, news, or updates with your client..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="min-h-[150px]"
          />
        </div>

        <ModalFooter>
          <Button type="button" variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            Post Update
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
