import React from 'react';
import type { Product, AppPage } from '../types';
import { ProductCard } from './ProductCard';
import { formatINR } from '../utils/formatters';
import {
  Sparkles,
  ShoppingBag,
  Heart,
  Tag,
  ShieldCheck,
  Truck,
  ArrowRight,
  TrendingUp,
  Percent,
} from 'lucide-react';

interface DashboardProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  wishlistIds: number[];
  onToggleWishlist: (productId: number) => void;
  priceAlertIds: number[];
  onTogglePriceAlert: (productId: number) => void;
  onNavigate: (page: AppPage) => void;
  cartCount: number;
  cartSubtotal: number;
  onSelectCategory: (category: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  products,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
  priceAlertIds,
  onTogglePriceAlert,
  onNavigate,
  cartCount,
  cartSubtotal,
  onSelectCategory,
}) => {
  const categories = [
    { name: 'All', icon: '🛍️', count: 6 },
    { name: 'Electronics', icon: '🎧', count: 2 },
    { name: 'Footwear', icon: '👟', count: 1 },
    { name: 'Accessories', icon: '🎒', count: 1 },
    { name: 'Fitness', icon: '💧', count: 1 },
    { name: 'Fashion', icon: '🕶️', count: 1 },
  ];

  return (
    <div id="dashboard-view" className="space-y-8 animate-fadeIn">
      {/* Welcoming Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 text-white shadow-xl border border-indigo-900/50 p-6 sm:p-10">
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-60 h-60 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Great Indian Festive Shopping Festival</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Elevate Your Everyday <br />
            <span className="bg-gradient-to-r from-blue-300 via-indigo-200 to-purple-200 bg-clip-text text-transparent">
              With Premium Indian Picks
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-lg leading-relaxed">
            Discover hand-picked audio, wearables, travel bags, and sporty footwear. 
            Enjoy instant ₹500 bank discounts and free same-day dispatch.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              id="hero-explore-deals-btn"
              onClick={() => onNavigate('deals')}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-sm font-bold shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Festive Deals</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-view-offers-btn"
              onClick={() => onNavigate('offers')}
              className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-semibold backdrop-blur-md transition-all cursor-pointer"
            >
              View Bank Offers
            </button>
          </div>
        </div>

        {/* Feature Highlights on bottom right */}
        <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-emerald-400" />
            <span>Free Express Delivery above ₹999</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>1-Year Official Warranty</span>
          </div>
          <div className="flex items-center gap-2">
            <Percent className="w-4 h-4 text-amber-400" />
            <span>Extra 10% off with HDFC Card</span>
          </div>
        </div>
      </div>

      {/* Useful Shopping Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Cart Summary */}
        <div
          onClick={() => onNavigate('cart')}
          className="p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xs hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Cart Total</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xl font-black text-slate-900 mt-2">
            {formatINR(cartSubtotal)}
          </p>
          <p className="text-xs text-indigo-600 font-medium mt-0.5">
            {cartCount} item{cartCount === 1 ? '' : 's'} in cart →
          </p>
        </div>

        {/* Wishlist Summary */}
        <div
          onClick={() => onNavigate('wishlist')}
          className="p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xs hover:shadow-md hover:border-rose-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Saved Wishlist</span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Heart className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xl font-black text-slate-900 mt-2">
            {wishlistIds.length} Saved
          </p>
          <p className="text-xs text-rose-600 font-medium mt-0.5">
            View saved items →
          </p>
        </div>

        {/* Active Coupons */}
        <div
          onClick={() => onNavigate('offers')}
          className="p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xs hover:shadow-md hover:border-amber-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Bank Coupons</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Tag className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xl font-black text-slate-900 mt-2">
            4 Active
          </p>
          <p className="text-xs text-amber-600 font-medium mt-0.5">
            Use code FESTIVE20 →
          </p>
        </div>

        {/* Price Drop Alerts */}
        <div
          onClick={() => onNavigate('alerts')}
          className="p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Price Alerts</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xl font-black text-slate-900 mt-2">
            {priceAlertIds.length} Active
          </p>
          <p className="text-xs text-emerald-600 font-medium mt-0.5">
            Track price drops →
          </p>
        </div>
      </div>

      {/* Product Category Shortcuts */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Explore Categories</span>
          </h2>
          <button
            onClick={() => onNavigate('all-shopping')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {categories.map((cat) => (
            <button
              key={cat.name}
              id={`cat-btn-${cat.name.toLowerCase()}`}
              onClick={() => {
                onSelectCategory(cat.name);
                onNavigate('search');
              }}
              className="p-3.5 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/70 hover:border-indigo-400 hover:bg-white text-center transition-all duration-200 hover:-translate-y-0.5 shadow-xs cursor-pointer group"
            >
              <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <p className="text-xs font-bold text-slate-800">{cat.name}</p>
              <p className="text-[10px] text-slate-400 font-medium">{cat.count} items</p>
            </button>
          ))}
        </div>
      </div>

      {/* Popular Product Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Featured Products
            </h2>
            <p className="text-xs text-slate-500">
              India's top rated tech, lifestyle, and fitness essentials
            </p>
          </div>

          <button
            id="see-all-products-btn"
            onClick={() => onNavigate('search')}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors"
          >
            See All Products
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
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

      {/* Interactive AI Assistant Teaser Banner */}
      <div className="rounded-3xl p-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Interactive Assistant</span>
          </div>
          <h3 className="text-xl font-extrabold">Need Help Deciding What to Buy?</h3>
          <p className="text-xs text-indigo-100 max-w-md">
            Ask our rule-based AI assistant for budget recommendations, fitness gear, or gift ideas.
          </p>
        </div>
        <button
          id="try-assistant-btn"
          onClick={() => onNavigate('assistant')}
          className="shrink-0 px-6 py-3 rounded-2xl bg-white text-indigo-700 font-bold text-sm shadow-md hover:bg-indigo-50 transition-transform active:scale-95 cursor-pointer"
        >
          Chat with Assistant →
        </button>
      </div>
    </div>
  );
};
