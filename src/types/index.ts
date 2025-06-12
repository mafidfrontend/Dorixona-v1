
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'super_admin' | 'pharmacy_admin' | 'warehouse' | 'operator' | 'customer';
  createdAt: string;
}

export interface Medicine {
  id: string;
  name: string;
  description: string;
  manufacturer: string;
  dosage: string;
  type: 'tablet' | 'syrup' | 'injection' | 'cream' | 'drops';
  price: number;
  stock: number;
  expiryDate: string;
  category: string;
  imageUrl?: string;
  batchNumber: string;
  minStockLevel: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'new' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
  shippingAddress: string;
  orderDate: string;
  deliveryDate?: string;
  notes?: string;
}

export interface OrderItem {
  medicineId: string;
  medicineName: string;
  quantity: number;
  price: number;
  totalPrice: number;
}

export interface CartItem {
  medicine: Medicine;
  quantity: number;
}

export interface StockMovement {
  id: string;
  medicineId: string;
  medicineName: string;
  type: 'in' | 'out';
  quantity: number;
  reason: string;
  date: string;
  userId: string;
  userName: string;
}

export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  totalMedicines: number;
  lowStockItems: number;
  expiringItems: number;
  todayOrders: number;
  todayRevenue: number;
}
