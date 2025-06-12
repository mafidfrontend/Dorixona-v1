
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Edit, Trash, Package, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import Loading from '@/components/ui/loading';
import { Medicine } from '@/types';

const MedicinesPage = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

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
      stock: 15,
      expiryDate: '2025-12-31',
      category: 'Og\'riq qoldiruvchi',
      batchNumber: 'PAR001',
      minStockLevel: 20
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
      stock: 5,
      expiryDate: '2026-03-20',
      category: 'Vitaminlar',
      batchNumber: 'VIT003',
      minStockLevel: 20
    }
  ];

  const categories = ['Og\'riq qoldiruvchi', 'Vitaminlar', 'Yurak dorilar', 'Antibiotik'];

  useEffect(() => {
    setTimeout(() => {
      setMedicines(allMedicines);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         medicine.manufacturer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || medicine.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const lowStockCount = medicines.filter(m => m.stock <= m.minStockLevel).length;
  const totalValue = medicines.reduce((sum, m) => sum + (m.price * m.stock), 0);

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Mahsulotlar</h1>
          <p className="text-muted-foreground">Dorilar ro'yxatini boshqaring</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Yangi dori qo'shish
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Yangi dori qo'shish</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder="Dori nomi" />
              <Input placeholder="Ishlab chiqaruvchi" />
              <Input placeholder="Narx" type="number" />
              <Input placeholder="Miqdor" type="number" />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Kategoriya" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button className="w-full">Saqlash</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Jami mahsulotlar</p>
                <p className="text-2xl font-bold">{medicines.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-sm text-muted-foreground">Kam qolgan</p>
                <p className="text-2xl font-bold">{lowStockCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div>
              <p className="text-sm text-muted-foreground">Umumiy qiymat</p>
              <p className="text-2xl font-bold">{totalValue.toLocaleString()} so'm</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div>
              <p className="text-sm text-muted-foreground">Kategoriyalar</p>
              <p className="text-2xl font-bold">{categories.length}</p>
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
                  placeholder="Dori nomi yoki ishlab chiqaruvchi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Kategoriya" />
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
        </CardContent>
      </Card>

      {/* Medicines Table */}
      <Card>
        <CardHeader>
          <CardTitle>Dorilar ro'yxati ({filteredMedicines.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nomi</TableHead>
                <TableHead>Ishlab chiqaruvchi</TableHead>
                <TableHead>Kategoriya</TableHead>
                <TableHead>Narx</TableHead>
                <TableHead>Zaxira</TableHead>
                <TableHead>Holat</TableHead>
                <TableHead>Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMedicines.map((medicine) => (
                <TableRow key={medicine.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{medicine.name}</p>
                      <p className="text-sm text-muted-foreground">{medicine.dosage}</p>
                    </div>
                  </TableCell>
                  <TableCell>{medicine.manufacturer}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{medicine.category}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    {medicine.price.toLocaleString()} so'm
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{medicine.stock}</span>
                      {medicine.stock <= medicine.minStockLevel && (
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={medicine.stock > medicine.minStockLevel ? "default" : "destructive"}
                    >
                      {medicine.stock > medicine.minStockLevel ? "Yetarli" : "Kam"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
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

export default MedicinesPage;
