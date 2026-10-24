import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShoppingBag, 
  Truck, 
  Search, 
  Check, 
  FileText, 
  Printer, 
  CheckCircle2, 
  X
} from 'lucide-react';

export const OnlineOrders = () => {
  const { orders, updateOrderStatus, showToast } = useApp();
  
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [activeLabelOrder, setActiveLabelOrder] = useState(null);

  const onlineOrders = orders.filter(o => o.channel === 'online');

  const filtered = onlineOrders.filter(o => {
    const matchesSearch = 
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 block mb-1">
            Fulfillment & Express Shipping
          </span>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#3D2206]">
            Online Orders & Courier Shipping
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Process consumer web orders, generate BlueDart/FedEx/DHL shipping labels, and track deliveries.
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search web order #, customer, tracking..."
            className="w-full bg-[#FAF6EE] border border-stone-300 rounded-xl pl-10 pr-3.5 py-2 text-xs text-stone-800 focus:outline-hidden focus:border-[#D89816]"
          />
        </div>

        <div className="flex items-center gap-2">
          {['All', 'Processing', 'Shipped', 'Delivered'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                statusFilter === st
                  ? 'bg-[#D89816] text-stone-950 shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#FAF6EE] border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Web Order ID</th>
                <th className="py-3 px-3">Collector Name</th>
                <th className="py-3 px-3">Honey Selection</th>
                <th className="py-3 px-3 text-right">Order Amount</th>
                <th className="py-3 px-3">Courier Partner</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-4 text-right">Courier Label</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.map((ord) => (
                <tr key={ord.id} className="hover:bg-[#FAF9F5] transition-colors">
                  
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-stone-900 text-xs block">{ord.orderNumber}</span>
                    <span className="text-[10px] text-stone-400">{ord.date}</span>
                  </td>

                  <td className="py-3.5 px-3">
                    <span className="font-bold text-stone-800 block">{ord.customerName}</span>
                    <span className="text-[10px] text-stone-500">{ord.shippingAddress.city}, {ord.shippingAddress.state}</span>
                  </td>

                  <td className="py-3.5 px-3 text-stone-700">
                    <span className="block truncate max-w-xs">
                      {ord.items.map(i => `${i.quantity}x ${i.productName}`).join(', ')}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 text-right font-extrabold text-[#3D2206]">
                    ${ord.totalAmount.toFixed(2)}
                  </td>

                  <td className="py-3.5 px-3 text-stone-600">
                    <span className="font-medium text-stone-900 block">{ord.courierPartner || 'BlueDart Gold'}</span>
                    <span className="font-mono text-[10px] text-amber-900">{ord.trackingNumber}</span>
                  </td>

                  <td className="py-3.5 px-3 text-center">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      ord.status === 'Delivered'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                        : 'bg-amber-50 text-amber-800 border border-amber-300'
                    }`}>
                      {ord.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setActiveLabelOrder(ord)}
                      className="inline-flex items-center gap-1 text-[11px] font-bold bg-[#FAF6EE] hover:bg-[#F5E5B5] border border-stone-200 text-stone-800 px-3 py-1.5 rounded-xl transition-all"
                    >
                      <Printer className="w-3.5 h-3.5 text-amber-600" />
                      <span>Print Label</span>
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Courier Shipping Label Modal */}
      {activeLabelOrder && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border-2 border-stone-900 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b-2 border-dashed border-stone-300 pb-3">
              <div>
                <span className="font-bold text-lg font-brand tracking-wider">HARUVIRU COLD-CHAIN DISPATCH</span>
                <p className="text-[10px] text-stone-500 uppercase tracking-widest">Fragile Raw Honey Glass • Upright Handle With Care</p>
              </div>
              <button
                onClick={() => setActiveLabelOrder(null)}
                className="text-stone-400 hover:text-stone-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 border-b pb-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400">SHIP FROM:</span>
                  <p className="font-bold text-stone-800 mt-0.5">HaruViru Apiary Sanctuary Central</p>
                  <p className="text-stone-600">Cold Fulfillment Hub Alpha</p>
                  <p className="text-stone-600">Rishikesh Foothills, UT 249201</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400">SHIP TO:</span>
                  <p className="font-bold text-stone-900 mt-0.5">{activeLabelOrder.customerName}</p>
                  <p className="text-stone-700">{activeLabelOrder.shippingAddress.street}</p>
                  <p className="text-stone-700">{activeLabelOrder.shippingAddress.city}, {activeLabelOrder.shippingAddress.state} {activeLabelOrder.shippingAddress.zip}</p>
                  <p className="text-stone-700">{activeLabelOrder.shippingAddress.country}</p>
                </div>
              </div>

              <div className="flex justify-between items-center py-2 bg-stone-50 p-3 rounded-xl border border-stone-200">
                <div>
                  <span className="text-[10px] font-bold text-stone-400 block">CARRIER & SPEED</span>
                  <span className="font-bold text-stone-900">{activeLabelOrder.courierPartner} (Priority Air)</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-stone-400 block">CONSIGNMENT TRACKING #</span>
                  <span className="font-mono font-black text-sm text-stone-900">{activeLabelOrder.trackingNumber}</span>
                </div>
              </div>

              {/* Barcode graphic simulation */}
              <div className="p-4 bg-stone-100 rounded-xl text-center space-y-1">
                <div className="font-mono text-2xl tracking-[0.4em] font-black text-stone-800">
                  ||| | ||||| || |||| ||| |||||||
                </div>
                <span className="font-mono text-[11px] text-stone-600">{activeLabelOrder.trackingNumber}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-3 border-t border-stone-200">
              <button
                onClick={() => setActiveLabelOrder(null)}
                className="px-4 py-2 rounded-xl border border-stone-300 text-stone-600 text-xs font-semibold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  window.print();
                  showToast('Thermal label dispatched to printer!', 'success');
                }}
                className="bg-[#D89816] hover:bg-[#B87A0B] text-stone-950 font-bold px-6 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Thermal Label</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
