
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  ShoppingCart, 
  Calendar,
  Settings,
  TrendingUp,
  AlertTriangle,
  Package,
  DollarSign
} from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    {
      title: "Jami buyurtmalar",
      value: "1,234",
      change: "+12%",
      changeType: "positive",
      icon: ShoppingCart,
      color: "text-blue-600"
    },
    {
      title: "Bugungi daromad",
      value: "12,500,000 so'm",
      change: "+8%",
      changeType: "positive",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Jami mijozlar",
      value: "856",
      change: "+23%",
      changeType: "positive",
      icon: Users,
      color: "text-purple-600"
    },
    {
      title: "Mahsulotlar soni",
      value: "342",
      change: "+3%",
      changeType: "positive",
      icon: Package,
      color: "text-orange-600"
    }
  ];

  const alerts = [
    {
      type: "warning",
      title: "Kam qolgan mahsulotlar",
      description: "15 ta mahsulotning zaxirasi tugamoqda",
      count: 15
    },
    {
      type: "danger",
      title: "Muddati tugagan dorilar",
      description: "3 ta dorining muddati tugagan",
      count: 3
    },
    {
      type: "info",
      title: "Yangi buyurtmalar",
      description: "Bugun 24 ta yangi buyurtma keldi",
      count: 24
    }
  ];

  const recentOrders = [
    {
      id: "#001234",
      customer: "Ahmad Karimov",
      amount: "125,000 so'm",
      status: "processing",
      date: "2024-06-12"
    },
    {
      id: "#001235",
      customer: "Malika Sultanova",
      amount: "85,000 so'm",
      status: "shipped",
      date: "2024-06-12"
    },
    {
      id: "#001236",
      customer: "Bobur Rahimov",
      amount: "200,000 so'm",
      status: "delivered",
      date: "2024-06-11"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
        <p className="text-muted-foreground">
          Dorixona tizimi umumiy ko'rinishi
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-1 text-sm">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-green-600">{stat.change}</span>
                <span className="text-muted-foreground">o'tgan oyga nisbatan</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            Muhim bildirishnomalar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    alert.type === 'warning' ? 'bg-yellow-500' :
                    alert.type === 'danger' ? 'bg-red-500' : 'bg-blue-500'
                  }`} />
                  <div>
                    <h4 className="font-medium">{alert.title}</h4>
                    <p className="text-sm text-muted-foreground">{alert.description}</p>
                  </div>
                </div>
                <Badge variant="outline">{alert.count}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>So'nggi buyurtmalar</CardTitle>
              <CardDescription>Eng oxirgi buyurtmalar ro'yxati</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              Barchasini ko'rish
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-medium">{order.amount}</span>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status === 'processing' ? 'Jarayonda' :
                     order.status === 'shipped' ? 'Yuborilgan' : 'Yetkazilgan'}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{order.date}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
