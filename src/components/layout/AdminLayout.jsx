import React, { useState } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  Users2, 
  Package, 
  ShoppingBag, 
  Users, 
  FileText, 
  Percent, 
  Star, 
  Settings, 
  Globe, 
  Building2, 
  Boxes, 
  ExternalLink, 
  Crown, 
  ChevronRight, 
  Bell, 
  Search, 
  LogOut,
  Sparkles,
  Menu,
  X,
  Truck,
  ShieldCheck
} from 'lucide-react';

export const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentPersona, setCurrentPersona, cartCount, orders, products, reviews } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pendingReviewsCount = reviews.filter(r => r.status === 'pending').length;
  const pendingOrdersCount = orders.filter(o => o.status === 'Processing' || o.status === 'Pending').length;
  const lowStockCount = products.filter(p => p.stock <= p.lowStockThreshold).length;

  // Determine current context (Super Admin vs specific manager)
  const isOnlineManager = location.pathname.startsWith('/manager/online-sales');
  const isOfflineManager = location.pathname.startsWith('/manager/offline-sales');
  const isPurchaseManager = location.pathname.startsWith('/manager/purchase');
  const isAdmin = location.pathname.startsWith('/admin') || (!isOnlineManager && !isOfflineManager && !isPurchaseManager);

  // Define sidebar links based on which section the user is visiting
  let roleTitle = 'Super Administrator';
  let roleBadge = 'Full Access';
  let badgeColor = 'bg-amber-500/20 text-amber-300 border-amber-500/40';

  if (isOnlineManager) {
    roleTitle = 'Online Sales Manager';
    roleBadge = 'E-commerce & Web';
    badgeColor = 'bg-blue-500/20 text-blue-300 border-blue-500/40';
  } else if (isOfflineManager) {
    roleTitle = 'Offline Sales Manager';
    roleBadge = 'Wholesale & B2B';
    badgeColor = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
  } else if (isPurchaseManager) {
    roleTitle = 'Purchase & Supply Manager';
    roleBadge = 'Procurement & COGS';
    badgeColor = 'bg-rose-500/20 text-rose-300 border-rose-500/40';
  }

  // Sidebar link items
  const adminLinks = [
    { label: 'Analytics Overview', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Team & Permissions', path: '/admin/team', icon: Users2, badge: '4 Staff' },
    { label: 'Product Inventory', path: '/admin/products', icon: Package, badge: lowStockCount > 0 ? `${lowStockCount} Low` : undefined, badgeAlert: lowStockCount > 0 },
    { label: 'All Orders', path: '/admin/orders', icon: ShoppingBag, badge: `${pendingOrdersCount} Active` },
    { label: 'Customer Directory', path: '/admin/customers', icon: Users },
    { label: 'Blog & Recipe Editor', path: '/admin/content', icon: FileText },
    { label: 'Discounts & Coupons', path: '/admin/coupons', icon: Percent },
    { label: 'Reviews Moderation', path: '/admin/reviews', icon: Star, badge: pendingReviewsCount > 0 ? `${pendingReviewsCount} New` : undefined, badgeAlert: pendingReviewsCount > 0 },
    { label: 'System Settings', path: '/admin/settings', icon: Settings },
  ];

  const onlineManagerLinks = [
    { label: 'Web Traffic & Sales', path: '/manager/online-sales', icon: Globe },
    { label: 'Online Orders & Courier', path: '/manager/online-sales/orders', icon: ShoppingBag, badge: 'Web Only' },
    { label: 'Online Users Directory', path: '/manager/online-sales/customers', icon: Users },
    { label: 'Web Promo Codes', path: '/manager/online-sales/coupons', icon: Percent },
    { label: 'Website Product Reviews', path: '/manager/online-sales/reviews', icon: Star, badge: pendingReviewsCount > 0 ? `${pendingReviewsCount}` : undefined },
  ];

  const offlineManagerLinks = [
    { label: 'Wholesale & Bulk Revenue', path: '/manager/offline-sales', icon: Building2 },
    { label: 'B2B Invoices & Freight', path: '/manager/offline-sales/orders', icon: Truck, badge: 'Pallet / LTL' },
    { label: 'Retailers & Distributors', path: '/manager/offline-sales/customers', icon: Users },
  ];

  const purchaseManagerLinks = [
    { label: 'COGS & Low-Stock Alerts', path: '/manager/purchase', icon: Boxes, badge: lowStockCount > 0 ? `${lowStockCount} Alert` : undefined, badgeAlert: lowStockCount > 0 },
    { label: 'Raw Materials & Jars', path: '/manager/purchase/raw-materials', icon: Package },
    { label: 'Supplier Shipping & Freight', path: '/manager/purchase/settings', icon: Settings },
  ];

  let currentNavItems = adminLinks;
  if (isOnlineManager) currentNavItems = onlineManagerLinks;
  if (isOfflineManager) currentNavItems = offlineManagerLinks;
  if (isPurchaseManager) currentNavItems = purchaseManagerLinks;

  const handleRoleJump = (role, path) => {
    setCurrentPersona(role);
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-[#FBF8F3] text-stone-900 flex flex-col antialiased">
      
      {/* Top Bar for Admin/Manager workspace */}
      <header className="bg-[#1C120A] text-white border-b border-[#D89816]/30 sticky top-0 z-40 px-4 sm:px-6 py-3 flex items-center justify-between shadow-md">
        
        {/* Left: Mobile Toggle & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-1.5 text-stone-300 hover:text-white rounded-lg hover:bg-stone-800"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#E4B345] to-[#8F5808] flex items-center justify-center text-white shadow-sm">
              <Crown className="w-5 h-5 text-amber-100" />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-brand text-base font-bold tracking-wider text-[#F5E5B5] leading-none">
                HARUVIRU GOLD
              </span>
              <span className="text-[9px] font-bold tracking-[0.2em] text-[#D89816] uppercase">
                MANAGEMENT SUITE
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1.5 ml-4 pl-4 border-l border-stone-800">
            <span className="text-xs text-stone-400">Workspace:</span>
            <span className={`text-xs px-2.5 py-0.5 rounded-full border font-semibold ${badgeColor}`}>
              {roleTitle}
            </span>
          </div>
        </div>

        {/* Center/Right: Manager View Quick Jump Switches */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick switcher tabs */}
          <div className="hidden xl:flex items-center bg-[#291A0D] p-1 rounded-xl border border-stone-800 text-xs">
            <button
              onClick={() => handleRoleJump('admin', '/admin/dashboard')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                isAdmin ? 'bg-[#D89816] text-stone-950 font-bold shadow-sm' : 'text-stone-300 hover:text-white'
              }`}
            >
              Super Admin
            </button>
            <button
              onClick={() => handleRoleJump('online_sales_manager', '/manager/online-sales')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                isOnlineManager ? 'bg-[#D89816] text-stone-950 font-bold shadow-sm' : 'text-stone-300 hover:text-white'
              }`}
            >
              Online Sales
            </button>
            <button
              onClick={() => handleRoleJump('offline_sales_manager', '/manager/offline-sales')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                isOfflineManager ? 'bg-[#D89816] text-stone-950 font-bold shadow-sm' : 'text-stone-300 hover:text-white'
              }`}
            >
              Offline / B2B
            </button>
            <button
              onClick={() => handleRoleJump('purchase_manager', '/manager/purchase')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                isPurchaseManager ? 'bg-[#D89816] text-stone-950 font-bold shadow-sm' : 'text-stone-300 hover:text-white'
              }`}
            >
              Purchase / COGS
            </button>
          </div>

          {/* Back to Public Store button */}
          <Link
            to="/"
            className="flex items-center gap-1.5 text-xs bg-[#F5E5B5]/10 hover:bg-[#F5E5B5]/20 text-[#F5E5B5] border border-[#D89816]/40 px-3 py-1.5 rounded-xl transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#E4B345]" />
            <span className="hidden sm:inline">View Public Store</span>
          </Link>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-[#1F140A] text-stone-200 border-r border-[#D89816]/20 flex flex-col transition-transform duration-300 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          {/* User profile card in sidebar */}
          <div className="p-4 border-b border-stone-800 bg-[#27190D]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#D89816] text-stone-950 font-bold flex items-center justify-center text-sm shadow-md ring-2 ring-amber-400/30">
                {roleTitle.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-[#F5E5B5] truncate">
                  {roleTitle}
                </p>
                <p className="text-[10px] text-stone-400 truncate">
                  HaruViru Honey Enterprise
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-stone-400">
              {roleTitle} Modules
            </div>

            {currentNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                    isActive
                      ? 'bg-gradient-to-r from-[#D89816] to-[#B87A0B] text-stone-950 font-bold shadow-md shadow-amber-900/20'
                      : 'text-stone-300 hover:bg-[#2A1B0E] hover:text-[#F5E5B5]'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-stone-950' : 'text-[#E4B345] group-hover:scale-110 transition-transform'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive 
                        ? 'bg-stone-950/20 text-stone-950' 
                        : item.badgeAlert 
                          ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                          : 'bg-stone-800 text-stone-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            {/* Manager Switcher Section in sidebar */}
            <div className="pt-6 mt-4 border-t border-stone-800">
              <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-stone-400">
                Switch View Role
              </div>
              <div className="space-y-1">
                <Link
                  to="/admin/dashboard"
                  onClick={() => { setCurrentPersona('admin'); setSidebarOpen(false); }}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs ${
                    isAdmin ? 'text-amber-300 font-bold bg-[#2A1B0E]' : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                  <span>Admin Suite</span>
                </Link>
                <Link
                  to="/manager/online-sales"
                  onClick={() => { setCurrentPersona('online_sales_manager'); setSidebarOpen(false); }}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs ${
                    isOnlineManager ? 'text-blue-300 font-bold bg-[#2A1B0E]' : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5 text-blue-400" />
                  <span>Online Sales Manager</span>
                </Link>
                <Link
                  to="/manager/offline-sales"
                  onClick={() => { setCurrentPersona('offline_sales_manager'); setSidebarOpen(false); }}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs ${
                    isOfflineManager ? 'text-emerald-300 font-bold bg-[#2A1B0E]' : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Offline Sales Manager</span>
                </Link>
                <Link
                  to="/manager/purchase"
                  onClick={() => { setCurrentPersona('purchase_manager'); setSidebarOpen(false); }}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs ${
                    isPurchaseManager ? 'text-rose-300 font-bold bg-[#2A1B0E]' : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <Boxes className="w-3.5 h-3.5 text-rose-400" />
                  <span>Purchase Manager</span>
                </Link>
              </div>
            </div>
          </nav>

          {/* Quick Support / Neon DB info card */}
          <div className="p-3 border-t border-stone-800">
            <div className="bg-[#2B1B0F] border border-[#D89816]/30 rounded-xl p-3 text-[11px] text-stone-300">
              <div className="flex items-center gap-1.5 font-bold text-[#F5E5B5] mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Neon DB Ready</span>
              </div>
              <p className="text-stone-400 text-[10px] leading-relaxed">
                Frontend data layer is reactive with LocalStorage backup. Ready for Neon DB connection string & JWT Auth integration.
              </p>
            </div>
          </div>
        </aside>

        {/* Backdrop for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Content Outlet */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#FAF6EE]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
