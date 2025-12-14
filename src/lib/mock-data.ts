import { Client, Deliverable, Milestone, Update, Invoice, Activity, User, BillingHistory } from './types';

export const mockUser: User = {
  id: '1',
  name: 'Sarah Chen',
  email: 'sarah@civicstrategy.com',
  businessName: 'Civic Strategy Partners',
  tagline: 'Government Consulting Excellence',
  brandColor: '#1B4D3E',
  createdAt: new Date('2024-01-15'),
  plan: 'team',
  role: 'owner',
  teamId: 'team-1',
};

export const mockClients: Client[] = [
  {
    id: '1',
    name: 'David Henderson',
    email: 'david@hendersondefense.com',
    company: 'Henderson Defense Solutions',
    status: 'active',
    engagementName: 'GSA Schedule Consulting',
    notes: 'High priority client, requires weekly check-ins',
    createdAt: new Date('2024-06-01'),
    lastActivityAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: '2',
    name: 'Sarah Rodriguez',
    email: 'srodriguez@techbridge.io',
    company: 'TechBridge Consulting',
    status: 'active',
    engagementName: 'Federal Market Entry Strategy',
    createdAt: new Date('2024-07-15'),
    lastActivityAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'mchen@pacificrim.co',
    company: 'Pacific Rim Advisors',
    status: 'active',
    engagementName: 'Capability Statement Development',
    createdAt: new Date('2024-08-01'),
    lastActivityAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: '4',
    name: 'Jennifer Walsh',
    email: 'jwalsh@capitolstrategies.com',
    company: 'Capitol Strategies Group',
    status: 'completed',
    engagementName: 'Bid Proposal Support',
    createdAt: new Date('2024-03-01'),
    lastActivityAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
  {
    id: '5',
    name: 'Marcus Thompson',
    email: 'marcus@meridianpolicy.org',
    company: 'Meridian Policy Group',
    status: 'active',
    engagementName: 'Compliance Review',
    createdAt: new Date('2024-09-01'),
    lastActivityAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    id: '6',
    name: 'Amanda Foster',
    email: 'afoster@clearwatergov.com',
    company: 'Clearwater Government Affairs',
    status: 'active',
    engagementName: 'Contract Negotiation Support',
    createdAt: new Date('2024-08-15'),
    lastActivityAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
];

export const mockDeliverables: Deliverable[] = [
  {
    id: '1',
    clientId: '1',
    title: 'Q4 Strategy Report',
    description: 'Comprehensive quarterly strategy analysis',
    fileName: 'Q4_Strategy_Report.pdf',
    fileSize: 2457600,
    fileType: 'application/pdf',
    fileUrl: '/files/q4-strategy.pdf',
    uploadedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: '2',
    clientId: '1',
    title: 'Capability Statement v3',
    description: 'Updated capability statement with new certifications',
    fileName: 'Capability_Statement_v3.docx',
    fileSize: 1536000,
    fileType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    fileUrl: '/files/capability-v3.docx',
    uploadedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: '3',
    clientId: '2',
    title: 'Budget Proposal 2025',
    description: 'Annual budget proposal for federal programs',
    fileName: 'Budget_Proposal_2025.xlsx',
    fileSize: 892928,
    fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    fileUrl: '/files/budget-2025.xlsx',
    uploadedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: '4',
    clientId: '3',
    title: 'Organizational Chart',
    description: 'Company org chart for RFP submission',
    fileName: 'Organizational_Chart.pdf',
    fileSize: 512000,
    fileType: 'application/pdf',
    fileUrl: '/files/org-chart.pdf',
    uploadedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: '5',
    clientId: '5',
    title: 'Contract Review Notes',
    description: 'Detailed notes from contract review session',
    fileName: 'Contract_Review_Notes.docx',
    fileSize: 256000,
    fileType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    fileUrl: '/files/contract-notes.docx',
    uploadedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
];

export const mockMilestones: Milestone[] = [
  { id: '1', clientId: '1', name: 'Discovery & Assessment', status: 'complete', order: 1 },
  { id: '2', clientId: '1', name: 'Strategy Development', status: 'in_progress', order: 2 },
  { id: '3', clientId: '1', name: 'Implementation Planning', status: 'not_started', order: 3 },
  { id: '4', clientId: '1', name: 'Final Delivery & Review', status: 'not_started', order: 4 },
  { id: '5', clientId: '2', name: 'Market Research', status: 'complete', order: 1 },
  { id: '6', clientId: '2', name: 'Strategy Presentation', status: 'in_progress', order: 2 },
  { id: '7', clientId: '2', name: 'Implementation Support', status: 'not_started', order: 3 },
  { id: '8', clientId: '3', name: 'Initial Consultation', status: 'complete', order: 1 },
  { id: '9', clientId: '3', name: 'Document Drafting', status: 'in_progress', order: 2 },
  { id: '10', clientId: '3', name: 'Final Review', status: 'not_started', order: 3 },
];

export const mockUpdates: Update[] = [
  {
    id: '1',
    clientId: '1',
    content: 'Uploaded the revised capability statement incorporating feedback from our last call. Please review the updated certifications section.',
    attachmentIds: ['2'],
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: '2',
    clientId: '1',
    content: 'Completed Phase 2 review milestone. Moving into implementation planning next week. Will schedule a kickoff call.',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: '3',
    clientId: '2',
    content: 'Attached the Q4 strategy report for your review. Let me know if you have questions about the market analysis section.',
    attachmentIds: ['3'],
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: '4',
    clientId: '5',
    content: 'Contract review completed. Found several areas that need attention before signing. See attached notes.',
    attachmentIds: ['5'],
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
];

export const mockInvoices: Invoice[] = [
  {
    id: '1',
    clientId: '1',
    invoiceNumber: 'INV-2024-047',
    amount: 3500,
    status: 'paid',
    dueDate: new Date('2024-12-15'),
    paidAt: new Date('2024-12-10'),
    lineItems: [
      { description: 'Strategy Consultation (10 hrs)', amount: 2500 },
      { description: 'Market Analysis Report', amount: 1000 },
    ],
    createdAt: new Date('2024-12-01'),
  },
  {
    id: '2',
    clientId: '2',
    invoiceNumber: 'INV-2024-048',
    amount: 5200,
    status: 'pending',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    lineItems: [
      { description: 'Federal Market Entry Strategy', amount: 4000 },
      { description: 'Competitor Analysis', amount: 1200 },
    ],
    createdAt: new Date('2024-12-05'),
  },
  {
    id: '3',
    clientId: '3',
    invoiceNumber: 'INV-2024-049',
    amount: 2700,
    status: 'overdue',
    dueDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    lineItems: [
      { description: 'Capability Statement Development', amount: 1800 },
      { description: 'Brand Guidelines Review', amount: 900 },
    ],
    createdAt: new Date('2024-11-25'),
  },
  {
    id: '4',
    clientId: '5',
    invoiceNumber: 'INV-2024-050',
    amount: 4500,
    status: 'paid',
    dueDate: new Date('2024-12-01'),
    paidAt: new Date('2024-11-28'),
    lineItems: [
      { description: 'Compliance Review (15 hrs)', amount: 3750 },
      { description: 'Documentation', amount: 750 },
    ],
    createdAt: new Date('2024-11-15'),
  },
];

export const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'deliverable',
    description: 'Uploaded Q4 Strategy Report',
    clientId: '1',
    clientName: 'Henderson Defense Solutions',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: '2',
    type: 'invoice',
    description: 'Invoice INV-2024-047 marked as paid',
    clientId: '1',
    clientName: 'Henderson Defense Solutions',
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
  },
  {
    id: '3',
    type: 'milestone',
    description: 'Completed "Discovery & Assessment" milestone',
    clientId: '2',
    clientName: 'TechBridge Consulting',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: '4',
    type: 'update',
    description: 'Posted update with contract review notes',
    clientId: '5',
    clientName: 'Meridian Policy Group',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    id: '5',
    type: 'client',
    description: 'New client onboarded',
    clientId: '6',
    clientName: 'Clearwater Government Affairs',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
];

export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString();
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

export function getClientById(id: string): Client | undefined {
  return mockClients.find(c => c.id === id);
}

export function getDeliverablesByClient(clientId: string): Deliverable[] {
  return mockDeliverables.filter(d => d.clientId === clientId);
}

export function getMilestonesByClient(clientId: string): Milestone[] {
  return mockMilestones.filter(m => m.clientId === clientId).sort((a, b) => a.order - b.order);
}

export function getUpdatesByClient(clientId: string): Update[] {
  return mockUpdates.filter(u => u.clientId === clientId).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export function getInvoicesByClient(clientId: string): Invoice[] {
  return mockInvoices.filter(i => i.clientId === clientId);
}

export const mockBillingHistory: BillingHistory[] = [
  {
    id: 'billing-1',
    date: new Date('2024-12-01'),
    description: 'Team Plan - Monthly',
    amount: 79,
    status: 'paid',
  },
  {
    id: 'billing-2',
    date: new Date('2024-11-01'),
    description: 'Team Plan - Monthly',
    amount: 79,
    status: 'paid',
  },
  {
    id: 'billing-3',
    date: new Date('2024-10-01'),
    description: 'Team Plan - Monthly',
    amount: 79,
    status: 'paid',
  },
  {
    id: 'billing-4',
    date: new Date('2024-09-01'),
    description: 'Solo Plan - Monthly',
    amount: 29,
    status: 'paid',
  },
];
