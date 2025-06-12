
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, ShoppingCart, Star, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Loading from '@/components/ui/loading';
import { Medicine } from '@/types';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [isLoading, setIsLoading] = useState(false);
  const [medicines, setMedicines] = useState<Medicine[]>([]);

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
      stock: 0,
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
    }
  ];

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
      performSearch(query);
    }
  }, [searchParams]);

  const performSearch = async (query: string) => {
    setIsLoading(true);
    
    // Simulyatsiya qilish uchun timeout
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const filtered = allMedicines.filter(medicine =>
      medicine.name.toLowerCase().includes(query.toLowerCase()) ||
      medicine.description.toLowerCase().includes(query.toLowerCase()) ||
      medicine.category.toLowerCase().includes(query.toLowerCase())
    );
    
    setMedicines(filtered);
    setIsLoading(false);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      performSearch(searchQuery.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Search Header */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6">
        <h1 className="text-2xl font-bold text-primary mb-4">Dori qidirish</h1>
        <div className="flex gap-2 max-w-md">
          <Input
            placeholder="Dori nomi yoki kasallik bo'yicha qidiring..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button onClick={handleSearch}>
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Search Results */}
      <div>
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loading size="lg" text="Qidirilmoqda..." />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                Qidiruv natijalari: "{searchQuery}"
              </h2>
              <span className="text-muted-foreground">
                {medicines.length} ta natija topildi
              </span>
            </div>

            <AnimatePresence>
              {medicines.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Hech narsa topilmadi</h3>
                  <p className="text-muted-foreground">
                    Boshqa so'z bilan qidirib ko'ring
                  </p>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {medicines.map((medicine, index) => (
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
                          <p className="text-sm text-muted-foreground mb-2">{medicine.description}</p>
                          
                          <div className="flex items-center gap-1 mb-2">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">4.5</span>
                          </div>
                          
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-bold text-lg">{medicine.price.toLocaleString()} so'm</span>
                            <Badge variant={medicine.stock > 0 ? "default" : "secondary"}>
                              {medicine.stock > 0 ? "Mavjud" : "Tugagan"}
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
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default SearchPage;
