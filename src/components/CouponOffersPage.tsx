import React, { useState } from 'react';
import type { Coupon, AppPage } from '../types';
import { Tag, Check, Copy, ArrowRight, ShieldCheck, CreditCard } from 'lucide-react';

interface CouponOffersPageProps {
  coupons: Coupon[];
  activeCoupon: Coupon | null;
  onApplyCoupon: (coupon: Coupon) => void;
  onNavigate: (page: AppPage) => void;
}

export const CouponOffersPage: React.FC<CouponOffersPageProps> = ({
  coupons,
  activeCoupon,
  onApplyCoupon,
  onNavigate,
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div id="coupon-offers-view" className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold mb-2">
            <Tag className="w-3.5 h-3.5" />
            <span>Verified Savings</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Coupons & Bank Offers
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Apply verified discount codes directly to your cart or pay with partner bank cards.
          </p>
        </div>

        {activeCoupon && (
          <div className="px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Active in Cart: <strong>{activeCoupon.code}</strong></span>
          </div>
        )}
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {coupons.map((coupon) => {
          const isApplied = activeCoupon?.code === coupon.code;
          const isCopied = copiedCode === coupon.code;

          return (
            <div
              key={coupon.code}
              id={`coupon-card-${coupon.code.toLowerCase()}`}
              className={`rounded-2xl p-5 border transition-all duration-200 flex flex-col justify-between space-y-4 relative overflow-hidden ${
                isApplied
                  ? 'bg-emerald-50/40 border-emerald-300 shadow-sm'
                  : 'bg-white/90 border-slate-200/80 hover:border-indigo-300 shadow-xs'
              }`}
            >
              {/* Top Accent */}
              {coupon.bankName && (
                <div className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200 w-fit">
                  <CreditCard className="w-3 h-3" />
                  <span>{coupon.bankName} Special Offer</span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-base font-extrabold px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 border-2 border-dashed border-slate-300 select-all">
                      {coupon.code}
                    </span>
                    <button
                      onClick={() => handleCopy(coupon.code)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                      title="Copy Coupon Code"
                    >
                      {isCopied ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <span className="text-sm font-black text-emerald-600">
                    {coupon.code === 'FREESHIP' ? 'FREE DELIVERY' : `${coupon.discountPercentage}% OFF`}
                  </span>
                </div>

                <p className="text-xs text-slate-600 mt-3 font-medium">
                  {coupon.description}
                </p>

                <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                  <span>Min Order: ₹{coupon.minOrder} • Valid throughout October</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  id={`apply-coupon-btn-${coupon.code.toLowerCase()}`}
                  onClick={() => onApplyCoupon(coupon)}
                  disabled={isApplied}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isApplied
                      ? 'bg-emerald-600 text-white cursor-default'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xs'
                  }`}
                >
                  {isApplied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Applied to Cart</span>
                    </>
                  ) : (
                    <span>Apply to Cart</span>
                  )}
                </button>

                <button
                  onClick={() => onNavigate('cart')}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                >
                  <span>Go to Cart</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
