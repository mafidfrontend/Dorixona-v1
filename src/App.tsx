import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import MedicinesPage from "./pages/customer/MedicinesPage";
import SearchPage from "./pages/customer/SearchPage";
import CartPage from "./pages/customer/CartPage";
import CustomerOrdersPage from "./pages/customer/CustomerOrdersPage";
import AdminMedicinesPage from "./pages/admin/MedicinesPage";
import OrdersPage from "./pages/admin/OrdersPage";
import CustomersPage from "./pages/admin/CustomersPage";
import InventoryPage from "./pages/admin/InventoryPage";
import StatisticsPage from "./pages/admin/StatisticsPage";
import NotificationDetailsPage from "./pages/admin/NotificationDetailsPage";
import AdminLayout from "./components/layout/AdminLayout";
import CustomerLayout from "./components/layout/CustomerLayout";
import NotFound from "./pages/NotFound";
import PharmacyAdminDashboard from "./pages/admin/PharmacyAdminDashboard";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, allowedRoles }: { 
  children: React.ReactNode; 
  allowedRoles: string[] 
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  const { isAuthenticated, user } = useAuth();

  // Public customer routes - foydalanuvchi autentifikatsiya qilinmagan bo'lsa ham home pagega kirishi mumkin
  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/customer" element={
          <CustomerLayout>
            <CustomerDashboard />
          </CustomerLayout>
        } />
        <Route path="/customer/medicines" element={
          <CustomerLayout>
            <MedicinesPage />
          </CustomerLayout>
        } />
        <Route path="/customer/search" element={
          <CustomerLayout>
            <SearchPage />
          </CustomerLayout>
        } />
        <Route path="/customer/cart" element={
          <CustomerLayout>
            <CartPage />
          </CustomerLayout>
        } />
        <Route path="/customer/orders" element={
          <CustomerLayout>
            <CustomerOrdersPage />
          </CustomerLayout>
        } />
        <Route path="/" element={<Navigate to="/customer" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  // Admin rollar uchun admin panelga yo'naltirish
  if (user && ['super_admin', 'pharmacy_admin', 'warehouse', 'operator'].includes(user.role)) {
    return (
      <Routes>
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['super_admin', 'pharmacy_admin', 'warehouse', 'operator']}>
            <AdminLayout>
              {user.role === 'pharmacy_admin' ? <PharmacyAdminDashboard /> : <AdminDashboard />}
            </AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/medicines" element={
          <ProtectedRoute allowedRoles={['super_admin', 'pharmacy_admin', 'warehouse', 'operator']}>
            <AdminLayout>
              <AdminMedicinesPage />
            </AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/orders" element={
          <ProtectedRoute allowedRoles={['super_admin', 'pharmacy_admin', 'warehouse', 'operator']}>
            <AdminLayout>
              <OrdersPage />
            </AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/customers" element={
          <ProtectedRoute allowedRoles={['super_admin', 'pharmacy_admin', 'warehouse', 'operator']}>
            <AdminLayout>
              <CustomersPage />
            </AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/inventory" element={
          <ProtectedRoute allowedRoles={['super_admin', 'pharmacy_admin', 'warehouse', 'operator']}>
            <AdminLayout>
              <InventoryPage />
            </AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/analytics" element={
          <ProtectedRoute allowedRoles={['super_admin', 'pharmacy_admin', 'warehouse', 'operator']}>
            <AdminLayout>
              <StatisticsPage />
            </AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/notifications/:id" element={
          <ProtectedRoute allowedRoles={['super_admin', 'pharmacy_admin', 'warehouse', 'operator']}>
            <AdminLayout>
              <NotificationDetailsPage />
            </AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  // Mijozlar uchun mijoz panelga yo'naltirish
  return (
    <Routes>
      <Route path="/customer" element={
        <ProtectedRoute allowedRoles={['customer']}>
          <CustomerLayout>
            <CustomerDashboard />
          </CustomerLayout>
        </ProtectedRoute>
      } />
      <Route path="/customer/medicines" element={
        <ProtectedRoute allowedRoles={['customer']}>
          <CustomerLayout>
            <MedicinesPage />
          </CustomerLayout>
        </ProtectedRoute>
      } />
      <Route path="/customer/search" element={
        <ProtectedRoute allowedRoles={['customer']}>
          <CustomerLayout>
            <SearchPage />
          </CustomerLayout>
        </ProtectedRoute>
      } />
      <Route path="/customer/cart" element={
        <ProtectedRoute allowedRoles={['customer']}>
          <CustomerLayout>
            <CartPage />
          </CustomerLayout>
        </ProtectedRoute>
      } />
      <Route path="/customer/orders" element={
        <ProtectedRoute allowedRoles={['customer']}>
          <CustomerLayout>
            <CustomerOrdersPage />
          </CustomerLayout>
        </ProtectedRoute>
      } />
      <Route path="/" element={<Navigate to="/customer" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
