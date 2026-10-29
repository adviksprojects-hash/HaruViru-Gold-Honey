import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  Boxes, 
  TrendingDown, 
  AlertTriangle, 
  Package, 
  Truck, 
  Settings, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Droplet
} from 'lucide-react';

export const PurchaseDashboard = () => {
  const { rawMaterials, products } = useApp();

  const lowStockMaterials = rawMaterials.filter(m => m.currentStock <= m.minThreshold);
  const lowStockHoneyProducts = products.filter(p => p.stock <= p.lowStockThreshold);

  const totalRawHoneyKg = rawMaterials
    .filter(m => m.category === 'Raw Honey Drums')
    .reduce((acc, m) => acc + m.currentStock, 0);

  const totalInventoryValue = rawMaterials.reduce((acc, m) => acc + (m.currentStock * m.unitCost), 0);

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-rose-600 block mb-1">
            Procurement & Supply Chain
          </span>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#3D2206]">
            Purchase Manager Dashboard
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Real-time tracking of COGS, bulk raw honey drums, Italian glass jars, and inbound freight logistics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/manager/purchase/raw-materials"
            className="bg-[#D89816] hover:bg-[#B87A0B] text-stone-950 font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-1.5"
          >
            <Package className="w-4 h-4" />
            <span>Raw Materials Inventory</span>
          </Link>
        </div>
      </div>

      {/* Critical Stock Alert Banner */}
      {(lowStockMaterials.length > 0 || lowStockHoneyProducts.length > 0) && (
        <div className="bg-rose-50 border border-rose-300 p-4 rounded-2xl flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
            <div>
              <span className="font-bold text-rose-900 block">
                Procurement Alert: {lowStockMaterials.length} Raw Materials & {lowStockHoneyProducts.length} Packaged SKUs Below Reorder Threshold!
              </span>
              <span className="text-stone-600">
                Action required: Issue Purchase Order for {lowStockMaterials.map(m => m.name).join(', ')}.
              </span>
            </div>
          </div>
          <Link
            to="/manager/purchase/raw-materials"
            className="shrink-0 bg-rose-600 hover:bg-rose-700 text-white font-bold px-3 py-1.5 rounded-lg transition-all"
          >
            Reorder Stock
          </Link>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase">Raw Honey In Silos</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Droplet className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="font-serif-luxury text-2xl sm:text-3xl font-extrabold text-[#3D2206]">
              {totalRawHoneyKg.toLocaleString()} kg
            </span>
            <p className="text-[11px] text-emerald-700 font-semibold mt-1">Silo Bay A & B (18°C Controlled)</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase">Procurement Asset Value</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Boxes className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="font-serif-luxury text-2xl sm:text-3xl font-extrabold text-[#3D2206]">
              ${totalInventoryValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <p className="text-[11px] text-stone-500 mt-1">Raw barrels, glass jars & lids</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase">Avg COGS per 500g Jar</span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <TrendingDown className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="font-serif-luxury text-2xl sm:text-3xl font-extrabold text-[#3D2206]">
              ₹485.00
            </span>
            <p className="text-[11px] text-emerald-700 font-semibold mt-1">Target margin: 68.4% gross profit</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase">Reorder Alerts</span>
            <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="font-serif-luxury text-2xl sm:text-3xl font-extrabold text-rose-700">
              {lowStockMaterials.length} Items
            </span>
            <p className="text-[11px] text-rose-800 font-semibold mt-1">Needs procurement PO</p>
          </div>
        </div>

      </div>

      {/* Raw Materials Status & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Raw Inventory Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div>
              <h3 className="font-serif-luxury font-bold text-base text-[#3D2206]">
                Raw Honey Barrels, Jars & Packaging Reserves
              </h3>
              <p className="text-[11px] text-stone-400">Inventory warehouse stock status</p>
            </div>
            <Link to="/manager/purchase/raw-materials" className="text-xs font-bold text-rose-700 hover:underline">
              Inspect All Batches →
            </Link>
          </div>

          <div className="divide-y divide-stone-100">
            {rawMaterials.map((mat) => {
              const isLow = mat.currentStock <= mat.minThreshold;
              return (
                <div key={mat.id} className="py-3.5 flex items-center justify-between gap-4 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-900">{mat.name}</span>
                      <span className="font-mono text-[10px] text-stone-400">({mat.code})</span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      Supplier: {mat.supplier} • Unit Cost: ${mat.unitCost}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="font-mono font-bold text-stone-900 text-sm block">
                      {mat.currentStock} {mat.unit}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full inline-block ${
                      isLow ? 'bg-red-50 text-red-700 border border-red-300' : 'bg-emerald-50 text-emerald-700'
                    }`}>
                      {mat.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Purchase Actions & Freight */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div className="border-b border-stone-100 pb-3">
            <h3 className="font-serif-luxury font-bold text-base text-[#3D2206]">
              Procurement Controls
            </h3>
            <p className="text-[11px] text-stone-400">Inbound logistics & suppliers</p>
          </div>

          <div className="space-y-2.5">
            <Link
              to="/manager/purchase/raw-materials"
              className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FCF9F2] hover:bg-[#F5E5B5]/60 border border-[#F5E5B5] transition-all text-xs font-bold text-[#643B08]"
            >
              <div className="flex items-center gap-2.5">
                <Boxes className="w-4 h-4 text-amber-600" />
                <span>Raw Materials & Batch Tracking</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              to="/manager/purchase/settings"
              className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-50 hover:bg-stone-100 border border-stone-200 transition-all text-xs font-bold text-stone-800"
            >
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-rose-600" />
                <span>Supplier Freight & Inbound Cost</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-1">
              <span className="font-bold block">Next Harvest Delivery Expected</span>
              <p className="text-[11px] text-stone-700">
                1,500 kg Sidr Honey shipment departing Doan Valley depot on Nov 4, 2026.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
