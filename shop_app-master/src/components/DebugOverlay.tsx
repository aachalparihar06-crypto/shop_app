import React from 'react';
import type { CartItem, Coupon, AppPage, CheckoutFormData } from '../types';
import { formatINR } from '../utils/formatters';
import { Bug, X, Terminal, CheckCircle2, AlertTriangle } from 'lucide-react';

interface DebugOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: AppPage;
  cartItems: CartItem[];
  activeCoupon: Coupon | null;
  simulateCheckoutFailure: boolean;
  wishlistCount: number;
  priceAlertsCount: number;
  formData: CheckoutFormData;
  lastAction: string;
}

export const DebugOverlay: React.FC<DebugOverlayProps> = ({
  isOpen,
  onClose,
  currentPage,
  cartItems,
  activeCoupon,
  simulateCheckoutFailure,
  wishlistCount,
  priceAlertsCount,
  formData,
  lastAction,
}) => {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div
      id="debug-panel"
      className="fixed bottom-4 right-4 z-50 w-96 max-w-[95vw] bg-slate-900/95 text-slate-100 rounded-3xl border border-indigo-500/40 shadow-2xl backdrop-blur-xl overflow-hidden font-mono text-xs animate-fadeIn"
    >
      {/* Panel Header */}
      <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bug className="w-4 h-4 text-indigo-400" />
          <span className="font-bold text-slate-200">ShopEase Debug Inspector</span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Close Debug Panel"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Body Content */}
      <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
        {/* Simulation Status */}
        <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Checkout Failure Simulation:</span>
            {simulateCheckoutFailure ? (
              <span className="text-rose-400 font-bold flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> ENABLED
              </span>
            ) : (
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> NORMAL
              </span>
            )}
          </div>
          <p className="text-[10px] text-slate-500">
            Controlled via Left Sidebar Demo Controls toggle.
          </p>
        </div>

        {/* State Snapshot */}
        <div className="space-y-1.5 text-[11px]">
          <div className="flex justify-between border-b border-slate-800 py-1">
            <span className="text-slate-400">Active View:</span>
            <span className="text-indigo-300 font-bold">{currentPage}</span>
          </div>

          <div className="flex justify-between border-b border-slate-800 py-1">
            <span className="text-slate-400">Cart Items Count:</span>
            <span className="text-amber-300 font-bold">
              {cartItems.reduce((acc, i) => acc + i.quantity, 0)} ({cartItems.length} lines)
            </span>
          </div>

          <div className="flex justify-between border-b border-slate-800 py-1">
            <span className="text-slate-400">Cart Subtotal:</span>
            <span className="text-emerald-300 font-bold">{formatINR(subtotal)}</span>
          </div>

          <div className="flex justify-between border-b border-slate-800 py-1">
            <span className="text-slate-400">Active Coupon:</span>
            <span className="text-blue-300 font-bold">
              {activeCoupon ? activeCoupon.code : 'None'}
            </span>
          </div>

          <div className="flex justify-between border-b border-slate-800 py-1">
            <span className="text-slate-400">Wishlist Items:</span>
            <span className="text-rose-300 font-bold">{wishlistCount}</span>
          </div>

          <div className="flex justify-between border-b border-slate-800 py-1">
            <span className="text-slate-400">Price Alerts:</span>
            <span className="text-purple-300 font-bold">{priceAlertsCount}</span>
          </div>
        </div>

        {/* Form State */}
        <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[10px] space-y-1">
          <span className="text-slate-400 uppercase tracking-wider block font-bold">
            Checkout Form Buffer:
          </span>
          <div className="text-slate-300 truncate">
            Name: {formData.name || '(empty)'} | Email: {formData.email || '(empty)'}
          </div>
          <div className="text-slate-300 truncate">
            City: {formData.city || '(empty)'} | PIN: {formData.zip || '(empty)'}
          </div>
        </div>

        {/* Last Action Log */}
        <div className="flex items-center gap-2 text-[10px] text-slate-400 pt-1">
          <Terminal className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span className="truncate">Last Action: {lastAction}</span>
        </div>
      </div>
    </div>
  );
};
