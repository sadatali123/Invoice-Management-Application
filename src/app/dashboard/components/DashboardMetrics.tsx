'use client';

// @ts-ignore
import { FileText, DollarSign, AlertCircle, CheckCircle } from 'lucide-react';

// Mock data - would be replaced with actual data from API
const metrics = [
  {
    title: 'Total Invoices',
    value: '24',
    change: '+12%',
    icon: FileText,
    color: 'bg-blue-500',
  },
  {
    title: 'Paid Invoices',
    value: '$12,450',
    change: '+18%',
    icon: CheckCircle,
    color: 'bg-green-500',
  },
  {
    title: 'Unpaid Invoices',
    value: '$4,320',
    change: '-2%',
    icon: AlertCircle,
    color: 'bg-amber-500',
  },
  {
    title: 'Total Revenue',
    value: '$16,770',
    change: '+14%',
    icon: DollarSign,
    color: 'bg-indigo-500',
  },
];

export default function DashboardMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <div
          key={metric.title}
          className="bg-white rounded-lg shadow p-6 transition-all hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">{metric.title}</p>
              <p className="text-2xl font-bold mt-1">{metric.value}</p>
              <p className={`text-xs mt-1 ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {metric.change} from last month
              </p>
            </div>
            <div className={`p-3 rounded-full ${metric.color} bg-opacity-10`}>
              <metric.icon className={`h-6 w-6 ${metric.color.replace('bg-', 'text-')}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}