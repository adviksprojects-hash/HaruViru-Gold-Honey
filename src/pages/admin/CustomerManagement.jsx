import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Search, 
  Mail, 
  Crown, 
  Building2, 
  ShieldCheck, 
  Check, 
  Filter,
  Send,
  Sparkles
} from 'lucide-react';

export const CustomerManagement = () => {
  const { orders, distributors, showToast } = useApp();
  
  const [search, setSearch] = useState('');
  const [segment, setSegment] = useState('all');
  const [emailModalCustomer, setEmailModalCustomer] = useState(null);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');

  // Extract unique customers from orders
  const onlineCustomersMap = new Map();
  orders.forEach((o) => {
    if (!onlineCustomersMap.has(o.customerEmail)) {
      onlineCustomersMap.set(o.customerEmail, {
        id: o.customerEmail,
        name: o.customerName,
        email: o.customerEmail,
        phone: o.customerPhone,
        channel: o.channel,
        city: `${o.shippingAddress.city}, ${o.shippingAddress.state}`,
        totalOrders: 1,
        lifetimeValue: o.totalAmount,
        status: 'Active',
        tag: o.totalAmount > 100 ? 'VIP Gold Patron' : 'Retail Collector'
      });
    } else {
      const existing = onlineCustomersMap.get(o.customerEmail);
      existing.totalOrders += 1;
      existing.lifetimeValue += o.totalAmount;
      if (existing.lifetimeValue > 200) existing.tag = 'VIP Gold Patron';
    }
  });

  const onlineCustomerList = Array.from(onlineCustomersMap.values());

  // Also include wholesale B2B accounts
  const wholesaleAccounts = distributors.map(d => ({
    id: d.id,
    name: d.companyName,
    email: d.email,
    phone: d.phone,
    channel: 'wholesale',
    city: d.city,
    totalOrders: d.totalOrders || 4,
    lifetimeValue: d.lifetimeValue || 28000,
    status: d.status,
    tag: `${d.category} (Wholesale)`
  }));

  const allCustomers = [...onlineCustomerList, ...wholesaleAccounts];

  const filtered = allCustomers.filter((c) => {
    const matchesSearch = 
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase());

    if (segment === 'vip') return matchesSearch && c.tag.includes('VIP');
    if (segment === 'wholesale') return matchesSearch && c.channel === 'wholesale';
    return matchesSearch;
  });

  const handleSendEmail = (e) => {
    e.preventDefault();
    if (!emailSubject || !emailBody) return;

    showToast(`Email dispatched to ${emailModalCustomer?.name}!`, 'success');
    setEmailModalCustomer(null);
    setEmailSubject('');
    setEmailBody('');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B87A0B] block mb-1">
            CRM & Client Relationships
          </span>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#3D2206]">
            Customer & Account Directory
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Manage relationships with retail collectors, VIP patrons, and wholesale B2B distributor partners.
          </p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customers by name, email, city..."
            className="w-full bg-[#FAF6EE] border border-stone-300 rounded-xl pl-10 pr-3.5 py-2 text-xs text-stone-800 placeholder-stone-400 focus:outline-hidden focus:border-[#D89816]"
          />
        </div>

        <div className="flex items-center gap-2">
          {['all', 'vip', 'wholesale'].map((s) => (
            <button
              key={s}
              onClick={() => setSegment(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                segment === s
                  ? 'bg-[#D89816] text-stone-950 shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {s === 'all' && `All Clients (${allCustomers.length})`}
              {s === 'vip' && 'VIP Gold Patrons'}
              {s === 'wholesale' && 'Wholesale Accounts'}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#FAF6EE] border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Client / Account</th>
                <th className="py-3 px-3">Segment Tag</th>
                <th className="py-3 px-3">Channel</th>
                <th className="py-3 px-3">City / Location</th>
                <th className="py-3 px-3 text-center">Orders</th>
                <th className="py-3 px-3 text-right">Lifetime Value (LTV)</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.map((client) => (
                <tr key={client.id} className="hover:bg-[#FAF9F5] transition-colors">
                  
                  {/* Name & Email */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-700 text-stone-950 font-bold flex items-center justify-center text-xs">
                        {client.name.charAt(0)}
                      </div>
                      <div>
                        <span className="font-bold text-stone-900 block">{client.name}</span>
                        <span className="text-[10px] text-stone-400">{client.email}</span>
                      </div>
                    </div>
                  </td>

                  {/* Tag */}
                  <td className="py-3 px-3">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      client.tag.includes('VIP')
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : client.tag.includes('Wholesale')
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : 'bg-stone-100 text-stone-700'
                    }`}>
                      {client.tag}
                    </span>
                  </td>

                  {/* Channel */}
                  <td className="py-3 px-3">
                    <span className="text-[10px] text-stone-600 font-medium">
                      {client.channel === 'online' ? '🌐 Direct Web' : '🏢 B2B Commercial'}
                    </span>
                  </td>

                  {/* City */}
                  <td className="py-3 px-3 text-stone-600">
                    {client.city}
                  </td>

                  {/* Total Orders */}
                  <td className="py-3 px-3 text-center font-bold text-stone-800">
                    {client.totalOrders}
                  </td>

                  {/* LTV */}
                  <td className="py-3 px-3 text-right font-extrabold text-[#3D2206]">
                    ${client.lifetimeValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>

                  {/* Action */}
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setEmailModalCustomer({ name: client.name, email: client.email })}
                      className="p-1.5 text-stone-500 hover:text-amber-800 hover:bg-amber-50 rounded-lg transition-colors inline-flex items-center gap-1 text-[11px] font-semibold"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Message</span>
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Email Composer Modal */}
      {emailModalCustomer && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#F5E5B5] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-serif-luxury font-bold text-lg text-[#3D2206]">
                Message Client: {emailModalCustomer.name}
              </h3>
              <button
                onClick={() => setEmailModalCustomer(null)}
                className="text-stone-400 hover:text-stone-700 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendEmail} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">To Email</label>
                <input
                  type="text"
                  disabled
                  value={emailModalCustomer.email}
                  className="w-full bg-stone-100 border border-stone-300 rounded-xl px-3.5 py-2 text-stone-600"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="e.g. Exclusive Allocation: 2026 Himalayan Sidr Reserve"
                  className="w-full bg-[#FAF6EE] border border-stone-300 rounded-xl px-3.5 py-2 text-stone-800"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Message Content</label>
                <textarea
                  required
                  rows={4}
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  placeholder="Dear valued collector, we are pleased to inform you..."
                  className="w-full bg-[#FAF6EE] border border-stone-300 rounded-xl p-3 text-stone-800"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEmailModalCustomer(null)}
                  className="px-4 py-2 rounded-xl border border-stone-300 text-stone-600 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#D89816] hover:bg-[#B87A0B] text-stone-950 font-bold px-5 py-2 rounded-xl shadow-xs flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Direct Email</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
