
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  Calendar,
  MapPin,
  Phone
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const CustomerOrdersPage = () => {
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = React.useState('');

  // Agar foydalanuvchi autentifikatsiya qilinmagan bo'lsa, auth sahifasiga yo'naltirish
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  const orders = [
    {
      id: '#001234',
      date: '2024-06-10',
      status: 'delivered',
      total: 45000,
      items: [
        { name: 'Paracetamol 500mg', quantity: 2, price: 5000 },
        { name: 'Ibuprofen 400mg', quantity: 1, price: 12000 },
        { name: 'Vitamin D3', quantity: 1, price: 25000 }
      ],
      deliveryAddress: 'Toshkent sh., Yunusobod tumani, 12-uy, 45-kvartira',
      phone: '+998 90 123 45 67',
      deliveredAt: '2024-06-10 14:30'
    },
    {
      id: '#001235',
      date: '2024-06-08',
      status: 'shipped',
      total: 120000,
      items: [
        { name: 'Aspirin 100mg', quantity: 3, price: 8000 },
        { name: 'Vitamin C', quantity: 2, price: 15000 },
        { name: 'Omega 3', quantity: 1, price: 65000 }
      ],
      deliveryAddress: 'Toshkent sh., Mirzo Ulug\'bek tumani, 5-uy, 12-kvartira',
      phone: '+998 90 987 65 43',
      estimatedDelivery: '2024-06-12'
    },
    {
      id: '#001236',
      date: '2024-06-06',
      status: 'processing',
      total: 35000,
      items: [
        { name: 'Throat lozenges', quantity: 2, price: 8000 },
        { name: 'Cough syrup', quantity: 1, price: 19000 }
      ],
      deliveryAddress: 'Toshkent sh., Shayxontohur tumani, 8-uy, 23-kvartira',
      phone: '+998 90 555 44 33'
    },
    {
      id: '#001237',
      date: '2024-06-04',
      status: 'cancelled',
      total: 28000,
      items: [
        { name: 'Bandage', quantity: 5, price: 3000 },
        { name: 'Antiseptic', quantity: 1, price: 13000 }
      ],
      deliveryAddress: 'Toshkent sh., Bektemir tumani, 15-uy, 8-kvartira',
      phone: '+998 90 111 22 33',
      cancelledAt: '2024-06-05 09:15',
      cancelReason: 'Mijoz tomonidan bekor qilindi'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Yetkazilgan</Badge>;
      case 'shipped':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Yuborilgan</Badge>;
      case 'processing':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Tayyorlanmoqda</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Bekor qilingan</Badge>;
      default:
        return <Badge variant="secondary">Noma'lum</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-blue-600" />;
      case 'processing':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Package className="h-5 w-5 text-gray-600" />;
    }
  };

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-primary mb-2">Buyurtmalarim</h1>
        <p className="text-muted-foreground">Barcha buyurtmalaringizni kuzating</p>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative max-w-md"
      >
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Buyurtma raqami yoki mahsulot nomi..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </motion.div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground mb-2">
              Buyurtmalar topilmadi
            </h3>
            <p className="text-sm text-muted-foreground">
              Qidiruv so'zingizni o'zgartirib ko'ring
            </p>
          </motion.div>
        ) : (
          filteredOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ scale: 1.01 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(order.status)}
                      <div>
                        <CardTitle className="text-lg">{order.id}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {order.date}
                        </CardDescription>
                      </div>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Items */}
                  <div>
                    <h4 className="font-medium mb-2">Mahsulotlar:</h4>
                    <div className="space-y-2">
                      {order.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex justify-between items-center text-sm">
                          <span>{item.name} x{item.quantity}</span>
                          <span className="font-medium">{(item.price * item.quantity).toLocaleString()} so'm</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Yetkazib berish manzili:</p>
                        <p className="text-sm text-muted-foreground">{order.deliveryAddress}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Telefon:</p>
                        <p className="text-sm text-muted-foreground">{order.phone}</p>
                      </div>
                    </div>
                  </div>

                  {/* Status specific info */}
                  {order.status === 'delivered' && order.deliveredAt && (
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-sm text-green-800">
                        <CheckCircle className="h-4 w-4 inline mr-1" />
                        {order.deliveredAt} da yetkazilgan
                      </p>
                    </div>
                  )}

                  {order.status === 'shipped' && order.estimatedDelivery && (
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <Truck className="h-4 w-4 inline mr-1" />
                        Taxminiy yetkazib berish sanasi: {order.estimatedDelivery}
                      </p>
                    </div>
                  )}

                  {order.status === 'cancelled' && order.cancelReason && (
                    <div className="bg-red-50 p-3 rounded-lg">
                      <p className="text-sm text-red-800">
                        <XCircle className="h-4 w-4 inline mr-1" />
                        Bekor qilish sababi: {order.cancelReason}
                      </p>
                      {order.cancelledAt && (
                        <p className="text-xs text-red-600 mt-1">{order.cancelledAt} da bekor qilindi</p>
                      )}
                    </div>
                  )}

                  {/* Total and Actions */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <p className="text-sm text-muted-foreground">Jami summa:</p>
                      <p className="text-lg font-bold">{order.total.toLocaleString()} so'm</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Batafsil
                      </Button>
                      {order.status === 'delivered' && (
                        <Button size="sm">
                          Qayta buyurtma
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default CustomerOrdersPage;
