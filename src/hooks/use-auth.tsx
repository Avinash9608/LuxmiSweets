
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
      // Don't fetch user on public-facing admin pages
      if (pathname.startsWith('/admin/login') || pathname.startsWith('/admin/register')) {
        setUser(null);
        setLoading(false);
        return;
      }
      
      try {
        const response = await fetch('/api/auth/current');
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          // This case is handled by middleware, which will redirect.
          // Setting user to null is sufficient for the client-side.
          setUser(null);
        }
      } catch (error) {
        // Also handled by middleware.
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [pathname]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
