
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ShoppingCart, Minus, Plus, Trash, Package, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CartItem } from '@/types';

const CartPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      medicine: {
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
      quantity: 2
    },
    {
      medicine: {
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
      quantity: 1
    }
  ]);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    
    setCartItems(items =>
      items.map(item =>
        item.medicine.id === id 
          ? { ...item, quantity: Math.min(newQuantity, item.medicine.stock) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.medicine.id !== id));
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + (item.medicine.price * item.quantity), 
    0
  );

  const handleCheckout = () => {
    if (!isAuthenticated) {
      setShowAuthDialog(true);
      return;
    }
    
    console.log('Buyurtma berildi:', cartItems);
    navigate('/customer/checkout');
  };

  const handleAuthRedirect = () => {
    setShowAuthDialog(false);
    navigate('/auth');
  };

  if (cartItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Savat bo'sh</h2>
        <p className="text-muted-foreground mb-6">
          Dorilar qo'shish uchun katalogga o'ting
        </p>
        <Button onClick={() => navigate('/customer/medicines')}>
          Dorilarni ko'rish
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">Savat</h1>
        <p className="text-muted-foreground">
          {cartItems.length} ta mahsulot savatda
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {cartItems.map((item, index) => (
              <motion.div
                key={item.medicine.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Package className="h-6 w-6 text-muted-foreground" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.medicine.name}</h3>
                        <p className="text-sm text-muted-foreground mb-1">
                          {item.medicine.manufacturer}
                        </p>
                        <Badge variant="outline">{item.medicine.type}</Badge>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.medicine.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.medicine.id, parseInt(e.target.value) || 0)}
                            className="w-16 text-center"
                            min="1"
                            max={item.medicine.stock}
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.medicine.id, item.quantity + 1)}
                            disabled={item.quantity >= item.medicine.stock}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <div className="text-right">
                          <p className="font-semibold">
                            {(item.medicine.price * item.quantity).toLocaleString()} so'm
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {item.medicine.price.toLocaleString()} so'm/dona
                          </p>
                        </div>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeItem(item.medicine.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Buyurtma xulasasi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {cartItems.map((item) => (
                  <div key={item.medicine.id} className="flex justify-between text-sm">
                    <span>
                      {item.medicine.name} × {item.quantity}
                    </span>
                    <span>
                      {(item.medicine.price * item.quantity).toLocaleString()} so'm
                    </span>
                  </div>
                ))}
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Jami:</span>
                  <span>{totalAmount.toLocaleString()} so'm</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Yetkazib berish:</span>
                  <span>Bepul</span>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-between font-semibold text-lg">
                <span>Umumiy:</span>
                <span>{totalAmount.toLocaleString()} so'm</span>
              </div>
              
              <Button 
                className="w-full" 
                size="lg"
                onClick={handleCheckout}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Buyurtma berish
              </Button>
              
              {!isAuthenticated && (
                <p className="text-sm text-center text-muted-foreground">
                  Buyurtma berish uchun ro'yxatdan o'ting
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Auth Required Dialog */}
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ro'yxatdan o'tish talab etiladi</DialogTitle>
            <DialogDescription>
              Buyurtma berish uchun avval tizimga kirish yoki ro'yxatdan o'tishingiz kerak.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 mt-4">
            <Button variant="outline" onClick={() => setShowAuthDialog(false)}>
              Bekor qilish
            </Button>
            <Button onClick={handleAuthRedirect}>
              Kirish / Ro'yxatdan o'tish
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default CartPage;
