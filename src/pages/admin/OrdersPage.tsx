
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Eye, Package, Clock, CheckCircle, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Loading from '@/components/ui/loading';
import { Order } from '@/types';

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Demo buyurtmalar ro'yxati
  const allOrders: Order[] = [
    {
      id: 'ORD001',
      customerId: '1',
      customerName: 'Ahmad Karimov',
      customerPhone: '+998901234567',
      items: [
        { medicineId: '1', medicineName: 'Paracetamol 500mg', quantity: 2, price: 5000, totalPrice: 10000 },
        { medicineId: '2', medicineName: 'Ibuprofen 400mg', quantity: 1, price: 12000, totalPrice: 12000 }
      ],
      totalAmount: 22000,
      status: 'new',
      shippingAddress: 'Toshkent shahar, Yunusobod tumani',
      orderDate: '2024-06-12T10:30:00Z',
      notes: 'Tezroq yetkazib bering'
    },
    {
      id: 'ORD002',
      customerId: '2',
      customerName: 'Malika Sultanova',
      customerPhone: '+998909876543',
      items: [
        { medicineId: '3', medicineName: 'Vitamin D3 1000IU', quantity: 1, price: 25000, totalPrice: 25000 }
      ],
      totalAmount: 25000,
      status: 'processing',
      shippingAddress: 'Samarqand shahar, Registon ko\'chasi',
      orderDate: '2024-06-11T15:45:00Z'
    },
    {
      id: 'ORD003',
      customerId: '3',
      customerName: 'Bobur Rahimov',
      customerPhone: '+998905555555',
      items: [
        { medicineId: '1', medicineName: 'Paracetamol 500mg', quantity: 3, price: 5000, totalPrice: 15000 },
        { medicineId: '2', medicineName: 'Ibuprofen 400mg', quantity: 2, price: 12000, totalPrice: 24000 }
      ],
      totalAmount: 39000,
      status: 'delivered',
      shippingAddress: 'Buxoro shahar, Lyabi-Hauz',
      orderDate: '2024-06-10T09:20:00Z',
      deliveryDate: '2024-06-11T14:30:00Z'
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setOrders(allOrders);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const statusMap = {
      new: { label: 'Yangi', variant: 'default' as const },
      processing: { label: 'Jarayonda', variant: 'secondary' as const },
      shipped: { label: 'Yuborilgan', variant: 'outline' as const },
      delivered: { label: 'Yetkazilgan', variant: 'default' as const },
      cancelled: { label: 'Bekor qilingan', variant: 'destructive' as const }
    };
    const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.new;
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <Clock className="h-4 w-4 text-blue-500" />;
      case 'processing': return <Package className="h-4 w-4 text-yellow-500" />;
      case 'delivered': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'cancelled': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loading size="lg" text="Buyurtmalar yuklanmoqda..." />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary">Buyurtmalar</h1>
        <p className="text-muted-foreground">Barcha buyurtmalarni boshqaring</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Yangi buyurtmalar</p>
                <p className="text-2xl font-bold">{orders.filter(o => o.status === 'new').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-sm text-muted-foreground">Jarayonda</p>
                <p className="text-2xl font-bold">{orders.filter(o => o.status === 'processing').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Yetkazilgan</p>
                <p className="text-2xl font-bold">{orders.filter(o => o.status === 'delivered').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div>
              <p className="text-sm text-muted-foreground">Jami summa</p>
              <p className="text-2xl font-bold">
                {orders.reduce((sum, order) => sum + order.totalAmount, 0).toLocaleString()} so'm
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buyurtma ID yoki mijoz nomi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Barcha statuslar</SelectItem>
                <SelectItem value="new">Yangi</SelectItem>
                <SelectItem value="processing">Jarayonda</SelectItem>
                <SelectItem value="shipped">Yuborilgan</SelectItem>
                <SelectItem value="delivered">Yetkazilgan</SelectItem>
                <SelectItem value="cancelled">Bekor qilingan</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Buyurtmalar ro'yxati ({filteredOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Buyurtma ID</TableHead>
                <TableHead>Mijoz</TableHead>
                <TableHead>Mahsulotlar</TableHead>
                <TableHead>Umumiy summa</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sana</TableHead>
                <TableHead>Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.customerName}</p>
                      <p className="text-sm text-muted-foreground">{order.customerPhone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {order.items.map((item, index) => (
                        <div key={index} className="text-sm">
                          {item.medicineName} x{item.quantity}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {order.totalAmount.toLocaleString()} so'm
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      {getStatusBadge(order.status)}
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(order.orderDate).toLocaleDateString('uz-UZ')}
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default OrdersPage;
