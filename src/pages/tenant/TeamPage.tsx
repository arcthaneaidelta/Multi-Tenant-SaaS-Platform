import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { TeamMember, UserRole } from '../../types';
import {
  Users,
  UserPlus,
  Search,
  Filter,
  MoreVertical,
  Trash2,
  Edit2,
  Shield,
  X,
  Check,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export const TeamPage: React.FC = () => {
  const { currentMembers, currentTenant, addMember, updateMember, deleteMember, showToast } = useDemo();

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [deptFilter, setDeptFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'name' | 'lastActive'>('name');

  // Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [deletingMember, setDeletingMember] = useState<TeamMember | null>(null);

  // Form State for Add Member
  const [newMemberData, setNewMemberData] = useState({
    name: '',
    email: '',
    role: 'Member',
    department: 'Engineering',
  });

  // Filter & Search Logic
  const filteredMembers = currentMembers.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'All' || m.role === roleFilter;
    const matchesDept = deptFilter === 'All' || m.department === deptFilter;
    return matchesSearch && matchesRole && matchesDept;
  });

  const departments = ['Engineering', 'Product', 'Marketing', 'Sales', 'Finance', 'Leadership', 'Operations', 'Executive'];
  const roles: UserRole[] = ['Owner', 'Administrator', 'Manager', 'Member', 'Viewer'];

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberData.name || !newMemberData.email) return;

    addMember({
      name: newMemberData.name,
      email: newMemberData.email,
      role: newMemberData.role,
      department: newMemberData.department,
    });

    setNewMemberData({ name: '', email: '', role: 'Member', department: 'Engineering' });
    setShowAddModal(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;
    updateMember(editingMember.id, {
      name: editingMember.name,
      role: editingMember.role,
      department: editingMember.department,
    });
    setEditingMember(null);
  };

  const confirmDelete = () => {
    if (!deletingMember) return;
    deleteMember(deletingMember.id);
    setDeletingMember(null);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E6EAE6]">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#222B28] tracking-tight">
            Team & Directory
          </h1>
          <p className="text-xs text-[#78817B] mt-0.5">
            Manage users, role delegations, and organizational departments in {currentTenant.name}.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#304F40] hover:bg-[#557C68] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Invite Team Member</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-[#E6EAE6] p-4 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-[#78817B] absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by member name, email or department..."
            className="w-full bg-[#F7F8F6] border border-[#E6EAE6] rounded-xl pl-9 pr-3.5 py-2 text-xs text-[#222B28] focus:outline-none focus:border-[#557C68]"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-[#F7F8F6] border border-[#E6EAE6] rounded-xl px-3 py-2 text-xs text-[#222B28] focus:outline-none"
          >
            <option value="All">All Roles</option>
            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>

          {/* Department Filter */}
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="bg-[#F7F8F6] border border-[#E6EAE6] rounded-xl px-3 py-2 text-xs text-[#222B28] focus:outline-none"
          >
            <option value="All">All Departments</option>
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Members Data Table */}
      <div className="bg-white rounded-2xl border border-[#E6EAE6] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F8F6] border-b border-[#E6EAE6] text-[10px] uppercase font-bold tracking-wider text-[#78817B] font-mono">
              <tr>
                <th className="px-5 py-3.5">Member</th>
                <th className="px-5 py-3.5">Role</th>
                <th className="px-5 py-3.5">Department</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Last Active</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6EAE6]/80 text-[#222B28]">
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-[#F7F8F6]/60 transition-colors">
                    {/* Name & Email */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#E7EEE8] text-[#304F40] font-bold flex items-center justify-center text-xs shrink-0">
                          {member.initials}
                        </div>
                        <div>
                          <div className="font-semibold text-[#222B28]">{member.name}</div>
                          <div className="text-[11px] text-[#78817B] font-mono">{member.email}</div>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#F0F2EF] text-[#304F40] border border-[#E6EAE6]">
                        <Shield className="w-2.5 h-2.5 text-[#557C68]" />
                        {member.role}
                      </span>
                    </td>

                    {/* Department */}
                    <td className="px-5 py-3.5 text-xs text-[#78817B]">
                      {member.department}
                    </td>

                    {/* Status */}
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-medium font-mono px-2 py-0.5 rounded-full ${
                          member.status === 'Active'
                            ? 'bg-[#E7EEE8] text-[#648B70]'
                            : 'bg-[#FFFDF9] text-[#C49A58] border border-[#C49A58]/20'
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            member.status === 'Active' ? 'bg-[#648B70]' : 'bg-[#C49A58]'
                          }`}
                        />
                        {member.status}
                      </span>
                    </td>

                    {/* Last Active */}
                    <td className="px-5 py-3.5 text-[11px] font-mono text-[#78817B]">
                      {member.lastActive}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setEditingMember(member)}
                          className="p-1.5 rounded-lg text-[#78817B] hover:text-[#222B28] hover:bg-[#F0F2EF] transition-colors"
                          title="Edit Member"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeletingMember(member)}
                          className="p-1.5 rounded-lg text-[#78817B] hover:text-[#B87570] hover:bg-[#F0F2EF] transition-colors"
                          title="Remove Member"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-xs text-[#78817B]">
                    No members found matching your search and filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination summary */}
        <div className="p-4 bg-[#F7F8F6] border-t border-[#E6EAE6] flex items-center justify-between text-xs text-[#78817B]">
          <span>
            Showing <strong className="text-[#222B28]">{filteredMembers.length}</strong> of {currentMembers.length} members
          </span>
          <div className="flex items-center gap-1 font-mono text-[11px]">
            <span>Page 1 of 1</span>
          </div>
        </div>
      </div>

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-[#E6EAE6] shadow-xl max-w-md w-full p-6 text-left relative animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-[#78817B] hover:text-[#222B28] p-1.5 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-bold text-[#222B28] font-display mb-1">
              Invite New Team Member
            </h3>
            <p className="text-xs text-[#78817B] mb-5">
              Grant instant access to {currentTenant.name} workspace.
            </p>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-[10px] uppercase font-bold tracking-wider text-[#78817B] block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={newMemberData.name}
                  onChange={(e) => setNewMemberData({ ...newMemberData, name: e.target.value })}
                  placeholder="e.g. Maya Lin"
                  className="w-full bg-[#F7F8F6] border border-[#E6EAE6] rounded-xl px-3.5 py-2 text-xs text-[#222B28] focus:outline-none focus:border-[#557C68]"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold tracking-wider text-[#78817B] block mb-1">
                  Corporate Email *
                </label>
                <input
                  type="email"
                  required
                  value={newMemberData.email}
                  onChange={(e) => setNewMemberData({ ...newMemberData, email: e.target.value })}
                  placeholder="maya@acme-corp.com"
                  className="w-full bg-[#F7F8F6] border border-[#E6EAE6] rounded-xl px-3.5 py-2 text-xs text-[#222B28] focus:outline-none focus:border-[#557C68]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase font-bold tracking-wider text-[#78817B] block mb-1">
                    Department
                  </label>
                  <select
                    value={newMemberData.department}
                    onChange={(e) => setNewMemberData({ ...newMemberData, department: e.target.value })}
                    className="w-full bg-[#F7F8F6] border border-[#E6EAE6] rounded-xl px-3 py-2 text-xs text-[#222B28] focus:outline-none"
                  >
                    {departments.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold tracking-wider text-[#78817B] block mb-1">
                    Role Tier
                  </label>
                  <select
                    value={newMemberData.role}
                    onChange={(e) => setNewMemberData({ ...newMemberData, role: e.target.value })}
                    className="w-full bg-[#F7F8F6] border border-[#E6EAE6] rounded-xl px-3 py-2 text-xs text-[#222B28] focus:outline-none"
                  >
                    {roles.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E6EAE6] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3.5 py-2 text-xs font-medium text-[#78817B] hover:text-[#222B28]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#304F40] hover:bg-[#557C68] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  Confirm & Send Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Member Modal */}
      {editingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-[#E6EAE6] shadow-xl max-w-md w-full p-6 text-left relative animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setEditingMember(null)}
              className="absolute top-4 right-4 text-[#78817B] hover:text-[#222B28] p-1.5 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-bold text-[#222B28] font-display mb-1">
              Edit Member Details
            </h3>
            <p className="text-xs text-[#78817B] mb-5">
              Update roles and departmental assignments for {editingMember.email}.
            </p>

            <form onSubmit={handleEditSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-[10px] uppercase font-bold tracking-wider text-[#78817B] block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={editingMember.name}
                  onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                  className="w-full bg-[#F7F8F6] border border-[#E6EAE6] rounded-xl px-3.5 py-2 text-xs text-[#222B28] focus:outline-none focus:border-[#557C68]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase font-bold tracking-wider text-[#78817B] block mb-1">
                    Department
                  </label>
                  <select
                    value={editingMember.department}
                    onChange={(e) => setEditingMember({ ...editingMember, department: e.target.value })}
                    className="w-full bg-[#F7F8F6] border border-[#E6EAE6] rounded-xl px-3 py-2 text-xs text-[#222B28] focus:outline-none"
                  >
                    {departments.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold tracking-wider text-[#78817B] block mb-1">
                    Role
                  </label>
                  <select
                    value={editingMember.role}
                    onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
                    className="w-full bg-[#F7F8F6] border border-[#E6EAE6] rounded-xl px-3 py-2 text-xs text-[#222B28] focus:outline-none"
                  >
                    {roles.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E6EAE6] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingMember(null)}
                  className="px-3.5 py-2 text-xs font-medium text-[#78817B] hover:text-[#222B28]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#304F40] hover:bg-[#557C68] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-[#E6EAE6] shadow-xl max-w-sm w-full p-6 text-left relative animate-in zoom-in-95 duration-150">
            <h3 className="text-base font-bold text-[#222B28] font-display mb-2">
              Remove Member from Workspace?
            </h3>
            <p className="text-xs text-[#78817B] mb-5 leading-relaxed">
              Are you sure you want to revoke credentials for <strong className="text-[#222B28]">{deletingMember.name}</strong> ({deletingMember.email})? Their sessions will be terminated immediately.
            </p>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setDeletingMember(null)}
                className="px-3.5 py-2 text-xs font-medium text-[#78817B] hover:text-[#222B28]"
              >
                Keep Member
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-[#B87570] hover:bg-[#a6625d] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
