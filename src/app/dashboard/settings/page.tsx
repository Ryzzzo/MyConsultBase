'use client';

import { useState } from 'react';
import { Upload, Check, Lock, Users, MoreVertical, Download, Globe, Code } from 'lucide-react';
import { Header } from '@/components/dashboard/header';
import { Card } from '@/components/ui/card';
import { Input, Textarea, Select } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs } from '@/components/ui/tabs';
import { Avatar } from '@/components/ui/avatar';
import { useUser, useToast, useModal } from '@/components/providers';
import { usePlan, PLANS } from '@/lib/plan-context';
import { mockBillingHistory, formatCurrency } from '@/lib/mock-data';
import { PlanType } from '@/lib/types';

const brandColors = [
  '#1B4D3E', '#2D6A4F', '#1E40AF', '#0891B2', '#BE185D', '#DC2626', '#D97706', '#059669'
];

export default function SettingsPage() {
  const { user, updateUser } = useUser();
  const { addToast } = useToast();
  const { openModal } = useModal();
  const { currentPlan, teamMembers, isOwner, hasFeature, setPlanType, removeTeamMember, updateTeamMemberRole, getRemainingSeats } = usePlan();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'branding', label: 'Branding' },
    ...(isOwner() ? [{ id: 'billing', label: 'Billing' }] : []),
    { id: 'team', label: 'Team' },
    { id: 'developers', label: 'Developers' },
  ];

  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const [branding, setBranding] = useState({
    businessName: user?.businessName || '',
    tagline: user?.tagline || '',
    brandColor: user?.brandColor || '#1B4D3E',
  });

  const handleProfileSave = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    updateUser({ name: profile.name, email: profile.email });
    addToast('success', 'Profile updated successfully');
    setLoading(false);
  };

  const handleBrandingSave = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    updateUser(branding);
    addToast('success', 'Branding updated successfully');
    setLoading(false);
  };

  const handleRemoveMember = (memberId: string) => {
    removeTeamMember(memberId);
    addToast('success', 'Team member removed');
    setActionMenuOpen(null);
  };

  const handleResendInvite = (email: string) => {
    addToast('success', `Invitation resent to ${email}`);
    setActionMenuOpen(null);
  };

  const handleRoleChange = (memberId: string, newRole: 'owner' | 'member') => {
    updateTeamMemberRole(memberId, newRole);
    addToast('success', 'Role updated');
    setActionMenuOpen(null);
  };

  const planOptions: { value: PlanType; label: string }[] = [
    { value: 'solo', label: 'Solo ($29/mo)' },
    { value: 'team', label: 'Team ($79/mo)' },
    { value: 'firm', label: 'Firm ($149/mo)' },
  ];

  const renewalDate = new Date();
  renewalDate.setMonth(renewalDate.getMonth() + 1);
  renewalDate.setDate(15);

  return (
    <div>
      <Header title="Settings" />

      <div className="p-6">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        <div className="mt-6 max-w-2xl">
          {activeTab === 'profile' && (
            <Card className="p-6">
              <h2 className="font-display text-lg font-semibold text-neutral-primary mb-6">Profile Information</h2>

              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border-light">
                <Avatar name={profile.name} size="xl" />
                <div>
                  <Button variant="secondary" size="sm">Change Photo</Button>
                  <p className="text-xs text-neutral-tertiary mt-1">JPG, PNG. Max 2MB</p>
                </div>
              </div>

              <div className="space-y-4">
                <Input
                  label="Full Name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
                <Input
                  label="Current Password"
                  type="password"
                  placeholder="Enter to change password"
                />
                <Input
                  label="New Password"
                  type="password"
                  placeholder="Enter new password"
                />
              </div>

              <div className="flex justify-end mt-6 pt-6 border-t border-border-light">
                <Button onClick={handleProfileSave} loading={loading}>Save Changes</Button>
              </div>
            </Card>
          )}

          {activeTab === 'branding' && (
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="font-display text-lg font-semibold text-neutral-primary mb-6">Brand Settings</h2>

                <div className="space-y-6">
                  <div>
                    <label className="label">Logo</label>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-warm-cream rounded-lg flex items-center justify-center border-2 border-dashed border-border-medium">
                        <Upload className="w-6 h-6 text-neutral-tertiary" />
                      </div>
                      <div>
                        <Button variant="secondary" size="sm">Upload Logo</Button>
                        <p className="text-xs text-neutral-tertiary mt-1">PNG, SVG. Recommended: 200x200px</p>
                      </div>
                    </div>
                  </div>

                  <Input
                    label="Business Name"
                    value={branding.businessName}
                    onChange={(e) => setBranding({ ...branding, businessName: e.target.value })}
                  />

                  <Textarea
                    label="Tagline"
                    value={branding.tagline}
                    onChange={(e) => setBranding({ ...branding, tagline: e.target.value })}
                    placeholder="A short description of your business"
                  />

                  <div>
                    <label className="label">Brand Color</label>
                    <div className="flex gap-2 flex-wrap">
                      {brandColors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setBranding({ ...branding, brandColor: color })}
                          className="w-10 h-10 rounded-lg relative transition-transform hover:scale-110"
                          style={{ backgroundColor: color }}
                        >
                          {branding.brandColor === color && (
                            <Check className="w-5 h-5 text-white absolute inset-0 m-auto" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-warm-cream rounded-lg">
                    <p className="text-sm font-medium text-neutral-primary mb-2">Preview</p>
                    <div className="bg-white rounded-lg p-4 border border-border-light">
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                          style={{ backgroundColor: branding.brandColor }}
                        >
                          {branding.businessName.charAt(0) || 'C'}
                        </div>
                        <div>
                          <p className="font-medium text-neutral-primary">{branding.businessName || 'Your Business'}</p>
                          <p className="text-xs text-neutral-secondary">{branding.tagline || 'Your tagline'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-6 pt-6 border-t border-border-light">
                  <Button onClick={handleBrandingSave} loading={loading}>Save Changes</Button>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 bg-neutral-100 rounded-lg">
                    <Globe className="w-5 h-5 text-neutral-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-semibold text-neutral-primary">Custom Domain</h3>
                      {!hasFeature('customDomain') && <Lock className="w-4 h-4 text-neutral-400" />}
                    </div>
                    <p className="text-sm text-neutral-secondary mt-1">
                      Use your own domain for client portals
                    </p>
                  </div>
                </div>

                {hasFeature('customDomain') ? (
                  <div className="space-y-4">
                    <Input
                      label="Custom Domain"
                      placeholder="portal.yourfirm.com"
                    />
                    <p className="text-xs text-neutral-tertiary">
                      Add a CNAME record pointing to portal.consultbase.app
                    </p>
                  </div>
                ) : (
                  <div className="p-4 bg-warm-cream rounded-lg">
                    <Input
                      label="Custom Domain"
                      placeholder="yourfirm.com"
                      disabled
                      className="opacity-50"
                    />
                    <p className="text-sm text-neutral-secondary mt-3">
                      Available on Team plan.{' '}
                      <button
                        onClick={() => openModal('upgrade', { feature: 'Custom Domain', recommendedPlan: 'team' })}
                        className="text-forest font-medium hover:underline"
                      >
                        Upgrade
                      </button>
                    </p>
                  </div>
                )}
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 bg-neutral-100 rounded-lg">
                    <Check className="w-5 h-5 text-neutral-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-semibold text-neutral-primary">White Label</h3>
                      {!hasFeature('whiteLabel') && <Lock className="w-4 h-4 text-neutral-400" />}
                    </div>
                    <p className="text-sm text-neutral-secondary mt-1">
                      Remove ConsultBase branding from client portals
                    </p>
                  </div>
                </div>

                {hasFeature('whiteLabel') ? (
                  <div className="flex items-center justify-between p-4 bg-forest-pale rounded-lg">
                    <span className="text-sm font-medium text-forest">White-label enabled</span>
                    <Check className="w-5 h-5 text-forest" />
                  </div>
                ) : (
                  <div className="p-4 bg-warm-cream rounded-lg">
                    <p className="text-sm text-neutral-secondary">
                      Remove &quot;Powered by ConsultBase&quot; branding. Available on Firm plan.{' '}
                      <button
                        onClick={() => openModal('upgrade', { feature: 'White Label', recommendedPlan: 'firm' })}
                        className="text-forest font-medium hover:underline"
                      >
                        Upgrade
                      </button>
                    </p>
                  </div>
                )}
              </Card>
            </div>
          )}

          {activeTab === 'billing' && isOwner() && (
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="font-display text-lg font-semibold text-neutral-primary mb-6">Current Plan</h2>

                <div className="p-4 bg-forest-pale rounded-lg mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-forest">{currentPlan.name} Plan</p>
                      <p className="text-sm text-forest-light">${currentPlan.price}/month</p>
                    </div>
                    <span className="px-3 py-1 bg-forest text-white rounded-full text-xs font-medium">Current Plan</span>
                  </div>
                </div>

                <p className="text-sm text-neutral-secondary mb-4">
                  Renews on {renewalDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm text-neutral-secondary">
                    <Check className="w-4 h-4 text-forest" />
                    {currentPlan.clientLimit ? `Up to ${currentPlan.clientLimit} clients` : 'Unlimited clients'}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-secondary">
                    <Check className="w-4 h-4 text-forest" />
                    {currentPlan.userLimit ? `Up to ${currentPlan.userLimit} team members` : 'Unlimited team members'}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-secondary">
                    <Check className="w-4 h-4 text-forest" /> Branded client portal
                  </div>
                  {currentPlan.features.customDomain && (
                    <div className="flex items-center gap-2 text-sm text-neutral-secondary">
                      <Check className="w-4 h-4 text-forest" /> Custom domain
                    </div>
                  )}
                  {currentPlan.features.advancedAnalytics && (
                    <div className="flex items-center gap-2 text-sm text-neutral-secondary">
                      <Check className="w-4 h-4 text-forest" /> Advanced analytics
                    </div>
                  )}
                  {currentPlan.features.whiteLabel && (
                    <div className="flex items-center gap-2 text-sm text-neutral-secondary">
                      <Check className="w-4 h-4 text-forest" /> White-label branding
                    </div>
                  )}
                  {currentPlan.features.apiAccess && (
                    <div className="flex items-center gap-2 text-sm text-neutral-secondary">
                      <Check className="w-4 h-4 text-forest" /> API access
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button variant="secondary" onClick={() => addToast('info', 'Subscription management coming soon')}>
                    Manage Subscription
                  </Button>
                  <Button variant="ghost" className="text-red-600 hover:bg-red-50" onClick={() => addToast('info', 'Cancellation flow coming soon')}>
                    Cancel Subscription
                  </Button>
                </div>
              </Card>

              {currentPlan.id !== 'firm' && (
                <Card className="p-6">
                  <h2 className="font-display text-lg font-semibold text-neutral-primary mb-4">Unlock More Features</h2>

                  {currentPlan.id === 'solo' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border border-border-light rounded-xl p-4 hover:border-forest transition-colors">
                        <p className="font-display font-semibold text-neutral-primary">Team</p>
                        <p className="text-2xl font-bold text-neutral-primary mb-2">$79<span className="text-sm font-normal text-neutral-secondary">/mo</span></p>
                        <ul className="space-y-1 mb-4">
                          <li className="text-sm text-neutral-secondary flex items-center gap-2">
                            <Check className="w-3 h-3 text-forest" /> 25 clients
                          </li>
                          <li className="text-sm text-neutral-secondary flex items-center gap-2">
                            <Check className="w-3 h-3 text-forest" /> 3 team members
                          </li>
                          <li className="text-sm text-neutral-secondary flex items-center gap-2">
                            <Check className="w-3 h-3 text-forest" /> Custom domain
                          </li>
                        </ul>
                        <Button size="sm" className="w-full" onClick={() => openModal('upgrade', { recommendedPlan: 'team' })}>Upgrade</Button>
                      </div>

                      <div className="border border-border-light rounded-xl p-4 hover:border-forest transition-colors">
                        <p className="font-display font-semibold text-neutral-primary">Firm</p>
                        <p className="text-2xl font-bold text-neutral-primary mb-2">$149<span className="text-sm font-normal text-neutral-secondary">/mo</span></p>
                        <ul className="space-y-1 mb-4">
                          <li className="text-sm text-neutral-secondary flex items-center gap-2">
                            <Check className="w-3 h-3 text-forest" /> Unlimited clients
                          </li>
                          <li className="text-sm text-neutral-secondary flex items-center gap-2">
                            <Check className="w-3 h-3 text-forest" /> Unlimited team
                          </li>
                          <li className="text-sm text-neutral-secondary flex items-center gap-2">
                            <Check className="w-3 h-3 text-forest" /> API access
                          </li>
                        </ul>
                        <Button size="sm" variant="secondary" className="w-full" onClick={() => openModal('upgrade', { recommendedPlan: 'firm' })}>Upgrade</Button>
                      </div>
                    </div>
                  )}

                  {currentPlan.id === 'team' && (
                    <div className="border border-border-light rounded-xl p-4 hover:border-forest transition-colors max-w-sm">
                      <p className="font-display font-semibold text-neutral-primary">Firm</p>
                      <p className="text-2xl font-bold text-neutral-primary mb-2">$149<span className="text-sm font-normal text-neutral-secondary">/mo</span></p>
                      <ul className="space-y-1 mb-4">
                        <li className="text-sm text-neutral-secondary flex items-center gap-2">
                          <Check className="w-3 h-3 text-forest" /> Unlimited clients & team
                        </li>
                        <li className="text-sm text-neutral-secondary flex items-center gap-2">
                          <Check className="w-3 h-3 text-forest" /> White-label branding
                        </li>
                        <li className="text-sm text-neutral-secondary flex items-center gap-2">
                          <Check className="w-3 h-3 text-forest" /> API access
                        </li>
                      </ul>
                      <Button size="sm" className="w-full" onClick={() => openModal('upgrade', { recommendedPlan: 'firm' })}>Upgrade</Button>
                    </div>
                  )}
                </Card>
              )}

              {currentPlan.id === 'firm' && (
                <Card className="p-6">
                  <div className="text-center py-4">
                    <p className="font-display font-semibold text-neutral-primary mb-2">You&apos;re on our top-tier plan!</p>
                    <p className="text-sm text-neutral-secondary">
                      Need custom solutions?{' '}
                      <button className="text-forest font-medium hover:underline">Contact us</button>{' '}
                      for enterprise options.
                    </p>
                  </div>
                </Card>
              )}

              <Card className="p-6">
                <h2 className="font-display text-lg font-semibold text-neutral-primary mb-4">Payment Method</h2>

                <div className="flex items-center justify-between p-4 bg-warm-cream rounded-lg mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-6 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center text-white text-xs font-bold">
                      VISA
                    </div>
                    <span className="text-neutral-primary">**** **** **** 4242</span>
                  </div>
                  <span className="text-sm text-neutral-secondary">Expires 12/26</span>
                </div>

                <Button variant="secondary" size="sm" onClick={() => addToast('info', 'Payment update coming soon')}>
                  Update Payment Method
                </Button>
              </Card>

              <Card className="p-6">
                <h2 className="font-display text-lg font-semibold text-neutral-primary mb-4">Billing History</h2>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border-light">
                        <th className="text-left py-3 text-sm font-medium text-neutral-secondary">Date</th>
                        <th className="text-left py-3 text-sm font-medium text-neutral-secondary">Description</th>
                        <th className="text-left py-3 text-sm font-medium text-neutral-secondary">Amount</th>
                        <th className="text-left py-3 text-sm font-medium text-neutral-secondary">Status</th>
                        <th className="text-right py-3 text-sm font-medium text-neutral-secondary">Invoice</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockBillingHistory.slice(0, 4).map((item) => (
                        <tr key={item.id} className="border-b border-border-light last:border-0">
                          <td className="py-3 text-sm text-neutral-primary">
                            {item.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </td>
                          <td className="py-3 text-sm text-neutral-primary">{item.description}</td>
                          <td className="py-3 text-sm text-neutral-primary">{formatCurrency(item.amount)}</td>
                          <td className="py-3">
                            <span className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium">
                              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                            </span>
                          </td>
                          <td className="py-3 text-right">
                            <button className="text-forest hover:underline text-sm flex items-center gap-1 ml-auto">
                              <Download className="w-3 h-3" /> Download
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              <Card className="p-4 bg-amber-50 border-amber-200">
                <label className="label text-amber-800">Developer: Test Plan Switcher</label>
                <Select
                  options={planOptions}
                  value={currentPlan.id}
                  onChange={(e) => {
                    setPlanType(e.target.value as PlanType);
                    addToast('success', `Switched to ${PLANS[e.target.value as PlanType].name} plan`);
                  }}
                />
                <p className="text-xs text-amber-700 mt-2">This toggle is for development testing only.</p>
              </Card>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="space-y-6">
              {currentPlan.userLimit === 1 ? (
                <Card className="p-8 text-center">
                  <div className="w-16 h-16 bg-warm-cream rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-neutral-400" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-neutral-primary mb-2">Team Collaboration</h3>
                  <p className="text-neutral-secondary mb-6 max-w-sm mx-auto">
                    Invite up to 3 team members to help manage clients and deliverables.
                  </p>
                  <p className="text-sm text-neutral-tertiary mb-4">Available on Team plan - $79/mo</p>
                  <Button onClick={() => openModal('upgrade', { feature: 'Team Collaboration', recommendedPlan: 'team' })}>
                    Upgrade to Team
                  </Button>
                </Card>
              ) : (
                <>
                  <Card className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="font-display text-lg font-semibold text-neutral-primary">Team Members</h2>
                        <p className="text-sm text-neutral-secondary">
                          Manage who has access to your ConsultBase account
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-neutral-secondary">
                          {teamMembers.length} {currentPlan.userLimit ? `of ${currentPlan.userLimit}` : ''} members
                        </span>
                        {(getRemainingSeats() === null || (getRemainingSeats() ?? 0) > 0) ? (
                          <Button onClick={() => openModal('invite-member')}>Invite Member</Button>
                        ) : (
                          <Button
                            variant="secondary"
                            onClick={() => openModal('upgrade', { feature: 'More Team Members', recommendedPlan: 'firm' })}
                          >
                            Invite Member
                          </Button>
                        )}
                      </div>
                    </div>

                    {teamMembers.length === 1 ? (
                      <div className="p-8 bg-warm-cream rounded-lg text-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                          <Users className="w-6 h-6 text-neutral-400" />
                        </div>
                        <p className="font-medium text-neutral-primary mb-1">You&apos;re the only one here</p>
                        <p className="text-sm text-neutral-secondary mb-4">
                          Invite team members to collaborate on client management
                        </p>
                        <Button size="sm" onClick={() => openModal('invite-member')}>
                          Invite Member
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {teamMembers.map((member) => (
                          <div
                            key={member.id}
                            className="flex items-center justify-between p-4 bg-warm-cream/50 rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <Avatar name={member.name} size="md" />
                              <div>
                                <p className="font-medium text-neutral-primary">
                                  {member.name}
                                  {member.email === user?.email && (
                                    <span className="text-neutral-secondary font-normal ml-1">(You)</span>
                                  )}
                                </p>
                                <p className="text-sm text-neutral-secondary">{member.email}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                member.role === 'owner'
                                  ? 'bg-forest-pale text-forest'
                                  : 'bg-neutral-100 text-neutral-600'
                              }`}>
                                {member.role === 'owner' ? 'Owner' : 'Member'}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                member.status === 'active'
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : 'bg-amber-50 text-amber-700'
                              }`}>
                                {member.status === 'active' ? 'Active' : 'Pending'}
                              </span>
                              {isOwner() && member.email !== user?.email && (
                                <div className="relative">
                                  <button
                                    onClick={() => setActionMenuOpen(actionMenuOpen === member.id ? null : member.id)}
                                    className="p-1 hover:bg-neutral-100 rounded"
                                  >
                                    <MoreVertical className="w-4 h-4 text-neutral-400" />
                                  </button>
                                  {actionMenuOpen === member.id && (
                                    <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-border-light py-1 z-10">
                                      {member.status === 'active' ? (
                                        <>
                                          <button
                                            onClick={() => handleRoleChange(member.id, member.role === 'owner' ? 'member' : 'owner')}
                                            className="w-full text-left px-4 py-2 text-sm text-neutral-primary hover:bg-warm-cream"
                                          >
                                            Change to {member.role === 'owner' ? 'Member' : 'Owner'}
                                          </button>
                                          <button
                                            onClick={() => handleRemoveMember(member.id)}
                                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                          >
                                            Remove from Team
                                          </button>
                                        </>
                                      ) : (
                                        <>
                                          <button
                                            onClick={() => handleResendInvite(member.email)}
                                            className="w-full text-left px-4 py-2 text-sm text-neutral-primary hover:bg-warm-cream"
                                          >
                                            Resend Invite
                                          </button>
                                          <button
                                            onClick={() => handleRemoveMember(member.id)}
                                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                          >
                                            Revoke Invite
                                          </button>
                                        </>
                                      )}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </Card>

                  {getRemainingSeats() !== null && getRemainingSeats() === 0 && (
                    <Card className="p-4 bg-amber-50 border-amber-200">
                      <p className="text-sm text-amber-800">
                        You&apos;ve reached your team limit.{' '}
                        <button
                          onClick={() => openModal('upgrade', { feature: 'More Team Members', recommendedPlan: 'firm' })}
                          className="font-medium hover:underline"
                        >
                          Upgrade to Firm
                        </button>{' '}
                        for unlimited team members.
                      </p>
                    </Card>
                  )}
                </>
              )}
            </div>
          )}

          {activeTab === 'developers' && (
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 bg-neutral-100 rounded-lg">
                    <Code className="w-5 h-5 text-neutral-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-semibold text-neutral-primary">API Access</h3>
                      {!hasFeature('apiAccess') && <Lock className="w-4 h-4 text-neutral-400" />}
                    </div>
                    <p className="text-sm text-neutral-secondary mt-1">
                      Programmatically access your ConsultBase data
                    </p>
                  </div>
                </div>

                {hasFeature('apiAccess') ? (
                  <div className="space-y-4">
                    <div>
                      <label className="label">API Key</label>
                      <div className="flex gap-2">
                        <Input
                          value="cb_live_••••••••••••••••"
                          readOnly
                          className="font-mono"
                        />
                        <Button variant="secondary">Reveal</Button>
                        <Button variant="secondary">Regenerate</Button>
                      </div>
                    </div>
                    <p className="text-xs text-neutral-tertiary">
                      Keep your API key secure. Never share it publicly or commit it to version control.
                    </p>
                    <div className="pt-4 border-t border-border-light">
                      <a href="#" className="text-forest font-medium text-sm hover:underline">
                        View API Documentation
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 bg-warm-cream rounded-lg text-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                      <Lock className="w-6 h-6 text-neutral-400" />
                    </div>
                    <p className="font-medium text-neutral-primary mb-1">API Access</p>
                    <p className="text-sm text-neutral-secondary mb-4">
                      Build custom integrations and automate your workflow with our REST API.
                    </p>
                    <p className="text-sm text-neutral-tertiary mb-4">Available on Firm plan - $149/mo</p>
                    <Button onClick={() => openModal('upgrade', { feature: 'API Access', recommendedPlan: 'firm' })}>
                      Upgrade to Firm
                    </Button>
                  </div>
                )}
              </Card>

              <Card className="p-6">
                <h3 className="font-display font-semibold text-neutral-primary mb-4">Webhooks</h3>
                <p className="text-sm text-neutral-secondary mb-4">
                  Receive real-time notifications when events happen in your account.
                </p>
                {hasFeature('apiAccess') ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-warm-cream rounded-lg text-center">
                      <p className="text-sm text-neutral-secondary">No webhooks configured</p>
                    </div>
                    <Button variant="secondary" size="sm">Add Webhook Endpoint</Button>
                  </div>
                ) : (
                  <p className="text-sm text-neutral-tertiary">
                    Webhooks are available with API access on the Firm plan.
                  </p>
                )}
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
