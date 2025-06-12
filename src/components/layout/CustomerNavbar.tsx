
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  Search, 
  ShoppingCart, 
  User,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const CustomerNavbar = () => {
  const location = useLocation();
  const { logout, user, isAuthenticated } = useAuth();
  const cartItemsCount = 3; // Demo uchun

  const navItems = [
    { path: '/customer', label: 'Bosh sahifa', icon: Home },
    { path: '/customer/medicines', label: 'Dorilar', icon: Search },
    { path: '/customer/cart', label: 'Savat', icon: ShoppingCart, badge: cartItemsCount },
    { path: '/customer/orders', label: 'Buyurtmalar', icon: User },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white border-b border-border sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/customer" className="flex items-center space-x-2">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="w-8 h-8 bg-primary rounded-full flex items-center justify-center"
            >
              <span className="text-white font-bold text-sm">D</span>
            </motion.div>
            <span className="font-bold text-xl text-primary">Dorixona</span>
          </Link>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors relative",
                  location.pathname === item.path
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-primary hover:bg-muted"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
                {item.badge && item.badge > 0 && (
                  <Badge variant="destructive" className="ml-1 h-5 min-w-5 flex items-center justify-center text-xs">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-muted-foreground hidden sm:block">
                  Salom, {user?.name}
                </span>
                <Button variant="outline" size="sm" onClick={logout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Chiqish
                </Button>
              </>
            ) : (
              <Button asChild size="sm">
                <Link to="/auth">Kirish</Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-border">
        <div className="flex justify-around py-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 text-xs relative",
                location.pathname === item.path
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
              {item.badge && item.badge > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 min-w-4 flex items-center justify-center text-xs">
                  {item.badge}
                </Badge>
              )}
            </Link>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default CustomerNavbar;
