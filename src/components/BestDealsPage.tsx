import React, { useState, useEffect } from 'react';
import type { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Flame, Clock, Sparkles } from 'lucide-react';

interface BestDealsPageProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  wishlistIds: number[];
  onToggleWishlist: (productId: number) => void;
  priceAlertIds: number[];
  onTogglePriceAlert: (productId: number) => void;
}

export const BestDealsPage: React.FC<BestDealsPageProps> = ({
  products,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
  priceAlertIds,
  onTogglePriceAlert,
}) => {
  // Live ticking countdown demo
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 6, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dealProducts = products.filter(
    (p) => p.originalPrice - p.price >= 800 || p.badge === 'Mega Deal' || p.badge === 'Bestseller'
  );

  return (
    <div id="best-deals-view" className="space-y-6 animate-fadeIn">
      {/* Flash Sale Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-64 bg-white/10 blur-2xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-sm">
              <Flame className="w-4 h-4 text-amber-200 fill-amber-300" />
              <span>Lightning Deals • India Flash Sale</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">
              Up to 40% OFF Mega Festive Price Drop
            </h1>
            <p className="text-xs sm:text-sm text-orange-100 max-w-md">
              Grab premium electronics, footwear, and travel gear at lowest ever prices.
            </p>
          </div>

          {/* Countdown Clock */}
          <div className="bg-black/30 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex items-center gap-3 shrink-0">
            <Clock className="w-5 h-5 text-amber-300 animate-pulse" />
            <div className="text-center">
              <div className="text-[10px] uppercase font-bold text-orange-200 tracking-wider">
                Sale Ends In
              </div>
              <div className="font-mono text-xl sm:text-2xl font-black tracking-wider text-white">
                {String(timeLeft.hours).padStart(2, '0')}:
                {String(timeLeft.minutes).padStart(2, '0')}:
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Deals Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span>Top Discounted Picks ({dealProducts.length})</span>
          </h2>
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            Guaranteed Lowest Price
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dealProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              hasPriceAlert={priceAlertIds.includes(product.id)}
              onTogglePriceAlert={onTogglePriceAlert}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
