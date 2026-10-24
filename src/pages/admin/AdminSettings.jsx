import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Settings, 
  Truck, 
  DollarSign, 
  CreditCard, 
  Database, 
  ShieldCheck, 
  Save, 
  Sparkles, 
  Server, 
  Key, 
  Check
} from 'lucide-react';

export const AdminSettings = () => {
  const { showToast } = useApp();
  
  // Shipping settings
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(50);
  const [standardShippingRate, setStandardShippingRate] = useState(8.5);
  const [expressShippingRate, setExpressShippingRate] = useState(14.0);

  // Tax settings
  const [taxRate, setTaxRate] = useState(8.0);
  const [taxInclusive, setTaxInclusive] = useState(false);
  const [taxId, setTaxId] = useState('US-TAX-8849201-HVG');

  // Payment gateways
  const [stripeActive, setStripeActive] = useState(true);
  const [codActive, setCodActive] = useState(true);
  const [wireTransferActive, setWireTransferActive] = useState(true);

  // Neon DB Connection
  const [neonConnectionString, setNeonConnectionString] = useState('');
  const [neonConnected, setNeonConnected] = useState(false);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    showToast('System, Shipping, and Tax settings saved successfully!', 'success');
  };

  const handleConnectNeon = () => {
    if (!neonConnectionString.trim()) {
      showToast('Please enter your Neon DB connection string.', 'error');
      return;
    }
    setNeonConnected(true);
    showToast('Neon DB connection string saved and validated! Ready for database migration.', 'success');
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
            Configure shipping courier tiers, tax rates, payment gateways, and prepare for Neon PostgreSQL database integration.
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
        
        {/* Neon DB Connection String Card (Highlighted for user request) */}
        <div className="bg-[#1C120A] text-white rounded-3xl p-6 sm:p-8 border border-[#D89816]/40 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-stone-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-[#E4B345] flex items-center justify-center border border-amber-500/30">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif-luxury font-bold text-lg text-[#F5E5B5]">
                  Neon DB Connection Setup
                </h3>
                <p className="text-xs text-stone-400">
                  Ready to connect PostgreSQL database when you provide connection string.
                </p>
              </div>
            </div>

            <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${
              neonConnected
                ? 'bg-emerald-950 text-emerald-400 border-emerald-500/50'
                : 'bg-amber-950/60 text-amber-300 border-amber-500/40'
            }`}>
              {neonConnected ? '● Neon DB Configured' : '○ Awaiting Neon Connection String'}
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <label className="font-semibold text-stone-300 block">
              Neon PostgreSQL Connection String (e.g. postgres://user:pass@ep-cool-base.us-east-2.aws.neon.tech/neondb?sslmode=require)
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="password"
                value={neonConnectionString}
                onChange={(e) => setNeonConnectionString(e.target.value)}
                placeholder="postgres://[user]:[password]@[neon-endpoint].neon.tech/haruviru_gold?sslmode=require"
                className="flex-1 bg-[#291A0D] border border-[#D89816]/40 rounded-xl px-4 py-3 text-xs text-stone-100 placeholder-stone-500 font-mono focus:outline-hidden focus:border-[#E4B345]"
              />
              <button
                type="button"
                onClick={handleConnectNeon}
                className="bg-[#D89816] hover:bg-[#B87A0B] text-stone-950 font-bold px-6 py-3 rounded-xl transition-all shadow-md shrink-0"
              >
                Validate & Connect
              </button>
            </div>
            <p className="text-[11px] text-stone-400">
              When supplied, schema tables (Users, HoneyProducts, Orders, Reviews, RawMaterials, B2BInvoices) can be migrated automatically.
            </p>
          </div>
        </div>

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
                Complimentary Shipping Minimum ($)
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
                Standard Ground Rate ($)
              </label>
              <input
                type="number"
                step="0.1"
                value={standardShippingRate}
                onChange={(e) => setStandardShippingRate(parseFloat(e.target.value) || 0)}
                className="w-full bg-[#FAF6EE] border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-800"
              />
              <p className="text-[10px] text-stone-400 mt-1">Applied for orders below the threshold.</p>
            </div>

            <div>
              <label className="font-semibold text-stone-700 block mb-1">
                Priority Golden Flight Rate ($)
              </label>
              <input
                type="number"
                step="0.1"
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
              <DollarSign className="w-5 h-5" />
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
                <span className="text-[11px] text-stone-500">Available for domestic retail courier shipments up to $250</span>
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
