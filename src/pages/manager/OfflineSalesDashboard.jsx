import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  TrendingUp, 
  DollarSign, 
  Truck, 
  Users, 
  FileText, 
  ArrowUpRight, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck
} from 'lucide-react';

export const OfflineSalesDashboard = () => {
  const { orders, distributors } = useApp();

  const wholesaleOrders = orders.filter(o => o.channel === 'wholesale');
  const wholesaleRevenue = wholesaleOrders.reduce((acc, o) => acc + o.totalAmount, 0);
  const totalReceivables = distributors.reduce((acc, d) => acc + d.outstandingBalance, 0);

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 block mb-1">
            B2B Commercial & Institutional Sales
          </span>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#3D2206]">
            Offline Sales Manager Dashboard
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Monitor wholesale volume, corporate gifting pipelines, freight logistics, and retailer credit terms.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/manager/offline-sales/orders"
            className="bg-[#D89816] hover:bg-[#B87A0B] text-stone-950 font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-1.5"
          >
            <FileText className="w-4 h-4" />
            <span>Generate B2B Invoice</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase">Wholesale Revenue</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="font-serif-luxury text-2xl sm:text-3xl font-extrabold text-[#3D2206]">
              ${wholesaleRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <p className="text-[11px] text-emerald-700 font-semibold mt-1">+31.5% quarter-over-quarter</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase">Retail Distributors</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="font-serif-luxury text-2xl sm:text-3xl font-extrabold text-[#3D2206]">
              {distributors.length}
            </span>
            <p className="text-[11px] text-stone-500 mt-1">Supermarkets, boutique resorts & clinics</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase">Accounts Receivable</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="font-serif-luxury text-2xl sm:text-3xl font-extrabold text-[#3D2206]">
              ${totalReceivables.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <p className="text-[11px] text-amber-800 font-semibold mt-1">Under standard Net 30/60 terms</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase">Pallet Freight Loads</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="font-serif-luxury text-2xl sm:text-3xl font-extrabold text-[#3D2206]">
              12 Pallets
            </span>
            <p className="text-[11px] text-stone-500 mt-1">Dispatched this quarter</p>
          </div>
        </div>

      </div>

      {/* Distributors Directory & B2B Orders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Active Commercial Retailers */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div>
              <h3 className="font-serif-luxury font-bold text-base text-[#3D2206]">
                Premier Retail Distributors & Hotel Partners
              </h3>
              <p className="text-[11px] text-stone-400">Directory of wholesale client accounts</p>
            </div>
            <Link to="/manager/offline-sales/customers" className="text-xs font-bold text-emerald-700 hover:underline">
              View Directory →
            </Link>
          </div>

          <div className="divide-y divide-stone-100">
            {distributors.map((d) => (
              <div key={d.id} className="py-3.5 flex items-center justify-between gap-4 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900">{d.companyName}</span>
                    <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-stone-100 text-stone-700">
                      {d.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Contact: {d.contactPerson} • {d.city} • Credit: ${d.creditLimit.toLocaleString()} ({d.paymentTerms})
                  </p>
                </div>

                <div className="text-right">
                  <span className="font-extrabold text-stone-900 block">
                    ${d.outstandingBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className="text-[10px] text-stone-400">Balance Due</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fast Manager Tools */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div className="border-b border-stone-100 pb-3">
            <h3 className="font-serif-luxury font-bold text-base text-[#3D2206]">
              Wholesale Manager Actions
            </h3>
            <p className="text-[11px] text-stone-400">B2B commercial operations</p>
          </div>

          <div className="space-y-2.5">
            <Link
              to="/manager/offline-sales/orders"
              className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FCF9F2] hover:bg-[#F5E5B5]/60 border border-[#F5E5B5] transition-all text-xs font-bold text-[#643B08]"
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-amber-600" />
                <span>B2B Commercial Invoices</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              to="/manager/offline-sales/customers"
              className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-50 hover:bg-stone-100 border border-stone-200 transition-all text-xs font-bold text-stone-800"
            >
              <div className="flex items-center gap-2.5">
                <Building2 className="w-4 h-4 text-emerald-600" />
                <span>Retailers & Distributors Directory</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
              <span className="font-bold block">Pallet Freight Surcharge</span>
              <p className="text-[11px] text-emerald-800">
                Minimum wholesale order for LTL pallet freight: 100 Jars ($2,400).
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
