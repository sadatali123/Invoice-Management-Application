'use client';

import { useUser } from '@clerk/nextjs';
import { DashboardMetrics, RecentTransactions, OutstandingPayments } from './components';

export default function DashboardPage() {
  const { user } = useUser();
  // Authentication is handled by middleware.ts

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome, {user?.firstName || 'User'}!</p>
      </div>
      
      <DashboardMetrics />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentTransactions />
        <OutstandingPayments />
      </div>
    </div>
  );
}