import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  ShoppingBag, 
  Truck, 
  CheckCircle2, 
  Clock, 
  FileText, 
  RotateCw, 
  ChevronRight, 
  Download, 
  MapPin, 
  Crown,
  ExternalLink,
  X
} from 'lucide-react';

export const OrderHistory = () => {
  const { orders, addToCart, products, showToast } = useApp();
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Online B2C consumer orders
  const onlineOrders = orders.filter((o) => o.channel === 'online');

  const getStepIndex = (status) => {
    switch (status) {
      case 'Pending': return 0;
      case 'Processing': return 1;
      case 'Shipped': return 2;
      case 'Delivered': return 3;
      default: return 1;
    }
  };

  const handleReorder = (order) => {
    order.items.forEach((item) => {
      const prod = products.find((p) => p.id === item.productId);
      if (prod) {
        addToCart(prod, item.quantity, item.weight);
      }
    });
    showToast(`Items from ${order.orderNumber} re-added to your cart!`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#B87A0B] block mb-1">
            Collector Purchases
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#3D2206]">
            Order History & Delivery Tracking
          </h1>
        </div>

        <Link
          to="/shop"
          className="bg-[#D89816] hover:bg-[#B87A0B] text-stone-950 font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-full transition-all shadow-xs self-start sm:self-auto"
        >
          Explore New Harvest
        </Link>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {onlineOrders.map((order) => {
          const step = getStepIndex(order.status);
          const steps = ['Order Placed', 'NMR Quality Check', 'Cold-Chain Transit', 'Delivered'];

          return (
            <div
              key={order.id}
              className="bg-white rounded-3xl border border-[#F5E5B5] p-6 sm:p-8 shadow-xs space-y-6"
            >
              {/* Header info */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-extrabold text-base text-[#3D2206]">
                      {order.orderNumber}
                    </span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      order.status === 'Delivered' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500">
                    Ordered on {order.date} • Paid via {order.paymentMethod}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedInvoice(order)}
                    className="flex items-center gap-1.5 text-xs font-bold text-stone-700 hover:text-amber-800 bg-[#FAF6EE] border border-stone-200 px-3.5 py-2 rounded-xl transition-all"
                  >
                    <FileText className="w-4 h-4 text-amber-600" />
                    <span>View Receipt / Invoice</span>
                  </button>

                  <button
                    onClick={() => handleReorder(order)}
                    className="flex items-center gap-1.5 text-xs font-bold bg-[#D89816] hover:bg-[#B87A0B] text-stone-950 px-3.5 py-2 rounded-xl transition-all"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Reorder</span>
                  </button>
                </div>
              </div>

              {/* Progress Stepper */}
              <div className="py-2">
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  {steps.map((st, idx) => {
                    const isDone = idx <= step;
                    const isCurrent = idx === step;
                    return (
                      <div key={idx} className="flex flex-col items-center gap-2">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                            isDone
                              ? 'bg-[#D89816] text-stone-950 shadow-sm'
                              : 'bg-stone-100 text-stone-400'
                          }`}
                        >
                          {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                        </div>
                        <span className={`text-[11px] font-medium leading-tight ${isCurrent ? 'font-bold text-amber-900' : isDone ? 'text-stone-700' : 'text-stone-400'}`}>
                          {st}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Courier info card */}
              <div className="p-4 bg-[#FAF6EE] rounded-2xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-3">
                <div className="flex items-center gap-2.5">
                  <Truck className="w-4 h-4 text-amber-700 shrink-0" />
                  <div>
                    <span className="font-semibold text-stone-800">Courier Partner: </span>
                    <span className="text-stone-600">{order.courierPartner || 'BlueDart Express'}</span>
                  </div>
                </div>
                <div>
                  <span className="font-semibold text-stone-800">Tracking Code: </span>
                  <span className="font-mono font-bold text-amber-900">{order.trackingNumber}</span>
                </div>
                <div>
                  <span className="font-semibold text-stone-800">Delivery Address: </span>
                  <span className="text-stone-600">{order.shippingAddress.city}, {order.shippingAddress.state}</span>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3 pt-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs py-1.5 border-b border-stone-50 last:border-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-900">{item.quantity}x</span>
                      <span className="font-medium text-stone-800">{item.productName}</span>
                      <span className="text-stone-400">({item.weight})</span>
                    </div>
                    <span className="font-bold text-stone-900">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Total footer */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs text-stone-500">
                  Tax: ₹{order.tax.toFixed(2)} • Shipping: {order.shippingFee === 0 ? 'Free' : `₹${order.shippingFee.toFixed(2)}`}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-semibold text-stone-500">Order Total:</span>
                  <span className="text-xl font-black text-[#3D2206]">₹{order.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Invoice Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 border border-[#F5E5B5] shadow-2xl space-y-6">
            <div className="flex items-start justify-between border-b border-stone-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E4B345] to-[#8F5808] flex items-center justify-center text-white font-bold">
                  <Crown className="w-5 h-5 text-amber-100" />
                </div>
                <div>
                  <h3 className="font-brand font-bold text-lg text-[#3D2206]">
                    HARUVIRU GOLD HONEY
                  </h3>
                  <span className="text-[10px] text-stone-400 uppercase tracking-widest">
                    Official Tax Invoice & Authenticity Certificate
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="text-stone-400 hover:text-stone-700 p-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6 text-xs">
              <div>
                <p className="font-bold text-stone-800">Billed & Shipped To:</p>
                <p className="text-stone-600 mt-1 leading-relaxed">
                  {selectedInvoice.customerName}<br />
                  {selectedInvoice.shippingAddress.street}<br />
                  {selectedInvoice.shippingAddress.city}, {selectedInvoice.shippingAddress.state} {selectedInvoice.shippingAddress.zip}<br />
                  {selectedInvoice.shippingAddress.country}<br />
                  {selectedInvoice.customerEmail}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-stone-800">Invoice Details:</p>
                <p className="text-stone-600 mt-1 space-y-0.5">
                  <span className="block font-mono font-bold text-amber-900">Invoice: {selectedInvoice.orderNumber}</span>
                  <span className="block">Date: {selectedInvoice.date}</span>
                  <span className="block">Payment: {selectedInvoice.paymentMethod}</span>
                  <span className="block font-semibold text-emerald-700">Status: {selectedInvoice.paymentStatus}</span>
                </p>
              </div>
            </div>

            {/* Line items table */}
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-stone-200 text-stone-400 uppercase text-[10px]">
                  <th className="py-2">Item Description</th>
                  <th className="py-2 text-center">Qty</th>
                  <th className="py-2 text-right">Unit Price</th>
                  <th className="py-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {selectedInvoice.items.map((item, i) => (
                  <tr key={i}>
                    <td className="py-2.5 font-medium text-stone-800">
                      {item.productName} ({item.weight})
                    </td>
                    <td className="py-2.5 text-center">{item.quantity}</td>
                    <td className="py-2.5 text-right">₹{item.price.toFixed(2)}</td>
                    <td className="py-2.5 text-right font-bold">₹{(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-200 pt-3 text-right">
              <div>Subtotal: <b>₹{selectedInvoice.subtotal.toFixed(2)}</b></div>
              {selectedInvoice.discount > 0 && <div>Discount: <b>-₹{selectedInvoice.discount.toFixed(2)}</b></div>}
              <div>Shipping Fee: <b>₹{selectedInvoice.shippingFee.toFixed(2)}</b></div>
              <div>GST (5%): <b>₹{selectedInvoice.tax.toFixed(2)}</b></div>
              <div className="text-base font-extrabold text-[#3D2206] pt-1">
                Grand Total: ₹{selectedInvoice.totalAmount.toFixed(2)}
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 flex justify-between items-center text-xs">
              <span className="text-stone-400 text-[10px]">
                Certified 100% Raw Single-Origin Reserve • HaruViru Apiaries
              </span>
              <button
                onClick={() => {
                  window.print();
                }}
                className="bg-[#D89816] text-stone-950 font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Print / Save PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
