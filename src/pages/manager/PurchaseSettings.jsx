import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Settings, 
  Truck, 
  IndianRupee, 
  Boxes, 
  Clock, 
  ShieldCheck, 
  Save, 
  Building2, 
  CheckCircle2
} from 'lucide-react';

export const PurchaseSettings = () => {
  const { showToast } = useApp();

  const [honeyFreightRate, setHoneyFreightRate] = useState(45); // ₹/kg for refrigerated mountain truck
  const [glassFreightRate, setGlassFreightRate] = useState(5); // ₹/unit for ocean container from Italy
  const [siloColdStorageCost, setSiloColdStorageCost] = useState(25000); // ₹/month
  const [moqDrums, setMoqDrums] = useState(500); // kg

  const suppliers = [
    {
      name: 'Al-Doani Apiary Co-op & Highland Harvesters',
      category: 'Raw Sidr Mountain Honey (Drums)',
      location: 'Wadi Doan / Highland Valleys',
      leadTime: '18 Days (Temperature-controlled maritime & truck)',
      rating: '4.95 / 5.0 (NMR certified)',
      inboundCost: '₹45 / kg'
    },
    {
      name: 'Alpine Valley Beekeepers Guild',
      category: 'Wildflower & Acacia Raw Honey',
      location: 'Himalayan Foothills Sanctuary',
      leadTime: '5 Days (Direct refrigerated road freight)',
      rating: '4.90 / 5.0 (Cold extracted)',
      inboundCost: '₹25 / kg'
    },
    {
      name: 'Veritas Italian Luxury Glassworks',
      category: 'Hexagonal Flint Glass Jars (500g & 1kg)',
      location: 'Venice, Italy',
      leadTime: '28 Days (Ocean freight & custom container)',
      rating: '4.98 / 5.0 (Heavy flint glass)',
      inboundCost: '₹5 / jar'
    },
    {
      name: 'Crown Seal & Cap Packaging Ltd.',
      category: 'Gold Honeycomb Embossed Metal Lug Caps',
      location: 'Sheffield, UK',
      leadTime: '14 Days (Air freight)',
      rating: '4.85 / 5.0 (Food-grade plastisol liner)',
      inboundCost: '₹1 / cap'
    }
  ];

  const handleSave = (e) => {
    e.preventDefault();
    showToast('Supplier shipping & inbound freight parameters saved!', 'success');
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-rose-600 block mb-1">
            Procurement Logistics & Landed Cost
          </span>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#3D2206]">
            Settings (Supplier Shipping & Inbound Freight Cost)
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Calculate landed unit costs including cold-chain mountain freight, maritime container shipping, and supplier lead times.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="bg-[#D89816] hover:bg-[#B87A0B] text-stone-950 font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Save Freight Parameters</span>
        </button>
      </div>

      {/* Inbound Freight Parameters Form */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
          <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif-luxury font-bold text-lg text-[#3D2206]">
              Inbound Freight & Landing Cost Formulas
            </h3>
            <p className="text-xs text-stone-500">Factors added to raw material unit costs to calculate COGS.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          <div>
            <label className="font-semibold text-stone-700 block mb-1">
              Raw Honey Freight (₹/kg)
            </label>
            <input
              type="number"
              step="1"
              value={honeyFreightRate}
              onChange={(e) => setHoneyFreightRate(parseFloat(e.target.value) || 0)}
              className="w-full bg-[#FAF6EE] border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-800"
            />
            <p className="text-[10px] text-stone-400 mt-1">Refrigerated mountain transport</p>
          </div>

          <div>
            <label className="font-semibold text-stone-700 block mb-1">
              Glass Jars Freight (₹/unit)
            </label>
            <input
              type="number"
              step="1"
              value={glassFreightRate}
              onChange={(e) => setGlassFreightRate(parseFloat(e.target.value) || 0)}
              className="w-full bg-[#FAF6EE] border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-800"
            />
            <p className="text-[10px] text-stone-400 mt-1">Ocean container & breakage buffer</p>
          </div>

          <div>
            <label className="font-semibold text-stone-700 block mb-1">
              Silo Bay Cold Storage Energy (₹/mo)
            </label>
            <input
              type="number"
              value={siloColdStorageCost}
              onChange={(e) => setSiloColdStorageCost(parseFloat(e.target.value) || 0)}
              className="w-full bg-[#FAF6EE] border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-800"
            />
            <p className="text-[10px] text-stone-400 mt-1">Constant 18°C temperature stabilization</p>
          </div>

          <div>
            <label className="font-semibold text-stone-700 block mb-1">
              Honey Minimum MOQ (kg)
            </label>
            <input
              type="number"
              value={moqDrums}
              onChange={(e) => setMoqDrums(parseInt(e.target.value) || 0)}
              className="w-full bg-[#FAF6EE] border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-800"
            />
            <p className="text-[10px] text-stone-400 mt-1">Batch barrel purchase order threshold</p>
          </div>
        </div>
      </div>

      {/* Supplier Directory with Lead Times */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif-luxury font-bold text-lg text-[#3D2206]">
              Certified Apiary & Packaging Supplier Roster
            </h3>
            <p className="text-xs text-stone-500">Track supplier reliability, shipping lead times, and freight landing tariffs.</p>
          </div>
        </div>

        <div className="space-y-4">
          {suppliers.map((s, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#FAF9F5] border border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-stone-900">{s.name}</span>
                  <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-stone-100 text-stone-700">
                    {s.location}
                  </span>
                </div>
                <p className="text-stone-600 font-medium">{s.category}</p>
                <div className="flex flex-wrap items-center gap-3 text-stone-500 text-[11px] pt-0.5">
                  <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Quality: {s.rating}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Lead Time: {s.leadTime}</span>
                  </span>
                </div>
              </div>

              <div className="text-right sm:border-l sm:pl-6 border-stone-200 shrink-0">
                <span className="text-[10px] font-bold text-stone-400 block uppercase">Inbound Tariff</span>
                <span className="font-bold text-sm text-[#3D2206]">{s.inboundCost}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
