'use client';

// @ts-ignore
import { AlertCircle } from 'lucide-react';

// Mock data - would be replaced with actual data from API
const outstandingPayments = [
  {
    id: 1,
    client: 'Oscorp Industries',
    amount: '$2,400.00',
    dueDate: '2023-06-25',
    daysOverdue: 0,
    invoiceNumber: 'INV-2023-005',
  },
  {
    id: 2,
    client: 'Umbrella Corp',
    amount: '$1,750.00',
    dueDate: '2023-06-20',
    daysOverdue: 5,
    invoiceNumber: 'INV-2023-006',
  },
  {
    id: 3,
    client: 'Cyberdyne Systems',
    amount: '$3,200.00',
    dueDate: '2023-06-15',
    daysOverdue: 10,
    invoiceNumber: 'INV-2023-007',
  },
  {
    id: 4,
    client: 'LexCorp',
    amount: '$950.00',
    dueDate: '2023-06-10',
    daysOverdue: 15,
    invoiceNumber: 'INV-2023-008',
  },
];

export default function OutstandingPayments() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Outstanding Payments</h2>
        <button className="text-sm text-blue-600 hover:text-blue-800">View all</button>
      </div>
      <div className="space-y-4">
        {outstandingPayments.map((payment) => (
          <div key={payment.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-gray-900">{payment.client}</h3>
                <p className="text-xs text-gray-500">{payment.invoiceNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">{payment.amount}</p>
                <p className="text-xs text-gray-500">Due: {payment.dueDate}</p>
              </div>
            </div>
            <div className="mt-2 flex justify-between items-center">
              <div className={`flex items-center text-xs ${
                payment.daysOverdue > 0 ? 'text-red-600' : 'text-amber-600'
              }`}>
                <AlertCircle className="h-3 w-3 mr-1" />
                {payment.daysOverdue > 0 
                  ? `${payment.daysOverdue} days overdue` 
                  : 'Due soon'}
              </div>
              <button className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700">
                Send Reminder
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}