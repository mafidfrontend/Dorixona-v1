
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Package, AlertTriangle, Plus, Minus, History } from 'lucide-react';
import { motion } from 'framer-motion';
import Loading from '@/components/ui/loading';
import { Medicine, StockMovement } from '@/types';

const InventoryPage = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [stockMovements, setStockMovements] = useState<StockMovement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'stock' | 'movements'>('stock');

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

  // Demo stock movements
  const allMovements: StockMovement[] = [
    {
      id: '1',
      medicineId: '1',
      medicineName: 'Paracetamol 500mg',
      type: 'in',
      quantity: 100,
      reason: 'Yangi partiya keldi',
      date: '2024-06-10T10:00:00Z',
      userId: '1',
      userName: 'Admin User'
    },
    {
      id: '2',
      medicineId: '1',
      medicineName: 'Paracetamol 500mg',
      type: 'out',
      quantity: 5,
      reason: 'Sotildi',
      date: '2024-06-12T14:30:00Z',
      userId: '1',
      userName: 'Admin User'
    },
    {
      id: '3',
      medicineId: '2',
      medicineName: 'Ibuprofen 400mg',
      type: 'in',
      quantity: 80,
      reason: 'Ombor to\'ldirish',
      date: '2024-06-11T09:15:00Z',
      userId: '1',
      userName: 'Admin User'
    },
    {
      id: '4',
      medicineId: '3',
      medicineName: 'Vitamin D3 1000IU',
      type: 'out',
      quantity: 15,
      reason: 'Buyurtma bo\'yicha',
      date: '2024-06-12T16:45:00Z',
      userId: '1',
      userName: 'Admin User'
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setMedicines(allMedicines);
      setStockMovements(allMovements);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredMedicines = medicines.filter(medicine =>
    medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    medicine.manufacturer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMovements = stockMovements.filter(movement =>
    movement.medicineName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const lowStockCount = medicines.filter(m => m.stock <= m.minStockLevel).length;
  const totalValue = medicines.reduce((sum, m) => sum + (m.price * m.stock), 0);
  const totalItems = medicines.reduce((sum, m) => sum + m.stock, 0);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loading size="lg" text="Ombor ma'lumotlari yuklanmoqda..." />
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
          <h1 className="text-3xl font-bold text-primary">Ombor boshqaruvi</h1>
          <p className="text-muted-foreground">Mahsulotlar zaxirasi va harakatlarini kuzating</p>
        </div>
        <div className="flex gap-2">
          <Button variant={viewMode === 'stock' ? 'default' : 'outline'} onClick={() => setViewMode('stock')}>
            <Package className="h-4 w-4 mr-2" />
            Zaxira
          </Button>
          <Button variant={viewMode === 'movements' ? 'default' : 'outline'} onClick={() => setViewMode('movements')}>
            <History className="h-4 w-4 mr-2" />
            Harakatlar
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Jami mahsulotlar</p>
                <p className="text-2xl font-bold">{totalItems}</p>
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
              <p className="text-sm text-muted-foreground">Mahsulot turlari</p>
              <p className="text-2xl font-bold">{medicines.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder={viewMode === 'stock' ? "Mahsulot nomi..." : "Harakat qidirish..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Content */}
      {viewMode === 'stock' ? (
        <Card>
          <CardHeader>
            <CardTitle>Zaxira holati ({filteredMedicines.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mahsulot</TableHead>
                  <TableHead>Ishlab chiqaruvchi</TableHead>
                  <TableHead>Zaxira</TableHead>
                  <TableHead>Min. miqdor</TableHead>
                  <TableHead>Holat</TableHead>
                  <TableHead>Qiymat</TableHead>
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
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{medicine.stock}</span>
                        {medicine.stock <= medicine.minStockLevel && (
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{medicine.minStockLevel}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={medicine.stock > medicine.minStockLevel ? "default" : "destructive"}
                      >
                        {medicine.stock > medicine.minStockLevel ? "Yetarli" : "Kam"}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {(medicine.price * medicine.stock).toLocaleString()} so'm
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Stock harakatlari ({filteredMovements.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mahsulot</TableHead>
                  <TableHead>Turi</TableHead>
                  <TableHead>Miqdor</TableHead>
                  <TableHead>Sabab</TableHead>
                  <TableHead>Sana</TableHead>
                  <TableHead>Foydalanuvchi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMovements.map((movement) => (
                  <TableRow key={movement.id}>
                    <TableCell className="font-medium">{movement.medicineName}</TableCell>
                    <TableCell>
                      <Badge variant={movement.type === 'in' ? 'default' : 'secondary'}>
                        {movement.type === 'in' ? 'Kirdi' : 'Chiqdi'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className={movement.type === 'in' ? 'text-green-600' : 'text-red-600'}>
                        {movement.type === 'in' ? '+' : '-'}{movement.quantity}
                      </span>
                    </TableCell>
                    <TableCell>{movement.reason}</TableCell>
                    <TableCell>
                      {new Date(movement.date).toLocaleDateString('uz-UZ')}
                    </TableCell>
                    <TableCell>{movement.userName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
};

export default InventoryPage;
