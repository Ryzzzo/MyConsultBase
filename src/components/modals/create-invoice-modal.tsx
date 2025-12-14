'use client';

import { useState } from 'react';
import { Trash2, Plus } from 'lucide-react';
import { Modal, ModalFooter } from '@/components/ui/modal';
import { Input, Textarea, Select } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useModal, useToast } from '@/components/providers';
import { mockClients } from '@/lib/mock-data';

interface LineItem {
  description: string;
  amount: string;
}

export function CreateInvoiceModal() {
  const { activeModal, modalData, closeModal } = useModal();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [clientId, setClientId] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');
  const [lineItems, setLineItems] = useState<LineItem[]>([{ description: '', amount: '' }]);

  const isOpen = activeModal === 'create-invoice';

  const clientOptions = [
    { value: '', label: 'Select a client' },
    ...mockClients.map(c => ({ value: c.id, label: `${c.name} - ${c.company || 'No company'}` })),
  ];

  const addLineItem = () => {
    setLineItems([...lineItems, { description: '', amount: '' }]);
  };

  const removeLineItem = (index: number) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter((_, i) => i !== index));
    }
  };

  const updateLineItem = (index: number, field: keyof LineItem, value: string) => {
    const updated = [...lineItems];
    updated[index][field] = value;
    setLineItems(updated);
  };

  const total = lineItems.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 500));

    addToast('success', 'Invoice created successfully');
    resetForm();
    closeModal();
    setLoading(false);
  };

  const resetForm = () => {
    setClientId((modalData.clientId as string) || '');
    setDueDate('');
    setNotes('');
    setLineItems([{ description: '', amount: '' }]);
  };

  const handleClose = () => {
    resetForm();
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create Invoice" size="lg">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <Select
            label="Client"
            options={clientOptions}
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            required
          />

          <Input
            label="Due Date"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />

          <div>
            <label className="label">Line Items</label>
            <div className="space-y-2">
              {lineItems.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) => updateLineItem(index, 'description', e.target.value)}
                    className="flex-1"
                    required
                  />
                  <Input
                    type="number"
                    placeholder="Amount"
                    value={item.amount}
                    onChange={(e) => updateLineItem(index, 'amount', e.target.value)}
                    className="w-32"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => removeLineItem(index)}
                    disabled={lineItems.length === 1}
                    className="px-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="ghost"
              onClick={addLineItem}
              className="mt-2"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-1" /> Add Line Item
            </Button>
          </div>

          <div className="flex justify-between items-center p-3 bg-warm-cream rounded-lg">
            <span className="font-medium text-neutral-primary">Total</span>
            <span className="text-xl font-semibold text-forest">
              ${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>

          <Textarea
            label="Notes (optional)"
            placeholder="Any additional notes for this invoice..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <ModalFooter>
          <Button type="button" variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            Create Invoice
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
