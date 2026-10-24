import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  ShoppingBag, 
  UserCheck, 
  Globe, 
  Building2, 
  Boxes, 
  ChevronDown, 
  Sparkles,
  ExternalLink,
  Layers
} from 'lucide-react';

export const PersonaSwitcher = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentPersona, setCurrentPersona } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const personas = [
    {
      id: 'customer',
      label: 'Storefront (Customer)',
      badge: 'Public Shop',
      icon: ShoppingBag,
      color: 'text-amber-600 bg-amber-50',
      description: 'Shop, Story, Recipes, Cart & Checkout',
      defaultPath: '/'
    },
    {
      id: 'user',
      label: 'User Dashboard',
      badge: 'Customer Portal',
      icon: UserCheck,
      color: 'text-emerald-700 bg-emerald-50',
      description: 'Orders history, loyalty rewards, profile',
      defaultPath: '/user/profile'
    },
    {
      id: 'admin',
      label: 'Admin Portal (Super Admin)',
      badge: 'Full Access',
      icon: ShieldCheck,
      color: 'text-purple-700 bg-purple-50',
      description: 'Analytics, Team Roles, Products, Orders, Blog, Tax',
      defaultPath: '/admin/dashboard'
    },
    {
      id: 'online_sales_manager',
      label: 'Online Sales Manager',
      badge: 'Manager View',
      icon: Globe,
      color: 'text-blue-700 bg-blue-50',
      description: 'Web traffic, courier dispatch, web promos & reviews',
      defaultPath: '/manager/online-sales'
    },
    {
      id: 'offline_sales_manager',
      label: 'Offline Sales Manager',
      badge: 'Manager View',
      icon: Building2,
      color: 'text-amber-800 bg-amber-100',
      description: 'B2B Wholesale invoices, freight & distributors',
      defaultPath: '/manager/offline-sales'
    },
    {
      id: 'purchase_manager',
      label: 'Purchase Manager',
      badge: 'Manager View',
      icon: Boxes,
      color: 'text-rose-700 bg-rose-50',
      description: 'COGS, raw honey barrels, glass jars & supplier freight',
      defaultPath: '/manager/purchase'
    }
  ];

  const current = personas.find(p => p.id === currentPersona) || personas[0];

  const handleSelect = (p) => {
    setCurrentPersona(p.id);
    setIsOpen(false);
    navigate(p.defaultPath);
  };

  return (
    <div className="bg-[#191008] text-white border-b border-[#D89816]/30 text-xs py-1.5 sm:py-2 px-3 sm:px-4 sticky top-0 z-50 shadow-md w-full overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Left: Branding & Role badge */}
        <div className="flex items-center gap-1.5 min-w-0">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="font-bold tracking-wider uppercase text-[#E4B345] font-brand text-[10px] sm:text-xs truncate">
            HaruViru Gold
          </span>
          <span className="hidden sm:inline text-stone-500">|</span>
          <span className="hidden sm:inline text-stone-300 text-[11px] truncate">
            3 Dashboards Public
          </span>
        </div>

        {/* Right: Persona dropdown switcher & quick jump */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-stone-400 hidden md:inline text-[11px]">Viewing:</span>
          
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-1.5 bg-[#2E1D0E] hover:bg-[#3D2613] border border-[#D89816]/40 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-amber-200 font-medium transition-all shadow-sm text-[11px] sm:text-xs"
            >
              <current.icon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="max-w-[110px] sm:max-w-none truncate">{current.label}</span>
              <span className="hidden xs:inline text-[9px] uppercase tracking-wider bg-amber-400/20 text-amber-300 px-1 py-0.5 rounded font-bold">
                {current.badge}
              </span>
              <ChevronDown className={`w-3 h-3 text-stone-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setIsOpen(false)} 
                />
                <div className="absolute right-0 mt-2 w-72 sm:w-80 max-w-[calc(100vw-24px)] bg-[#1F1309] border border-[#D89816]/40 rounded-xl shadow-2xl p-2 z-50 text-stone-200">
                  <div className="px-3 py-2 text-[11px] font-semibold text-stone-400 border-b border-stone-800 flex items-center justify-between">
                    <span>SWITCH PERSONA / DASHBOARD</span>
                    <Layers className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <div className="py-1 space-y-1">
                    {personas.map((p) => {
                      const Icon = p.icon;
                      const isSelected = p.id === currentPersona;
                      return (
                        <button
                          key={p.id}
                          onClick={() => handleSelect(p)}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-start gap-2.5 ${
                            isSelected 
                              ? 'bg-[#3D2613] text-amber-200 border border-[#D89816]/50' 
                              : 'hover:bg-[#2A1A0D] text-stone-300'
                          }`}
                        >
                          <div className={`p-1.5 rounded-md mt-0.5 shrink-0 ${p.color}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-xs truncate">{p.label}</span>
                              <span className="text-[9px] px-1.5 py-0.2 rounded font-mono bg-stone-800 text-stone-400">
                                {p.badge}
                              </span>
                            </div>
                            <p className="text-[11px] text-stone-400 truncate mt-0.5">
                              {p.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Quick jump to Admin or Store */}
          {location.pathname.startsWith('/admin') || location.pathname.startsWith('/manager') ? (
            <button
              onClick={() => {
                setCurrentPersona('customer');
                navigate('/');
              }}
              className="hidden lg:flex items-center gap-1 text-[11px] bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-1.5 rounded-lg transition-all"
            >
              <span>Back to Store</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          ) : (
            <button
              onClick={() => {
                setCurrentPersona('admin');
                navigate('/admin/dashboard');
              }}
              className="hidden lg:flex items-center gap-1 text-[11px] bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-1.5 rounded-lg transition-all"
            >
              <span>Open Admin Suite</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
