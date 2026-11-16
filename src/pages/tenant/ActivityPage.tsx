import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { ActivityLog } from '../../types';
import {
  History,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  X,
  ExternalLink,
  Shield,
  Layers,
  GitBranch,
} from 'lucide-react';

export const ActivityPage: React.FC = () => {
  const { activityLogs, currentTenant } = useDemo();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedLog, setSelectedLog] = useState<ActivityLog | null>(null);

  const tenantLogs = activityLogs.filter((l) => l.tenantId === currentTenant.id);

  const filteredLogs = tenantLogs.filter((log) => {
    const matchesSearch =
      log.event.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.user.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || log.status === statusFilter;
    const matchesCat = categoryFilter === 'All' || log.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCat;
  });

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E6EAE6]">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#222B28] tracking-tight">
            Workspace Activity Logs
          </h1>
          <p className="text-xs text-[#78817B] mt-0.5">
            Immutable audit record of user access, module mutations, workflows, and security events for {currentTenant.name}.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-[#E7EEE8] text-[#304F40] font-semibold">
            {filteredLogs.length} Events Recorded
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-[#E6EAE6] p-4 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-[#78817B] absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by event title, user, action or category..."
            className="w-full bg-[#F7F8F6] border border-[#E6EAE6] rounded-xl pl-9 pr-3.5 py-2 text-xs text-[#222B28] focus:outline-none focus:border-[#557C68]"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-[#F7F8F6] border border-[#E6EAE6] rounded-xl px-3 py-2 text-xs text-[#222B28] focus:outline-none"
          >
            <option value="All">All Categories</option>
            <option value="module">Module Events</option>
            <option value="team">Team Management</option>
            <option value="workflow">Workflow Engine</option>
            <option value="billing">Billing & Plans</option>
            <option value="system">System & Security</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#F7F8F6] border border-[#E6EAE6] rounded-xl px-3 py-2 text-xs text-[#222B28] focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Success">Success</option>
            <option value="Warning">Warning</option>
            <option value="Error">Error</option>
          </select>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-2xl border border-[#E6EAE6] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F8F6] text-[10px] uppercase font-mono font-bold text-[#78817B] border-b border-[#E6EAE6]">
              <tr>
                <th className="px-5 py-3.5">Event</th>
                <th className="px-5 py-3.5">Actor / User</th>
                <th className="px-5 py-3.5">Action Details</th>
                <th className="px-5 py-3.5">Date & Time</th>
                <th className="px-5 py-3.5">IP Address</th>
                <th className="px-5 py-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6EAE6]/70 text-[#222B28]">
              {filteredLogs.map((log) => {
                const statusBadge = {
                  Success: <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#648B70] bg-[#E7EEE8] px-2 py-0.5 rounded-full"><CheckCircle2 className="w-2.5 h-2.5" /> Success</span>,
                  Warning: <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#C49A58] bg-[#FFFDF9] px-2 py-0.5 rounded-full border border-[#C49A58]/30"><AlertTriangle className="w-2.5 h-2.5" /> Warning</span>,
                  Error: <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#B87570] bg-[#FAF2F2] px-2 py-0.5 rounded-full border border-[#B87570]/30"><AlertCircle className="w-2.5 h-2.5" /> Error</span>,
                }[log.status];

                return (
                  <tr
                    key={log.id}
                    onClick={() => setSelectedLog(log)}
                    className="hover:bg-[#F7F8F6] cursor-pointer transition-colors"
                  >
                    <td className="px-5 py-3.5 font-semibold text-[#222B28]">{log.event}</td>
                    <td className="px-5 py-3.5">
                      <div className="font-medium text-[#222B28]">{log.user}</div>
                      <div className="text-[10px] text-[#78817B] font-mono">{log.userEmail}</div>
                    </td>
                    <td className="px-5 py-3.5 text-[#78817B] max-w-sm truncate">{log.action}</td>
                    <td className="px-5 py-3.5 font-mono text-[11px] text-[#78817B]">
                      <div>{log.date}</div>
                      <div className="text-[10px] text-[#78817B]/60">{log.timestamp}</div>
                    </td>
                    <td className="px-5 py-3.5 font-mono text-[11px] text-[#78817B]">{log.ipAddress}</td>
                    <td className="px-5 py-3.5">{statusBadge}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log Detail Slide-Over Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-[#E6EAE6] shadow-xl max-w-md w-full p-6 text-left relative animate-in zoom-in-95 duration-150 space-y-4">
            <button
              onClick={() => setSelectedLog(null)}
              className="absolute top-4 right-4 text-[#78817B] hover:text-[#222B28] p-1.5 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase bg-[#F0F2EF] px-2 py-0.5 rounded text-[#78817B]">
                Event Record #{selectedLog.id}
              </span>
            </div>

            <h3 className="text-base font-bold text-[#222B28] font-display">
              {selectedLog.event}
            </h3>

            <p className="text-xs text-[#222B28] leading-relaxed bg-[#F7F8F6] p-3 rounded-xl border border-[#E6EAE6]">
              {selectedLog.action}
            </p>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-[#E6EAE6]">
                <span className="text-[#78817B]">Responsible User</span>
                <span className="font-semibold text-[#222B28]">{selectedLog.user} ({selectedLog.userEmail})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E6EAE6]">
                <span className="text-[#78817B]">Timestamp (UTC)</span>
                <span className="font-mono text-[#222B28]">{selectedLog.timestamp} on {selectedLog.date}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E6EAE6]">
                <span className="text-[#78817B]">Origin IP Address</span>
                <span className="font-mono text-[#222B28]">{selectedLog.ipAddress}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E6EAE6]">
                <span className="text-[#78817B]">Status</span>
                <span className="font-mono font-semibold text-[#648B70]">{selectedLog.status}</span>
              </div>
            </div>

            {selectedLog.details && (
              <div className="pt-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#78817B] block mb-1">
                  System Diagnostics & Metadata:
                </span>
                <pre className="p-3 bg-[#F7F8F6] rounded-xl text-[10px] font-mono text-[#304F40] border border-[#E6EAE6]">
                  {selectedLog.details}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
