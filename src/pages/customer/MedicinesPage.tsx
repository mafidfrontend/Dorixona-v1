
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, ShoppingCart, Star, Package, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import Loading from '@/components/ui/loading';
import { Medicine } from '@/types';

const MedicinesPage = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [filteredMedicines, setFilteredMedicines] = useState<Medicine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  // Demo dorilar ro'yxati
  const allMedicines: Medicine[] = [
    {
      id: '1',
      name: 'Paracetamol 500mg',
      description: 'Og\'riq qoldiruvchi va isitma tushiruvchi dori',
      manufacturer: 'Pharmstandard',
      dosage: '500mg',
      type: 'tablet',
      price: 5000,
      stock: 100,
      expiryDate: '2025-12-31',
      category: 'Og\'riq qoldiruvchi',
      batchNumber: 'PAR001',
      minStockLevel: 10
    },
    {
      id: '2',
      name: 'Ibuprofen 400mg',
      description: 'Yallig\'lanishga qarshi va og\'riq qoldiruvchi',
      manufacturer: 'Bayer',
      dosage: '400mg',
      type: 'tablet',
      price: 12000,
      stock: 75,
      expiryDate: '2025-10-15',
      category: 'Og\'riq qoldiruvchi',
      batchNumber: 'IBU002',
      minStockLevel: 15
    },
    {
      id: '3',
      name: 'Vitamin D3 1000IU',
      description: 'Vitamin D tanqisligi uchun',
      manufacturer: 'Solgar',
      dosage: '1000IU',
      type: 'tablet',
      price: 25000,
      stock: 50,
      expiryDate: '2026-03-20',
      category: 'Vitaminlar',
      batchNumber: 'VIT003',
      minStockLevel: 20
    },
    {
      id: '4',
      name: 'Aspirin 100mg',
      description: 'Yurak va qon tomirlari uchun',
      manufacturer: 'Aspirin',
      dosage: '100mg',
      type: 'tablet',
      price: 8000,
      stock: 150,
      expiryDate: '2025-08-10',
      category: 'Yurak dorilar',
      batchNumber: 'ASP004',
      minStockLevel: 25
    },
    {
      id: '5',
      name: 'Amoxicillin 500mg',
      description: 'Bakterial infeksiyalar uchun antibiotik',
      manufacturer: 'Antibiotex',
      dosage: '500mg',
      type: 'tablet',
      price: 18000,
      stock: 80,
      expiryDate: '2025-09-15',
      category: 'Antibiotik',
      batchNumber: 'AMX005',
      minStockLevel: 30
    },
    {
      id: '6',
      name: 'Omeprazole 20mg',
      description: 'Oshqozon kislotasini kamaytiradi',
      manufacturer: 'Gastro Med',
      dosage: '20mg',
      type: 'tablet',
      price: 15000,
      stock: 60,
      expiryDate: '2025-11-20',
      category: 'Oshqozon dorilar',
      batchNumber: 'OME006',
      minStockLevel: 20
    }
  ];

  const categories = [
    'Og\'riq qoldiruvchi',
    'Vitaminlar',
    'Yurak dorilar',
    'Antibiotik',
    'Oshqozon dorilar'
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setMedicines(allMedicines);
      setFilteredMedicines(allMedicines);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = medicines;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(medicine =>
        medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        medicine.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(medicine => medicine.category === selectedCategory);
    }

    // Price filter
    if (priceRange !== 'all') {
      switch (priceRange) {
        case 'low':
          filtered = filtered.filter(medicine => medicine.price < 10000);
          break;
        case 'medium':
          filtered = filtered.filter(medicine => medicine.price >= 10000 && medicine.price <= 20000);
          break;
        case 'high':
          filtered = filtered.filter(medicine => medicine.price > 20000);
          break;
      }
    }

    setFilteredMedicines(filtered);
  }, [searchQuery, selectedCategory, priceRange, medicines]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loading size="lg" text="Dorilar yuklanmoqda..." />
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
        <h1 className="text-3xl font-bold text-primary mb-2">Barcha dorilar</h1>
        <p className="text-muted-foreground">
          Bizning dorilar katalogida kerakli dorini toping
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Qidirish</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Dori nomi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Kategoriya</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Kategoriya tanlang" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Barcha kategoriyalar</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Narx oralig'i</label>
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Narx tanlang" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Barcha narxlar</SelectItem>
                  <SelectItem value="low">10,000 so'm gacha</SelectItem>
                  <SelectItem value="medium">10,000 - 20,000 so'm</SelectItem>
                  <SelectItem value="high">20,000 so'm dan yuqori</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {filteredMedicines.length} ta dori topildi
        </h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Filter className="h-4 w-4" />
          Filtrlash
        </div>
      </div>

      {/* Medicines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMedicines.map((medicine, index) => (
          <motion.div
            key={medicine.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                  <Package className="h-8 w-8 text-muted-foreground" />
                </div>
                
                <h3 className="font-semibold mb-1">{medicine.name}</h3>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                  {medicine.description}
                </p>
                <p className="text-xs text-muted-foreground mb-2">
                  {medicine.manufacturer}
                </p>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-lg">
                    {medicine.price.toLocaleString()} so'm
                  </span>
                  <Badge variant={medicine.stock > 0 ? "default" : "secondary"}>
                    {medicine.stock > 0 ? `${medicine.stock} ta` : "Tugagan"}
                  </Badge>
                </div>
                
                <Button 
                  className="w-full" 
                  disabled={medicine.stock === 0}
                  size="sm"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Savatga qo'shish
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredMedicines.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Hech narsa topilmadi</h3>
          <p className="text-muted-foreground">
            Filtrlash shartlarini o'zgartirib ko'ring
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default MedicinesPage;
