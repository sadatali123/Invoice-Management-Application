'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export default function CreateInvoicePage() {
  const router = useRouter();
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    invoiceNumber: `INV-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    clientName: '',
    clientEmail: '',
    clientAddress: '',
    items: [{ description: '', quantity: 1, rate: 0, amount: 0 }],
    notes: '',
    terms: 'Payment due within 30 days',
    subtotal: 0,
    tax: 0,
    total: 0
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleItemChange = (index: number, field: string, value: string | number) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    
    // Calculate amount
    if (field === 'quantity' || field === 'rate') {
      newItems[index].amount = Number(newItems[index].quantity) * Number(newItems[index].rate);
    }
    
    // Update subtotal and total
    const subtotal = newItems.reduce((sum, item) => sum + Number(item.amount), 0);
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;
    
    setFormData({ 
      ...formData, 
      items: newItems,
      subtotal,
      tax,
      total
    });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: '', quantity: 1, rate: 0, amount: 0 }]
    });
  };

  const removeItem = (index: number) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    
    // Recalculate totals
    const subtotal = newItems.reduce((sum, item) => sum + Number(item.amount), 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;
    
    setFormData({
      ...formData,
      items: newItems,
      subtotal,
      tax,
      total
    });
  };

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
    pdf.save(`invoice-${formData.invoiceNumber}.pdf`);
  };

  const saveInvoice = () => {
    // Here you would typically save the invoice to your database
    // For now, we'll just navigate back to the invoices page
    router.push('/dashboard/invoices');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Create New Invoice</h1>
        <div className="space-x-2">
          <button
            onClick={generatePDF}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Download PDF
          </button>
          <button
            onClick={saveInvoice}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Save Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Invoice Form */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Invoice Details</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Number</label>
              <input
                type="text"
                name="invoiceNumber"
                value={formData.invoiceNumber}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <h2 className="text-lg font-semibold mb-4 mt-6">Client Information</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
            <input
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter client name"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Client Email</label>
            <input
              type="email"
              name="clientEmail"
              value={formData.clientEmail}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter client email"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Client Address</label>
            <textarea
              name="clientAddress"
              value={formData.clientAddress}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter client address"
              rows={3}
            />
          </div>
          
          <h2 className="text-lg font-semibold mb-4 mt-6">Items</h2>
          
          {formData.items.map((item, index) => (
            <div key={index} className="mb-4 p-4 border border-gray-200 rounded-md">
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Item description"
                />
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rate</label>
                  <input
                    type="number"
                    value={item.rate}
                    onChange={(e) => handleItemChange(index, 'rate', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                  <input
                    type="number"
                    value={item.amount}
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                    readOnly
                  />
                </div>
              </div>
              
              {formData.items.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="mt-2 text-red-600 text-sm"
                >
                  Remove Item
                </button>
              )}
            </div>
          ))}
          
          <button
            type="button"
            onClick={addItem}
            className="mb-4 text-blue-600 text-sm"
          >
            + Add Another Item
          </button>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Additional notes"
              rows={3}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Terms & Conditions</label>
            <textarea
              name="terms"
              value={formData.terms}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={3}
            />
          </div>
        </div>
        
        {/* Invoice Preview */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Invoice Preview</h2>
          
          <div ref={invoiceRef} className="p-6 border border-gray-200 rounded-md bg-white">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">INVOICE</h1>
                <p className="text-gray-600">{formData.invoiceNumber}</p>
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
                <p className="font-medium">{formData.clientName || 'Client Name'}</p>
                <p>{formData.clientEmail || 'client@example.com'}</p>
                <p className="whitespace-pre-line">{formData.clientAddress || 'Client Address'}</p>
              </div>
              <div>
                <div className="grid grid-cols-2 gap-2">
                  <p className="text-gray-600">Date:</p>
                  <p className="text-right">{formData.date}</p>
                  <p className="text-gray-600">Due Date:</p>
                  <p className="text-right">{formData.dueDate}</p>
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
                {formData.items.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="py-2">{item.description || 'Item description'}</td>
                    <td className="py-2 text-right">{item.quantity}</td>
                    <td className="py-2 text-right">${Number(item.rate).toFixed(2)}</td>
                    <td className="py-2 text-right">${Number(item.amount).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="flex justify-end mb-8">
              <div className="w-1/2">
                <div className="flex justify-between py-2">
                  <span className="font-medium">Subtotal:</span>
                  <span>${formData.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium">Tax (10%):</span>
                  <span>${formData.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 border-t border-gray-300">
                  <span className="font-bold">Total:</span>
                  <span className="font-bold">${formData.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="font-semibold text-gray-700 mb-2">Notes:</h3>
              <p className="text-gray-600">{formData.notes || 'No notes'}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Terms & Conditions:</h3>
              <p className="text-gray-600">{formData.terms}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}