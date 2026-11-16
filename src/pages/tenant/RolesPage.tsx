import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import {
  ShieldCheck,
  Plus,
  Save,
  Check,
  X,
  AlertCircle,
  Copy,
  Trash2,
  Lock,
} from 'lucide-react';

export const RolesPage: React.FC = () => {
  const {
    permissionCategories,
    togglePermission,
    hasUnsavedPermissions,
    savePermissions,
    customRoles,
    createCustomRole,
    deleteCustomRole,
    currentTenant,
  } = useDemo();

  const [selectedRole, setSelectedRole] = useState<string>('Administrator');
  const [showNewRoleModal, setShowNewRoleModal] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleDesc, setNewRoleDesc] = useState('');

  const handleCreateRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoleName.trim()) return;
    createCustomRole(newRoleName.trim(), newRoleDesc.trim());
    setNewRoleName('');
    setNewRoleDesc('');
    setShowNewRoleModal(false);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E6EAE6]">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#222B28] tracking-tight">
            Roles & Permissions Matrix
          </h1>
          <p className="text-xs text-[#78817B] mt-0.5">
            Configure granular access governance policies across all 8 operational categories for {currentTenant.name}.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {hasUnsavedPermissions && (
            <span className="flex items-center gap-1.5 text-xs text-[#C49A58] font-medium bg-[#FFFDF9] px-3 py-1.5 rounded-xl border border-[#C49A58]/30 animate-pulse">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Unsaved changes</span>
            </span>
          )}

          <button
            onClick={() => setShowNewRoleModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#E6EAE6] hover:border-[#557C68] text-xs font-semibold text-[#222B28] transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 text-[#557C68]" />
            <span>Create Custom Role</span>
          </button>

          <button
            onClick={savePermissions}
            disabled={!hasUnsavedPermissions}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#304F40] hover:bg-[#557C68] disabled:opacity-40 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Matrix</span>
          </button>
        </div>
      </div>

      {/* Role Selector Tabs */}
      <div className="bg-white rounded-2xl border border-[#E6EAE6] p-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#E6EAE6] mb-3">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#78817B] font-mono">
            Configured Roles ({customRoles.length})
          </span>
          <span className="text-xs text-[#78817B]">
            Click to view permissions granted to this tier
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {customRoles.map((role) => {
            const isSelected = selectedRole === role.name;

            return (
              <div
                key={role.id}
                onClick={() => setSelectedRole(role.name)}
                className={`cursor-pointer px-3.5 py-2 rounded-xl border transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'border-[#557C68] bg-[#E7EEE8] text-[#304F40] shadow-xs'
                    : 'border-[#E6EAE6] bg-[#F7F8F6] text-[#78817B] hover:text-[#222B28] hover:bg-white'
                }`}
              >
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: role.color }}
                />
                <span className="text-xs font-bold font-display">{role.name}</span>
                {role.isSystem && (
                  <span className="text-[9px] font-mono text-[#78817B] bg-black/5 px-1.5 py-0.2 rounded">
                    system
                  </span>
                )}
                {!role.isSystem && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteCustomRole(role.id);
                    }}
                    className="text-[#78817B] hover:text-[#B87570] p-0.5 ml-1"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Permissions Categories Matrix */}
      <div className="space-y-4">
        {permissionCategories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-2xl border border-[#E6EAE6] p-5 shadow-xs text-left"
          >
            <div className="pb-3 border-b border-[#E6EAE6] mb-3">
              <h3 className="text-sm font-bold text-[#222B28] font-display">
                {category.name}
              </h3>
              <p className="text-xs text-[#78817B] mt-0.5">{category.description}</p>
            </div>

            <div className="divide-y divide-[#E6EAE6]/60">
              {category.permissions.map((perm) => {
                const isEnabled = perm.enabledRoles.includes(selectedRole);

                return (
                  <div
                    key={perm.id}
                    className="py-3 flex items-center justify-between gap-4 text-xs"
                  >
                    <div>
                      <div className="font-semibold text-[#222B28]">{perm.label}</div>
                      <div className="text-[11px] text-[#78817B] leading-tight">
                        {perm.description}
                      </div>
                    </div>

                    <button
                      onClick={() => togglePermission(category.id, perm.id, selectedRole)}
                      className={`px-3 py-1.5 rounded-xl font-mono text-[11px] font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                        isEnabled
                          ? 'bg-[#E7EEE8] text-[#304F40] border border-[#557C68]/30 shadow-xs'
                          : 'bg-[#F0F2EF] text-[#78817B] border border-[#E6EAE6]'
                      }`}
                    >
                      {isEnabled ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#648B70]" />
                          <span>Enabled</span>
                        </>
                      ) : (
                        <>
                          <X className="w-3.5 h-3.5 text-[#78817B]" />
                          <span>Disabled</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Create Custom Role Modal */}
      {showNewRoleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-[#E6EAE6] shadow-xl max-w-md w-full p-6 text-left relative animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setShowNewRoleModal(false)}
              className="absolute top-4 right-4 text-[#78817B] hover:text-[#222B28] p-1.5 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-bold text-[#222B28] font-display mb-1">
              Create Custom Role Tier
            </h3>
            <p className="text-xs text-[#78817B] mb-5">
              Define a tailored permission profile for cross-functional groups.
            </p>

            <form onSubmit={handleCreateRole} className="space-y-4 text-xs">
              <div>
                <label className="text-[10px] uppercase font-bold tracking-wider text-[#78817B] block mb-1">
                  Role Title *
                </label>
                <input
                  type="text"
                  required
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  placeholder="e.g. Compliance Auditor"
                  className="w-full bg-[#F7F8F6] border border-[#E6EAE6] rounded-xl px-3.5 py-2 text-xs text-[#222B28] focus:outline-none focus:border-[#557C68]"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold tracking-wider text-[#78817B] block mb-1">
                  Scope Description
                </label>
                <textarea
                  rows={2}
                  value={newRoleDesc}
                  onChange={(e) => setNewRoleDesc(e.target.value)}
                  placeholder="Summarize the functional access granted to this tier..."
                  className="w-full bg-[#F7F8F6] border border-[#E6EAE6] rounded-xl p-3 text-xs text-[#222B28] focus:outline-none focus:border-[#557C68]"
                />
              </div>

              <div className="pt-3 border-t border-[#E6EAE6] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewRoleModal(false)}
                  className="px-3.5 py-2 text-xs font-medium text-[#78817B] hover:text-[#222B28]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#304F40] hover:bg-[#557C68] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  Create Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
