import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users2, 
  ShieldCheck, 
  UserPlus, 
  Lock, 
  Check, 
  X, 
  Edit3, 
  Globe, 
  Building2, 
  Boxes, 
  Key,
  Crown,
  Sparkles,
  AlertCircle
} from 'lucide-react';

export const TeamManagement = () => {
  const { team, inviteTeamMember, updateTeamMemberRole, updateTeamMemberPermissions, updateTeamMemberStatus, showToast } = useApp();
  
  const [selectedMember, setSelectedMember] = useState(team[1]); // Default to Seraphina Vance (Online Sales Manager)
  const [showInviteModal, setShowInviteModal] = useState(false);

  // Invite modal form
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('online_sales_manager');
  const [inviteDept, setInviteDept] = useState('Digital Commerce');

  const handleRoleChange = (memberId, newRole) => {
    updateTeamMemberRole(memberId, newRole);
    // Refresh selected member reference
    const updated = team.find(m => m.id === memberId);
    if (updated) setSelectedMember(updated);
  };

  const handlePermissionToggle = (permKey) => {
    if (!selectedMember) return;
    const newPerms = {
      ...selectedMember.permissions,
      [permKey]: !selectedMember.permissions[permKey]
    };
    updateTeamMemberPermissions(selectedMember.id, newPerms);
    setSelectedMember({ ...selectedMember, permissions: newPerms });
  };

  const handleInviteSubmit = (e) => {
    e.preventDefault();
    if (!inviteName || !inviteEmail) return;

    inviteTeamMember({
      name: inviteName,
      email: inviteEmail,
      role: inviteRole,
      department: inviteDept,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      status: 'Active',
      permissions: {
        viewAnalytics: true,
        manageProducts: inviteRole === 'admin' || inviteRole === 'purchase_manager',
        manageOrders: inviteRole !== 'purchase_manager',
        manageWholesale: inviteRole === 'admin' || inviteRole === 'offline_sales_manager',
        manageRawMaterials: inviteRole === 'admin' || inviteRole === 'purchase_manager',
        manageCoupons: inviteRole === 'admin' || inviteRole === 'online_sales_manager',
        moderateReviews: inviteRole === 'admin' || inviteRole === 'online_sales_manager',
        manageTeam: inviteRole === 'admin',
        manageSettings: inviteRole === 'admin' || inviteRole === 'purchase_manager'
      }
    });

    setShowInviteModal(false);
    setInviteName('');
    setInviteEmail('');
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 'admin':
        return <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">Super Admin</span>;
      case 'online_sales_manager':
        return <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-300">Online Sales Manager</span>;
      case 'offline_sales_manager':
        return <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">Offline Sales Manager</span>;
      case 'purchase_manager':
        return <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-900 border border-rose-300">Purchase Manager</span>;
      default:
        return <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700">Staff Member</span>;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B87A0B] block mb-1">
            Access Governance & Staff
          </span>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#3D2206]">
            Organization / Team Management
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Assign manager roles (Online Sales, Offline Sales, Purchase) and control permission matrices.
          </p>
        </div>

        <button
          onClick={() => setShowInviteModal(true)}
          className="bg-[#D89816] hover:bg-[#B87A0B] text-stone-950 font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>Invite New Team Member</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Team Members Directory (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
            <div className="p-5 border-b border-stone-100 flex items-center justify-between">
              <h3 className="font-serif-luxury font-bold text-base text-[#3D2206]">
                HaruViru Active Staff & Managers ({team.length})
              </h3>
              <span className="text-xs text-stone-400">Click to inspect permissions</span>
            </div>

            <div className="divide-y divide-stone-100">
              {team.map((member) => {
                const isSelected = selectedMember?.id === member.id;
                return (
                  <div
                    key={member.id}
                    onClick={() => setSelectedMember(member)}
                    className={`p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer transition-colors ${
                      isSelected ? 'bg-[#FCF9F2] border-l-4 border-l-[#D89816]' : 'hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <img
                        src={member.avatar}
                        alt=""
                        className="w-11 h-11 rounded-full object-cover border-2 border-amber-300 shrink-0"
                      />
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-stone-900">{member.name}</h4>
                          {getRoleBadge(member.role)}
                        </div>
                        <p className="text-xs text-stone-500">{member.email}</p>
                        <p className="text-[10px] text-stone-400">Department: {member.department} • Active: {member.lastActive}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                      <select
                        value={member.role}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => handleRoleChange(member.id, e.target.value)}
                        className="bg-white border border-stone-300 rounded-lg text-xs font-semibold px-2.5 py-1.5 text-stone-800 focus:outline-hidden focus:border-[#D89816]"
                      >
                        <option value="admin">Super Admin</option>
                        <option value="online_sales_manager">Online Sales Manager</option>
                        <option value="offline_sales_manager">Offline Sales Manager</option>
                        <option value="purchase_manager">Purchase Manager</option>
                      </select>

                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        member.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-stone-100 text-stone-500'
                      }`}>
                        {member.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Selected Member's Role & Permissions Matrix (1 col) */}
        {selectedMember && (
          <div className="space-y-4">
            <div className="bg-white rounded-3xl border border-[#F5E5B5] p-6 shadow-xs space-y-5">
              <div className="border-b border-stone-100 pb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                  Role & Permission Assignment
                </span>
                <h3 className="font-serif-luxury font-bold text-lg text-[#3D2206] mt-0.5">
                  {selectedMember.name}
                </h3>
                <p className="text-xs text-stone-500">{selectedMember.email}</p>
              </div>

              {/* Role Selection Box */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 block">
                  Assigned Manager Role:
                </label>
                <select
                  value={selectedMember.role}
                  onChange={(e) => handleRoleChange(selectedMember.id, e.target.value)}
                  className="w-full bg-[#FAF6EE] border border-stone-300 rounded-xl px-3 py-2 text-xs font-bold text-stone-900 focus:outline-hidden focus:border-[#D89816]"
                >
                  <option value="admin">👑 Super Administrator (Full Suite)</option>
                  <option value="online_sales_manager">🌐 Online Sales Manager (Web & Courier)</option>
                  <option value="offline_sales_manager">🏢 Offline Sales Manager (B2B & Wholesale)</option>
                  <option value="purchase_manager">📦 Purchase Manager (Raw Honey & Jars)</option>
                </select>
                <p className="text-[10px] text-stone-400">
                  Changing the role automatically loads tailored defaults and enables the corresponding Manager Dashboard.
                </p>
              </div>

              {/* Granular Permissions Matrix */}
              <div className="space-y-2 pt-2 border-t border-stone-100">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                  Granular Module Permissions:
                </span>

                <div className="space-y-2 text-xs">
                  {[
                    { key: 'viewAnalytics', label: 'View Analytics & Revenue Dashboards' },
                    { key: 'manageProducts', label: 'Product Inventory (Add/Edit Honey)' },
                    { key: 'manageOrders', label: 'Order Management (Dispatch & Status)' },
                    { key: 'manageWholesale', label: 'Wholesale & B2B Invoices' },
                    { key: 'manageRawMaterials', label: 'Raw Honey Barrels & Jars' },
                    { key: 'manageCoupons', label: 'Discounts & Promo Codes' },
                    { key: 'moderateReviews', label: 'Moderate Customer Reviews' },
                    { key: 'manageTeam', label: 'Team & Role Assignments' },
                    { key: 'manageSettings', label: 'Tax, Shipping & Payment Settings' },
                  ].map(({ key, label }) => {
                    const isGranted = selectedMember.permissions[key];
                    return (
                      <label
                        key={key}
                        onClick={() => handlePermissionToggle(key)}
                        className="flex items-center justify-between p-2 rounded-xl hover:bg-stone-50 cursor-pointer border border-transparent hover:border-stone-200 transition-all"
                      >
                        <span className="text-stone-800 font-medium text-xs">{label}</span>
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                            isGranted ? 'bg-[#D89816] text-stone-950 font-bold' : 'bg-stone-200 text-stone-400'
                          }`}
                        >
                          {isGranted ? <Check className="w-3.5 h-3.5" /> : null}
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100">
                <button
                  onClick={() => showToast(`Permissions updated for ${selectedMember.name}!`, 'success')}
                  className="w-full bg-[#D89816] hover:bg-[#B87A0B] text-stone-950 font-bold text-xs uppercase tracking-wider py-3 rounded-xl shadow-xs transition-all"
                >
                  Save Permission Matrix
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Invite Member Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-[#F5E5B5] shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-serif-luxury font-bold text-xl text-[#3D2206]">
                Invite New Team Member
              </h3>
              <button
                onClick={() => setShowInviteModal(false)}
                className="text-stone-400 hover:text-stone-700 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleInviteSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  placeholder="e.g. Liam Sterling"
                  className="w-full bg-[#FCF9F2] border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-800 focus:outline-hidden focus:border-[#D89816]"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Work Email Address</label>
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="e.g. liam@haruvirugold.com"
                  className="w-full bg-[#FCF9F2] border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-800 focus:outline-hidden focus:border-[#D89816]"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Select Role</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full bg-[#FCF9F2] border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-800 focus:outline-hidden focus:border-[#D89816]"
                >
                  <option value="online_sales_manager">Online Sales Manager (Web Traffic, Courier)</option>
                  <option value="offline_sales_manager">Offline Sales Manager (Wholesale, Freight B2B)</option>
                  <option value="purchase_manager">Purchase Manager (Raw Honey & Jars)</option>
                  <option value="admin">Super Administrator</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Department</label>
                <input
                  type="text"
                  value={inviteDept}
                  onChange={(e) => setInviteDept(e.target.value)}
                  className="w-full bg-[#FCF9F2] border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-800 focus:outline-hidden focus:border-[#D89816]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="px-4 py-2 rounded-xl border border-stone-300 text-stone-600 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#D89816] hover:bg-[#B87A0B] text-stone-950 font-bold px-6 py-2 rounded-xl shadow-xs"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
