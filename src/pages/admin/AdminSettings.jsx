import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Settings, 
  Truck, 
  IndianRupee, 
  CreditCard, 
  Save, 
  Check
} from 'lucide-react';

export const AdminSettings = () => {
  const { showToast } = useApp();
  
  // Shipping settings
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(999);
  const [standardShippingRate, setStandardShippingRate] = useState(99);
  const [expressShippingRate, setExpressShippingRate] = useState(149);

  // Tax settings
  const [taxRate, setTaxRate] = useState(5.0);
  const [taxInclusive, setTaxInclusive] = useState(false);
  const [taxId, setTaxId] = useState('GSTIN27AABCH1234F1Z8');

  // Payment gateways
  const [stripeActive, setStripeActive] = useState(true);
  const [codActive, setCodActive] = useState(true);
  const [wireTransferActive, setWireTransferActive] = useState(true);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    showToast('System, Shipping, and Tax settings saved successfully!', 'success');
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B87A0B] block mb-1">
            System Infrastructure & Policies
          </span>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#3D2206]">
            Settings (Shipping, Tax, & Payment)
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Configure shipping courier tiers, tax rates, and payment gateways.
          </p>
        </div>

        <button
          onClick={handleSaveSettings}
          className="bg-[#D89816] hover:bg-[#B87A0B] text-stone-950 font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Save All Settings</span>
        </button>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-8">
        
        {/* 1. Shipping Settings */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-luxury font-bold text-lg text-[#3D2206]">
                Cold-Chain & Courier Shipping Rates
              </h3>
              <p className="text-xs text-stone-500">Configure free shipping thresholds and priority dispatch.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
            <div>
              <label className="font-semibold text-stone-700 block mb-1">
                Complimentary Shipping Minimum (₹)
              </label>
              <input
                type="number"
                value={freeShippingThreshold}
                onChange={(e) => setFreeShippingThreshold(parseFloat(e.target.value) || 0)}
                className="w-full bg-[#FAF6EE] border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-800"
              />
              <p className="text-[10px] text-stone-400 mt-1">Orders at or above this threshold receive free courier.</p>
            </div>

            <div>
              <label className="font-semibold text-stone-700 block mb-1">
                Standard Ground Rate (₹)
              </label>
              <input
                type="number"
                step="1"
                value={standardShippingRate}
                onChange={(e) => setStandardShippingRate(parseFloat(e.target.value) || 0)}
                className="w-full bg-[#FAF6EE] border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-800"
              />
              <p className="text-[10px] text-stone-400 mt-1">Applied for orders below the threshold.</p>
            </div>

            <div>
              <label className="font-semibold text-stone-700 block mb-1">
                Priority Golden Flight Rate (₹)
              </label>
              <input
                type="number"
                step="1"
                value={expressShippingRate}
                onChange={(e) => setExpressShippingRate(parseFloat(e.target.value) || 0)}
                className="w-full bg-[#FAF6EE] border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-800"
              />
              <p className="text-[10px] text-stone-400 mt-1">1-2 day express cold-pack air dispatch.</p>
            </div>
          </div>
        </div>

        {/* 2. Tax Configuration */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <IndianRupee className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-luxury font-bold text-lg text-[#3D2206]">
                Tax & VAT Jurisdictions
              </h3>
              <p className="text-xs text-stone-500">Configure sales tax rates and registration certificates.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div>
              <label className="font-semibold text-stone-700 block mb-1">
                Standard Sales Tax Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={taxRate}
                onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                className="w-full bg-[#FAF6EE] border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-800"
              />
            </div>

            <div>
              <label className="font-semibold text-stone-700 block mb-1">
                Store Tax Registration / GSTIN
              </label>
              <input
                type="text"
                value={taxId}
                onChange={(e) => setTaxId(e.target.value)}
                className="w-full bg-[#FAF6EE] border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-800 font-mono"
              />
            </div>
          </div>
        </div>

        {/* 3. Payment Gateway Toggles */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-luxury font-bold text-lg text-[#3D2206]">
                Payment Gateways
              </h3>
              <p className="text-xs text-stone-500">Toggle active checkout payment methods for consumer and commercial buyers.</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-50 border border-stone-200 cursor-pointer">
              <div>
                <span className="font-bold text-stone-900 block">Stripe / Credit & Debit Cards</span>
                <span className="text-[11px] text-stone-500">Accepts Visa, Mastercard, American Express with 3D Secure</span>
              </div>
              <input
                type="checkbox"
                checked={stripeActive}
                onChange={(e) => setStripeActive(e.target.checked)}
                className="w-5 h-5 accent-amber-600 rounded-md"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-50 border border-stone-200 cursor-pointer">
              <div>
                <span className="font-bold text-stone-900 block">Bank Wire Transfer (Net 30/60 for Wholesale)</span>
                <span className="text-[11px] text-stone-500">Required for B2B pallet purchase orders and bulk distributor accounts</span>
              </div>
              <input
                type="checkbox"
                checked={wireTransferActive}
                onChange={(e) => setWireTransferActive(e.target.checked)}
                className="w-5 h-5 accent-amber-600 rounded-md"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-50 border border-stone-200 cursor-pointer">
              <div>
                <span className="font-bold text-stone-900 block">Cash On Delivery (COD)</span>
                <span className="text-[11px] text-stone-500">Available for domestic retail courier shipments up to ₹5,000</span>
              </div>
              <input
                type="checkbox"
                checked={codActive}
                onChange={(e) => setCodActive(e.target.checked)}
                className="w-5 h-5 accent-amber-600 rounded-md"
              />
            </label>
          </div>
        </div>

      </form>

    </div>
  );
};
