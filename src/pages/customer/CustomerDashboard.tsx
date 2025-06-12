
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  ShoppingCart, 
  Clock,
  Star,
  TrendingUp,
  Package
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/customer/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  const featuredMedicines = [
    {
      id: '1',
      name: 'Paracetamol 500mg',
      type: 'tablet',
      price: 5000,
      rating: 4.8,
      inStock: true,
      image: '/placeholder.svg'
    },
    {
      id: '2',
      name: 'Ibuprofen 400mg',
      type: 'tablet',
      price: 12000,
      rating: 4.6,
      inStock: true,
      image: '/placeholder.svg'
    },
    {
      id: '3',
      name: 'Vitamin D3',
      type: 'tablet',
      price: 25000,
      rating: 4.9,
      inStock: false,
      image: '/placeholder.svg'
    },
    {
      id: '4',
      name: 'Aspirin 100mg',
      type: 'tablet',
      price: 8000,
      rating: 4.7,
      inStock: true,
      image: '/placeholder.svg'
    }
  ];

  const recentOrders = [
    {
      id: '#001234',
      date: '2024-06-10',
      status: 'delivered',
      total: '45,000 so\'m',
      items: 3
    },
    {
      id: '#001235',
      date: '2024-06-08',
      status: 'shipped',
      total: '120,000 so\'m',
      items: 5
    }
  ];

  const categories = [
    { name: 'Og\'riq qoldiruvchi', icon: '💊', count: 45 },
    { name: 'Vitamin va minerallar', icon: '🌿', count: 32 },
    { name: 'Antibiotik', icon: '🦠', count: 28 },
    { name: 'Yurak dorilar', icon: '❤️', count: 19 },
    { name: 'Bosh og\'rig\'i', icon: '🧠', count: 23 },
    { name: 'Oshqozon dorilar', icon: '🫁', count: 16 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-8 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl"
      >
        <h1 className="text-3xl font-bold text-primary mb-2">
          Dorixonaga xush kelibsiz!
        </h1>
        <p className="text-muted-foreground mb-6">
          Sog'liq uchun kerakli dorilarni toping
        </p>
        
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="max-w-md mx-auto flex gap-2"
        >
          <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Dori nomi yoki kasallik bo'yicha qidiring..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit">Qidirish</Button>
          </form>
        </motion.div>
      </motion.div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold mb-4">Kategoriyalar</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <h3 className="font-medium text-sm mb-1">{category.name}</h3>
                  <p className="text-xs text-muted-foreground">{category.count} mahsulot</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Featured Medicines */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Tavsiya etilgan dorilar</h2>
          <Button variant="outline" onClick={() => navigate('/customer/medicines')}>
            Barchasini ko'rish
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredMedicines.map((medicine, index) => (
            <motion.div
              key={medicine.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ scale: 1.02, boxShadow: "0 8px 25px rgba(0,0,0,0.1)" }}
            >
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center"
                  >
                    <Package className="h-8 w-8 text-muted-foreground" />
                  </motion.div>
                  
                  <h3 className="font-semibold mb-1">{medicine.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2 capitalize">{medicine.type}</p>
                  
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{medicine.rating}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-lg">{medicine.price.toLocaleString()} so'm</span>
                    <Badge variant={medicine.inStock ? "default" : "secondary"}>
                      {medicine.inStock ? "Mavjud" : "Tugagan"}
                    </Badge>
                  </div>
                  
                  <motion.div whileTap={{ scale: 0.95 }}>
                    <Button 
                      className="w-full" 
                      disabled={!medicine.inStock}
                      size="sm"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Savatga qo'shish
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">So'nggi buyurtmalar</h2>
          <Button variant="outline">Barcha buyurtmalar</Button>
        </div>
        
        <div className="space-y-4">
          {recentOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ scale: 1.01 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-semibold">{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{order.items} ta mahsulot</p>
                        <p className="font-medium">{order.total}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={order.status === 'delivered' ? 'default' : 'secondary'}>
                        {order.status === 'delivered' ? 'Yetkazilgan' : 'Yuborilgan'}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Ko'rish
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CustomerDashboard;
