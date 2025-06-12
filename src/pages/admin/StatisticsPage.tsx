
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, DollarSign, Package, Users, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

const StatisticsPage = () => {
  const [timeRange, setTimeRange] = useState('month');

  // Demo ma'lumotlar
  const salesData = [
    { name: 'Yan', sales: 4500000, orders: 45 },
    { name: 'Fev', sales: 5200000, orders: 52 },
    { name: 'Mar', sales: 4800000, orders: 48 },
    { name: 'Apr', sales: 6100000, orders: 61 },
    { name: 'May', sales: 5500000, orders: 55 },
    { name: 'Iyun', sales: 7200000, orders: 72 }
  ];

  const categoryData = [
    { name: 'Og\'riq qoldiruvchi', value: 35, color: '#3B82F6' },
    { name: 'Vitaminlar', value: 25, color: '#10B981' },
    { name: 'Yurak dorilar', value: 20, color: '#F59E0B' },
    { name: 'Antibiotik', value: 15, color: '#EF4444' },
    { name: 'Boshqa', value: 5, color: '#6B7280' }
  ];

  const topMedicines = [
    { name: 'Paracetamol 500mg', sales: 1240, revenue: 6200000 },
    { name: 'Ibuprofen 400mg', sales: 896, revenue: 10752000 },
    { name: 'Vitamin D3 1000IU', sales: 654, revenue: 16350000 },
    { name: 'Aspirin 100mg', sales: 543, revenue: 4344000 },
    { name: 'Cetirizine 10mg', sales: 432, revenue: 3456000 }
  ];

  const stats = [
    {
      title: "Umumiy sotuv",
      value: "32,850,000 so'm",
      change: "+12.5%",
      changeType: "positive",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Buyurtmalar soni",
      value: "333",
      change: "+8.2%",
      changeType: "positive",
      icon: ShoppingCart,
      color: "text-blue-600"
    },
    {
      title: "Sotilgan mahsulotlar",
      value: "3,765",
      change: "+15.3%",
      changeType: "positive",
      icon: Package,
      color: "text-purple-600"
    },
    {
      title: "Faol mijozlar",
      value: "178",
      change: "+23.1%",
      changeType: "positive",
      icon: Users,
      color: "text-orange-600"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Statistika</h1>
          <p className="text-muted-foreground">Sotuv va faoliyat statistikalari</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Vaqt oralig'i" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">So'nggi hafta</SelectItem>
            <SelectItem value="month">So'nggi oy</SelectItem>
            <SelectItem value="quarter">So'nggi 3 oy</SelectItem>
            <SelectItem value="year">So'nggi yil</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Oylik sotuv statistikasi</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'sales' ? `${Number(value).toLocaleString()} so'm` : value,
                    name === 'sales' ? 'Sotuv' : 'Buyurtmalar'
                  ]}
                />
                <Bar dataKey="sales" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Kategoriya bo'yicha taqsimot</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Orders Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Buyurtmalar tendensiyasi</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="orders" stroke="#10B981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Medicines */}
      <Card>
        <CardHeader>
          <CardTitle>Eng ko'p sotilgan dorilar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topMedicines.map((medicine, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium">{medicine.name}</p>
                    <p className="text-sm text-muted-foreground">{medicine.sales} ta sotilgan</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">{medicine.revenue.toLocaleString()} so'm</p>
                  <p className="text-sm text-muted-foreground">Daromad</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatisticsPage;
