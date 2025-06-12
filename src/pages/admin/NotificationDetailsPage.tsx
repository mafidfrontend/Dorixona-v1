
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Clock, AlertTriangle, Package, ShoppingCart, Eye, Trash } from 'lucide-react';
import { motion } from 'framer-motion';

const NotificationDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Demo notification ma'lumotlari
  const notification = {
    id: '1',
    title: 'Kam qolgan mahsulot',
    message: 'Paracetamol 500mg zaxirasi 15 donagacha kamaydi. Minimal zaxira darajasi 20 dona. Zudlik bilan to\'ldirish kerak.',
    type: 'warning',
    isRead: false,
    createdAt: '2024-06-12T10:30:00Z',
    relatedId: '1',
    details: {
      medicineName: 'Paracetamol 500mg',
      currentStock: 15,
      minStockLevel: 20,
      lastRestocked: '2024-06-01',
      supplier: 'Pharmstandard',
      category: 'Og\'riq qoldiruvchi'
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
      case 'error':
        return <AlertTriangle className="h-6 w-6 text-red-500" />;
      case 'success':
        return <Package className="h-6 w-6 text-green-500" />;
      default:
        return <ShoppingCart className="h-6 w-6 text-blue-500" />;
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

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uz-UZ') + ' ' + date.toLocaleTimeString('uz-UZ');
  };

  const handleMarkAsRead = () => {
    console.log('Marking as read:', id);
    // Implement mark as read logic
  };

  const handleDelete = () => {
    console.log('Deleting notification:', id);
    navigate('/admin');
  };

  const handleViewMedicine = () => {
    navigate(`/admin/medicines`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => navigate('/admin')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Orqaga
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-primary">Bildirishnoma tafsilotlari</h1>
            <p className="text-muted-foreground">#{notification.id}</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          {!notification.isRead && (
            <Button variant="outline" size="sm" onClick={handleMarkAsRead}>
              <Eye className="h-4 w-4 mr-2" />
              O'qilgan deb belgilash
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={handleDelete}>
            <Trash className="h-4 w-4 mr-2" />
            O'chirish
          </Button>
        </div>
      </div>

      {/* Notification Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Main Notification */}
          <Card className={`${getNotificationBg(notification.type)} border-2`}>
            <CardHeader>
              <div className="flex items-start gap-3">
                {getNotificationIcon(notification.type)}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-lg">{notification.title}</CardTitle>
                    <Badge variant={notification.type === 'warning' ? 'destructive' : 'default'}>
                      {notification.type === 'warning' ? 'Ogohlantirish' : 
                       notification.type === 'error' ? 'Xato' :
                       notification.type === 'success' ? 'Muvaffaqiyat' : 'Ma\'lumot'}
                    </Badge>
                    {!notification.isRead && (
                      <Badge variant="outline">Yangi</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {formatDateTime(notification.createdAt)}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-relaxed">{notification.message}</p>
            </CardContent>
          </Card>

          {/* Related Medicine Details */}
          {notification.details && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Mahsulot tafsilotlari
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Dori nomi</p>
                    <p className="font-semibold">{notification.details.medicineName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Kategoriya</p>
                    <p className="font-semibold">{notification.details.category}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Joriy zaxira</p>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-red-600">{notification.details.currentStock} dona</p>
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Minimal daraja</p>
                    <p className="font-semibold">{notification.details.minStockLevel} dona</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Ishlab chiqaruvchi</p>
                    <p className="font-semibold">{notification.details.supplier}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Oxirgi to'ldirish</p>
                    <p className="font-semibold">{notification.details.lastRestocked}</p>
                  </div>
                </div>
                
                <Separator />
                
                <Button onClick={handleViewMedicine} className="w-full">
                  Mahsulotni ko'rish va tahrirlash
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Amallar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full" onClick={handleViewMedicine}>
                <Package className="h-4 w-4 mr-2" />
                Mahsulotni ko'rish
              </Button>
              <Button variant="outline" className="w-full">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Boshqa ogohlantirishlar
              </Button>
              <Button variant="outline" className="w-full">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Buyurtma berish
              </Button>
            </CardContent>
          </Card>

          {/* Related Information */}
          <Card>
            <CardHeader>
              <CardTitle>Qo'shimcha ma'lumot</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm">
                  <strong>Tavsiya:</strong> Zaxira 20 dona ostida bo'lganda avtomatik ogohlantirish yuboriladi.
                </p>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm">
                  <strong>Eslatma:</strong> Ushbu mahsulot yuqori talab ko'riladi. Zudlik bilan to'ldiring.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default NotificationDetailsPage;
