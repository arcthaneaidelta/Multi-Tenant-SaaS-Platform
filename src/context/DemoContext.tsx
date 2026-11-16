import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Tenant,
  TenantId,
  TeamMember,
  AppModule,
  Integration,
  Workflow,
  ActivityLog,
  Invoice,
  ServiceHealth,
  PermissionCategory,
  CustomRole,
} from '../types';
import {
  INITIAL_TENANTS,
  INITIAL_MODULES,
  INITIAL_INTEGRATIONS,
  INITIAL_MEMBERS,
  INITIAL_WORKFLOWS,
  INITIAL_ACTIVITY_LOGS,
  INITIAL_INVOICES,
  INITIAL_SERVICES_HEALTH,
  INITIAL_PERMISSION_CATEGORIES,
  INITIAL_CUSTOM_ROLES,
} from '../data/initialData';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'warning' | 'error' | 'info';
}

interface DemoContextType {
  // Tenant & Impersonation
  currentTenantId: TenantId;
  currentTenant: Tenant;
  setTenantId: (id: TenantId) => void;
  tenants: Tenant[];
  isImpersonating: boolean;
  enterImpersonation: (tenantId: TenantId) => void;
  exitImpersonation: () => void;
  isSuperAdmin: boolean;
  setIsSuperAdmin: (val: boolean) => void;

  // Modules
  modules: AppModule[];
  toggleModuleForTenant: (moduleId: string, tenantId?: TenantId) => void;
  toggleModuleGlobal: (moduleId: string) => void;

  // Team
  currentMembers: TeamMember[];
  addMember: (data: { name: string; email: string; role: string; department: string }) => void;
  updateMember: (memberId: string, updates: Partial<TeamMember>) => void;
  deleteMember: (memberId: string) => void;

  // Permissions & Roles
  permissionCategories: PermissionCategory[];
  togglePermission: (categoryId: string, permId: string, roleName: string) => void;
  hasUnsavedPermissions: boolean;
  savePermissions: () => void;
  customRoles: CustomRole[];
  createCustomRole: (name: string, description: string, color?: string) => void;
  deleteCustomRole: (roleId: string) => void;

  // Workflows
  workflows: Workflow[];
  createWorkflow: (workflow: Partial<Workflow>) => void;
  updateWorkflow: (id: string, updates: Partial<Workflow>) => void;
  deleteWorkflow: (id: string) => void;
  toggleWorkflowStatus: (id: string) => void;

  // Integrations
  integrations: Integration[];
  toggleIntegrationConnection: (id: string) => void;
  updateIntegrationConfig: (id: string, updates: Partial<Integration>) => void;

  // Billing
  invoices: Invoice[];
  changePlan: (newPlan: 'Starter' | 'Growth' | 'Enterprise', cycle?: 'monthly' | 'yearly') => void;

  // Super Admin Tenant Operations
  createTenant: (tenantData: Partial<Tenant>) => void;
  suspendTenant: (id: TenantId) => void;
  activateTenant: (id: TenantId) => void;
  deleteTenant: (id: TenantId) => void;

  // Health
  servicesHealth: ServiceHealth[];
  refreshServicesHealth: () => void;

  // Activity Logs
  activityLogs: ActivityLog[];
  addActivityLog: (log: { event: string; action: string; category: ActivityLog['category']; status?: ActivityLog['status']; details?: string }) => void;

  // Notifications
  toasts: ToastMessage[];
  showToast: (title: string, description?: string, type?: ToastMessage['type']) => void;
  dismissToast: (id: string) => void;

