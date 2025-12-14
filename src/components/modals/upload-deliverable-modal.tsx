'use client';

import { useState, useRef } from 'react';
import { Upload, File, X } from 'lucide-react';
import { Modal, ModalFooter } from '@/components/ui/modal';
import { Input, Textarea, Select } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useModal, useToast } from '@/components/providers';
import { mockClients, formatFileSize } from '@/lib/mock-data';

export function UploadDeliverableModal() {
  const { activeModal, modalData, closeModal } = useModal();
  const { addToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [clientId, setClientId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const isOpen = activeModal === 'upload-deliverable';

  const clientOptions = [
    { value: '', label: 'Select a client' },
    ...mockClients.map(c => ({ value: c.id, label: `${c.name} - ${c.company || 'No company'}` })),
  ];

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    if (!title) {
      setTitle(file.name.replace(/\.[^/.]+$/, ''));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    addToast('success', `"${title}" uploaded successfully`);
    resetForm();
    closeModal();
    setLoading(false);
  };

  const resetForm = () => {
    setClientId((modalData.clientId as string) || '');
    setTitle('');
    setDescription('');
    setSelectedFile(null);
  };

  const handleClose = () => {
    resetForm();
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Upload Deliverable" size="md">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <Select
            label="Client"
            options={clientOptions}
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            required
          />

          <div>
            <label className="label">File</label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                dragOver ? 'border-forest bg-forest-pale' : 'border-border-light hover:border-border-medium'
              }`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              {selectedFile ? (
                <div className="flex items-center justify-center gap-3">
                  <File className="w-8 h-8 text-forest" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-neutral-primary">{selectedFile.name}</p>
                    <p className="text-xs text-neutral-secondary">{formatFileSize(selectedFile.size)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }}
                    className="p-1 rounded hover:bg-warm-cream"
                  >
                    <X className="w-4 h-4 text-neutral-secondary" />
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="w-8 h-8 text-neutral-tertiary mx-auto mb-2" />
                  <p className="text-sm text-neutral-secondary">
                    Drag and drop or <span className="text-forest font-medium">browse</span>
                  </p>
                  <p className="text-xs text-neutral-tertiary mt-1">PDF, DOCX, XLSX up to 50MB</p>
                </>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
            />
          </div>

          <Input
            label="Title"
            placeholder="Q4 Strategy Report"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <Textarea
            label="Description (optional)"
            placeholder="Brief description of this deliverable..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <ModalFooter>
          <Button type="button" variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" loading={loading} disabled={!selectedFile}>
            Upload
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
