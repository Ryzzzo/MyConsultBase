'use client';

import { Check, Sparkles } from 'lucide-react';
import { Modal, ModalFooter } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { useModal, useToast } from '@/components/providers';
import { usePlan, PLANS } from '@/lib/plan-context';
import { PlanType } from '@/lib/types';

const FEATURE_LABELS: Record<string, string> = {
  brandedPortal: 'Branded client portal',
  customDomain: 'Custom domain',
  advancedAnalytics: 'Advanced analytics',
  whiteLabel: 'White-label branding',
  apiAccess: 'API access',
};

const PLAN_HIGHLIGHTS: Record<PlanType, string[]> = {
  solo: [
    'Up to 5 clients',
    '1 team member',
    'Branded portal',
    'Basic invoicing',
    'Email support',
  ],
  team: [
    'Up to 25 clients',
    'Up to 3 team members',
    'Custom domain support',
    'Advanced analytics',
    'Priority support',
  ],
  firm: [
    'Unlimited clients',
    'Unlimited team members',
    'White-label branding',
    'API access',
    'Dedicated success manager',
  ],
};

export function UpgradeModal() {
  const { activeModal, modalData, closeModal } = useModal();
  const { addToast } = useToast();
  const { currentPlan } = usePlan();

  const isOpen = activeModal === 'upgrade';
  const feature = modalData?.feature as string | undefined;
  const recommendedPlan = (modalData?.recommendedPlan as PlanType) || getNextTier(currentPlan.id);

  function getNextTier(current: PlanType): PlanType {
    if (current === 'solo') return 'team';
    if (current === 'team') return 'firm';
    return 'firm';
  }

  const handleUpgrade = (planId: PlanType) => {
    addToast('info', 'Stripe integration coming soon');
    closeModal();
  };

  const recommendedPlanData = PLANS[recommendedPlan];
  const currentPlanData = currentPlan;

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title={feature ? `Unlock ${feature}` : 'Upgrade Your Plan'}
      size="lg"
    >
      <div className="space-y-6">
        {feature && (
          <p className="text-neutral-secondary">
            {feature} is available on higher tier plans. Upgrade to unlock this feature and more.
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-border-light rounded-xl p-5 bg-warm-cream/30">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-display font-semibold text-neutral-primary">{currentPlanData.name}</p>
                <p className="text-2xl font-bold text-neutral-primary">
                  ${currentPlanData.price}<span className="text-sm font-normal text-neutral-secondary">/mo</span>
                </p>
              </div>
              <span className="px-3 py-1 bg-neutral-100 text-neutral-600 rounded-full text-xs font-medium">
                Current Plan
              </span>
            </div>
            <ul className="space-y-2">
              {PLAN_HIGHLIGHTS[currentPlanData.id].map((highlight, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-neutral-secondary">
                  <Check className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-2 border-forest rounded-xl p-5 bg-forest-pale/30 relative">
            <div className="absolute -top-3 left-4">
              <span className="px-3 py-1 bg-forest text-white rounded-full text-xs font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Recommended
              </span>
            </div>
            <div className="flex items-center justify-between mb-4 mt-2">
              <div>
                <p className="font-display font-semibold text-neutral-primary">{recommendedPlanData.name}</p>
                <p className="text-2xl font-bold text-neutral-primary">
                  ${recommendedPlanData.price}<span className="text-sm font-normal text-neutral-secondary">/mo</span>
                </p>
              </div>
            </div>
            <ul className="space-y-2">
              {PLAN_HIGHLIGHTS[recommendedPlan].map((highlight, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-neutral-primary">
                  <Check className="w-4 h-4 text-forest flex-shrink-0" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {currentPlan.id === 'solo' && recommendedPlan === 'team' && (
          <div className="p-4 bg-warm-cream rounded-lg">
            <p className="text-sm text-neutral-secondary">
              Want even more?{' '}
              <button
                onClick={() => handleUpgrade('firm')}
                className="text-forest font-medium hover:underline"
              >
                View Firm plan ($149/mo)
              </button>{' '}
              for unlimited clients, team members, and API access.
            </p>
          </div>
        )}
      </div>

      <ModalFooter>
        <Button variant="ghost" onClick={closeModal}>
          Maybe later
        </Button>
        <Button onClick={() => handleUpgrade(recommendedPlan)}>
          Upgrade to {recommendedPlanData.name}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
