import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  User, 
  Crown, 
  Sparkles, 
  ShoppingBag, 
  MapPin, 
  CreditCard, 
  Award, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Gift,
  Bell,
  Home
} from 'lucide-react';

export const UserProfile = () => {
  const { orders } = useApp();
  const [activeTab, setActiveTab] = useState('profile');

  // Filter user's online orders
  const userOrders = orders.filter((o) => o.channel === 'online');
  const totalSpent = userOrders.reduce((acc, o) => acc + o.totalAmount, 0);
  const loyaltyPoints = Math.floor(totalSpent * 10);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Banner */}
      <div className="bg-[#241508] text-white rounded-3xl p-8 sm:p-12 border border-[#D89816]/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="flex items-center gap-5 z-10">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#E4B345] to-[#8F5808] text-white font-serif-luxury font-black text-2xl flex items-center justify-center shadow-lg ring-4 ring-[#D89816]/40">
            SM
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#FFFDF7]">
                Sophia Montgomery
              </h1>
              <span className="bg-[#D89816] text-stone-950 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Crown className="w-3 h-3" />
                <span>Gold Hive Member</span>
              </span>
            </div>
            <p className="text-xs text-stone-300">
              Collector since 2024 • sophia.mont@gmail.com
            </p>
          </div>
        </div>

        {/* Loyalty Points Pill */}
        <div className="bg-[#3D2512] border border-[#D89816]/40 rounded-2xl p-4 sm:p-5 flex items-center gap-6 z-10">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#E4B345] block">
              Golden Bee Points
            </span>
            <span className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#FFFDF7]">
              {loyaltyPoints} pts
            </span>
          </div>
          <Link
            to="/shop"
            className="bg-[#D89816] hover:bg-[#B87A0B] text-stone-950 text-xs font-bold px-4 py-2 rounded-xl transition-all"
          >
            Redeem Jar
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-200 gap-8 text-xs font-bold uppercase tracking-wider">
        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-3 relative transition-colors ${
            activeTab === 'profile' ? 'text-[#8F5808]' : 'text-stone-400 hover:text-stone-700'
          }`}
        >
          Collector Overview
          {activeTab === 'profile' && (
            <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#D89816] rounded-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('addresses')}
          className={`pb-3 relative transition-colors ${
            activeTab === 'addresses' ? 'text-[#8F5808]' : 'text-stone-400 hover:text-stone-700'
          }`}
        >
          Saved Addresses (2)
          {activeTab === 'addresses' && (
            <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#D89816] rounded-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('rewards')}
          className={`pb-3 relative transition-colors ${
            activeTab === 'rewards' ? 'text-[#8F5808]' : 'text-stone-400 hover:text-stone-700'
          }`}
        >
          Golden Hive Rewards
          {activeTab === 'rewards' && (
            <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#D89816] rounded-full" />
          )}
        </button>
      </div>

      {/* Tab 1: Collector Overview */}
      {activeTab === 'profile' && (
        <div className="space-y-8">
          
          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-[#F5E5B5] shadow-xs space-y-2">
              <span className="text-xs font-bold uppercase text-stone-400">Total Orders</span>
              <p className="font-serif-luxury text-3xl font-bold text-[#3D2206]">{userOrders.length}</p>
              <Link to="/user/orders" className="text-xs text-[#8F5808] hover:underline font-bold inline-flex items-center gap-1">
                <span>View Order History</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#F5E5B5] shadow-xs space-y-2">
              <span className="text-xs font-bold uppercase text-stone-400">Total Harvest Reserve Spend</span>
              <p className="font-serif-luxury text-3xl font-bold text-[#3D2206]">${totalSpent.toFixed(2)}</p>
              <p className="text-xs text-stone-500">Tier: Royal Gold Patron</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#F5E5B5] shadow-xs space-y-2">
              <span className="text-xs font-bold uppercase text-stone-400">Next Harvest Allocation</span>
              <p className="font-serif-luxury text-xl font-bold text-[#3D2206]">Nov 15, 2026</p>
              <p className="text-xs text-amber-700 font-medium">Himalayan White Reserve</p>
            </div>
          </div>

          {/* Recent Orders Snapshot */}
          <div className="bg-white rounded-3xl border border-[#F5E5B5] p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div>
                <h3 className="font-serif-luxury font-bold text-lg text-[#3D2206]">
                  Recent Honey Deliveries
                </h3>
                <p className="text-xs text-stone-500">Track current status or reorder your favorites.</p>
              </div>
              <Link
                to="/user/orders"
                className="text-xs font-bold text-[#8F5808] hover:text-[#D89816] flex items-center gap-1"
              >
                <span>All Orders</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-stone-100">
              {userOrders.slice(0, 3).map((order) => (
                <div key={order.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono font-bold text-xs text-amber-900">{order.orderNumber}</span>
                      <span className="text-[10px] text-stone-400">• {order.date}</span>
                    </div>
                    <p className="text-xs font-semibold text-stone-800">
                      {order.items.map(i => `${i.quantity}x ${i.productName}`).join(', ')}
                    </p>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      Tracking: {order.trackingNumber} via {order.courierPartner}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-bold text-sm text-[#3D2206]">
                      ${order.totalAmount.toFixed(2)}
                    </span>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                      order.status === 'Delivered' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Saved Addresses */}
      {activeTab === 'addresses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl border-2 border-[#D89816] shadow-xs space-y-3 relative">
            <span className="absolute top-4 right-4 bg-[#D89816] text-stone-950 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
              Default Delivery
            </span>
            <div className="flex items-center gap-2 text-xs font-bold text-stone-800">
              <Home className="w-4 h-4 text-amber-600" />
              <span>Primary Residence</span>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed">
              Sophia Montgomery<br />
              742 Evergreen Terrace, Suite 4B<br />
              San Francisco, CA 94107<br />
              United States<br />
              Phone: +1 (555) 349-2810
            </p>
            <div className="pt-2 text-xs font-semibold text-[#8F5808]">
              Verified Cold-Chain Delivery Route
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-stone-800">
              <MapPin className="w-4 h-4 text-amber-600" />
              <span>Lake Tahoe Mountain Retreat</span>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed">
              Sophia Montgomery<br />
              128 Pinecrest Ridge Way<br />
              Tahoe City, CA 96145<br />
              United States
            </p>
            <div className="pt-2">
              <button className="text-xs font-bold text-[#8F5808] hover:underline">
                Set as Default
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Rewards */}
      {activeTab === 'rewards' && (
        <div className="bg-white rounded-3xl border border-[#F5E5B5] p-6 sm:p-10 shadow-xs space-y-6">
          <div className="max-w-xl space-y-2">
            <h3 className="font-serif-luxury text-2xl font-bold text-[#3D2206]">
              Golden Bee Loyalty Privileges
            </h3>
            <p className="text-xs sm:text-sm text-stone-600">
              Earn 10 points for every $1 spent. Redeem for private reserve jars, complimentary honey dippers, and early access to annual Sidr harvests.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
            <div className="p-5 bg-[#FAF4E4] rounded-2xl border border-[#F5E5B5] space-y-2">
              <Gift className="w-6 h-6 text-amber-700" />
              <h4 className="font-bold text-sm text-[#3D2206]">Free 250g Sidr Gold</h4>
              <p className="text-xs text-stone-500">Requires 500 points</p>
              <button className="w-full bg-[#D89816] text-stone-950 font-bold text-xs py-2 rounded-xl mt-2">
                Redeem Reward
              </button>
            </div>

            <div className="p-5 bg-[#FAF4E4] rounded-2xl border border-[#F5E5B5] space-y-2">
              <Crown className="w-6 h-6 text-amber-700" />
              <h4 className="font-bold text-sm text-[#3D2206]">Private Apiary Tour</h4>
              <p className="text-xs text-stone-500">Requires 1,500 points</p>
              <button className="w-full bg-stone-200 text-stone-500 font-bold text-xs py-2 rounded-xl mt-2 cursor-not-allowed">
                Unlock at 1,500 pts
              </button>
            </div>

            <div className="p-5 bg-[#FAF4E4] rounded-2xl border border-[#F5E5B5] space-y-2">
              <Sparkles className="w-6 h-6 text-amber-700" />
              <h4 className="font-bold text-sm text-[#3D2206]">15% Off Any Harvest</h4>
              <p className="text-xs text-stone-500">Active Code: <b>GOLDEN15</b></p>
              <Link to="/shop" className="block text-center bg-stone-900 text-amber-200 font-bold text-xs py-2 rounded-xl mt-2">
                Shop With Code
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
