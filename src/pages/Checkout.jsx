import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import { 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  CheckCircle2, 
  Crown, 
  Lock, 
  ArrowRight,
  Package,
  Calendar,
  Phone,
  Mail,
  Home
} from 'lucide-react';

export const Checkout = () => {
  const navigate = useNavigate();
  const { cart, cartSubtotal, cartDiscount, cartTax, cartShipping, cartTotal, appliedCoupon, createOrder } = useApp();

  // Form State
  const [formData, setFormData] = useState({
    firstName: 'Sophia',
    lastName: 'Montgomery',
    email: 'sophia.mont@gmail.com',
    phone: '+1 (555) 349-2810',
    street: '742 Evergreen Terrace, Suite 4B',
    city: 'San Francisco',
    state: 'CA',
    zip: '94107',
    country: 'United States',
    paymentMethod: 'Credit Card',
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '12/28',
    cardCvv: '884',
    shippingSpeed: 'standard'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const expressFee = formData.shippingSpeed === 'express' ? 14 : 0;
  const finalTotal = cartTotal + expressFee;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const placedOrder = createOrder({
        customerName: `${formData.firstName} ${formData.lastName}`,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        channel: 'online',
        type: 'B2C',
        subtotal: cartSubtotal,
        tax: cartTax,
        shippingFee: cartShipping + expressFee,
        discount: cartDiscount,
        totalAmount: finalTotal,
        paymentMethod: formData.paymentMethod,
        shippingAddress: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
          country: formData.country
        }
      });

      setIsSubmitting(false);
      setConfirmedOrder(placedOrder);

      // Trigger royal gold confetti!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D89816', '#F3D279', '#B87A0B', '#2C1810']
      });
    }, 1200);
  };

  if (confirmedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-8 animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-lg">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#B87A0B]">
            Order Confirmation
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#3D2206]">
            Thank You, {confirmedOrder.customerName}!
          </h1>
          <p className="text-sm text-stone-600 max-w-lg mx-auto">
            Your single-origin honey harvest order has been received and queued for bespoke cold-packaging.
          </p>
        </div>

        {/* Confirmation Details Card */}
        <div className="bg-white rounded-3xl border border-[#F5E5B5] p-6 sm:p-8 text-left shadow-md space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 pb-4">
            <div>
              <span className="text-xs text-stone-400 block">Order Number</span>
              <span className="font-mono font-bold text-base text-amber-900">{confirmedOrder.orderNumber}</span>
            </div>
            <div>
              <span className="text-xs text-stone-400 block">Estimated Arrival</span>
              <span className="font-bold text-sm text-stone-800">3-4 Business Days</span>
            </div>
            <div>
              <span className="text-xs text-stone-400 block">Tracking Code</span>
              <span className="font-mono text-xs font-semibold text-stone-700">{confirmedOrder.trackingNumber}</span>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
              Items Ordered:
            </span>
            {confirmedOrder.items.map((item, idx) => (
              <div key={idx} className="flex justify-between text-xs py-1.5 border-b border-stone-50">
                <span className="font-medium text-stone-800">
                  {item.quantity}x {item.productName} ({item.weight})
                </span>
                <span className="font-bold text-stone-900">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 flex justify-between items-baseline text-stone-900 font-bold border-t border-stone-100">
            <span>Total Paid</span>
            <span className="text-2xl text-[#3D2206]">${confirmedOrder.totalAmount.toFixed(2)}</span>
          </div>

          <div className="bg-[#FAF4E4] p-3 rounded-xl border border-[#F5E5B5] text-xs text-stone-700 flex items-center gap-2">
            <Mail className="w-4 h-4 text-amber-600 shrink-0" />
            <span>A receipt and NMR purity lab certificate have been sent to <b>{confirmedOrder.customerEmail}</b>.</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate('/user/orders')}
            className="bg-[#D89816] hover:bg-[#B87A0B] text-stone-950 font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full shadow-md transition-all hover:scale-105"
          >
            Track in Order History
          </button>
          <Link
            to="/shop"
            className="bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 font-semibold text-xs uppercase tracking-wider px-8 py-4 rounded-full transition-all"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      <div>
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#B87A0B] block mb-1">
          Bespoke Dispatch
        </span>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#3D2206]">
          Secure Checkout
        </h1>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left: Input sections */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Step 1: Customer Contact */}
          <div className="bg-white rounded-3xl border border-[#F5E5B5] p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
              <div className="w-7 h-7 rounded-full bg-[#D89816] text-stone-950 font-bold text-xs flex items-center justify-center">
                1
              </div>
              <h3 className="font-serif-luxury font-bold text-lg text-[#3D2206]">
                Collector Contact Information
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">First Name</label>
                <input
                  type="text"
                  required
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full bg-[#FCF9F2] border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-800 focus:outline-hidden focus:border-[#D89816]"
                />
              </div>
              <div>
                <label className="font-semibold text-stone-700 block mb-1">Last Name</label>
                <input
                  type="text"
                  required
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full bg-[#FCF9F2] border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-800 focus:outline-hidden focus:border-[#D89816]"
                />
              </div>
              <div>
                <label className="font-semibold text-stone-700 block mb-1">Email Address (for NMR lab dispatch)</label>
                <input
                  type="email"
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-[#FCF9F2] border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-800 focus:outline-hidden focus:border-[#D89816]"
                />
              </div>
              <div>
                <label className="font-semibold text-stone-700 block mb-1">Phone Number (courier SMS)</label>
                <input
                  type="tel"
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-[#FCF9F2] border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-800 focus:outline-hidden focus:border-[#D89816]"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Shipping Destination */}
          <div className="bg-white rounded-3xl border border-[#F5E5B5] p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
              <div className="w-7 h-7 rounded-full bg-[#D89816] text-stone-950 font-bold text-xs flex items-center justify-center">
                2
              </div>
              <h3 className="font-serif-luxury font-bold text-lg text-[#3D2206]">
                Cold-Chain Delivery Address
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2">
                <label className="font-semibold text-stone-700 block mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  className="w-full bg-[#FCF9F2] border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-800 focus:outline-hidden focus:border-[#D89816]"
                />
              </div>
              <div>
                <label className="font-semibold text-stone-700 block mb-1">City</label>
                <input
                  type="text"
                  required
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full bg-[#FCF9F2] border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-800 focus:outline-hidden focus:border-[#D89816]"
                />
              </div>
              <div>
                <label className="font-semibold text-stone-700 block mb-1">State / Province</label>
                <input
                  type="text"
                  required
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full bg-[#FCF9F2] border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-800 focus:outline-hidden focus:border-[#D89816]"
                />
              </div>
              <div>
                <label className="font-semibold text-stone-700 block mb-1">Postal Code</label>
                <input
                  type="text"
                  required
                  name="zip"
                  value={formData.zip}
                  onChange={handleInputChange}
                  className="w-full bg-[#FCF9F2] border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-800 focus:outline-hidden focus:border-[#D89816]"
                />
              </div>
              <div>
                <label className="font-semibold text-stone-700 block mb-1">Country</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full bg-[#FCF9F2] border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-800 focus:outline-hidden focus:border-[#D89816]"
                >
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="India">India</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                  <option value="France">France</option>
                </select>
              </div>
            </div>

            {/* Courier Speed Picker */}
            <div className="pt-4 border-t border-stone-100 space-y-2">
              <label className="font-semibold text-stone-700 block text-xs">
                Select Courier Method:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    formData.shippingSpeed === 'standard'
                      ? 'border-[#D89816] bg-[#FCF9F2] ring-2 ring-amber-400/20'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="shippingSpeed"
                    value="standard"
                    checked={formData.shippingSpeed === 'standard'}
                    onChange={handleInputChange}
                    className="mt-1 accent-amber-600"
                  />
                  <div>
                    <span className="font-bold text-xs text-stone-900 block">
                      Standard Cold-Protected Courier (3-5 days)
                    </span>
                    <span className="text-[11px] text-stone-500">
                      {cartShipping === 0 ? 'Complimentary (Free)' : `$${cartShipping.toFixed(2)}`}
                    </span>
                  </div>
                </label>

                <label
                  className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    formData.shippingSpeed === 'express'
                      ? 'border-[#D89816] bg-[#FCF9F2] ring-2 ring-amber-400/20'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="shippingSpeed"
                    value="express"
                    checked={formData.shippingSpeed === 'express'}
                    onChange={handleInputChange}
                    className="mt-1 accent-amber-600"
                  />
                  <div>
                    <span className="font-bold text-xs text-stone-900 block">
                      Priority Golden Flight (1-2 days)
                    </span>
                    <span className="text-[11px] text-amber-700 font-semibold">+$14.00</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Step 3: Payment Method */}
          <div className="bg-white rounded-3xl border border-[#F5E5B5] p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
              <div className="w-7 h-7 rounded-full bg-[#D89816] text-stone-950 font-bold text-xs flex items-center justify-center">
                3
              </div>
              <h3 className="font-serif-luxury font-bold text-lg text-[#3D2206]">
                Payment Selection
              </h3>
            </div>

            <div className="flex flex-wrap gap-3">
              {['Credit Card', 'UPI / NetBanking', 'Cash on Delivery'].map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: method })}
                  className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                    formData.paymentMethod === method
                      ? 'bg-[#D89816] text-stone-950 border-[#D89816] shadow-xs'
                      : 'bg-[#FCF9F2] text-stone-700 border-stone-200 hover:border-stone-300'
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>

            {formData.paymentMethod === 'Credit Card' && (
              <div className="p-4 bg-[#FCF9F2] rounded-2xl border border-stone-200 space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Card Number (Demo sandbox)</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-stone-800"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Expires</label>
                    <input
                      type="text"
                      name="cardExp"
                      value={formData.cardExp}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-stone-800"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">CVV</label>
                    <input
                      type="text"
                      name="cardCvv"
                      value={formData.cardCvv}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-stone-800"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Right: Order Review Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-[#F5E5B5] p-6 shadow-xs space-y-6 sticky top-24">
            <h3 className="font-serif-luxury font-bold text-lg text-[#3D2206] border-b border-stone-100 pb-3">
              Order Review
            </h3>

            {/* Cart Items list */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5 truncate">
                    <img
                      src={item.product.image}
                      alt=""
                      className="w-10 h-10 rounded-lg object-cover border border-stone-200 shrink-0"
                    />
                    <div className="truncate">
                      <p className="font-bold text-stone-800 truncate">{item.product.name}</p>
                      <p className="text-[10px] text-stone-400">Qty: {item.quantity} • {item.selectedWeight}</p>
                    </div>
                  </div>
                  <span className="font-bold text-stone-900 shrink-0">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-2.5 text-xs text-stone-600 border-t border-stone-100 pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-stone-800">${cartSubtotal.toFixed(2)}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Coupon ({appliedCoupon.code})</span>
                  <span>-${cartDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-bold text-stone-800">
                  {cartShipping + expressFee === 0 ? 'FREE' : `$${(cartShipping + expressFee).toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tax (8%)</span>
                <span className="font-bold text-stone-800">${cartTax.toFixed(2)}</span>
              </div>
              <div className="pt-3 border-t border-stone-100 flex justify-between items-baseline text-stone-900 font-bold">
                <span className="text-sm">Total Due</span>
                <span className="text-2xl text-[#3D2206]">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#D89816] hover:bg-[#B87A0B] disabled:bg-stone-300 text-stone-950 font-bold text-xs uppercase tracking-wider py-4 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-98"
            >
              {isSubmitting ? (
                <span>Authorizing Cold-Chain Dispatch...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Authorize & Place Order</span>
                </>
              )}
            </button>

            <div className="text-[11px] text-stone-400 text-center space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-stone-600 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Test Mode Active • No actual card charged</span>
              </div>
            </div>
          </div>
        </div>

      </form>

    </div>
  );
};
