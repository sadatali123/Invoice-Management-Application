'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { ArrowLeft, Download } from 'lucide-react';

// Sample invoice data - in a real app, you would fetch this from an API
const getInvoiceData = (id: string) => {
  const invoices = {
    'INV-001': {
      id: 'INV-001',
      date: '2023-09-15',
      dueDate: '2023-10-15',
      client: {
        name: 'Acme Corp',
        email: 'billing@acmecorp.com',
        address: '123 Business Ave\nSuite 456\nCorporate City, BZ 12345'
      },
      items: [
        { description: 'Website Development', quantity: 1, rate: 1000, amount: 1000 },
        { description: 'Hosting (Annual)', quantity: 1, rate: 250, amount: 250 }
      ],
      notes: 'Thank you for your business!',
      terms: 'Payment due within 30 days',
      subtotal: 1250,
      tax: 0,
      total: 1250,
      status: 'Paid'
    },
    'INV-002': {
      id: 'INV-002',
      date: '2023-09-20',
      dueDate: '2023-10-20',
      client: {
        name: 'Globex Inc',
        email: 'accounts@globexinc.com',
        address: '789 Enterprise Blvd\nInnovation Park\nTech City, TC 67890'
      },
      items: [
        { description: 'Consulting Services', quantity: 10, rate: 150, amount: 1500 },
        { description: 'Software License', quantity: 5, rate: 299, amount: 1495 },
        { description: 'Support Package', quantity: 1, rate: 455.75, amount: 455.75 }
      ],
      notes: 'Please remit payment by the due date.',
      terms: 'Late payments subject to 1.5% monthly interest',
      subtotal: 3450.75,
      tax: 0,
      total: 3450.75,
      status: 'Pending'
    },
    'INV-003': {
      id: 'INV-003',
      date: '2023-09-25',
      dueDate: '2023-10-25',
      client: {
        name: 'Stark Industries',
        email: 'finance@stark.com',
        address: '1 Stark Tower\nManhattan\nNew York, NY 10001'
      },
      items: [
        { description: 'Custom Hardware Development', quantity: 1, rate: 5000, amount: 5000 },
        { description: 'Engineering Hours', quantity: 20, rate: 125, amount: 2500 },
        { description: 'Materials', quantity: 1, rate: 300.50, amount: 300.50 }
      ],
      notes: 'This invoice is overdue. Please remit payment immediately.',
      terms: 'Payment due upon receipt',
      subtotal: 7800.50,
      tax: 0,
      total: 7800.50,
      status: 'Overdue'
    },
    'INV-004': {
      id: 'INV-004',
      date: '2023-09-30',
      dueDate: '2023-10-30',
      client: {
        name: 'Wayne Enterprises',
        email: 'payments@wayne.com',
        address: 'Wayne Tower\nGotham City, GC 43210'
      },
      items: [
        { description: 'Security Consultation', quantity: 1, rate: 3500, amount: 3500 },
        { description: 'Equipment Installation', quantity: 1, rate: 1200, amount: 1200 },
        { description: 'Maintenance Contract (6 months)', quantity: 1, rate: 500.25, amount: 500.25 }
      ],
      notes: 'Thank you for your business.',
      terms: 'Net 30',
      subtotal: 5200.25,
      tax: 0,
      total: 5200.25,
      status: 'Paid'
    },
    'INV-005': {
      id: 'INV-005',
      date: '2023-10-05',
      dueDate: '2023-11-05',
      client: {
        name: 'Umbrella Corp',
        email: 'finance@umbrella.com',
        address: 'Umbrella Research Facility\nRaccoon City, RC 98765'
      },
      items: [
        { description: 'Laboratory Services', quantity: 1, rate: 1200, amount: 1200 },
        { description: 'Research Materials', quantity: 1, rate: 600, amount: 600 }
      ],
      notes: 'For questions regarding this invoice, please contact Dr. Smith.',
      terms: 'Payment due within 30 days',
      subtotal: 1800,
      tax: 0,
      total: 1800,
      status: 'Pending'
    }
  };
  
  return invoices[id as keyof typeof invoices];
};

export default function InvoiceDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const invoiceRef = useRef<HTMLDivElement>(null);
  const invoice = getInvoiceData(params.id);
  
  if (!invoice) {
    return (
      <div className="p-6">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => router.back()} 
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Invoices
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Invoice Not Found</h1>
          <p className="text-gray-600">The invoice you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  const generatePDF = async () => {
    if (!invoiceRef.current) return;
    
    const canvas = await html2canvas(invoiceRef.current, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`invoice-${invoice.id}.pdf`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => router.back()} 
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Invoices
        </button>
        <button
          onClick={generatePDF}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          <Download className="h-4 w-4 mr-2" /> Download PDF
        </button>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <div ref={invoiceRef} className="p-6 bg-white">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">INVOICE</h1>
              <p className="text-gray-600">{invoice.id}</p>
              <div className="mt-2 inline-block px-2 py-1 rounded-full text-xs font-semibold 
                ${invoice.status === 'Paid' ? 'bg-green-100 text-green-800' : 
                  invoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'}"
              >
                {invoice.status}
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold">Your Company Name</p>
              <p>123 Business Street</p>
              <p>City, State ZIP</p>
              <p>contact@yourcompany.com</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Bill To:</h3>
              <p className="font-medium">{invoice.client.name}</p>
              <p>{invoice.client.email}</p>
              <p className="whitespace-pre-line">{invoice.client.address}</p>
            </div>
            <div>
              <div className="grid grid-cols-2 gap-2">
                <p className="text-gray-600">Date:</p>
                <p className="text-right">{invoice.date}</p>
                <p className="text-gray-600">Due Date:</p>
                <p className="text-right">{invoice.dueDate}</p>
              </div>
            </div>
          </div>
          
          <table className="w-full mb-8">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="py-2 text-left">Description</th>
                <th className="py-2 text-right">Quantity</th>
                <th className="py-2 text-right">Rate</th>
                <th className="py-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-2">{item.description}</td>
                  <td className="py-2 text-right">{item.quantity}</td>
                  <td className="py-2 text-right">${item.rate.toFixed(2)}</td>
                  <td className="py-2 text-right">${item.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="flex justify-end mb-8">
            <div className="w-1/2">
              <div className="flex justify-between py-2">
                <span className="font-medium">Subtotal:</span>
                <span>${invoice.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-medium">Tax:</span>
                <span>${invoice.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 border-t border-gray-300">
                <span className="font-bold">Total:</span>
                <span className="font-bold">${invoice.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="font-semibold text-gray-700 mb-2">Notes:</h3>
            <p className="text-gray-600">{invoice.notes}</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Terms & Conditions:</h3>
            <p className="text-gray-600">{invoice.terms}</p>
          </div>
        </div>
      </div>
    </div>
  );
}