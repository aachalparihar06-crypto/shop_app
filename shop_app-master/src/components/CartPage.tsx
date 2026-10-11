import React, { useState } from 'react';
import type { CartItem, Coupon, AppPage } from '../types';
import { formatINR } from '../utils/formatters';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Tag,
  ShieldCheck,
  Check,
  X,
  Truck,
} from 'lucide-react';

interface CartPageProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: number, delta: number) => void;
  onRemove: (productId: number) => void;
  onNavigate: (page: AppPage) => void;
  activeCoupon: Coupon | null;
  onApplyCouponCode: (code: string) => boolean;
  onRemoveCoupon: () => void;
  coupons: Coupon[];
}

export const CartPage: React.FC<CartPageProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemove,
  onNavigate,
  activeCoupon,
  onApplyCouponCode,
  onRemoveCoupon,
  coupons: _coupons,
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  // Financial Calculations
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Shipping is Free over ₹999 or if FREESHIP coupon is applied, else ₹99
  const isFreeShipping = subtotal >= 999 || activeCoupon?.code === 'FREESHIP';
  const rawShipping = subtotal === 0 ? 0 : isFreeShipping ? 0 : 99;

  // Coupon discount calculation
  let discount = 0;
  if (activeCoupon && subtotal >= activeCoupon.minOrder) {
    if (activeCoupon.code === 'FREESHIP') {
      discount = 99; // value of shipping saved
    } else {
      const calculated = (subtotal * activeCoupon.discountPercentage) / 100;
      discount = activeCoupon.maxDiscount
        ? Math.min(calculated, activeCoupon.maxDiscount)
        : calculated;
    }
  }

  const finalTotal = Math.max(0, subtotal + rawShipping - discount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    if (!couponInput.trim()) return;

    const success = onApplyCouponCode(couponInput.trim());
    if (success) {
      setCouponInput('');
    } else {
      setCouponError('Invalid coupon code. Try FESTIVE20 or HDFC10.');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div id="cart-view-empty" className="bg-white/90 backdrop-blur-md rounded-3xl p-12 text-center border border-slate-200/80 shadow-sm max-w-lg mx-auto space-y-4 animate-fadeIn">
        <div className="w-20 h-20 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-black text-slate-900">Your Cart is Empty</h1>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Looks like you haven't added anything to your cart yet. Explore our top deals and premium Indian picks!
        </p>
        <button
          id="continue-shopping-btn"
          onClick={() => onNavigate('dashboard')}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div id="cart-view" className="space-y-6 animate-fadeIn">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Review your selected products, apply coupons, and proceed to checkout
          </p>
        </div>

        <button
          id="continue-shopping-top-btn"
          onClick={() => onNavigate('dashboard')}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
        >
          <span>← Continue Shopping</span>
        </button>
      </div>

      {/* Free Delivery Progress Bar */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
          <Truck className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800">
              {subtotal >= 999 ? (
                <span className="text-emerald-600 flex items-center gap-1">
                  <Check className="w-4 h-4" /> You've unlocked FREE Express Delivery across India!
                </span>
              ) : (
                <>Add <strong className="text-indigo-600">{formatINR(999 - subtotal)}</strong> more for FREE Delivery</>
              )}
            </span>
            <span className="text-slate-400 font-semibold">{formatINR(subtotal)} / {formatINR(999)}</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 mt-2 overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, (subtotal / 999) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Cart Layout: Items + Order Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Items List (2 cols) */}
        <div className="lg:col-span-2 space-y-3">
          {cartItems.map((item) => (
            <div
              key={item.product.id}
              id={`cart-item-${item.product.id}`}
              className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-slate-200/80 shadow-xs flex gap-4 items-center"
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover bg-slate-100 shrink-0"
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                      {item.product.category}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug truncate">
                      {item.product.name}
                    </h3>
                  </div>

                  <button
                    id={`remove-${item.product.id}`}
                    onClick={() => onRemove(item.product.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Remove item"
                    aria-label={`Remove ${item.product.name} from cart`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm sm:text-base font-black text-slate-900">
                    {formatINR(item.product.price)}
                  </span>
                  <span className="text-xs text-slate-400 line-through">
                    {formatINR(item.product.originalPrice)}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100">
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl p-1">
                    <button
                      id={`qty-dec-${item.product.id}`}
                      onClick={() => onUpdateQuantity(item.product.id, -1)}
                      className="w-7 h-7 rounded-lg bg-white shadow-2xs hover:bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs transition-colors cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span
                      id={`qty-val-${item.product.id}`}
                      className="w-8 text-center text-xs font-bold text-slate-800"
                    >
                      {item.quantity}
                    </span>
                    <button
                      id={`qty-inc-${item.product.id}`}
                      onClick={() => onUpdateQuantity(item.product.id, 1)}
                      className="w-7 h-7 rounded-lg bg-white shadow-2xs hover:bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs transition-colors cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Line Total */}
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Total</span>
                    <span className="text-sm font-extrabold text-indigo-600">
                      {formatINR(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary & Coupon (1 col) */}
        <div className="space-y-4">
          {/* Coupon Box */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5 uppercase tracking-wider">
                <Tag className="w-4 h-4 text-amber-500" />
                <span>Coupon Code</span>
              </span>
              <button
                onClick={() => onNavigate('offers')}
                className="text-[11px] font-semibold text-indigo-600 hover:underline"
              >
                View Offers →
              </button>
            </div>

            {activeCoupon ? (
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-mono text-xs font-bold text-emerald-900 block">
                      {activeCoupon.code}
                    </span>
                    <span className="text-[10px] text-emerald-700">
                      {activeCoupon.description}
                    </span>
                  </div>
                </div>
                <button
                  onClick={onRemoveCoupon}
                  className="p-1 text-slate-400 hover:text-rose-600"
                  title="Remove Coupon"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    id="cart-coupon-input"
                    type="text"
                    placeholder="Enter FESTIVE20 or HDFC10"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono uppercase placeholder:font-sans placeholder:normal-case placeholder:text-slate-400 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="submit"
                    id="apply-coupon-submit-btn"
                    className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {couponError && (
                  <p className="text-[11px] text-rose-600 font-medium">{couponError}</p>
                )}
              </form>
            )}
          </div>

          {/* Pricing Breakdown Card */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-slate-200/80 shadow-md space-y-4">
            <h2 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3">
              Order Summary
            </h2>

            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} items)</span>
                <span className="font-bold text-slate-800" id="cart-subtotal-val">
                  {formatINR(subtotal)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-bold">
                  {rawShipping === 0 ? (
                    <span className="text-emerald-600 font-extrabold uppercase">FREE</span>
                  ) : (
                    formatINR(rawShipping)
                  )}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Coupon Discount ({activeCoupon?.code})</span>
                  <span>-{formatINR(discount)}</span>
                </div>
              )}

              <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                <div>
                  <span className="text-sm font-black text-slate-900 block">Total Amount</span>
                  <span className="text-[10px] text-slate-400">Includes all GST & taxes</span>
                </div>
                <span className="text-xl font-black text-slate-900" id="cart-final-total">
                  {formatINR(finalTotal)}
                </span>
              </div>
            </div>

            {/* Gradient Proceed to Checkout Button */}
            <button
              id="proceed-to-checkout-btn"
              onClick={() => onNavigate('checkout')}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.01] active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-2 text-center flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Safe & Secure 256-Bit SSL Demo Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
