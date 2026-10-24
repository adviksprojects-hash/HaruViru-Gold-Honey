import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  Sparkles, 
  Search,
  ShieldCheck,
  ChevronRight,
  Flame,
  Briefcase
} from 'lucide-react';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { cartCount } = useApp();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/shop' },
    { label: 'Our Story', path: '/about' },
    { label: 'Recipes', path: '/blog' },
    { label: 'FAQs', path: '/faqs' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/98 backdrop-blur-md border-b border-slate-100 transition-all shadow-xs">
      {/* Top micro-announcement banner */}
      <div className="w-full overflow-hidden bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 text-white text-center text-[10px] sm:text-xs py-1.5 px-3 sm:px-4 font-bold tracking-wide flex items-center justify-center gap-1.5 sm:gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-pulse shrink-0" />
        <span className="truncate max-w-[85vw] sm:max-w-none">Autumn 2026 Raw Alpine Harvest • 100% Certified Raw & Untouched • Free Express Delivery Over $50</span>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand Identity (Clean modern sans-serif matching reference) */}
          <Link to="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform text-base sm:text-lg">
              🍯
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-rose-600 transition-colors leading-none">
                HaruViru
              </span>
              <span className="text-[9px] sm:text-[10px] font-black tracking-[0.25em] text-rose-600 uppercase mt-0.5 sm:mt-1">
                GOLD HONEY
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Pill container matching reference exactly) */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-50/90 p-1.5 rounded-full border border-slate-200/80 shadow-xs">
            {/* Manager Portal pill (Reference: red/orange pill button) */}
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-1.5 text-xs font-bold gradient-btn-honey text-white px-3.5 py-1.5 rounded-full shadow-xs hover:shadow transition-all"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Manager Portal</span>
            </Link>

            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-xs font-bold tracking-tight px-3.5 py-1.5 rounded-full transition-all ${
                  isActive(link.path)
                    ? 'bg-white text-slate-900 shadow-xs font-extrabold'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/80'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Search */}
            <Link
              to="/shop"
              className="p-2 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors hidden sm:flex"
              title="Search Honey Reserves"
            >
              <Search className="w-4 h-4" />
            </Link>

            {/* Shop / Order Button (Reference: 'Book' gradient pill) - shown on md+ */}
            <Link
              to="/shop"
              className="gradient-btn-honey text-white text-xs font-black px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-md shadow-rose-500/25 active:scale-95 transition-all hidden md:flex items-center gap-1.5"
            >
              <Flame className="w-3.5 h-3.5 fill-white text-white" />
              <span>Shop Now</span>
            </Link>

            {/* Cart Button */}
            <Link
              to="/cart"
              className="flex items-center gap-1.5 sm:gap-2 bg-slate-900 hover:bg-slate-800 text-white px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full font-bold text-xs transition-all shadow-sm active:scale-95"
            >
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300" />
              <span className="hidden sm:inline font-bold">Cart</span>
              <span className="bg-amber-400 text-slate-950 text-[10px] sm:text-[11px] px-1.5 py-0.2 rounded-full font-black">
                {cartCount}
              </span>
            </Link>

            {/* User Profile Avatar */}
            <Link
              to="/user/profile"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 hover:bg-rose-50 border border-slate-200 hidden sm:flex items-center justify-center text-slate-700 hover:text-rose-600 transition-colors"
              title="My Account"
            >
              <User className="w-4 h-4" />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 text-slate-700 hover:text-rose-600 rounded-xl focus:outline-hidden"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 pt-3 pb-6 space-y-2 animate-fade-in shadow-xl">
          <Link
            to="/admin/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between p-3.5 rounded-2xl gradient-btn-honey text-white font-extrabold text-sm shadow-md"
          >
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              <span>Manager & Admin Portals</span>
            </div>
            <ChevronRight className="w-4 h-4" />
          </Link>

          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                isActive(link.path)
                  ? 'bg-rose-50 text-rose-700 font-extrabold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              to="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center gradient-btn-honey text-white py-3.5 rounded-xl font-black text-sm shadow-md"
            >
              Explore Products
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
