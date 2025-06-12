
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Eye, Users, UserPlus, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import Loading from '@/components/ui/loading';
import { User } from '@/types';

const CustomersPage = () => {
  const [customers, setCustomers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Demo mijozlar ro'yxati
  const allCustomers: User[] = [
    {
      id: '1',
      name: 'Ahmad Karimov',
      email: 'ahmad@example.com',
      phone: '+998901234567',
      role: 'customer',
      createdAt: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      name: 'Malika Sultanova',
      email: 'malika@example.com',
      phone: '+998909876543',
      role: 'customer',
      createdAt: '2024-02-20T14:15:00Z'
    },
    {
      id: '3',
      name: 'Bobur Rahimov',
      email: 'bobur@example.com',
      phone: '+998905555555',
      role: 'customer',
      createdAt: '2024-03-10T09:45:00Z'
    },
    {
      id: '4',
      name: 'Gulnora Azimova',
      email: 'gulnora@example.com',
      phone: '+998907777777',
      role: 'customer',
      createdAt: '2024-04-05T16:20:00Z'
    },
    {
      id: '5',
      name: 'Sardor Toshmatov',
      email: 'sardor@example.com',
      phone: '+998903333333',
      role: 'customer',
      createdAt: '2024-05-12T11:10:00Z'
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setCustomers(allCustomers);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery)
  );

  const totalOrders = 24; // Demo
  const activeCustomers = customers.length;
  const newCustomersThisMonth = 8; // Demo

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loading size="lg" text="Mijozlar yuklanmoqda..." />
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
          <h1 className="text-3xl font-bold text-primary">Mijozlar</h1>
          <p className="text-muted-foreground">Barcha mijozlarni boshqaring</p>
        </div>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Yangi mijoz qo'shish
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Jami mijozlar</p>
                <p className="text-2xl font-bold">{activeCustomers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <UserPlus className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Yangi mijozlar (oy)</p>
                <p className="text-2xl font-bold">{newCustomersThisMonth}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div>
              <p className="text-sm text-muted-foreground">Jami buyurtmalar</p>
              <p className="text-2xl font-bold">{totalOrders}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div>
              <p className="text-sm text-muted-foreground">O'rtacha buyurtma</p>
              <p className="text-2xl font-bold">{Math.round(totalOrders / activeCustomers)}</p>
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
              placeholder="Mijoz nomi, email yoki telefon..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Mijozlar ro'yxati ({filteredCustomers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mijoz</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefon</TableHead>
                <TableHead>Ro'yxatdan o'tgan sana</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-medium">
                          {customer.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-muted-foreground">ID: {customer.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      {customer.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      {customer.phone}
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(customer.createdAt).toLocaleDateString('uz-UZ')}
                  </TableCell>
                  <TableCell>
                    <Badge variant="default">Faol</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
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

export default CustomersPage;
