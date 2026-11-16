export type TenantId = 'tenant-acme' | 'tenant-northstar' | 'tenant-meridian' | 'tenant-apex' | 'tenant-crestview';

export type PlanType = 'Starter' | 'Growth' | 'Enterprise';

export type UserRole = 'Owner' | 'Administrator' | 'Manager' | 'Member' | 'Viewer' | string;

export interface Tenant {
  id: TenantId;
  name: string;
  slug: string;
  domain: string;
  plan: PlanType;
  billingCycle: 'monthly' | 'yearly';
  monthlyCost: number;
  nextBillingDate: string;
  memberCount: number;
  maxMembers: number;
  activeModules: string[];
  status: 'Active' | 'Suspended' | 'Trial';
  createdAt: string;
  adminName: string;
  adminEmail: string;
  logoInitial: string;
  color: string;
  health: 'Optimal' | 'Warning' | 'Healthy';
  storageUsedGB: number;
  maxStorageGB: number;
  apiCallsThisMonth: number;
  maxApiCalls: number;
  aiTokensUsed: number;
  maxAiTokens: number;
}

export interface TeamMember {
  id: string;
  tenantId: TenantId;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  status: 'Active' | 'Invited' | 'Suspended';
  lastActive: string;
  avatarUrl?: string;
  initials: string;
}

export interface PermissionCategory {
  id: string;
  name: string;
  description: string;
  permissions: {
    id: string;
    label: string;
    description: string;
    enabledRoles: string[];
  }[];
}

export interface CustomRole {
  id: string;
  tenantId: TenantId;
  name: string;
  description: string;
  isSystem: boolean;
  memberCount: number;
  color: string;
}

export interface AppModule {
  id: string;
  name: string;
  slug: string;
  category: 'Intelligence' | 'Operations' | 'Data & Analytics' | 'Productivity' | 'Developer';
  shortDescription: string;
  longDescription: string;
  iconName: string;
  version: string;
  isGloballyAvailable: boolean;
  pricingTierRequired: PlanType;
  status: 'Available' | 'Enabled' | 'Coming Soon';
  features: string[];
  adoptionCount: number; // for Super Admin
  route?: string;
}

export interface Integration {
  id: string;
  name: string;
  slug: string;
  category: 'AI' | 'CRM' | 'Communication' | 'Payments' | 'Automation' | 'Productivity';
  description: string;
  icon: string;
  connected: boolean;
  environment: 'Test' | 'Live';
  apiKeyMasked: string;
  webhookUrl: string;
  lastSynced?: string;
  eventCount?: number;
}

export interface WorkflowStep {
  id: string;
  title: string;
  type: 'trigger' | 'action' | 'ai' | 'condition';
  service: string;
  description: string;
  icon: string;
  status?: 'idle' | 'running' | 'success' | 'failed';
}

export interface Workflow {
  id: string;
  tenantId: TenantId;
  name: string;
  trigger: string;
  connectedServices: string[];
  lastExecution: string;
  successRate: number;
  status: 'Active' | 'Paused';
  executionCount: number;
  steps: WorkflowStep[];
}

export interface ActivityLog {
  id: string;
  tenantId: TenantId;
  tenantName: string;
  event: string;
  user: string;
  userEmail: string;
  action: string;
  date: string;
  timestamp: string;
  ipAddress: string;
  status: 'Success' | 'Warning' | 'Error';
  category: 'auth' | 'module' | 'workflow' | 'billing' | 'team' | 'system';
  details?: string;
}

export interface Invoice {
  id: string;
  tenantId: TenantId;
  invoiceNumber: string;
  date: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Refunded';
  plan: PlanType;
  downloadUrl?: string;
}

export interface ServiceHealth {
  id: string;
  name: string;
  category: string;
  status: 'Operational' | 'Degraded' | 'Maintenance';
  latencyMs: number;
  uptime90d: number;
  lastChecked: string;
}

export interface AiAssistant {
  id: string;
  name: string;
  role: string;
  description: string;
  avatar: string;
  model: string;
  defaultPrompts: string[];
}

export interface AiChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  tokensUsed?: number;
  modelUsed?: string;
}
