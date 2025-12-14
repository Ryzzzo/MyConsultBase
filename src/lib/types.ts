export type PlanType = 'solo' | 'team' | 'firm';
export type UserRole = 'owner' | 'member';

export interface PlanFeatures {
  brandedPortal: boolean;
  customDomain: boolean;
  advancedAnalytics: boolean;
  whiteLabel: boolean;
  apiAccess: boolean;
}

export interface Plan {
  id: PlanType;
  name: string;
  price: number;
  clientLimit: number | null;
  userLimit: number | null;
  features: PlanFeatures;
}

export interface TeamMember {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  status: 'active' | 'pending';
  avatarUrl?: string;
  invitedAt: Date;
  joinedAt?: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  businessName: string;
  tagline?: string;
  logoUrl?: string;
  brandColor: string;
  createdAt: Date;
  plan: PlanType;
  role: UserRole;
  teamId: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  company?: string;
  status: 'active' | 'completed' | 'archived';
  engagementName?: string;
  notes?: string;
  createdAt: Date;
  lastActivityAt: Date;
}

export interface Deliverable {
  id: string;
  clientId: string;
  title: string;
  description?: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  fileUrl: string;
  uploadedAt: Date;
}

export interface Milestone {
  id: string;
  clientId: string;
  name: string;
  description?: string;
  dueDate?: Date;
  status: 'not_started' | 'in_progress' | 'complete';
  order: number;
}

export interface Update {
  id: string;
  clientId: string;
  content: string;
  attachmentIds?: string[];
  createdAt: Date;
}

export interface Invoice {
  id: string;
  clientId: string;
  invoiceNumber: string;
  amount: number;
  status: 'pending' | 'paid' | 'overdue';
  dueDate: Date;
  paidAt?: Date;
  lineItems: LineItem[];
  notes?: string;
  createdAt: Date;
}

export interface LineItem {
  description: string;
  amount: number;
}

export interface Activity {
  id: string;
  type: 'invoice' | 'deliverable' | 'milestone' | 'update' | 'client';
  description: string;
  clientId?: string;
  clientName?: string;
  createdAt: Date;
}

export interface BillingHistory {
  id: string;
  date: Date;
  description: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
}
