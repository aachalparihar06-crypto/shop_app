import React from 'react';
import type { Product } from '../types';
import { formatINR } from '../utils/formatters';
import { BellRing, BellOff, Info, TrendingDown } from 'lucide-react';

interface PriceDropAlertsPageProps {
  products: Product[];
  priceAlertIds: number[];
  onTogglePriceAlert: (productId: number) => void;
  onAddToCart: (product: Product) => void;
}

export const PriceDropAlertsPage: React.FC<PriceDropAlertsPageProps> = ({
  products,
  priceAlertIds,
  onTogglePriceAlert,
  onAddToCart,
}) => {
  return (
    <div id="price-drop-alerts-view" className="space-y-6 animate-fadeIn">
      {/* Notice Banner */}
      <div className="bg-blue-50/80 border border-blue-200/80 rounded-2xl p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div className="text-xs text-blue-900 leading-relaxed">
          <strong className="font-bold">Demo Notice:</strong> This feature simulates automated price tracking. Enabling an alert adds the product to your local monitoring list and triggers simulated browser notifications when special discounts apply.
        </div>
      </div>

      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <TrendingDown className="w-6 h-6 text-indigo-600" />
            <span>Price Drop Alerts Tracker</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Never miss a price drop on your favourite gadgets and lifestyle items.
          </p>
        </div>

        <div className="px-4 py-2 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold shrink-0">
          {priceAlertIds.length} Alerts Active
        </div>
      </div>

      {/* Product List with Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product) => {
          const isAlertActive = priceAlertIds.includes(product.id);
          const targetPrice = Math.round(product.price * 0.9);

          return (
            <div
              key={product.id}
              className={`rounded-2xl p-4 border transition-all duration-200 flex gap-4 ${
                isAlertActive
                  ? 'bg-indigo-50/40 border-indigo-300 shadow-xs'
                  : 'bg-white/90 border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-24 h-24 rounded-xl object-cover shrink-0 bg-slate-100"
              />

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-sm text-slate-900 leading-tight">
                      {product.name}
                    </h3>
                    {isAlertActive && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-600 text-white shrink-0">
                        Active
                      </span>
                    )}
                  </div>

                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-base font-extrabold text-slate-900">
                      {formatINR(product.price)}
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      {formatINR(product.originalPrice)}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 mt-1">
                    Alert target: <span className="font-bold text-indigo-600">{formatINR(targetPrice)}</span> or lower
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-100">
                  <button
                    id={`toggle-alert-page-${product.id}`}
                    onClick={() => onTogglePriceAlert(product.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      isAlertActive
                        ? 'bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                  >
                    {isAlertActive ? (
                      <>
                        <BellOff className="w-3.5 h-3.5" />
                        <span>Disable Alert</span>
                      </>
                    ) : (
                      <>
                        <BellRing className="w-3.5 h-3.5" />
                        <span>Enable Alert</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onAddToCart(product)}
                    className="px-3 py-1.5 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
