'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Plan, PlanType, TeamMember, PlanFeatures } from './types';
import { mockClients } from './mock-data';

export const PLANS: Record<PlanType, Plan> = {
  solo: {
    id: 'solo',
    name: 'Solo',
    price: 29,
    clientLimit: 5,
    userLimit: 1,
    features: {
      brandedPortal: true,
      customDomain: false,
      advancedAnalytics: false,
      whiteLabel: false,
      apiAccess: false,
    },
  },
  team: {
    id: 'team',
    name: 'Team',
    price: 79,
    clientLimit: 25,
    userLimit: 3,
    features: {
      brandedPortal: true,
      customDomain: true,
      advancedAnalytics: true,
      whiteLabel: false,
      apiAccess: false,
    },
  },
  firm: {
    id: 'firm',
    name: 'Firm',
    price: 149,
    clientLimit: null,
    userLimit: null,
    features: {
      brandedPortal: true,
      customDomain: true,
      advancedAnalytics: true,
      whiteLabel: true,
      apiAccess: true,
    },
  },
};

export const DEFAULT_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'member-1',
    email: 'contact@vertexapps.dev',
    name: 'Ryan Stacy',
    role: 'owner',
    status: 'active',
    invitedAt: new Date('2024-01-01'),
    joinedAt: new Date('2024-01-01'),
  },
  {
    id: 'member-2',
    email: 'sarah@vertexapps.dev',
    name: 'Sarah Chen',
    role: 'member',
    status: 'active',
    invitedAt: new Date('2024-02-15'),
    joinedAt: new Date('2024-02-16'),
  },
];

interface PlanContextType {
  currentPlan: Plan;
  teamMembers: TeamMember[];
  clientCount: number;
  canAddClient: () => boolean;
  canInviteTeamMember: () => boolean;
  hasFeature: (feature: keyof PlanFeatures) => boolean;
  getRemainingClients: () => number | null;
  getRemainingSeats: () => number | null;
  isOwner: () => boolean;
  setPlanType: (plan: PlanType) => void;
  addTeamMember: (member: Omit<TeamMember, 'id' | 'invitedAt'>) => void;
  removeTeamMember: (memberId: string) => void;
  updateTeamMemberRole: (memberId: string, role: 'owner' | 'member') => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) throw new Error('usePlan must be used within PlanProvider');
  return context;
}

interface PlanProviderProps {
  children: ReactNode;
  initialPlan?: PlanType;
  userRole?: 'owner' | 'member';
}

export function PlanProvider({ children, initialPlan = 'team', userRole = 'owner' }: PlanProviderProps) {
  const [planType, setPlanType] = useState<PlanType>(initialPlan);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(DEFAULT_TEAM_MEMBERS);

  const currentPlan = PLANS[planType];
  const clientCount = mockClients.filter(c => c.status !== 'archived').length;

  const canAddClient = useCallback(() => {
    if (currentPlan.clientLimit === null) return true;
    return clientCount < currentPlan.clientLimit;
  }, [currentPlan.clientLimit, clientCount]);

  const canInviteTeamMember = useCallback(() => {
    if (currentPlan.userLimit === null) return true;
    return teamMembers.length < currentPlan.userLimit;
  }, [currentPlan.userLimit, teamMembers.length]);

  const hasFeature = useCallback((feature: keyof PlanFeatures) => {
    return currentPlan.features[feature];
  }, [currentPlan.features]);

  const getRemainingClients = useCallback(() => {
    if (currentPlan.clientLimit === null) return null;
    return Math.max(0, currentPlan.clientLimit - clientCount);
  }, [currentPlan.clientLimit, clientCount]);

  const getRemainingSeats = useCallback(() => {
    if (currentPlan.userLimit === null) return null;
    return Math.max(0, currentPlan.userLimit - teamMembers.length);
  }, [currentPlan.userLimit, teamMembers.length]);

  const isOwner = useCallback(() => {
    return userRole === 'owner';
  }, [userRole]);

  const addTeamMember = useCallback((member: Omit<TeamMember, 'id' | 'invitedAt'>) => {
    const newMember: TeamMember = {
      ...member,
      id: `member-${Date.now()}`,
      invitedAt: new Date(),
    };
    setTeamMembers(prev => [...prev, newMember]);
  }, []);

  const removeTeamMember = useCallback((memberId: string) => {
    setTeamMembers(prev => prev.filter(m => m.id !== memberId));
  }, []);

  const updateTeamMemberRole = useCallback((memberId: string, role: 'owner' | 'member') => {
    setTeamMembers(prev => prev.map(m =>
      m.id === memberId ? { ...m, role } : m
    ));
  }, []);

  return (
    <PlanContext.Provider
      value={{
        currentPlan,
        teamMembers,
        clientCount,
        canAddClient,
        canInviteTeamMember,
        hasFeature,
        getRemainingClients,
        getRemainingSeats,
        isOwner,
        setPlanType,
        addTeamMember,
        removeTeamMember,
        updateTeamMemberRole,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}
