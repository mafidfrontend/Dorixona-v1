
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const Index = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (user && ['super_admin', 'pharmacy_admin', 'warehouse', 'operator'].includes(user.role)) {
    return <Navigate to="/admin" replace />;
  }

  return <Navigate to="/customer" replace />;
};

export default Index;
