import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Search, 
  Globe, 
  Mail, 
  Sparkles, 
  Crown, 
  ShoppingBag, 
  Send
} from 'lucide-react';

export const OnlineCustomers = () => {
  const { orders, showToast } = useApp();
  const [search, setSearch] = useState('');

  const onlineOrders = orders.filter(o => o.channel === 'online');

  // Group online users
  const customerMap = new Map();
  onlineOrders.forEach(o => {
    if (!customerMap.has(o.customerEmail)) {
      customerMap.set(o.customerEmail, {
        name: o.customerName,
        email: o.customerEmail,
        phone: o.customerPhone,
        city: `${o.shippingAddress.city}, ${o.shippingAddress.state}`,
        ordersCount: 1,
        totalSpend: o.totalAmount,
        lastOrderDate: o.date,
        tier: o.totalAmount > 120 ? 'Gold Hive VIP' : 'Silver Collector'
      });
    } else {
      const c = customerMap.get(o.customerEmail);
      c.ordersCount += 1;
      c.totalSpend += o.totalAmount;
      if (c.totalSpend > 200) c.tier = 'Gold Hive VIP';
    }
  });

  const onlineCustomers = Array.from(customerMap.values());

  const filtered = onlineCustomers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 block mb-1">
          D2C Shopper Intelligence
        </span>
        <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#3D2206]">
          Customer Management (Online Users)
        </h1>
        <p className="text-xs text-stone-500 mt-0.5">
          Directory of registered online consumers, cart abandoners, newsletter subscribers, and VIP collectors.
        </p>
      </div>

      {/* Filter toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex items-center justify-between">
        <div className="relative w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search online users by name, email..."
            className="w-full bg-[#FAF6EE] border border-stone-300 rounded-xl pl-10 pr-3.5 py-2 text-xs text-stone-800 focus:outline-hidden focus:border-[#D89816]"
          />
        </div>
        <span className="text-xs font-semibold text-stone-500">{filtered.length} Registered Web Collectors</span>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#FAF6EE] border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Shopper Name</th>
                <th className="py-3 px-3">Email Address</th>
                <th className="py-3 px-3">City / Delivery Hub</th>
                <th className="py-3 px-3">Loyalty Tier</th>
                <th className="py-3 px-3 text-center">Web Orders</th>
                <th className="py-3 px-3 text-right">Lifetime Spend</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.map((user, idx) => (
                <tr key={idx} className="hover:bg-[#FAF9F5] transition-colors">
                  
                  <td className="py-3.5 px-4 font-bold text-stone-900">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-xs">
                        {user.name.charAt(0)}
                      </div>
                      <span>{user.name}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-3 text-stone-600">
                    {user.email}
                  </td>

                  <td className="py-3.5 px-3 text-stone-600">
                    {user.city}
                  </td>

                  <td className="py-3.5 px-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                      {user.tier}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 text-center font-bold text-stone-800">
                    {user.ordersCount}
                  </td>

                  <td className="py-3.5 px-3 text-right font-extrabold text-[#3D2206]">
                    ${user.totalSpend.toFixed(2)}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => showToast(`Sent reward voucher email to ${user.email}!`, 'success')}
                      className="text-[11px] font-bold text-blue-700 hover:underline"
                    >
                      Send Promo
                    </button>
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
