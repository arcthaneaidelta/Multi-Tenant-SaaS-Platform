import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import {
  History,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Building2,
} from 'lucide-react';

export const AdminActivityPage: React.FC = () => {
  const { activityLogs } = useDemo();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = activityLogs.filter((l) => {
    const matchesSearch =
      l.event.toLowerCase().includes(search.toLowerCase()) ||
      l.tenantName.toLowerCase().includes(search.toLowerCase()) ||
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      l.user.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E6EAE6]">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#222B28] tracking-tight">
            Global Platform Audit Logs
          </h1>
          <p className="text-xs text-[#78817B] mt-0.5">
            Fleet-wide event ingestion stream across all provisioned tenant workspaces.
          </p>
        </div>

        <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-[#E7EEE8] text-[#304F40] font-semibold">
          {filtered.length} Events Ingested
        </span>
      </div>

      {/* Filter and Search */}
      <div className="bg-white rounded-2xl border border-[#E6EAE6] p-4 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-[#78817B] absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search cross-tenant events, actions, users..."
            className="w-full bg-[#F7F8F6] border border-[#E6EAE6] rounded-xl pl-9 pr-3.5 py-2 text-xs text-[#222B28] focus:outline-none focus:border-[#557C68]"
          />
        </div>

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

      {/* Global Logs Table */}
      <div className="bg-white rounded-2xl border border-[#E6EAE6] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F8F6] text-[10px] uppercase font-mono font-bold text-[#78817B] border-b border-[#E6EAE6]">
              <tr>
                <th className="px-5 py-3.5">Tenant Workspace</th>
                <th className="px-5 py-3.5">Event</th>
                <th className="px-5 py-3.5">Actor</th>
                <th className="px-5 py-3.5">Action</th>
                <th className="px-5 py-3.5">Timestamp</th>
                <th className="px-5 py-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6EAE6]/70 text-[#222B28]">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-[#F7F8F6]/60 transition-colors">
                  <td className="px-5 py-3.5 font-bold text-[#557C68]">{log.tenantName}</td>
                  <td className="px-5 py-3.5 font-semibold text-[#222B28]">{log.event}</td>
                  <td className="px-5 py-3.5">
                    <div>{log.user}</div>
                    <div className="text-[10px] text-[#78817B] font-mono">{log.userEmail}</div>
                  </td>
                  <td className="px-5 py-3.5 text-[#78817B] max-w-sm truncate">{log.action}</td>
                  <td className="px-5 py-3.5 font-mono text-[11px] text-[#78817B]">{log.date} {log.timestamp}</td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        log.status === 'Success'
                          ? 'bg-[#E7EEE8] text-[#648B70]'
                          : 'bg-[#FFFDF9] text-[#C49A58] border border-[#C49A58]/30'
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
