import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Package, 
  AlertTriangle, 
  ArrowUpRight, 
  ArrowDownRight, 
  ShieldCheck, 
  Crown,
  Globe,
  Building2,
  Calendar,
  Sparkles
} from 'lucide-react';

export const AdminDashboard = () => {
  const { orders, products, reviews, team } = useApp();

  const totalRevenue = orders.reduce((acc, o) => acc + o.totalAmount, 0);
  const totalOrdersCount = orders.length;
  const onlineOrders = orders.filter(o => o.channel === 'online');
  const wholesaleOrders = orders.filter(o => o.channel === 'wholesale');
  
  const onlineRevenue = onlineOrders.reduce((acc, o) => acc + o.totalAmount, 0);
  const wholesaleRevenue = wholesaleOrders.reduce((acc, o) => acc + o.totalAmount, 0);

  const lowStockProducts = products.filter(p => p.stock <= p.lowStockThreshold);
  const pendingReviews = reviews.filter(r => r.status === 'pending');

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Top Welcome & Summary Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B87A0B] block mb-1">
            Executive Command Center
          </span>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#3D2206]">
            Enterprise Analytics Overview
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Real-time multi-channel overview: Online D2C store, B2B Wholesale distribution, and inventory.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/products"
            className="bg-[#D89816] hover:bg-[#B87A0B] text-stone-950 font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-1.5"
          >
            <Package className="w-4 h-4" />
            <span>Manage Inventory</span>
          </Link>
          <Link
            to="/admin/orders"
            className="bg-[#1C120A] hover:bg-[#2A1B0E] text-[#F5E5B5] font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-1.5"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>View All Orders</span>
          </Link>
        </div>
      </div>

      {/* Low stock alert banner if any */}
      {lowStockProducts.length > 0 && (
        <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-amber-900 block">
                {lowStockProducts.length} Honey Products Nearing Stock Threshold!
              </span>
              <span className="text-stone-600">
                {lowStockProducts.map(p => `${p.name} (${p.stock} left)`).join(', ')}
              </span>
            </div>
          </div>
          <Link
            to="/admin/products"
            className="shrink-0 text-xs font-bold bg-[#D89816] hover:bg-[#B87A0B] text-stone-950 px-3 py-1.5 rounded-lg transition-all"
          >
            Replenish Stock
          </Link>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Gross Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase tracking-wider">Gross Revenue</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <span className="font-serif-luxury text-2xl sm:text-3xl font-extrabold text-[#3D2206]">
              ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4% vs last month</span>
            </div>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Orders</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <span className="font-serif-luxury text-2xl sm:text-3xl font-extrabold text-[#3D2206]">
              {totalOrdersCount}
            </span>
            <div className="flex items-center gap-1.5 text-[11px] text-stone-500">
              <span>{onlineOrders.length} D2C Web • {wholesaleOrders.length} B2B Pallet</span>
            </div>
          </div>
        </div>

        {/* Avg Order Value */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase tracking-wider">Avg Order Value (AOV)</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Crown className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <span className="font-serif-luxury text-2xl sm:text-3xl font-extrabold text-[#3D2206]">
              ${totalOrdersCount ? (totalRevenue / totalOrdersCount).toFixed(2) : '0.00'}
            </span>
            <div className="text-[11px] text-amber-700 font-semibold">
              High-value luxury basket size
            </div>
          </div>
        </div>

        {/* Active Team Staff */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase tracking-wider">Team & Managers</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <span className="font-serif-luxury text-2xl sm:text-3xl font-extrabold text-[#3D2206]">
              {team.length} Active
            </span>
            <Link to="/admin/team" className="text-[11px] text-purple-700 font-semibold hover:underline block">
              Manage Roles & Permissions →
            </Link>
          </div>
        </div>

      </div>

      {/* Channel Comparison Section: Online Web Store vs B2B Wholesale */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Online Sales Channel Card */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif-luxury font-bold text-base text-[#3D2206]">
                  Online D2C Sales Channel
                </h3>
                <p className="text-[10px] text-stone-400">Direct-to-consumer store orders & courier delivery</p>
              </div>
            </div>
            <Link
              to="/manager/online-sales"
              className="text-xs font-bold text-blue-700 hover:underline"
            >
              Open Manager View →
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center text-xs">
            <div className="p-3 bg-stone-50 rounded-xl">
              <span className="text-[10px] text-stone-400 block font-bold">REVENUE</span>
              <span className="text-base font-extrabold text-stone-800">${onlineRevenue.toFixed(2)}</span>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl">
              <span className="text-[10px] text-stone-400 block font-bold">ORDERS</span>
              <span className="text-base font-extrabold text-stone-800">{onlineOrders.length}</span>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl">
              <span className="text-[10px] text-stone-400 block font-bold">CONV. RATE</span>
              <span className="text-base font-extrabold text-stone-800">3.4%</span>
            </div>
          </div>

          <div className="text-xs text-stone-600 space-y-1">
            <p className="flex justify-between">
              <span>Primary Couriers:</span>
              <span className="font-semibold text-stone-800">BlueDart, FedEx, DHL</span>
            </p>
            <p className="flex justify-between">
              <span>Top Online SKU:</span>
              <span className="font-semibold text-amber-800">Imperial Sidr Gold 500g</span>
            </p>
          </div>
        </div>

        {/* Offline Wholesale Channel Card */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif-luxury font-bold text-base text-[#3D2206]">
                  Offline Wholesale & B2B Channel
                </h3>
                <p className="text-[10px] text-stone-400">Retail distributors, gourmet supermarkets & spas</p>
              </div>
            </div>
            <Link
              to="/manager/offline-sales"
              className="text-xs font-bold text-emerald-700 hover:underline"
            >
              Open Manager View →
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center text-xs">
            <div className="p-3 bg-stone-50 rounded-xl">
              <span className="text-[10px] text-stone-400 block font-bold">B2B REVENUE</span>
              <span className="text-base font-extrabold text-stone-800">${wholesaleRevenue.toFixed(2)}</span>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl">
              <span className="text-[10px] text-stone-400 block font-bold">BULK ORDERS</span>
              <span className="text-base font-extrabold text-stone-800">{wholesaleOrders.length}</span>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl">
              <span className="text-[10px] text-stone-400 block font-bold">AVG INVOICE</span>
              <span className="text-base font-extrabold text-stone-800">
                ${wholesaleOrders.length ? (wholesaleRevenue / wholesaleOrders.length).toFixed(0) : '0'}
              </span>
            </div>
          </div>

          <div className="text-xs text-stone-600 space-y-1">
            <p className="flex justify-between">
              <span>Freight Carriers:</span>
              <span className="font-semibold text-stone-800">FreightMaster LTL Pallets, SafeExpress</span>
            </p>
            <p className="flex justify-between">
              <span>Standard Terms:</span>
              <span className="font-semibold text-stone-800">Net 30 / Net 60 Days</span>
            </p>
          </div>
        </div>

      </div>

      {/* Recent Orders Stream & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Live Orders (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div>
              <h3 className="font-serif-luxury font-bold text-base text-[#3D2206]">
                Recent Orders Stream
              </h3>
              <p className="text-[11px] text-stone-400">Live order flow across online and wholesale channels</p>
            </div>
            <Link to="/admin/orders" className="text-xs font-bold text-[#8F5808] hover:underline">
              View All Orders →
            </Link>
          </div>

          <div className="divide-y divide-stone-100">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="py-3.5 flex items-center justify-between gap-4 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-stone-900">{order.orderNumber}</span>
                    <span className={`text-[9px] font-bold px-2 py-0.2 rounded-full uppercase ${
                      order.channel === 'online' ? 'bg-blue-50 text-blue-700' : 'bg-emerald-50 text-emerald-700'
                    }`}>
                      {order.channel}
                    </span>
                  </div>
                  <p className="text-stone-700 font-medium mt-0.5">{order.customerName}</p>
                  <p className="text-[10px] text-stone-400">{order.date} • {order.items.length} items</p>
                </div>

                <div className="text-right space-y-1">
                  <span className="font-extrabold text-stone-900 block">${order.totalAmount.toFixed(2)}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block ${
                    order.status === 'Delivered' 
                      ? 'bg-emerald-50 text-emerald-700' 
                      : 'bg-amber-50 text-amber-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Honey SKUs (1 col) */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div className="border-b border-stone-100 pb-3">
            <h3 className="font-serif-luxury font-bold text-base text-[#3D2206]">
              Top Honey Reserves
            </h3>
            <p className="text-[11px] text-stone-400">By sales volume and connoisseur ratings</p>
          </div>

          <div className="space-y-3">
            {products.slice(0, 4).map((p) => (
              <div key={p.id} className="flex items-center gap-3 text-xs">
                <img
                  src={p.image}
                  alt=""
                  className="w-11 h-11 rounded-xl object-cover border border-stone-200 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-stone-900 truncate">{p.name}</p>
                  <p className="text-[10px] text-stone-500">${p.price} • {p.stock} units in stock</p>
                </div>
                <span className="font-bold text-amber-600 shrink-0">{p.rating} ★</span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-stone-100">
            <Link
              to="/admin/products"
              className="w-full text-center block text-xs font-bold text-[#8F5808] hover:underline"
            >
              Manage Catalog & Batch Codes →
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
};
