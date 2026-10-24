import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  Truck, 
  Search, 
  FileText, 
  Download, 
  CheckCircle2, 
  Plus, 
  X
} from 'lucide-react';

export const OfflineOrders = () => {
  const { orders, showToast } = useApp();
  const [search, setSearch] = useState('');
  const [activeInvoice, setActiveInvoice] = useState(null);

  const wholesaleOrders = orders.filter(o => o.channel === 'wholesale');

  const filtered = wholesaleOrders.filter(o =>
    o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
    o.customerName.toLowerCase().includes(search.toLowerCase()) ||
    (o.b2bDetails?.poNumber && o.b2bDetails.poNumber.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 block mb-1">
            Commercial Distribution
          </span>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#3D2206]">
            Order Management (B2B Invoices & Freight Shipments)
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Monitor commercial Purchase Orders (POs), freight carriers (LTL Pallets), and corporate credit terms.
          </p>
        </div>
      </div>

      {/* Filter toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex items-center justify-between">
        <div className="relative w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search B2B PO #, company name, carrier..."
            className="w-full bg-[#FAF6EE] border border-stone-300 rounded-xl pl-10 pr-3.5 py-2 text-xs text-stone-800 focus:outline-hidden focus:border-[#D89816]"
          />
        </div>
        <span className="text-xs font-semibold text-stone-500">{filtered.length} Wholesale POs</span>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#FAF6EE] border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">PO & Invoice Ref</th>
                <th className="py-3 px-3">Distributor / Account</th>
                <th className="py-3 px-3">Pallet Honey Units</th>
                <th className="py-3 px-3 text-right">Invoice Amount</th>
                <th className="py-3 px-3">Freight Carrier</th>
                <th className="py-3 px-3">Credit Terms</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-4 text-right">B2B Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.map((ord) => (
                <tr key={ord.id} className="hover:bg-[#FAF9F5] transition-colors">
                  
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-stone-900 text-xs block">{ord.orderNumber}</span>
                    <span className="font-mono text-[10px] text-emerald-800 block">PO: {ord.b2bDetails?.poNumber || 'PO-DIRECT'}</span>
                  </td>

                  <td className="py-3.5 px-3">
                    <span className="font-bold text-stone-900 block">{ord.customerName}</span>
                    <span className="text-[10px] text-stone-400">Tax ID: {ord.b2bDetails?.taxId || 'Pending'}</span>
                  </td>

                  <td className="py-3.5 px-3 text-stone-700">
                    <span className="block truncate max-w-xs">
                      {ord.items.map(i => `${i.quantity}x ${i.productName}`).join(' • ')}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 text-right">
                    <span className="font-extrabold text-[#3D2206] text-sm block">
                      ${ord.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className="text-[10px] text-emerald-700 font-bold">{ord.paymentStatus}</span>
                  </td>

                  <td className="py-3.5 px-3 text-stone-600">
                    <span className="font-medium text-stone-900 block">{ord.courierPartner || 'FreightMaster LTL'}</span>
                    <span className="font-mono text-[10px] text-stone-400">{ord.trackingNumber}</span>
                  </td>

                  <td className="py-3.5 px-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
                      {ord.b2bDetails?.paymentTerms || 'Net 30'}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 text-center">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300">
                      {ord.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setActiveInvoice(ord)}
                      className="p-1.5 text-stone-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg transition-colors inline-flex items-center gap-1 font-semibold text-[11px]"
                    >
                      <FileText className="w-4 h-4 text-emerald-600" />
                      <span>Invoice</span>
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Modal */}
      {activeInvoice && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 border border-stone-200 shadow-2xl space-y-6">
            <div className="flex items-start justify-between border-b pb-3">
              <div>
                <span className="font-brand font-bold text-lg text-stone-900">COMMERCIAL WHOLESALE INVOICE</span>
                <p className="font-mono text-xs text-emerald-800 font-bold">{activeInvoice.orderNumber} (PO: {activeInvoice.b2bDetails?.poNumber})</p>
              </div>
              <button onClick={() => setActiveInvoice(null)} className="text-stone-400 hover:text-stone-700">✕</button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-stone-400 uppercase font-bold text-[10px]">BUYER / DISTRIBUTOR:</span>
                <p className="font-bold text-stone-900">{activeInvoice.customerName}</p>
                <p className="text-stone-600">Tax ID: {activeInvoice.b2bDetails?.taxId}</p>
                <p className="text-stone-600">{activeInvoice.shippingAddress.street}, {activeInvoice.shippingAddress.city}</p>
              </div>
              <div className="text-right">
                <span className="text-stone-400 uppercase font-bold text-[10px]">PAYMENT & FREIGHT:</span>
                <p className="font-bold text-stone-900">Terms: {activeInvoice.b2bDetails?.paymentTerms}</p>
                <p className="text-stone-600">Carrier: {activeInvoice.courierPartner}</p>
                <p className="text-stone-600">Tracking: {activeInvoice.trackingNumber}</p>
              </div>
            </div>

            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b text-stone-400 uppercase text-[10px]">
                  <th className="py-2">Item</th>
                  <th className="py-2 text-center">Cases / Jars</th>
                  <th className="py-2 text-right">Wholesale Rate</th>
                  <th className="py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {activeInvoice.items.map((it, idx) => (
                  <tr key={idx}>
                    <td className="py-2 font-medium">{it.productName} ({it.weight})</td>
                    <td className="py-2 text-center font-bold">{it.quantity} Jars</td>
                    <td className="py-2 text-right">${it.price.toFixed(2)}</td>
                    <td className="py-2 text-right font-bold">${(it.price * it.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="space-y-1 text-xs text-right border-t pt-3">
              <div>Subtotal: <b>${activeInvoice.subtotal.toFixed(2)}</b></div>
              <div>Pallet LTL Freight: <b>${activeInvoice.shippingFee.toFixed(2)}</b></div>
              <div>Commercial Tax: <b>${activeInvoice.tax.toFixed(2)}</b></div>
              <div className="text-lg font-black text-[#3D2206] pt-1">
                Total Due: ${activeInvoice.totalAmount.toFixed(2)}
              </div>
            </div>

            <div className="pt-3 border-t flex justify-end">
              <button
                onClick={() => setActiveInvoice(null)}
                className="bg-stone-900 text-white text-xs font-bold px-5 py-2 rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
