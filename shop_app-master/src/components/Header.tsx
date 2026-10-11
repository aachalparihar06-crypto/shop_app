import React from 'react';
import type { AppPage } from '../types';
import { formatINR } from '../utils/formatters';
import {
  Menu,
  ShoppingCart,
  Heart,
  Search,
  MapPin,
  Sparkles,
} from 'lucide-react';

interface HeaderProps {
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
  cartCount: number;
  cartSubtotal: number;
  wishlistCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenMobileSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage: _currentPage,
  onNavigate,
  cartCount,
  cartSubtotal,
  wishlistCount,
  searchQuery,
  onSearchChange,
  onOpenMobileSidebar,
}) => {
  return (
    <header
      id="main-header"
      className="sticky top-0 z-30 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white border-b border-indigo-900/40 shadow-md backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Mobile menu toggle & brand on mobile */}
        <div className="flex items-center gap-3">
          <button
            id="mobile-sidebar-toggle"
            onClick={onOpenMobileSidebar}
            className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Open sidebar navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/30 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1.5">
                ShopEase
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  India
                </span>
              </span>
              <span className="hidden sm:block text-[11px] text-indigo-300 font-medium">
                Premium Shopping Hub
              </span>
            </div>
          </button>
        </div>

        {/* Search Bar in Header */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="header-search-input"
              type="text"
              placeholder="Search 6 premium products, brands & deals..."
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (window.location.hash !== '#search') {
                  onNavigate('search');
                }
              }}
              onFocus={() => {
                if (_currentPage !== 'search') {
                  onNavigate('search');
                }
              }}
              className="w-full bg-white/10 hover:bg-white/15 focus:bg-white text-white focus:text-slate-900 placeholder:text-slate-400 focus:placeholder:text-slate-500 pl-10 pr-4 py-2 rounded-xl text-sm border border-white/10 focus:border-indigo-400 focus:outline-none transition-all duration-200"
            />
          </div>
        </div>

        {/* Right side items */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Location Delivery Badge */}
          <div className="hidden xl:flex items-center gap-1.5 text-xs text-indigo-200/90 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
            <MapPin className="w-3.5 h-3.5 text-rose-400" />
            <span>Deliver to <strong className="text-white">Bengaluru 560038</strong></span>
          </div>

          {/* Currency Badge */}
          <div className="hidden sm:flex items-center text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            ₹ INR
          </div>

          {/* Wishlist Button */}
          <button
            id="header-wishlist-btn"
            onClick={() => onNavigate('wishlist')}
            className="relative p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            title="View Wishlist"
            aria-label="View Wishlist"
          >
            <Heart className="w-5 h-5 text-rose-400" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[11px] font-bold flex items-center justify-center border-2 border-slate-900">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            id="cart-btn"
            onClick={() => onNavigate('cart')}
            className="flex items-center gap-2.5 pl-3 pr-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-md shadow-indigo-900/40 border border-indigo-400/30 transition-all hover:scale-[1.02] active:scale-95"
            aria-label={`Cart with ${cartCount} items`}
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2.5 -right-2.5 w-5 h-5 rounded-full bg-amber-400 text-slate-950 text-[11px] font-black flex items-center justify-center ring-2 ring-indigo-950">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline">
              {cartCount === 0 ? 'Cart' : formatINR(cartSubtotal)}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
