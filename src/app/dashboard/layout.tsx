'use client';

import { useAuth } from '@/lib/auth-context';
import Sidebar from '@/components/dashboard/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-void flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-horizon border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-mono text-carbon-400 tracking-wider uppercase">
            Loading
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-void flex items-center justify-center">
        <div className="card text-center max-w-md">
          <h2 className="text-xl font-sans font-bold text-white mb-2">
            Authentication Required
          </h2>
          <p className="text-sm font-mono text-carbon-400 mb-6">
            Please sign in to access the dashboard.
          </p>
          <a href="/" className="btn-primary">
            Go to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-void">
      <Sidebar />
      <main className="flex-1 overflow-y-auto min-h-screen">
        {children}
      </main>
    </div>
  );
}
