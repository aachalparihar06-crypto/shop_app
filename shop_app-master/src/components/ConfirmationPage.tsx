import React from 'react';
import type { OrderDetails, AppPage } from '../types';
import { formatINR } from '../utils/formatters';
import {
  CheckCircle2,
  Package,
  Calendar,
  MapPin,
  ArrowRight,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';

interface ConfirmationPageProps {
  order: OrderDetails | null;
  onNavigate: (page: AppPage) => void;
}

export const ConfirmationPage: React.FC<ConfirmationPageProps> = ({
  order,
  onNavigate,
}) => {
  if (!order) {
    return (
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-12 text-center border border-slate-200/80 shadow-sm max-w-md mx-auto space-y-4">
        <p className="text-4xl">📦</p>
        <h2 className="text-xl font-bold text-slate-800">No recent order found</h2>
        <p className="text-xs text-slate-500">
          You haven't placed an order in this demo session yet.
        </p>
        <button
          onClick={() => onNavigate('dashboard')}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div
      id="order-confirmation-view"
      className="max-w-2xl mx-auto space-y-6 animate-fadeIn py-4"
    >
      {/* Success Card */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 border border-slate-200/80 shadow-xl text-center space-y-5 relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Success Icon */}
        <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-md ring-8 ring-emerald-50/50">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simulated Payment Successful</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Order Confirmed!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
            Thank you, <strong className="text-slate-800">{order.formData.name}</strong>! We've received your order and our Indian fulfilment hub is preparing your package.
          </p>
        </div>

        {/* Order Details Badge */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-wrap items-center justify-around gap-4 text-left">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              Demo Order ID
            </span>
            <span
              id="confirmed-order-id"
              className="font-mono text-sm sm:text-base font-extrabold text-indigo-700"
            >
              {order.orderId}
            </span>
          </div>

          <div className="h-8 w-px bg-slate-200 hidden sm:block" />

          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              Total Paid
            </span>
            <span
              id="confirmed-order-total"
              className="text-base sm:text-lg font-black text-emerald-600"
            >
              {formatINR(order.total)}
            </span>
          </div>

          <div className="h-8 w-px bg-slate-200 hidden sm:block" />

          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              Order Date
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-800">
              {order.date}
            </span>
          </div>
        </div>

        {/* Estimated Delivery Card */}
        <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 text-left flex items-start gap-3.5">
          <Calendar className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold text-blue-950">
              Estimated Delivery
            </h4>
            <p
              id="confirmed-delivery-info"
              className="text-xs font-semibold text-blue-800"
            >
              {order.estimatedDelivery}
            </p>
          </div>
        </div>

        {/* Shipping Address Summary */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-left flex items-start gap-3.5">
          <MapPin className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
          <div className="space-y-0.5 text-xs text-slate-700">
            <h4 className="font-bold text-slate-900">
              Delivery Destination
            </h4>
            <p>{order.formData.address}</p>
            <p>
              {order.formData.city}, {order.formData.state} — <strong>PIN {order.formData.zip}</strong>
            </p>
          </div>
        </div>

        {/* Items Summary */}
        <div className="text-left space-y-2 pt-2 border-t border-slate-100">
          <h4 className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5 uppercase tracking-wider">
            <Package className="w-4 h-4 text-indigo-600" />
            <span>Items in this Order ({order.items.length})</span>
          </h4>

          <div className="space-y-2">
            {order.items.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center justify-between p-2 rounded-xl bg-slate-50 text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-8 h-8 rounded-lg object-cover"
                  />
                  <span className="font-bold text-slate-800">
                    {item.product.name}
                  </span>
                  <span className="text-slate-400 font-medium">
                    (Qty: {item.quantity})
                  </span>
                </div>
                <span className="font-bold text-slate-900">
                  {formatINR(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Continue Shopping Button */}
        <div className="pt-4">
          <button
            id="order-continue-shopping-btn"
            onClick={() => onNavigate('dashboard')}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.01] active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
