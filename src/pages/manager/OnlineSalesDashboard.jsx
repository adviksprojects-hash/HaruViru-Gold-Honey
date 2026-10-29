import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  Globe, 
  TrendingUp, 
  ShoppingBag, 
  Truck, 
  Users, 
  Percent, 
  Star, 
  ArrowUpRight, 
  PackageCheck, 
  Sparkles, 
  ArrowRight
} from 'lucide-react';

export const OnlineSalesDashboard = () => {
  const { orders, reviews, coupons } = useApp();

  const onlineOrders = orders.filter(o => o.channel === 'online');
  const onlineRevenue = onlineOrders.reduce((acc, o) => acc + o.totalAmount, 0);
  const webCoupons = coupons.filter(c => c.applicableChannel === 'online' || c.applicableChannel === 'all');
  const pendingReviews = reviews.filter(r => r.status === 'pending');

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 block mb-1">
            Digital Commerce & Web Growth
          </span>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#3D2206]">
            Online Sales Manager Dashboard
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Real-time analytics for web traffic, conversion funnels, courier dispatch, and online customer reviews.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/manager/online-sales/orders"
            className="bg-[#D89816] hover:bg-[#B87A0B] text-stone-950 font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-1.5"
          >
            <Truck className="w-4 h-4" />
            <span>Courier Dispatch ({onlineOrders.filter(o => o.status === 'Processing').length})</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase">Online Web Revenue</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Globe className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="font-serif-luxury text-2xl sm:text-3xl font-extrabold text-[#3D2206]">
              ₹{onlineRevenue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">+24.2% e-commerce lift</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase">Storefront Visitors</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="font-serif-luxury text-2xl sm:text-3xl font-extrabold text-[#3D2206]">
              14,820
            </span>
            <p className="text-[11px] text-stone-500 mt-1">Unique honey collectors this month</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase">E-com Conversion Rate</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Percent className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="font-serif-luxury text-2xl sm:text-3xl font-extrabold text-[#3D2206]">
              3.42%
            </span>
            <p className="text-[11px] text-stone-500 mt-1">Top tier luxury benchmark (avg 2.1%)</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase">Courier Shipping Health</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="font-serif-luxury text-2xl sm:text-3xl font-extrabold text-[#3D2206]">
              98.6%
            </span>
            <p className="text-[11px] text-stone-500 mt-1">On-time cold-chain delivery</p>
          </div>
        </div>

      </div>

      {/* Courier & Online Orders Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Online Orders */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div>
              <h3 className="font-serif-luxury font-bold text-base text-[#3D2206]">
                Online Orders Awaiting Courier Label / Dispatch
              </h3>
              <p className="text-[11px] text-stone-400">Direct courier tracking assignment</p>
            </div>
            <Link to="/manager/online-sales/orders" className="text-xs font-bold text-blue-700 hover:underline">
              View All Online Orders →
            </Link>
          </div>

          <div className="divide-y divide-stone-100">
            {onlineOrders.map((ord) => (
              <div key={ord.id} className="py-3.5 flex items-center justify-between gap-4 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-stone-900">{ord.orderNumber}</span>
                    <span className="text-stone-400">• {ord.date}</span>
                  </div>
                  <p className="text-stone-700 font-semibold mt-0.5">{ord.customerName}</p>
                  <p className="text-[10px] text-stone-400">
                    Courier: {ord.courierPartner} • Tracking: <span className="font-mono text-stone-700">{ord.trackingNumber}</span>
                  </p>
                </div>

                <div className="text-right">
                  <span className="font-bold text-stone-900 block">₹{ord.totalAmount.toFixed(2)}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block ${
                    ord.status === 'Delivered' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-800'
                  }`}>
                    {ord.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Manager Actions */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div className="border-b border-stone-100 pb-3">
            <h3 className="font-serif-luxury font-bold text-base text-[#3D2206]">
              Manager Fast Actions
            </h3>
            <p className="text-[11px] text-stone-400">Essential online operations</p>
          </div>

          <div className="space-y-2.5">
            <Link
              to="/manager/online-sales/orders"
              className="flex items-center justify-between p-3 rounded-2xl bg-[#FCF9F2] hover:bg-[#F5E5B5]/60 border border-[#F5E5B5] transition-all text-xs font-bold text-[#643B08]"
            >
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-amber-600" />
                <span>Courier Shipping Manager</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              to="/manager/online-sales/customers"
              className="flex items-center justify-between p-3 rounded-2xl bg-stone-50 hover:bg-stone-100 border border-stone-200 transition-all text-xs font-bold text-stone-800"
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-blue-600" />
                <span>Online Users Directory</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              to="/manager/online-sales/coupons"
              className="flex items-center justify-between p-3 rounded-2xl bg-stone-50 hover:bg-stone-100 border border-stone-200 transition-all text-xs font-bold text-stone-800"
            >
              <div className="flex items-center gap-2.5">
                <Percent className="w-4 h-4 text-emerald-600" />
                <span>Web Promo Codes ({webCoupons.length})</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              to="/manager/online-sales/reviews"
              className="flex items-center justify-between p-3 rounded-2xl bg-stone-50 hover:bg-stone-100 border border-stone-200 transition-all text-xs font-bold text-stone-800"
            >
              <div className="flex items-center gap-2.5">
                <Star className="w-4 h-4 text-amber-500" />
                <span>Moderate Web Reviews</span>
              </div>
              {pendingReviews.length > 0 && (
                <span className="text-[10px] bg-amber-500 text-stone-950 px-2 py-0.2 rounded-full font-black">
                  {pendingReviews.length} new
                </span>
              )}
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
};
