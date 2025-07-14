
import { AuthProvider } from '@/hooks/use-auth';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-secondary">{children}</div>
    </AuthProvider>
  );
}
