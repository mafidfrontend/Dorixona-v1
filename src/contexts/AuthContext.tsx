import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: Partial<User> & { password: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction = 
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE' }
  | { type: 'LOGOUT' }
  | { type: 'REGISTER_SUCCESS'; payload: User };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true };
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return { 
        user: action.payload, 
        isAuthenticated: true, 
        isLoading: false 
      };
    case 'LOGIN_FAILURE':
      return { 
        user: null, 
        isAuthenticated: false, 
        isLoading: false 
      };
    case 'LOGOUT':
      return { 
        user: null, 
        isAuthenticated: false, 
        isLoading: false 
      };
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    isLoading: false
  });

  useEffect(() => {
    // localStorage dan user ma'lumotlarini olish
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (savedUser && token) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: JSON.parse(savedUser) });
    }
  }, []);

  const login = async (email: string, password: string) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      // Demo uchun statik login
      let user: User;
      
      if (email === 'admin@dorixona.uz' && password === 'admin123') {
        user = {
          id: '1',
          name: 'Admin User',
          email: 'admin@dorixona.uz',
          phone: '+998901234567',
          role: 'super_admin',
          createdAt: new Date().toISOString()
        };
      } else if (email === 'pharmacy@dorixona.uz' && password === 'pharmacy123') {
        user = {
          id: '2',
          name: 'Dorixona Admin',
          email: 'pharmacy@dorixona.uz',
          phone: '+998902345678',
          role: 'pharmacy_admin',
          createdAt: new Date().toISOString()
        };
      } else if (email === 'mijoz@dorixona.uz' && password === 'mijoz123') {
        user = {
          id: '3',
          name: 'Mijoz User',
          email: 'mijoz@dorixona.uz',
          phone: '+998909876543',
          role: 'customer',
          createdAt: new Date().toISOString()
        };
      } else {
        throw new Error('Noto\'g\'ri email yoki parol');
      }

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', 'demo-jwt-token');
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' });
      throw error;
    }
  };

  const register = async (userData: Partial<User> & { password: string }) => {
    try {
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        role: 'customer',
        createdAt: new Date().toISOString()
      };

      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('token', 'demo-jwt-token');
      
      dispatch({ type: 'REGISTER_SUCCESS', payload: newUser });
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      logout,
      register
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
