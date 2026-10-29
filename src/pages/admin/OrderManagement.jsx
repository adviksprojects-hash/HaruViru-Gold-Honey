import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShoppingBag, 
  Search, 
  Truck, 
  CheckCircle2, 
  FileText, 
  Filter, 
  ExternalLink, 
  ChevronDown,
  Building2,
  Globe,
  Clock,
  X
} from 'lucide-react';

export const OrderManagement = () => {
  const { orders, updateOrderStatus, showToast } = useApp();
  
  const [search, setSearch] = useState('');
  const [selectedChannel, setSelectedChannel] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('All');
  
  // Tracking update modal
  const [trackingModalOrder, setTrackingModalOrder] = useState(null);
  const [trackingNumberInput, setTrackingNumberInput] = useState('');
  const [courierInput, setCourierInput] = useState('BlueDart Express');

  // Invoice modal
  const [activeInvoice, setActiveInvoice] = useState(null);

  const filteredOrders = orders.filter((o) => {
    const matchesSearch = 
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(search.toLowerCase()) ||
      (o.trackingNumber && o.trackingNumber.toLowerCase().includes(search.toLowerCase()));

    const matchesChannel = selectedChannel === 'all' || o.channel === selectedChannel;
    const matchesStatus = selectedStatus === 'All' || o.status === selectedStatus;

    return matchesSearch && matchesChannel && matchesStatus;
  });

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  const handleOpenTrackingModal = (order) => {
    setTrackingModalOrder(order);
    setTrackingNumberInput(order.trackingNumber || '');
    setCourierInput(order.courierPartner || (order.channel === 'wholesale' ? 'FreightMaster LTL' : 'BlueDart Express'));
  };

  const handleSaveTracking = (e) => {
    e.preventDefault();
    if (!trackingModalOrder) return;

    updateOrderStatus(trackingModalOrder.id, 'Shipped', trackingNumberInput, courierInput);
    setTrackingModalOrder(null);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B87A0B] block mb-1">
            Fulfillment & Invoicing
          </span>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#3D2206]">
            All Channels Order Management
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Monitor online retail courier dispatches and B2B wholesale freight purchase orders.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search order #, customer, tracking..."
            className="w-full bg-[#FAF6EE] border border-stone-300 rounded-xl pl-10 pr-3.5 py-2 text-xs text-stone-800 placeholder-stone-400 focus:outline-hidden focus:border-[#D89816]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Channel Tabs */}
          <div className="bg-stone-100 p-1 rounded-xl flex items-center text-xs">
            <button
              onClick={() => setSelectedChannel('all')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                selectedChannel === 'all' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500'
              }`}
            >
              All Channels ({orders.length})
            </button>
            <button
              onClick={() => setSelectedChannel('online')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                selectedChannel === 'online' ? 'bg-white text-blue-700 shadow-xs' : 'text-stone-500'
              }`}
            >
              Online D2C
            </button>
            <button
              onClick={() => setSelectedChannel('wholesale')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                selectedChannel === 'wholesale' ? 'bg-white text-emerald-700 shadow-xs' : 'text-stone-500'
              }`}
            >
              Wholesale B2B
            </button>
          </div>

          {/* Status Dropdown */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-[#FAF6EE] border border-stone-300 rounded-xl px-3 py-2 text-xs font-semibold text-stone-800 focus:outline-hidden focus:border-[#D89816]"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#FAF6EE] border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Order Ref & Channel</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Customer / Company</th>
                <th className="py-3 px-3">Items Summary</th>
                <th className="py-3 px-3 text-right">Total</th>
                <th className="py-3 px-3 text-center">Fulfillment Status</th>
                <th className="py-3 px-3">Dispatch Tracking</th>
                <th className="py-3 px-4 text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-[#FAF9F5] transition-colors">
                  
                  {/* Order Number & Channel */}
                  <td className="py-3.5 px-4">
                    <div className="font-mono font-bold text-stone-900 text-xs">
                      {ord.orderNumber}
                    </div>
                    <span className={`text-[9px] font-bold px-2 py-0.2 rounded-full uppercase inline-block mt-0.5 ${
                      ord.channel === 'online' ? 'bg-blue-50 text-blue-700' : 'bg-emerald-50 text-emerald-800'
                    }`}>
                      {ord.channel === 'online' ? '🌐 Web Retail' : '🏢 B2B Wholesale'}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="py-3.5 px-3 text-stone-500 text-[11px]">
                    {ord.date}
                  </td>

                  {/* Customer */}
                  <td className="py-3.5 px-3">
                    <div className="font-bold text-stone-900 truncate max-w-[150px]">
                      {ord.customerName}
                    </div>
                    <div className="text-[10px] text-stone-400 truncate max-w-[150px]">
                      {ord.customerEmail}
                    </div>
                  </td>

                  {/* Items */}
                  <td className="py-3.5 px-3">
                    <div className="text-stone-700 truncate max-w-[200px]">
                      {ord.items.map(i => `${i.quantity}x ${i.productName}`).join(', ')}
                    </div>
                    <span className="text-[10px] text-stone-400">{ord.items.length} unique SKUs</span>
                  </td>

                  {/* Total */}
                  <td className="py-3.5 px-3 text-right">
                    <span className="font-extrabold text-[#3D2206] text-sm">
                      ₹{ord.totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className="block text-[9px] text-emerald-700 font-bold">{ord.paymentStatus}</span>
                  </td>

                  {/* Status Dropdown */}
                  <td className="py-3.5 px-3 text-center">
                    <select
                      value={ord.status}
                      onChange={(e) => handleStatusChange(ord.id, e.target.value)}
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full border cursor-pointer ${
                        ord.status === 'Delivered'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : ord.status === 'Shipped'
                            ? 'bg-blue-50 text-blue-800 border-blue-300'
                            : 'bg-amber-50 text-amber-800 border-amber-300'
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>

                  {/* Tracking info */}
                  <td className="py-3.5 px-3">
                    {ord.trackingNumber ? (
                      <div className="space-y-0.5">
                        <span className="font-mono text-[10px] font-semibold text-stone-700 block">
                          {ord.trackingNumber}
                        </span>
                        <span className="text-[10px] text-stone-400 block">
                          via {ord.courierPartner}
                        </span>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleOpenTrackingModal(ord)}
                        className="text-[10px] font-bold text-amber-800 hover:underline flex items-center gap-1"
                      >
                        <Truck className="w-3 h-3 text-amber-600" />
                        <span>Assign Tracking</span>
                      </button>
                    )}
                  </td>

                  {/* Actions / Invoice */}
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setActiveInvoice(ord)}
                      className="p-1.5 text-stone-500 hover:text-amber-800 hover:bg-amber-50 rounded-lg transition-colors"
                      title="View Official Invoice"
                    >
                      <FileText className="w-4 h-4" />
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assign Tracking Modal */}
      {trackingModalOrder && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-[#F5E5B5] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-serif-luxury font-bold text-lg text-[#3D2206]">
                Assign Tracking: {trackingModalOrder.orderNumber}
              </h3>
              <button
                onClick={() => setTrackingModalOrder(null)}
                className="text-stone-400 hover:text-stone-700 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveTracking} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">Courier / Freight Partner</label>
                <input
                  type="text"
                  required
                  value={courierInput}
                  onChange={(e) => setCourierInput(e.target.value)}
                  className="w-full bg-[#FAF6EE] border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-800"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Tracking Consignment Number</label>
                <input
                  type="text"
                  required
                  value={trackingNumberInput}
                  onChange={(e) => setTrackingNumberInput(e.target.value)}
                  placeholder="e.g. BLUEDART-99201948 or FDX-772910"
                  className="w-full bg-[#FAF6EE] border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-800"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setTrackingModalOrder(null)}
                  className="px-4 py-2 rounded-xl border border-stone-300 text-stone-600 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#D89816] hover:bg-[#B87A0B] text-stone-950 font-bold px-5 py-2 rounded-xl shadow-xs"
                >
                  Confirm & Mark Shipped
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Invoice Viewer Modal */}
      {activeInvoice && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 border border-[#F5E5B5] shadow-2xl space-y-6">
            <div className="flex items-start justify-between border-b border-stone-100 pb-3">
              <div>
                <h3 className="font-brand font-bold text-lg text-[#3D2206]">
                  HARUVIRU GOLD HONEY INVOICE
                </h3>
                <span className="font-mono text-xs text-amber-900 font-bold">
                  {activeInvoice.orderNumber}
                </span>
              </div>
              <button
                onClick={() => setActiveInvoice(null)}
                className="text-stone-400 hover:text-stone-700 p-1"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-stone-400 block font-bold uppercase text-[10px]">Customer / Account</span>
                <p className="font-bold text-stone-900">{activeInvoice.customerName}</p>
                <p className="text-stone-600">{activeInvoice.customerEmail}</p>
                <p className="text-stone-600">{activeInvoice.shippingAddress.city}, {activeInvoice.shippingAddress.country}</p>
              </div>
              <div className="text-right">
                <span className="text-stone-400 block font-bold uppercase text-[10px]">Payment & Status</span>
                <p className="font-bold text-stone-900">{activeInvoice.paymentMethod}</p>
                <p className="text-emerald-700 font-bold">{activeInvoice.paymentStatus}</p>
                <p className="text-stone-500">Date: {activeInvoice.date}</p>
              </div>
            </div>

            {/* Line items */}
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-stone-200 text-stone-400 uppercase text-[10px]">
                  <th className="py-2">Item</th>
                  <th className="py-2 text-center">Qty</th>
                  <th className="py-2 text-right">Rate</th>
                  <th className="py-2 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {activeInvoice.items.map((it, idx) => (
                  <tr key={idx}>
                    <td className="py-2 font-medium text-stone-800">{it.productName} ({it.weight})</td>
                    <td className="py-2 text-center">{it.quantity}</td>
                    <td className="py-2 text-right">₹{it.price.toFixed(2)}</td>
                    <td className="py-2 text-right font-bold">₹{(it.price * it.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="space-y-1 text-xs text-right border-t border-stone-200 pt-3">
              <div>Subtotal: <b>₹{activeInvoice.subtotal.toFixed(2)}</b></div>
              <div>Shipping & Handling: <b>₹{activeInvoice.shippingFee.toFixed(2)}</b></div>
              <div>GST (5%): <b>₹{activeInvoice.tax.toFixed(2)}</b></div>
              <div className="text-base font-extrabold text-[#3D2206] pt-1">
                Grand Total: ₹{activeInvoice.totalAmount.toFixed(2)}
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex justify-end">
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
