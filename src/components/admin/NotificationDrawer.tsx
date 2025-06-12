
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Bell, Trash, Eye, Clock, AlertTriangle, Package, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  isRead: boolean;
  createdAt: string;
  relatedId?: string;
}

const NotificationDrawer = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Kam qolgan mahsulot',
      message: 'Paracetamol 500mg zaxirasi 15 donagacha kamaydi',
      type: 'warning',
      isRead: false,
      createdAt: '2024-06-12T10:30:00Z',
      relatedId: '1'
    },
    {
      id: '2',
      title: 'Yangi buyurtma',
      message: 'Ahmad Karimov tomonidan yangi buyurtma (#001234)',
      type: 'info',
      isRead: false,
      createdAt: '2024-06-12T09:15:00Z',
      relatedId: '001234'
    },
    {
      id: '3',
      title: 'Muddati tugagan dori',
      message: 'Ibuprofen 400mg ning muddati tugaydi (3 kun)',
      type: 'error',
      isRead: true,
      createdAt: '2024-06-12T08:45:00Z',
      relatedId: '2'
    },
    {
      id: '4',
      title: 'Zaxira to\'ldirildi',
      message: 'Vitamin D3 1000IU zaxirasi 100 donaga to\'ldirildi',
      type: 'success',
      isRead: false,
      createdAt: '2024-06-11T16:20:00Z',
      relatedId: '3'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'success':
        return <Package className="h-4 w-4 text-green-500" />;
      default:
        return <ShoppingCart className="h-4 w-4 text-blue-500" />;
    }
  };

  const getNotificationBg = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'success':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const viewDetails = (notification: Notification) => {
    markAsRead(notification.id);
    navigate(`/admin/notifications/${notification.id}`);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} daqiqa oldin`;
    } else if (diffInMinutes < 24 * 60) {
      return `${Math.floor(diffInMinutes / 60)} soat oldin`;
    } else {
      return `${Math.floor(diffInMinutes / (24 * 60))} kun oldin`;
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 min-w-5 flex items-center justify-center text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[80vh]">
        <DrawerHeader>
          <DrawerTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Bildirishnomalar
            {unreadCount > 0 && (
              <Badge variant="destructive">{unreadCount} yangi</Badge>
            )}
          </DrawerTitle>
        </DrawerHeader>
        
        <div className="px-4 pb-4 space-y-3 overflow-y-auto">
          <AnimatePresence>
            {notifications.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Hech qanday bildirishnoma yo'q</p>
              </motion.div>
            ) : (
              notifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`
                    p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md
                    ${getNotificationBg(notification.type)}
                    ${!notification.isRead ? 'ring-2 ring-primary/20' : ''}
                  `}
                  onClick={() => viewDetails(notification)}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm truncate">
                          {notification.title}
                        </h4>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {notification.message}
                      </p>
                      
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {formatTime(notification.createdAt)}
                      </div>
                    </div>
                    
                    <div className="flex gap-1">
                      {!notification.isRead && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsRead(notification.id);
                          }}
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                      )}
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notification.id);
                        }}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                      >
                        <Trash className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
          
          {notifications.length > 0 && (
            <>
              <Separator />
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setNotifications(prev =>
                      prev.map(n => ({ ...n, isRead: true }))
                    );
                  }}
                  disabled={unreadCount === 0}
                >
                  Barchasini o'qilgan deb belgilash
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/admin/notifications')}
                >
                  Barchasini ko'rish
                </Button>
              </div>
            </>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default NotificationDrawer;
