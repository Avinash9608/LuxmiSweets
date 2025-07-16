
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null; 
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Welcome, {user.email}!</p>
        </div>
        <Button onClick={handleLogout} variant="destructive">Logout</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Manage Menu</h2>
          <p className="text-muted-foreground mb-4">Add, edit, or delete menu items that appear on your website.</p>
          <Button asChild>
            <Link href={`/admin?secret=${process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY}`}>Go to Menu Management</Link>
          </Button>
        </div>
        <div className="bg-card p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">View Orders</h2>
          <p className="text-muted-foreground">This is where you will be able to view incoming custom and quick orders in the future.</p>
        </div>
      </div>

    </div>
  );
}
