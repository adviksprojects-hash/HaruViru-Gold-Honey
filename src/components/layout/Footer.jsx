import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import haruViruLogo from '../../assets/haruviru-logo.jpg';
import { 
  Crown, 
  Mail, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  ArrowRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useApp();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    showToast('Welcome to the HaruViru Hive! Use promo code GOLDEN15 on checkout.', 'success');
  };

  return (
    <footer className="bg-[#0B0B0C] border-t border-stone-800 text-stone-300 pt-16 pb-12 mt-20">
      
      {/* Top Banner: 100% Purity Promise */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 rounded-3xl p-6 sm:p-8 text-white shadow-2xl shadow-orange-600/20 flex flex-col md:flex-row items-center justify-between gap-6 border border-amber-500/30">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <div>
              <h4 className="font-brand text-lg sm:text-xl font-black">
                The HaruViru 100% Raw Purity Promise
              </h4>
              <p className="text-xs sm:text-sm text-amber-100 mt-0.5">
                Batch-tested via Nuclear Magnetic Resonance (NMR) & Carbon Isotope Mass Spectrometry. Zero heating, zero syrups.
              </p>
            </div>
          </div>
          <Link
            to="/about"
            className="shrink-0 bg-white text-stone-950 hover:bg-amber-50 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full transition-all flex items-center gap-2 shadow-md hover:scale-105"
          >
            <span>Read Lab Report</span>
            <ArrowRight className="w-4 h-4 text-orange-600" />
          </Link>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <img 
                src={haruViruLogo} 
                alt="HaruViru Gold Honey Logo" 
                className="w-12 h-12 rounded-full object-cover shadow-lg border-2 border-amber-400 group-hover:scale-105 transition-transform shrink-0" 
              />
              <div className="flex flex-col">
                <span className="font-brand text-xl font-bold tracking-wide text-white leading-none">
                  HaruViru
                </span>
                <span className="text-[10px] font-black tracking-[0.25em] text-amber-400 uppercase mt-0.5">
                  GOLD HONEY
                </span>
              </div>
            </Link>
            <p className="text-sm text-stone-400 leading-relaxed pr-6">
              HaruViru Gold Honey curates the world’s most potent, single-origin raw honeys from high-altitude Himalayan biospheres and pristine wild forest canopies. Unheated, enzymatically alive, and bottled in artisanal glass.
            </p>
            <div className="pt-2 text-xs text-stone-400 space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>HaruViru Apiary Sanctuary & Himalayan Mountain Reserves</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>concierge@haruvirugold.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+1 (800) 427-8847 (Toll-Free Collector Line)</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-black text-xs uppercase tracking-widest text-white mb-4">
              Honey Reserves
            </h5>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li><Link to="/shop" className="hover:text-amber-400 transition-colors">Imperial Sidr Mountain</Link></li>
              <li><Link to="/shop" className="hover:text-amber-400 transition-colors">Royal Himalayan Wildflower</Link></li>
              <li><Link to="/shop" className="hover:text-amber-400 transition-colors">Kashmir White Velvet</Link></li>
              <li><Link to="/shop" className="hover:text-amber-400 transition-colors">Raw Hexagonal Comb</Link></li>
              <li><Link to="/shop" className="hover:text-amber-400 transition-colors">Saffron & Turmeric Infused</Link></li>
              <li><Link to="/shop" className="hover:text-amber-400 transition-colors">Corporate Gifting Sets</Link></li>
            </ul>
          </div>

          {/* Discovery & Care */}
          <div>
            <h5 className="font-black text-xs uppercase tracking-widest text-white mb-4">
              Explore & Care
            </h5>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li><Link to="/about" className="hover:text-amber-400 transition-colors">Our Story & Heritage</Link></li>
              <li><Link to="/blog" className="hover:text-amber-400 transition-colors">Honey Recipes & Wellness</Link></li>
              <li><Link to="/faqs" className="hover:text-amber-400 transition-colors">Frequently Asked Questions</Link></li>
              <li><Link to="/contact" className="hover:text-amber-400 transition-colors">Contact Concierge & B2B</Link></li>
              <li><Link to="/user/orders" className="hover:text-amber-400 transition-colors">Track Your Order</Link></li>
              <li><Link to="/user/profile" className="hover:text-amber-400 transition-colors">Golden Bee Club Loyalty</Link></li>
            </ul>
          </div>

          {/* Join Golden Hive Newsletter */}
          <div>
            <h5 className="font-black text-xs uppercase tracking-widest text-white mb-4">
              Join Golden Hive
            </h5>
            <p className="text-xs text-stone-400 mb-3">
              Subscribe for exclusive seasonal harvest alerts and receive 15% off your first jar.
            </p>
            {subscribed ? (
              <div className="bg-emerald-950/60 border border-emerald-500/40 p-3 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Subscribed! Use code <b>GOLDEN15</b> at checkout.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-hidden focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="w-full gradient-btn-honey text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-sm"
                >
                  Join Circle
                </button>
              </form>
            )}

            <div className="mt-5 pt-4 border-t border-stone-800/80">
              <span className="text-[11px] font-bold tracking-wider uppercase text-stone-400 block mb-1.5">
                Staff & Portals
              </span>
              <div className="flex flex-wrap gap-2 text-[11px] font-semibold">
                <Link to="/admin/dashboard" className="text-amber-400 hover:text-amber-300 hover:underline">Admin Suite</Link>
                <span className="text-stone-600">•</span>
                <Link to="/manager/online-sales" className="text-amber-400 hover:text-amber-300 hover:underline">Sales Managers</Link>
                <span className="text-stone-600">•</span>
                <Link to="/manager/purchase" className="text-amber-400 hover:text-amber-300 hover:underline">Procurement</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="mt-14 pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <p>© {new Date().getFullYear()} HaruViru Gold Honey LLC. All Rights Reserved.</p>
            <p className="text-[11px] text-stone-400">
              Developed by <span className="text-amber-400 font-extrabold tracking-wide">ADVIKS Softech</span>
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-6">
            <span className="flex items-center gap-1 text-amber-400 font-bold">
              <Crown className="w-3.5 h-3.5" />
              <span>Certified Royal Harvest</span>
            </span>
            <span>NMR Lab Verified</span>
            <span>Pure Himalayan Wildflower</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
