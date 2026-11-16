import React, { Suspense, lazy, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DemoProvider } from './context/DemoContext';
import { ToastContainer } from './components/common/Toast';
import { BrandedLoader } from './components/common/BrandedLoader';

// Public Pages (Immediate Load)
import { LandingPage } from './pages/marketing/LandingPage';
import { ContactPage } from './pages/marketing/ContactPage';
import { LoginPage } from './pages/auth/LoginPage';

// Layouts
import { TenantLayout } from './layouts/TenantLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Lazy Loaded Tenant Pages
const DashboardPage = lazy(() => import('./pages/tenant/DashboardPage').then(m => ({ default: m.DashboardPage })));
const TeamPage = lazy(() => import('./pages/tenant/TeamPage').then(m => ({ default: m.TeamPage })));
const RolesPage = lazy(() => import('./pages/tenant/RolesPage').then(m => ({ default: m.RolesPage })));
const ModulesPage = lazy(() => import('./pages/tenant/ModulesPage').then(m => ({ default: m.ModulesPage })));
const AIWorkspacePage = lazy(() => import('./pages/tenant/AIWorkspacePage').then(m => ({ default: m.AIWorkspacePage })));
const AutomationsPage = lazy(() => import('./pages/tenant/AutomationsPage').then(m => ({ default: m.AutomationsPage })));
const IntegrationsPage = lazy(() => import('./pages/tenant/IntegrationsPage').then(m => ({ default: m.IntegrationsPage })));
const AnalyticsPage = lazy(() => import('./pages/tenant/AnalyticsPage').then(m => ({ default: m.AnalyticsPage })));
const BillingPage = lazy(() => import('./pages/tenant/BillingPage').then(m => ({ default: m.BillingPage })));
const ActivityPage = lazy(() => import('./pages/tenant/ActivityPage').then(m => ({ default: m.ActivityPage })));
const SettingsPage = lazy(() => import('./pages/tenant/SettingsPage').then(m => ({ default: m.SettingsPage })));

// Lazy Loaded Super Admin Pages
const AdminOverviewPage = lazy(() => import('./pages/admin/AdminOverviewPage').then(m => ({ default: m.AdminOverviewPage })));
const AdminTenantsPage = lazy(() => import('./pages/admin/AdminTenantsPage').then(m => ({ default: m.AdminTenantsPage })));
const AdminTenantDetailPage = lazy(() => import('./pages/admin/AdminTenantDetailPage').then(m => ({ default: m.AdminTenantDetailPage })));
const AdminModulesPage = lazy(() => import('./pages/admin/AdminModulesPage').then(m => ({ default: m.AdminModulesPage })));
const AdminSubscriptionsPage = lazy(() => import('./pages/admin/AdminSubscriptionsPage').then(m => ({ default: m.AdminSubscriptionsPage })));
const AdminAnalyticsPage = lazy(() => import('./pages/admin/AdminAnalyticsPage').then(m => ({ default: m.AdminAnalyticsPage })));
const AdminHealthPage = lazy(() => import('./pages/admin/AdminHealthPage').then(m => ({ default: m.AdminHealthPage })));
const AdminActivityPage = lazy(() => import('./pages/admin/AdminActivityPage').then(m => ({ default: m.AdminActivityPage })));
const AdminSettingsPage = lazy(() => import('./pages/admin/AdminSettingsPage').then(m => ({ default: m.AdminSettingsPage })));

const RouteSuspenseFallback = () => (
  <div className="flex items-center justify-center min-h-[300px]">
    <div className="w-5 h-5 border-2 border-[#557C68] border-t-transparent rounded-full animate-spin" />
  </div>
);

export function App() {
  const [showInitialLoader, setShowInitialLoader] = useState(() => {
    try {
      const shown = sessionStorage.getItem('velora_initial_loaded');
      return !shown;
    } catch {
      return false;
    }
  });

  const handleFinishLoader = () => {
    try {
      sessionStorage.setItem('velora_initial_loaded', 'true');
    } catch {
      // ignore
    }
    setShowInitialLoader(false);
  };

  return (
    <DemoProvider>
      {showInitialLoader && <BrandedLoader onFinish={handleFinishLoader} />}

      <BrowserRouter>
        <Suspense fallback={<RouteSuspenseFallback />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/platform" element={<LandingPage />} />
            <Route path="/modules" element={<LandingPage />} />
            <Route path="/integrations" element={<LandingPage />} />
            <Route path="/pricing" element={<LandingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Tenant Workspace Routes */}
            <Route path="/app" element={<TenantLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="team" element={<TeamPage />} />
              <Route path="roles" element={<RolesPage />} />
              <Route path="modules" element={<ModulesPage />} />
              <Route path="ai" element={<AIWorkspacePage />} />
              <Route path="automations" element={<AutomationsPage />} />
              <Route path="integrations" element={<IntegrationsPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="billing" element={<BillingPage />} />
              <Route path="activity" element={<ActivityPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>

            {/* Super Admin Console Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminOverviewPage />} />
              <Route path="tenants" element={<AdminTenantsPage />} />
              <Route path="tenants/:id" element={<AdminTenantDetailPage />} />
              <Route path="modules" element={<AdminModulesPage />} />
              <Route path="subscriptions" element={<AdminSubscriptionsPage />} />
              <Route path="analytics" element={<AdminAnalyticsPage />} />
              <Route path="system-health" element={<AdminHealthPage />} />
              <Route path="activity" element={<AdminActivityPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>

      <ToastContainer />
    </DemoProvider>
  );
}

export default App;
