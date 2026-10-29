import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Percent, 
  Plus, 
  Search, 
  Tag, 
  Calendar, 
  Check, 
  X, 
  Sparkles, 
  Layers
} from 'lucide-react';

export const CouponsManagement = () => {
  const { coupons, addCoupon, toggleCouponStatus, showToast } = useApp();
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [code, setCode] = useState('');
  const [discountType, setDiscountType] = useState('percentage');
  const [discountValue, setDiscountValue] = useState(15);
  const [minOrder, setMinOrder] = useState(50);
  const [maxDiscount, setMaxDiscount] = useState(30);
  const [channel, setChannel] = useState('online');
  const [expiry, setExpiry] = useState('2026-12-31');
  const [limit, setLimit] = useState(500);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!code) return;

    addCoupon({
      code: code.trim().toUpperCase(),
      discountType,
      discountValue,
      minOrderValue: minOrder,
      maxDiscount: discountType === 'percentage' ? maxDiscount : undefined,
      applicableChannel: channel,
      expiryDate: expiry,
      usageLimit: limit,
      status: 'active'
    });

    setShowAddModal(false);
    setCode('');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B87A0B] block mb-1">
            Marketing & Loyalty Incentives
          </span>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#3D2206]">
            Discounts & Promo Codes
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Create promotional codes for online D2C shoppers, seasonal harvest sales, and wholesale volume rebates.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#D89816] hover:bg-[#B87A0B] text-stone-950 font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Promo Code</span>
        </button>
      </div>

      {/* Coupons Table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#FAF6EE] border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Coupon Code</th>
                <th className="py-3 px-3">Discount Value</th>
                <th className="py-3 px-3">Min Order</th>
                <th className="py-3 px-3">Channel Scope</th>
                <th className="py-3 px-3">Usage Progress</th>
                <th className="py-3 px-3">Expiry Date</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {coupons.map((cp) => (
                <tr key={cp.id} className="hover:bg-[#FAF9F5] transition-colors">
                  
                  {/* Code */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                        <Tag className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-mono font-bold text-stone-900 text-xs">
                        {cp.code}
                      </span>
                    </div>
                  </td>

                  {/* Value */}
                  <td className="py-3.5 px-3">
                    <span className="font-extrabold text-[#3D2206] text-sm">
                      {cp.discountType === 'percentage' ? `${cp.discountValue}% OFF` : `₹${cp.discountValue} FLAT`}
                    </span>
                    {cp.maxDiscount && (
                      <span className="block text-[10px] text-stone-400">Max ₹${cp.maxDiscount}</span>
                    )}
                  </td>

                  {/* Min Order */}
                  <td className="py-3.5 px-3 text-stone-700 font-semibold">
                    ₹{cp.minOrderValue}
                  </td>

                  {/* Scope */}
                  <td className="py-3.5 px-3">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 uppercase">
                      {cp.applicableChannel}
                    </span>
                  </td>

                  {/* Usage */}
                  <td className="py-3.5 px-3">
                    <div className="w-32">
                      <div className="flex justify-between text-[10px] text-stone-500 mb-1">
                        <span>{cp.usageCount} uses</span>
                        <span>{cp.usageLimit} max</span>
                      </div>
                      <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[#D89816] h-full rounded-full"
                          style={{ width: `${Math.min(100, (cp.usageCount / cp.usageLimit) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Expiry */}
                  <td className="py-3.5 px-3 text-stone-600 font-medium">
                    {cp.expiryDate}
                  </td>

                  {/* Status Toggle */}
                  <td className="py-3.5 px-3 text-center">
                    <button
                      onClick={() => toggleCouponStatus(cp.id)}
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border transition-all ${
                        cp.status === 'active'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : 'bg-stone-100 text-stone-500 border-stone-300'
                      }`}
                    >
                      {cp.status === 'active' ? 'Active' : 'Disabled'}
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => toggleCouponStatus(cp.id)}
                      className="text-xs text-[#8F5808] hover:underline font-bold"
                    >
                      {cp.status === 'active' ? 'Disable' : 'Enable'}
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-[#F5E5B5] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-serif-luxury font-bold text-lg text-[#3D2206]">
                Create New Promo Code
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-stone-400 hover:text-stone-700 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">Coupon Code (Uppercase)</label>
                <input
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="e.g. AUTUMN25"
                  className="w-full bg-[#FAF6EE] border border-stone-300 rounded-xl px-3.5 py-2.5 font-mono font-bold text-stone-900 tracking-wider"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Discount Type</label>
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value)}
                    className="w-full bg-[#FAF6EE] border border-stone-300 rounded-xl px-3 py-2 text-stone-800"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Rupee (₹)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Discount Value</label>
                  <input
                    type="number"
                    required
                    value={discountValue}
                    onChange={(e) => setDiscountValue(parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#FAF6EE] border border-stone-300 rounded-xl px-3 py-2 text-stone-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Minimum Order (₹)</label>
                  <input
                    type="number"
                    value={minOrder}
                    onChange={(e) => setMinOrder(parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#FAF6EE] border border-stone-300 rounded-xl px-3 py-2 text-stone-800"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Max Cap (₹ if %)</label>
                  <input
                    type="number"
                    value={maxDiscount || ''}
                    onChange={(e) => setMaxDiscount(parseFloat(e.target.value) || undefined)}
                    placeholder="Optional"
                    className="w-full bg-[#FAF6EE] border border-stone-300 rounded-xl px-3 py-2 text-stone-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Channel Scope</label>
                  <select
                    value={channel}
                    onChange={(e) => setChannel(e.target.value)}
                    className="w-full bg-[#FAF6EE] border border-stone-300 rounded-xl px-3 py-2 text-stone-800"
                  >
                    <option value="online">Online Web Only</option>
                    <option value="wholesale">Wholesale B2B Only</option>
                    <option value="all">All Channels</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Usage Limit</label>
                  <input
                    type="number"
                    value={limit}
                    onChange={(e) => setLimit(parseInt(e.target.value) || 100)}
                    className="w-full bg-[#FAF6EE] border border-stone-300 rounded-xl px-3 py-2 text-stone-800"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Expiry Date</label>
                <input
                  type="date"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  className="w-full bg-[#FAF6EE] border border-stone-300 rounded-xl px-3.5 py-2 text-stone-800"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-stone-300 text-stone-600 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#D89816] hover:bg-[#B87A0B] text-stone-950 font-bold px-5 py-2 rounded-xl shadow-xs"
                >
                  Create Code
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
