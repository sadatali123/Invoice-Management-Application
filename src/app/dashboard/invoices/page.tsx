'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FileText, Download, Eye, Trash2 } from 'lucide-react';

// Sample invoice data
const sampleInvoices = [
  { id: 'INV-001', client: 'Acme Corp', amount: 1250.00, date: '2023-09-15', status: 'Paid' },
  { id: 'INV-002', client: 'Globex Inc', amount: 3450.75, date: '2023-09-20', status: 'Pending' },
  { id: 'INV-003', client: 'Stark Industries', amount: 7800.50, date: '2023-09-25', status: 'Overdue' },
  { id: 'INV-004', client: 'Wayne Enterprises', amount: 5200.25, date: '2023-09-30', status: 'Paid' },
  { id: 'INV-005', client: 'Umbrella Corp', amount: 1800.00, date: '2023-10-05', status: 'Pending' },
];

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState(sampleInvoices);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInvoices = invoices.filter(invoice => 
    invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    invoice.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteInvoice = (id: string) => {
    setInvoices(invoices.filter(invoice => invoice.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Invoices</h1>
        <Link 
          href="/dashboard/invoices/create" 
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Create New Invoice
        </Link>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search invoices..."
          className="w-full p-3 border border-gray-300 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredInvoices.map((invoice) => (
              <tr key={invoice.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-900">{invoice.id}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.client}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${invoice.amount.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${invoice.status === 'Paid' ? 'bg-green-100 text-green-800' : 
                      invoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'}`}>
                    {invoice.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <Link href={`/dashboard/invoices/${invoice.id}`} className="text-blue-600 hover:text-blue-900">
                      <Eye className="h-5 w-5" />
                    </Link>
                    <button className="text-green-600 hover:text-green-900">
                      <Download className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => handleDeleteInvoice(invoice.id)} 
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}