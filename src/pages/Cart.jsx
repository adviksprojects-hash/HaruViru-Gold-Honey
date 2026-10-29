import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShieldCheck, 
  Tag, 
  Check, 
  Gift,
  Truck
} from 'lucide-react';

export const Cart = () => {
  const navigate = useNavigate();
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    cartSubtotal, 
    cartDiscount, 
    cartTax, 
    cartShipping, 
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [giftWrap, setGiftWrap] = useState(false);

  const freeShippingThreshold = 999;
  const amountNeeded = Math.max(0, freeShippingThreshold - cartSubtotal);
  const progressPercent = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput) return;
    const success = applyCoupon(couponInput);
    if (success) setCouponInput('');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6 bg-white">
        <div className="w-20 h-20 rounded-full bg-amber-50 border border-amber-200 mx-auto flex items-center justify-center text-amber-600 shadow-sm">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="font-serif-luxury text-3xl font-black text-stone-900">
            Your Honey Basket is Empty
          </h2>
          <p className="text-sm text-stone-500 max-w-md mx-auto">
            You haven't selected any rare mountain honey reserves yet. Explore our autumn single-origin harvest.
          </p>
        </div>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 gradient-btn-honey text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full shadow-md hover:scale-105"
        >
          <span>Explore Honey Reserves</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 bg-white">
      
      {/* Title */}
      <div>
        <span className="badge-pill-soft px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-block mb-2">
          Review Your Selection
        </span>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-black text-stone-900">
          Your Artisanal Honey Cart
        </h1>
      </div>

      {/* Free Shipping Progress Card */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-3xl p-5 space-y-2.5 shadow-xs">
        <div className="flex items-center justify-between text-xs font-bold">
          <div className="flex items-center gap-2 text-stone-800">
            <Truck className="w-4 h-4 text-amber-600" />
            {amountNeeded > 0 ? (
              <span>Add <b className="text-orange-600">₹{amountNeeded.toFixed(2)}</b> more to unlock Complimentary Express Shipping!</span>
            ) : (
              <span className="text-emerald-700 flex items-center gap-1">
                <Check className="w-4 h-4 text-emerald-600" />
                Congratulations! You have unlocked Complimentary Express Shipping!
              </span>
            )}
          </div>
          <span className="text-stone-500 font-extrabold">{progressPercent.toFixed(0)}%</span>
        </div>
        <div className="w-full bg-stone-200 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left: Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-3xl border border-stone-200 p-4 sm:p-6 shadow-xs divide-y divide-stone-100">
            {cart.map((item) => (
              <div key={item.product.id} className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                
                {/* Item Details */}
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-stone-50 border border-stone-200 shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-700 bg-orange-50 px-2 py-0.5 rounded-md">
                      {item.product.category}
                    </span>
                    <Link to={`/product/${item.product.id}`}>
                      <h4 className="font-serif-luxury font-bold text-sm sm:text-base text-stone-900 hover:text-amber-600 transition-colors">
                        {item.product.name}
                      </h4>
                    </Link>
                    <div className="flex items-center gap-2 text-xs text-stone-500">
                      <span>Size: <b>{item.selectedWeight}</b></span>
                      <span>•</span>
                      <span>Batch: <span className="font-mono text-[11px] text-stone-700">{item.product.batchNumber}</span></span>
                    </div>
                  </div>
                </div>

                {/* Quantity and Line Total */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0">
                  <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50 p-1">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-1 text-stone-600 hover:text-stone-900 rounded-lg"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center font-black text-xs text-stone-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-1 text-stone-600 hover:text-stone-900 rounded-lg"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right min-w-[70px]">
                    <span className="font-black text-sm sm:text-base text-stone-900">
                      ₹{(item.product.price * item.quantity).toFixed(2)}
                    </span>
                    <p className="text-[10px] text-stone-400">
                      ₹{item.product.price} each
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-stone-400 hover:text-rose-600 p-1.5 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Luxury Gift Packaging Add-on */}
          <div className="bg-stone-50 rounded-2xl border border-stone-200 p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-bold">
                <Gift className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <h5 className="font-bold text-xs text-stone-900">Complimentary Artisanal Gift Packaging</h5>
                <p className="text-[11px] text-stone-500">Includes royal velvet ribbon, gold sealing wax stamp, and wooden honey dipper.</p>
              </div>
            </div>
            <button
              onClick={() => setGiftWrap(!giftWrap)}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all ${
                giftWrap 
                  ? 'gradient-btn-honey text-white border-transparent' 
                  : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
              }`}
            >
              {giftWrap ? '✓ Included' : '+ Add Free'}
            </button>
          </div>

          <div className="flex justify-between items-center pt-2">
            <Link
              to="/shop"
              className="text-xs font-bold text-amber-700 hover:text-orange-600 flex items-center gap-1.5"
            >
              <span>← Continue Shopping</span>
            </Link>
            <button
              onClick={clearCart}
              className="text-xs text-stone-400 hover:text-rose-600 transition-colors"
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Right: Order Summary Card */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-6">
            <h3 className="font-serif-luxury font-bold text-lg text-stone-900 border-b border-stone-100 pb-3">
              Order Summary
            </h3>

            {/* Line Items */}
            <div className="space-y-3 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal ({cart.length} items)</span>
                <span className="font-bold text-stone-800">₹{cartSubtotal.toFixed(2)}</span>
              </div>

              {appliedCoupon && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Coupon ({appliedCoupon.code})</span>
                  <span>-₹{cartDiscount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Royal Cold-Chain Shipping</span>
                <span className="font-bold text-stone-800">
                  {cartShipping === 0 ? (
                    <span className="text-emerald-700 font-bold">FREE</span>
                  ) : (
                    `₹${cartShipping.toFixed(2)}`
                  )}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Estimated GST (5%)</span>
                <span className="font-bold text-stone-800">₹{cartTax.toFixed(2)}</span>
              </div>

              <div className="pt-3 border-t border-stone-100 flex justify-between items-baseline text-stone-900">
                <span className="text-sm font-bold">Total Amount</span>
                <span className="text-2xl font-black text-stone-900">₹{cartTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Coupon input */}
            <div className="pt-2 border-t border-stone-100 space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                Promo Code:
              </label>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-800">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Tag className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{appliedCoupon.code} Applied</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-[11px] text-stone-500 hover:text-rose-600 font-semibold underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="e.g. GOLDEN15"
                    className="flex-1 bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs uppercase tracking-wider text-stone-800 focus:outline-hidden focus:border-amber-500"
                  />
                  <button
                    type="submit"
                    className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all"
                  >
                    Apply
                  </button>
                </form>
              )}
              <div className="text-[10px] text-stone-400">
                Available demo promo codes: <b>GOLDEN15</b>, <b>ROYALHIVE</b>, <b>FREESHIP</b>
              </div>
            </div>

            {/* Proceed to Checkout CTA */}
            <button
              onClick={() => navigate('/checkout')}
              className="w-full gradient-btn-honey text-white font-bold text-xs uppercase tracking-wider py-4 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-98"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-[11px] text-stone-400 text-center space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-stone-600 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Bank-Grade 256-Bit SSL Encryption</span>
              </div>
              <p>NMR batch reports included with physical order dispatch.</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
