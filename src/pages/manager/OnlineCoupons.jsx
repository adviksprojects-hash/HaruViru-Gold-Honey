import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Percent, 
  Plus, 
  Tag, 
  Sparkles, 
  Check, 
  Globe
} from 'lucide-react';

export const OnlineCoupons = () => {
  const { coupons, addCoupon, toggleCouponStatus } = useApp();
  
  const [showModal, setShowModal] = useState(false);
  const [code, setCode] = useState('');
  const [val, setVal] = useState(15);
  const [minOrder, setMinOrder] = useState(50);

  const onlineCoupons = coupons.filter(c => c.applicableChannel === 'online' || c.applicableChannel === 'all');

  const handleCreate = (e) => {
    e.preventDefault();
    if (!code) return;

    addCoupon({
      code: code.trim().toUpperCase(),
      discountType: 'percentage',
      discountValue: val,
      minOrderValue: minOrder,
      applicableChannel: 'online',
      expiryDate: '2026-12-31',
      usageLimit: 500,
      status: 'active'
    });

    setShowModal(false);
    setCode('');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 block mb-1">
            Conversion Triggers
          </span>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#3D2206]">
            Discounts & Coupons (Web Promo Codes)
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Manage discount vouchers, flash sale banner banners, and cart checkout incentives.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-[#D89816] hover:bg-[#B87A0B] text-stone-950 font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Web Promo Code</span>
        </button>
      </div>

      {/* Grid of Active Web Coupons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {onlineCoupons.map((cp) => (
          <div
            key={cp.id}
            className="bg-white rounded-3xl border border-[#F5E5B5] p-6 shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono font-black text-lg text-amber-900 bg-[#FAF4E4] border border-[#F5E5B5] px-3 py-1 rounded-xl">
                {cp.code}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                cp.status === 'active' ? 'bg-emerald-50 text-emerald-800' : 'bg-stone-100 text-stone-500'
              }`}>
                {cp.status}
              </span>
            </div>

            <div className="space-y-1">
              <span className="font-serif-luxury text-2xl font-bold text-[#3D2206]">
                {cp.discountType === 'percentage' ? `${cp.discountValue}% OFF` : `₹${cp.discountValue} FLAT`}
              </span>
              <p className="text-xs text-stone-500">Minimum spend: ₹{cp.minOrderValue}</p>
            </div>

            <div className="pt-2 text-xs text-stone-500 space-y-1">
              <div className="flex justify-between text-[11px]">
                <span>Total Redemptions:</span>
                <span className="font-bold text-stone-800">{cp.usageCount} / {cp.usageLimit}</span>
              </div>
              <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#D89816] h-full rounded-full"
                  style={{ width: `${Math.min(100, (cp.usageCount / cp.usageLimit) * 100)}%` }}
                />
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
              <span className="text-[10px] text-stone-400">Expires: {cp.expiryDate}</span>
              <button
                onClick={() => toggleCouponStatus(cp.id)}
                className="text-xs font-bold text-blue-700 hover:underline"
              >
                {cp.status === 'active' ? 'Pause Code' : 'Activate Code'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-[#F5E5B5] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-serif-luxury font-bold text-lg text-[#3D2206]">
                Create Web Promo Code
              </h3>
              <button onClick={() => setShowModal(false)} className="text-stone-400 hover:text-stone-700">✕</button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">Code Name</label>
                <input
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="e.g. FLASH20"
                  className="w-full bg-[#FAF6EE] border border-stone-300 rounded-xl px-3.5 py-2 font-mono font-bold"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Percentage Off (%)</label>
                <input
                  type="number"
                  required
                  value={val}
                  onChange={(e) => setVal(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#FAF6EE] border border-stone-300 rounded-xl px-3.5 py-2"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Minimum Order (₹)</label>
                <input
                  type="number"
                  value={minOrder}
                  onChange={(e) => setMinOrder(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#FAF6EE] border border-stone-300 rounded-xl px-3.5 py-2"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl border border-stone-300 text-stone-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#D89816] text-stone-950 font-bold px-5 py-2 rounded-xl"
                >
                  Deploy Promo Code
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
