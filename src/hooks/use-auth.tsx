
"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface User {
  _id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/current');
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          setUser(null);
          if (pathname.startsWith('/admin/dashboard')) {
            router.push('/admin/login');
          }
        }
      } catch (error) {
        setUser(null);
        if (pathname.startsWith('/admin/dashboard')) {
            router.push('/admin/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [pathname, router]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
