import { redirect } from 'next/navigation';
import { ClerkProvider, UserButton } from '@clerk/nextjs';
import { Sidebar } from './components';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Authentication is handled by middleware.ts

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-gray-50">
        {children}
      </main>
    </div>
  );
}