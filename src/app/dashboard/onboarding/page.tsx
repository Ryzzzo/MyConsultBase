'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Layers, Upload, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useUser, useToast } from '@/components/providers';

const brandColors = [
  '#1B4D3E', '#2D6A4F', '#1E40AF', '#7C3AED', '#BE185D', '#DC2626', '#D97706', '#059669'
];

export default function OnboardingPage() {
  const router = useRouter();
  const { updateUser, user } = useUser();
  const { addToast } = useToast();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    businessName: user?.businessName || '',
    tagline: user?.tagline || '',
    brandColor: user?.brandColor || '#1B4D3E',
  });

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    updateUser(formData);
    addToast('success', 'Welcome to ConsultBase!');
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-warm-bg flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-forest rounded-lg flex items-center justify-center">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <span className="font-display text-2xl font-semibold text-neutral-primary">ConsultBase</span>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`w-3 h-3 rounded-full transition-colors ${
                  s === step ? 'bg-forest' : s < step ? 'bg-forest-light' : 'bg-border-light'
                }`}
              />
            ))}
          </div>
          <p className="text-center text-sm text-neutral-secondary">Step {step} of 4</p>
        </div>

        <Card className="p-8">
          {step === 1 && (
            <div className="animate-fade-in">
              <h2 className="font-display text-xl font-semibold text-center text-neutral-primary mb-2">
                Tell us about your business
              </h2>
              <p className="text-sm text-neutral-secondary text-center mb-6">
                This information will be displayed on your client portal.
              </p>

              <div className="space-y-4">
                <Input
                  label="Business Name"
                  placeholder="Civic Strategy Partners"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  required
                />
                <Textarea
                  label="Tagline (optional)"
                  placeholder="Government Consulting Excellence"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in">
              <h2 className="font-display text-xl font-semibold text-center text-neutral-primary mb-2">
                Upload your logo
              </h2>
              <p className="text-sm text-neutral-secondary text-center mb-6">
                Add a logo to personalize your client portal.
              </p>

              <div className="border-2 border-dashed border-border-medium rounded-lg p-8 text-center hover:border-forest transition-colors cursor-pointer">
                <Upload className="w-10 h-10 text-neutral-tertiary mx-auto mb-3" />
                <p className="text-sm text-neutral-secondary mb-1">
                  Drag and drop or <span className="text-forest font-medium">browse</span>
                </p>
                <p className="text-xs text-neutral-tertiary">PNG, SVG. Recommended: 200x200px</p>
              </div>

              <button
                onClick={handleNext}
                className="w-full mt-4 py-2 text-sm text-neutral-secondary hover:text-neutral-primary"
              >
                Skip for now
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in">
              <h2 className="font-display text-xl font-semibold text-center text-neutral-primary mb-2">
                Choose your brand color
              </h2>
              <p className="text-sm text-neutral-secondary text-center mb-6">
                This color will be used throughout your client portal.
              </p>

              <div className="flex gap-3 justify-center flex-wrap mb-6">
                {brandColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setFormData({ ...formData, brandColor: color })}
                    className="w-12 h-12 rounded-lg relative transition-transform hover:scale-110 shadow-md"
                    style={{ backgroundColor: color }}
                  >
                    {formData.brandColor === color && (
                      <Check className="w-6 h-6 text-white absolute inset-0 m-auto" />
                    )}
                  </button>
                ))}
              </div>

              <div className="p-4 bg-warm-cream rounded-lg">
                <p className="text-sm font-medium text-neutral-primary mb-3">Preview</p>
                <div className="bg-white rounded-lg p-4 border border-border-light">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                      style={{ backgroundColor: formData.brandColor }}
                    >
                      {formData.businessName.charAt(0) || 'C'}
                    </div>
                    <div>
                      <p className="font-medium text-neutral-primary">{formData.businessName || 'Your Business'}</p>
                      <p className="text-xs text-neutral-secondary">{formData.tagline || 'Your tagline'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-fade-in text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-emerald-600" />
              </div>
              <h2 className="font-display text-xl font-semibold text-neutral-primary mb-2">
                Your portal is ready!
              </h2>
              <p className="text-sm text-neutral-secondary mb-6">
                You can now start adding clients and managing your consulting practice.
              </p>

              <div className="p-4 bg-warm-cream rounded-lg mb-6">
                <div className="bg-white rounded-lg p-4 border border-border-light">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                      style={{ backgroundColor: formData.brandColor }}
                    >
                      {formData.businessName.charAt(0) || 'C'}
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-neutral-primary">{formData.businessName || 'Your Business'}</p>
                      <p className="text-xs text-neutral-secondary">{formData.tagline || 'Your tagline'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8 pt-6 border-t border-border-light">
            {step > 1 && step < 4 ? (
              <Button variant="ghost" onClick={handleBack}>
                <ArrowLeft className="w-4 h-4 mr-1" /> Back
              </Button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <Button onClick={handleNext} disabled={step === 1 && !formData.businessName}>
                Next <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button onClick={handleComplete} loading={loading} className="w-full">
                Go to Dashboard
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
