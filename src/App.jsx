import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ToastContainer } from './components/common/ToastContainer';
import { PersonaSwitcher } from './components/common/PersonaSwitcher';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AdminLayout } from './components/layout/AdminLayout';

// User-Side Pages
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetails } from './pages/ProductDetails';
import { AboutUs } from './pages/AboutUs';
import { Blog } from './pages/Blog';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { UserProfile } from './pages/UserProfile';
import { OrderHistory } from './pages/OrderHistory';
import { ContactUs } from './pages/ContactUs';
import { FAQs } from './pages/FAQs';

// Admin-Side Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { TeamManagement } from './pages/admin/TeamManagement';
import { ProductManagement } from './pages/admin/ProductManagement';
import { OrderManagement } from './pages/admin/OrderManagement';
import { CustomerManagement } from './pages/admin/CustomerManagement';
import { ContentManagement } from './pages/admin/ContentManagement';
import { CouponsManagement } from './pages/admin/CouponsManagement';
import { ReviewsModeration } from './pages/admin/ReviewsModeration';
import { AdminSettings } from './pages/admin/AdminSettings';

// Online Sales Manager Pages
import { OnlineSalesDashboard } from './pages/manager/OnlineSalesDashboard';
import { OnlineOrders } from './pages/manager/OnlineOrders';
import { OnlineCustomers } from './pages/manager/OnlineCustomers';
import { OnlineCoupons } from './pages/manager/OnlineCoupons';
import { OnlineReviews } from './pages/manager/OnlineReviews';

// Offline Sales Manager Pages
import { OfflineSalesDashboard } from './pages/manager/OfflineSalesDashboard';
import { OfflineOrders } from './pages/manager/OfflineOrders';
import { OfflineCustomers } from './pages/manager/OfflineCustomers';

// Purchase Manager Pages
import { PurchaseDashboard } from './pages/manager/PurchaseDashboard';
import { PurchaseRawMaterials } from './pages/manager/PurchaseRawMaterials';
import { PurchaseSettings } from './pages/manager/PurchaseSettings';

// Customer layout wrapper
const CustomerLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9F2] w-full max-w-full overflow-x-hidden">
      <Navbar />
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

// Admin / Manager layout wrapper
const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col w-full max-w-full overflow-x-hidden">
      <PersonaSwitcher />
      <AdminLayout />
    </div>
  );
};

export const App = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Customer-Facing Storefront & User Portal */}
          <Route element={<CustomerLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/user/profile" element={<UserProfile />} />
            <Route path="/user/orders" element={<OrderHistory />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/faqs" element={<FAQs />} />
          </Route>

          {/* Admin-Side Pages */}
          <Route path="/admin" element={<DashboardLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="team" element={<TeamManagement />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="orders" element={<OrderManagement />} />
            <Route path="customers" element={<CustomerManagement />} />
            <Route path="content" element={<ContentManagement />} />
            <Route path="coupons" element={<CouponsManagement />} />
            <Route path="reviews" element={<ReviewsModeration />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Online Sales Manager Pages */}
          <Route path="/manager/online-sales" element={<DashboardLayout />}>
            <Route index element={<OnlineSalesDashboard />} />
            <Route path="orders" element={<OnlineOrders />} />
            <Route path="customers" element={<OnlineCustomers />} />
            <Route path="coupons" element={<OnlineCoupons />} />
            <Route path="reviews" element={<OnlineReviews />} />
          </Route>

          {/* Offline Sales Manager Pages */}
          <Route path="/manager/offline-sales" element={<DashboardLayout />}>
            <Route index element={<OfflineSalesDashboard />} />
            <Route path="orders" element={<OfflineOrders />} />
            <Route path="customers" element={<OfflineCustomers />} />
          </Route>

          {/* Purchase Manager Pages */}
          <Route path="/manager/purchase" element={<DashboardLayout />}>
            <Route index element={<PurchaseDashboard />} />
            <Route path="raw-materials" element={<PurchaseRawMaterials />} />
            <Route path="settings" element={<PurchaseSettings />} />
          </Route>

          {/* Fallback to home */}
          <Route path="*" element={<CustomerLayout />}>
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
