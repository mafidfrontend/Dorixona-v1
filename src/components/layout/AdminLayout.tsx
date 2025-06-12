
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { AdminSidebar } from './AdminSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { LogOut } from 'lucide-react';
import NotificationDrawer from '@/components/admin/NotificationDrawer';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { logout, user } = useAuth();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />
        <main className="flex-1 flex flex-col">
          {/* Admin Header */}
          <header className="bg-white border-b border-border px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <div>
                  <h1 className="text-xl font-semibold text-primary">Admin Panel</h1>
                  <p className="text-sm text-muted-foreground">
                    Dorixona boshqaruv tizimi
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <NotificationDrawer />
                
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {user?.role?.replace('_', ' ')}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" onClick={logout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Chiqish
                  </Button>
                </div>
              </div>
            </div>
          </header>

          {/* Admin Content */}
          <div className="flex-1 p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
