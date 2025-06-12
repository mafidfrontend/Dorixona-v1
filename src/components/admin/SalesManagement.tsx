
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Plus, ShoppingCart, Package, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Medicine } from '@/types';

interface SaleItem {
  medicineId: string;
  medicineName: string;
  quantity: number;
  price: number;
  totalPrice: number;
}

interface Sale {
  id: string;
  items: SaleItem[];
  totalAmount: number;
  saleDate: string;
  customerName?: string;
  customerPhone?: string;
}

const SalesManagement = () => {
  const [currentSale, setCurrentSale] = useState<SaleItem[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  // Demo dorilar ro'yxati
  const availableMedicines: Medicine[] = [
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

  const filteredMedicines = availableMedicines.filter(medicine =>
    medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    medicine.stock > 0
  );

  const addToSale = (medicine: Medicine, quantity: number = 1) => {
    if (quantity > medicine.stock) {
      toast({
        title: "Xatolik",
        description: "Zaxirada yetarli miqdor yo'q",
        variant: "destructive"
      });
      return;
    }

    const existingItemIndex = currentSale.findIndex(item => item.medicineId === medicine.id);
    
    if (existingItemIndex !== -1) {
      const updatedSale = [...currentSale];
      const newQuantity = updatedSale[existingItemIndex].quantity + quantity;
      
      if (newQuantity > medicine.stock) {
        toast({
          title: "Xatolik",
          description: "Zaxirada yetarli miqdor yo'q",
          variant: "destructive"
        });
        return;
      }
      
      updatedSale[existingItemIndex].quantity = newQuantity;
      updatedSale[existingItemIndex].totalPrice = newQuantity * medicine.price;
      setCurrentSale(updatedSale);
    } else {
      const newItem: SaleItem = {
        medicineId: medicine.id,
        medicineName: medicine.name,
        quantity,
        price: medicine.price,
        totalPrice: quantity * medicine.price
      };
      setCurrentSale([...currentSale, newItem]);
    }

    toast({
      title: "Muvaffaqiyat",
      description: `${medicine.name} savatchaga qo'shildi`
    });
  };

  const removeFromSale = (medicineId: string) => {
    setCurrentSale(currentSale.filter(item => item.medicineId !== medicineId));
  };

  const updateQuantity = (medicineId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromSale(medicineId);
      return;
    }

    const medicine = availableMedicines.find(m => m.id === medicineId);
    if (!medicine) return;

    if (newQuantity > medicine.stock) {
      toast({
        title: "Xatolik",
        description: "Zaxirada yetarli miqdor yo'q",
        variant: "destructive"
      });
      return;
    }

    const updatedSale = currentSale.map(item => {
      if (item.medicineId === medicineId) {
        return {
          ...item,
          quantity: newQuantity,
          totalPrice: newQuantity * item.price
        };
      }
      return item;
    });
    setCurrentSale(updatedSale);
  };

  const completeSale = async () => {
    if (currentSale.length === 0) {
      toast({
        title: "Xatolik",
        description: "Sotuv ro'yxati bo'sh",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const newSale: Sale = {
        id: `SALE${Date.now()}`,
        items: currentSale,
        totalAmount: currentSale.reduce((sum, item) => sum + item.totalPrice, 0),
        saleDate: new Date().toISOString(),
        customerName: "Mijoz", // Bu yerda mijoz ma'lumotlarini olish mumkin
        customerPhone: "+998901234567"
      };

      setSales([newSale, ...sales]);
      setCurrentSale([]);

      toast({
        title: "Muvaffaqiyat",
        description: "Sotuv muvaffaqiyatli yakunlandi",
        variant: "default"
      });
    } catch (error) {
      toast({
        title: "Xatolik",
        description: "Sotuvni yakunlashda xatolik yuz berdi",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getTotalAmount = () => {
    return currentSale.reduce((sum, item) => sum + item.totalPrice, 0);
  };

  return (
    <div className="space-y-6">
      {/* Current Sale */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Joriy sotuv
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentSale.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              Sotuvni boshlash uchun dori qo'shing
            </p>
          ) : (
            <div className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Dori</TableHead>
                    <TableHead>Narx</TableHead>
                    <TableHead>Miqdor</TableHead>
                    <TableHead>Jami</TableHead>
                    <TableHead>Amallar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentSale.map((item) => (
                    <TableRow key={item.medicineId}>
                      <TableCell className="font-medium">{item.medicineName}</TableCell>
                      <TableCell>{item.price.toLocaleString()} so'm</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.medicineId, item.quantity - 1)}
                          >
                            -
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.medicineId, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {item.totalPrice.toLocaleString()} so'm
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeFromSale(item.medicineId)}
                        >
                          O'chirish
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="flex justify-between items-center pt-4 border-t">
                <div className="text-xl font-bold">
                  Jami: {getTotalAmount().toLocaleString()} so'm
                </div>
                <Button onClick={completeSale} disabled={isLoading} size="lg">
                  {isLoading ? "Saqlanmoqda..." : "Sotuvni yakunlash"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Medicine Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Mavjud dorilar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Dori nomi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMedicines.map((medicine) => (
                <Card key={medicine.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <h3 className="font-medium">{medicine.name}</h3>
                      <p className="text-sm text-muted-foreground">{medicine.manufacturer}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold">{medicine.price.toLocaleString()} so'm</span>
                        <Badge variant={medicine.stock > medicine.minStockLevel ? "default" : "destructive"}>
                          Zaxira: {medicine.stock}
                        </Badge>
                      </div>
                      <Button 
                        onClick={() => addToSale(medicine)} 
                        className="w-full"
                        disabled={medicine.stock === 0}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Qo'shish
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sales History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Sotuv tarixi
          </CardTitle>
        </CardHeader>
        <CardContent>
          {sales.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              Hali hech qanday sotuv amalga oshirilmagan
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sotuv ID</TableHead>
                  <TableHead>Mijoz</TableHead>
                  <TableHead>Mahsulotlar</TableHead>
                  <TableHead>Jami summa</TableHead>
                  <TableHead>Sana</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sales.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell className="font-medium">{sale.id}</TableCell>
                    <TableCell>
                      <div>
                        <p>{sale.customerName}</p>
                        <p className="text-sm text-muted-foreground">{sale.customerPhone}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {sale.items.map((item, index) => (
                          <div key={index} className="text-sm">
                            {item.medicineName} x{item.quantity}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {sale.totalAmount.toLocaleString()} so'm
                    </TableCell>
                    <TableCell>
                      {new Date(sale.saleDate).toLocaleDateString('uz-UZ')} {' '}
                      {new Date(sale.saleDate).toLocaleTimeString('uz-UZ')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesManagement;
