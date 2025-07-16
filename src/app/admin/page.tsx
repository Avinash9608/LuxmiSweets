
import React, { Suspense } from 'react';
import AdminPageContent from '@/components/AdminPageContent';
import { Loader2 } from 'lucide-react';

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center"><Loader2 className="h-16 w-16 animate-spin text-primary" /></div>}>
      <AdminPageContent />
    </Suspense>
  );
}
