
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, 
  Package,
  TrendingUp,
  DollarSign,
  Users,
  AlertTriangle
} from 'lucide-react';
import SalesManagement from '@/components/admin/SalesManagement';

const PharmacyAdminDashboard = () => {
  const stats = [
    {
      title: "Bugungi sotuv",
      value: "450,000 so'm",
      change: "+15%",
      changeType: "positive",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Sotilgan mahsulotlar",
      value: "24",
      change: "+8%",
      changeType: "positive",
      icon: Package,
      color: "text-blue-600"
    },
    {
      title: "Mijozlar soni",
      value: "18",
      change: "+12%",
      changeType: "positive",
      icon: Users,
      color: "text-purple-600"
    },
    {
      title: "Kam qolgan dorilar",
      value: "5",
      change: "0",
      changeType: "neutral",
      icon: AlertTriangle,
      color: "text-orange-600"
    }
  ];

  const recentSales = [
    {
      id: "SALE001",
      customer: "Ahmad Karimov",
      amount: "25,000 so'm",
      items: 2,
      time: "14:30"
    },
    {
      id: "SALE002",
      customer: "Malika Sultanova",
      amount: "50,000 so'm",
      items: 3,
      time: "13:45"
    },
    {
      id: "SALE003",
      customer: "Bobur Rahimov",
      amount: "18,000 so'm",
      items: 1,
      time: "12:20"
    }
  ];

  const lowStockMedicines = [
    { name: "Paracetamol 500mg", stock: 8, minStock: 20 },
    { name: "Vitamin D3 1000IU", stock: 5, minStock: 20 },
    { name: "Aspirin 100mg", stock: 12, minStock: 15 },
    { name: "Cetirizine 10mg", stock: 6, minStock: 10 },
  ];

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary">Dorixona Boshqaruvi</h1>
        <p className="text-muted-foreground">
          Sotuv va dori zaxiralarini boshqaring
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Umumiy ma'lumot</TabsTrigger>
          <TabsTrigger value="sales">Sotuv</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
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
                  {stat.change !== "0" && (
                    <div className="flex items-center gap-1 text-sm">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-green-600">{stat.change}</span>
                      <span className="text-muted-foreground">kechaga nisbatan</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Sales */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  So'nggi sotuvlar
                </CardTitle>
                <CardDescription>Bugun amalga oshirilgan sotuvlar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSales.map((sale, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{sale.customer}</p>
                        <p className="text-sm text-muted-foreground">
                          {sale.items} ta mahsulot • {sale.time}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{sale.amount}</p>
                        <Badge variant="outline">{sale.id}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Low Stock Alert */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  Kam qolgan dorilar
                </CardTitle>
                <CardDescription>Zaxirasi tugamoqda bo'lgan mahsulotlar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lowStockMedicines.map((medicine, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{medicine.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Min. kerak: {medicine.minStock}
                        </p>
                      </div>
                      <Badge variant="destructive">
                        {medicine.stock} ta qoldi
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sales">
          <SalesManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PharmacyAdminDashboard;