  // Demo Reset
  resetDemoData: () => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

const STORAGE_KEY = 'velora_demo_state_v1';

export const DemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial state from localStorage if available
  const [currentTenantId, setCurrentTenantIdState] = useState<TenantId>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_activeTenant`);
      return (saved as TenantId) || 'tenant-acme';
    } catch {
      return 'tenant-acme';
    }
  });

  const [tenants, setTenants] = useState<Tenant[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_tenants`);
      return saved ? JSON.parse(saved) : INITIAL_TENANTS;
    } catch {
      return INITIAL_TENANTS;
    }
  });

  const [modules, setModules] = useState<AppModule[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_modules`);
      return saved ? JSON.parse(saved) : INITIAL_MODULES;
    } catch {
      return INITIAL_MODULES;
    }
  });

  const [membersMap, setMembersMap] = useState<Record<string, TeamMember[]>>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_members`);
      return saved ? JSON.parse(saved) : INITIAL_MEMBERS;
    } catch {
      return INITIAL_MEMBERS;
    }
  });

  const [permissionCategories, setPermissionCategories] = useState<PermissionCategory[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_permissions`);
      return saved ? JSON.parse(saved) : INITIAL_PERMISSION_CATEGORIES;
    } catch {
      return INITIAL_PERMISSION_CATEGORIES;
    }
  });

  const [hasUnsavedPermissions, setHasUnsavedPermissions] = useState(false);

  const [customRoles, setCustomRoles] = useState<CustomRole[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_roles`);
      return saved ? JSON.parse(saved) : INITIAL_CUSTOM_ROLES;
    } catch {
      return INITIAL_CUSTOM_ROLES;
    }
  });

  const [workflows, setWorkflows] = useState<Workflow[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_workflows`);
      return saved ? JSON.parse(saved) : INITIAL_WORKFLOWS;
    } catch {
      return INITIAL_WORKFLOWS;
    }
  });

  const [integrations, setIntegrations] = useState<Integration[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_integrations`);
      return saved ? JSON.parse(saved) : INITIAL_INTEGRATIONS;
    } catch {
      return INITIAL_INTEGRATIONS;
    }
  });

  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_invoices`);
      return saved ? JSON.parse(saved) : INITIAL_INVOICES;
    } catch {
      return INITIAL_INVOICES;
    }
  });

  const [servicesHealth, setServicesHealth] = useState<ServiceHealth[]>(INITIAL_SERVICES_HEALTH);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_activity`);
      return saved ? JSON.parse(saved) : INITIAL_ACTIVITY_LOGS;
    } catch {
      return INITIAL_ACTIVITY_LOGS;
    }
  });

  const [isImpersonating, setIsImpersonating] = useState<boolean>(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Auto-sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_activeTenant`, currentTenantId);
      localStorage.setItem(`${STORAGE_KEY}_tenants`, JSON.stringify(tenants));
      localStorage.setItem(`${STORAGE_KEY}_modules`, JSON.stringify(modules));
      localStorage.setItem(`${STORAGE_KEY}_members`, JSON.stringify(membersMap));
      localStorage.setItem(`${STORAGE_KEY}_permissions`, JSON.stringify(permissionCategories));
      localStorage.setItem(`${STORAGE_KEY}_roles`, JSON.stringify(customRoles));
      localStorage.setItem(`${STORAGE_KEY}_workflows`, JSON.stringify(workflows));
      localStorage.setItem(`${STORAGE_KEY}_integrations`, JSON.stringify(integrations));
      localStorage.setItem(`${STORAGE_KEY}_invoices`, JSON.stringify(invoices));
      localStorage.setItem(`${STORAGE_KEY}_activity`, JSON.stringify(activityLogs));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [currentTenantId, tenants, modules, membersMap, permissionCategories, customRoles, workflows, integrations, invoices, activityLogs]);

  // Derived current tenant
  const currentTenant = tenants.find((t) => t.id === currentTenantId) || tenants[0] || INITIAL_TENANTS[0];
  const currentMembers = membersMap[currentTenantId] || [];

  // Toast Helper
  const showToast = (title: string, description?: string, type: ToastMessage['type'] = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const setTenantId = (id: TenantId) => {
    setCurrentTenantIdState(id);
    const target = tenants.find((t) => t.id === id);
    if (target) {
      showToast('Switched Workspace', `Now operating inside ${target.name}`, 'info');
    }
  };

  const enterImpersonation = (tenantId: TenantId) => {
    setCurrentTenantIdState(tenantId);
    setIsImpersonating(true);
    setIsSuperAdmin(false);
    const target = tenants.find((t) => t.id === tenantId);
    showToast('Impersonation Mode', `Viewing tenant workspace as ${target?.name || 'Tenant'}`, 'warning');
  };

  const exitImpersonation = () => {
    setIsImpersonating(false);
    setIsSuperAdmin(true);
    showToast('Exited Impersonation', 'Returned to Super Admin Console', 'info');
  };

  // Activity Log Creator
  const addActivityLog = (log: { event: string; action: string; category: ActivityLog['category']; status?: ActivityLog['status']; details?: string }) => {
    const newLog: ActivityLog = {
      id: `log-${Date.now()}`,
      tenantId: currentTenantId,
      tenantName: currentTenant.name,
      event: log.event,
      user: isSuperAdmin ? 'Super Admin' : currentTenant.adminName,
      userEmail: isSuperAdmin ? 'superadmin@velora-demo.com' : currentTenant.adminEmail,
      action: log.action,
      date: 'Just now',
      timestamp: new Date().toISOString().substring(11, 19) + ' UTC',
      ipAddress: '194.26.29.11',
      status: log.status || 'Success',
      category: log.category,
      details: log.details,
    };
    setActivityLogs((prev) => [newLog, ...prev]);
  };

  // Module Operations
  const toggleModuleForTenant = (moduleId: string, tenantId?: TenantId) => {
    const targetTenantId = tenantId || currentTenantId;
    const targetModule = modules.find((m) => m.id === moduleId);
    if (!targetModule) return;

    setTenants((prev) =>
      prev.map((t) => {
        if (t.id === targetTenantId) {
          const isEnabled = t.activeModules.includes(moduleId);
          const newModules = isEnabled ? t.activeModules.filter((m) => m !== moduleId) : [...t.activeModules, moduleId];
          return { ...t, activeModules: newModules };
        }
        return t;
      })
    );

    const isCurrentlyEnabled = currentTenant.activeModules.includes(moduleId);
    const nextAction = isCurrentlyEnabled ? 'Disabled' : 'Enabled';

    addActivityLog({
      event: `Module ${nextAction}`,
      action: `${nextAction} "${targetModule.name}" for ${currentTenant.name}`,
      category: 'module',
      status: isCurrentlyEnabled ? 'Warning' : 'Success',
    });

    showToast(`Module ${nextAction}`, `"${targetModule.name}" is now ${nextAction.toLowerCase()} for ${currentTenant.name}.`, isCurrentlyEnabled ? 'info' : 'success');
  };

  const toggleModuleGlobal = (moduleId: string) => {
    setModules((prev) =>
      prev.map((m) => {
        if (m.id === moduleId) {
          const nextState = !m.isGloballyAvailable;
          showToast(`Global Module ${nextState ? 'Activated' : 'Suspended'}`, `"${m.name}" is now ${nextState ? 'available platform-wide' : 'restricted'}.`, nextState ? 'success' : 'warning');
          return { ...m, isGloballyAvailable: nextState };
        }
        return m;
      })
    );
  };

  // Team Member Operations
  const addMember = (data: { name: string; email: string; role: string; department: string }) => {
    const initials = data.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);

    const newMember: TeamMember = {
      id: `usr-${Date.now()}`,
      tenantId: currentTenantId,
      name: data.name,
      email: data.email,
      role: data.role,
      department: data.department,
      status: 'Active',
      lastActive: 'Just now',
      initials: initials || 'TM',
    };

    setMembersMap((prev) => ({
      ...prev,
      [currentTenantId]: [newMember, ...(prev[currentTenantId] || [])],
    }));

    setTenants((prev) =>
      prev.map((t) => (t.id === currentTenantId ? { ...t, memberCount: t.memberCount + 1 } : t))
    );

    addActivityLog({
      event: 'Team Member Added',
      action: `Added ${data.name} (${data.role}) to ${data.department} department.`,
      category: 'team',
      status: 'Success',
    });

    showToast('Member Added', `${data.name} was successfully invited to ${currentTenant.name}.`, 'success');
  };

  const updateMember = (memberId: string, updates: Partial<TeamMember>) => {
    setMembersMap((prev) => ({
      ...prev,
      [currentTenantId]: (prev[currentTenantId] || []).map((m) => (m.id === memberId ? { ...m, ...updates } : m)),
    }));

    showToast('Member Updated', 'Team member profile and role details saved.', 'info');
  };

  const deleteMember = (memberId: string) => {
    const member = (membersMap[currentTenantId] || []).find((m) => m.id === memberId);
    setMembersMap((prev) => ({
      ...prev,
      [currentTenantId]: (prev[currentTenantId] || []).filter((m) => m.id !== memberId),
    }));

    setTenants((prev) =>
      prev.map((t) => (t.id === currentTenantId ? { ...t, memberCount: Math.max(1, t.memberCount - 1) } : t))
    );

    if (member) {
      addActivityLog({
        event: 'Member Removed',
        action: `Revoked workspace credentials for ${member.name}.`,
        category: 'team',
        status: 'Warning',
      });
      showToast('Member Removed', `${member.name} has been removed from the workspace.`, 'warning');
    }
  };

  // Permissions & Roles
  const togglePermission = (categoryId: string, permId: string, roleName: string) => {
    setPermissionCategories((prev) =>
      prev.map((cat) => {
        if (cat.id !== categoryId) return cat;
        return {
          ...cat,
          permissions: cat.permissions.map((p) => {
            if (p.id !== permId) return p;
            const hasRole = p.enabledRoles.includes(roleName);
            const nextRoles = hasRole ? p.enabledRoles.filter((r) => r !== roleName) : [...p.enabledRoles, roleName];
            return { ...p, enabledRoles: nextRoles };
          }),
        };
      })
    );
    setHasUnsavedPermissions(true);
  };

  const savePermissions = () => {
    setHasUnsavedPermissions(false);
    addActivityLog({
      event: 'Permissions Updated',
      action: 'Updated role-based permission matrix across all workspace departments.',
      category: 'team',
      status: 'Success',
    });
    showToast('Permissions Saved', 'Role matrix changes have been propagated successfully.', 'success');
  };

  const createCustomRole = (name: string, description: string, color = '#557C68') => {
    const newRole: CustomRole = {
      id: `role-${Date.now()}`,
      tenantId: currentTenantId,
      name,
      description,
      isSystem: false,
      memberCount: 0,
      color,
    };
    setCustomRoles((prev) => [...prev, newRole]);
    showToast('Role Created', `Custom role "${name}" is now ready for permission assignment.`, 'success');
  };

  const deleteCustomRole = (roleId: string) => {
    const role = customRoles.find((r) => r.id === roleId);
    if (role?.isSystem) {
      showToast('Action Denied', 'System default roles cannot be deleted.', 'error');
      return;
    }
    setCustomRoles((prev) => prev.filter((r) => r.id !== roleId));
    showToast('Role Removed', `Custom role "${role?.name}" has been removed.`, 'warning');
  };

  // Workflows
  const createWorkflow = (data: Partial<Workflow>) => {
    const newWf: Workflow = {
      id: `wf-${Date.now()}`,
      tenantId: currentTenantId,
      name: data.name || 'Untitled Automation',
      trigger: data.trigger || 'Manual Webhook Trigger',
      connectedServices: data.connectedServices || ['VELORA API'],
      lastExecution: 'Never',
      successRate: 100.0,
      status: 'Active',
      executionCount: 0,
      steps: data.steps || [
        { id: `st-${Date.now()}-1`, title: 'Inbound Webhook Trigger', type: 'trigger', service: 'API Gateway', description: 'Listens for POST payload', icon: 'Zap', status: 'idle' },
        { id: `st-${Date.now()}-2`, title: 'Execute Automated Action', type: 'action', service: 'VELORA Engine', description: 'Processes and transforms dataset', icon: 'Layers', status: 'idle' },
      ],
    };
    setWorkflows((prev) => [newWf, ...prev]);
    showToast('Workflow Created', `"${newWf.name}" has been created and initialized.`, 'success');
  };

  const updateWorkflow = (id: string, updates: Partial<Workflow>) => {
    setWorkflows((prev) => prev.map((w) => (w.id === id ? { ...w, ...updates } : w)));
    showToast('Workflow Saved', 'Workflow configuration updated successfully.', 'success');
  };

  const deleteWorkflow = (id: string) => {
    const wf = workflows.find((w) => w.id === id);
    setWorkflows((prev) => prev.filter((w) => w.id !== id));
    showToast('Workflow Deleted', `"${wf?.name}" has been permanently removed.`, 'warning');
  };

  const toggleWorkflowStatus = (id: string) => {
    setWorkflows((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          const next = w.status === 'Active' ? 'Paused' : 'Active';
          showToast(`Workflow ${next}`, `"${w.name}" is now ${next.toLowerCase()}.`, 'info');
          return { ...w, status: next };
        }
        return w;
      })
    );
  };

  // Integrations
  const toggleIntegrationConnection = (id: string) => {
    setIntegrations((prev) =>
      prev.map((int) => {
        if (int.id === id) {
          const nextConnected = !int.connected;
          const statusTxt = nextConnected ? 'Connected' : 'Disconnected';
          addActivityLog({
            event: `Integration ${statusTxt}`,
            action: `${statusTxt} external connector "${int.name}".`,
            category: 'system',
            status: nextConnected ? 'Success' : 'Warning',
          });
          showToast(`Integration ${statusTxt}`, `"${int.name}" is now ${statusTxt.toLowerCase()}.`, nextConnected ? 'success' : 'info');
          return {
            ...int,
            connected: nextConnected,
            lastSynced: nextConnected ? 'Just now' : 'Disconnected',
          };
        }
        return int;
      })
    );
  };

  const updateIntegrationConfig = (id: string, updates: Partial<Integration>) => {
    setIntegrations((prev) => prev.map((int) => (int.id === id ? { ...int, ...updates } : int)));
    showToast('Settings Saved', 'Integration credentials and webhooks updated.', 'success');
  };

  // Billing
  const changePlan = (newPlan: 'Starter' | 'Growth' | 'Enterprise', cycle: 'monthly' | 'yearly' = 'monthly') => {
    const prices: Record<string, { monthly: number; yearly: number }> = {
      Starter: { monthly: 49, yearly: 39 },
      Growth: { monthly: 149, yearly: 119 },
      Enterprise: { monthly: 490, yearly: 390 },
    };

    const cost = prices[newPlan][cycle];

    setTenants((prev) =>
      prev.map((t) =>
        t.id === currentTenantId
          ? {
              ...t,
              plan: newPlan,
              billingCycle: cycle,
              monthlyCost: cost,
            }
          : t
      )
    );

    addActivityLog({
      event: 'Subscription Plan Changed',
      action: `Switched subscription to ${newPlan} plan (${cycle} billing @ $${cost}/mo).`,
      category: 'billing',
      status: 'Success',
    });

    showToast('Subscription Updated', `Your workspace plan is now ${newPlan} (${cycle}).`, 'success');
  };

  // Super Admin Tenant Operations
  const createTenant = (data: Partial<Tenant>) => {
    const id = `tenant-${(data.slug || 'org').toLowerCase()}-${Date.now().toString().slice(-4)}` as TenantId;
    const newTenant: Tenant = {
      id,
      name: data.name || 'New Company',
      slug: data.slug || 'company',
      domain: data.domain || `${data.slug || 'company'}.com`,
      plan: data.plan || 'Growth',
      billingCycle: 'monthly',
      monthlyCost: data.plan === 'Enterprise' ? 490 : data.plan === 'Growth' ? 149 : 49,
      nextBillingDate: 'Dec 01, 2026',
      memberCount: 1,
      maxMembers: data.plan === 'Enterprise' ? 150 : data.plan === 'Growth' ? 50 : 10,
      activeModules: data.activeModules || ['mod-crm', 'mod-ai', 'mod-integrations'],
      status: 'Active',
      createdAt: 'Today',
      adminName: data.adminName || 'Admin User',
      adminEmail: data.adminEmail || `admin@${data.slug || 'company'}.com`,
      logoInitial: (data.name || 'N')[0].toUpperCase(),
      color: '#557C68',
      health: 'Optimal',
      storageUsedGB: 1.2,
      maxStorageGB: 100,
      apiCallsThisMonth: 120,
      maxApiCalls: 500000,
      aiTokensUsed: 5000,
      maxAiTokens: 2500000,
    };

    setTenants((prev) => [newTenant, ...prev]);

    // Initialize root member for new tenant
    setMembersMap((prev) => ({
      ...prev,
      [id]: [
        {
          id: `usr-${Date.now()}`,
          tenantId: id,
          name: newTenant.adminName,
          email: newTenant.adminEmail,
          role: 'Owner',
          department: 'Executive',
          status: 'Active',
          lastActive: 'Just now',
          initials: newTenant.logoInitial,
        },
      ],
    }));

    showToast('Tenant Provisioned', `Workspace for "${newTenant.name}" has been created.`, 'success');
  };

  const suspendTenant = (id: TenantId) => {
    setTenants((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const next = t.status === 'Suspended' ? 'Active' : 'Suspended';
          showToast(`Tenant ${next === 'Suspended' ? 'Suspended' : 'Reactivated'}`, `${t.name} workspace status set to ${next}.`, 'warning');
          return { ...t, status: next };
        }
        return t;
      })
    );
  };

  const activateTenant = (id: TenantId) => {
    setTenants((prev) => prev.map((t) => (t.id === id ? { ...t, status: 'Active' } : t)));
    showToast('Tenant Activated', 'Workspace restored to normal operations.', 'success');
  };

  const deleteTenant = (id: TenantId) => {
    const t = tenants.find((item) => item.id === id);
    setTenants((prev) => prev.filter((item) => item.id !== id));
    showToast('Tenant Deleted', `Tenant "${t?.name}" removed from platform.`, 'warning');
  };

  // Services Health Refresh
  const refreshServicesHealth = () => {
    setServicesHealth((prev) =>
      prev.map((s) => ({
        ...s,
        latencyMs: Math.max(8, Math.floor(s.latencyMs + (Math.random() * 8 - 4))),
        lastChecked: 'Just now',
      }))
    );
    showToast('Telemetry Refreshed', 'Queried 8 edge microservices across 3 cloud regions.', 'info');
  };

  // Reset Demo Data
  const resetDemoData = () => {
    try {
      localStorage.removeItem(`${STORAGE_KEY}_activeTenant`);
      localStorage.removeItem(`${STORAGE_KEY}_tenants`);
      localStorage.removeItem(`${STORAGE_KEY}_modules`);
      localStorage.removeItem(`${STORAGE_KEY}_members`);
      localStorage.removeItem(`${STORAGE_KEY}_permissions`);
      localStorage.removeItem(`${STORAGE_KEY}_roles`);
      localStorage.removeItem(`${STORAGE_KEY}_workflows`);
      localStorage.removeItem(`${STORAGE_KEY}_integrations`);
      localStorage.removeItem(`${STORAGE_KEY}_invoices`);
      localStorage.removeItem(`${STORAGE_KEY}_activity`);
    } catch {
      // ignore
    }

    setCurrentTenantIdState('tenant-acme');
    setTenants(INITIAL_TENANTS);
    setModules(INITIAL_MODULES);
    setMembersMap(INITIAL_MEMBERS);
    setPermissionCategories(INITIAL_PERMISSION_CATEGORIES);
    setCustomRoles(INITIAL_CUSTOM_ROLES);
    setWorkflows(INITIAL_WORKFLOWS);
    setIntegrations(INITIAL_INTEGRATIONS);
    setInvoices(INITIAL_INVOICES);
    setActivityLogs(INITIAL_ACTIVITY_LOGS);
    setServicesHealth(INITIAL_SERVICES_HEALTH);
    setIsImpersonating(false);
    setIsSuperAdmin(false);

    showToast('Demo State Reset', 'Restored all original mock datasets and settings.', 'info');
  };

  return (
    <DemoContext.Provider
      value={{
        currentTenantId,
        currentTenant,
        setTenantId,
        tenants,
        isImpersonating,
        enterImpersonation,
        exitImpersonation,
        isSuperAdmin,
        setIsSuperAdmin,
        modules,
        toggleModuleForTenant,
        toggleModuleGlobal,
        currentMembers,
        addMember,
        updateMember,
        deleteMember,
        permissionCategories,
        togglePermission,
        hasUnsavedPermissions,
        savePermissions,
        customRoles,
        createCustomRole,
        deleteCustomRole,
        workflows,
        createWorkflow,
        updateWorkflow,
        deleteWorkflow,
        toggleWorkflowStatus,
        integrations,
        toggleIntegrationConnection,
        updateIntegrationConfig,
        invoices,
        changePlan,
        createTenant,
        suspendTenant,
        activateTenant,
        deleteTenant,
        servicesHealth,
        refreshServicesHealth,
        activityLogs,
        addActivityLog,
        toasts,
        showToast,
        dismissToast,
        resetDemoData,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
};
