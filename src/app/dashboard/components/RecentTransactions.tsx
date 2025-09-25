'use client';

// @ts-ignore
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

// Mock data - would be replaced with actual data from API
const transactions = [
  {
    id: 1,
    client: 'Acme Inc.',
    amount: '$1,200.00',
    date: '2023-06-15',
    status: 'paid',
    invoiceNumber: 'INV-2023-001',
  },
  {
    id: 2,
    client: 'Globex Corp',
    amount: '$850.00',
    date: '2023-06-12',
    status: 'paid',
    invoiceNumber: 'INV-2023-002',
  },
  {
    id: 3,
    client: 'Stark Industries',
    amount: '$3,200.00',
    date: '2023-06-10',
    status: 'paid',
    invoiceNumber: 'INV-2023-003',
  },
  {
    id: 4,
    client: 'Wayne Enterprises',
    amount: '$1,800.00',
    date: '2023-06-05',
    status: 'paid',
    invoiceNumber: 'INV-2023-004',
  },
];

export default function RecentTransactions() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
        <button className="text-sm text-blue-600 hover:text-blue-800">View all</button>
      </div>
      <div className="overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{transaction.client}</div>
                  <div className="text-xs text-gray-500">{transaction.invoiceNumber}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{transaction.amount}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{transaction.date}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}