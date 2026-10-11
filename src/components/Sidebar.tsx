import React from 'react';
import type { AppPage } from '../types';
import {
  LayoutDashboard,
  Search,
  MapPin,
  Flame,
  BellRing,
  Heart,
  Tag,
  Sparkles,
  ShoppingBag,
  Bell,
  Settings,
  AlertTriangle,
  Bug,
  RotateCcw,
  X,
} from 'lucide-react';

interface SidebarProps {
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
  unreadCount: number;
  wishlistCount: number;
  simulateCheckoutFailure: boolean;
  onToggleSimulateFailure: () => void;
  showDebugInfo: boolean;
  onToggleDebugInfo: () => void;
  onResetDemo: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  unreadCount,
  wishlistCount,
  simulateCheckoutFailure,
  onToggleSimulateFailure,
  showDebugInfo,
  onToggleDebugInfo,
  onResetDemo,
  isMobileOpen,
  onCloseMobile,
}) => {
  const primaryNavItems: { id: AppPage; label: string; icon: React.ReactNode; badge?: number | string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5 shrink-0" /> },
    { id: 'search', label: 'Product Search', icon: <Search className="w-5 h-5 shrink-0" /> },
    { id: 'nearby', label: 'Nearby Stores', icon: <MapPin className="w-5 h-5 shrink-0" /> },
    { id: 'deals', label: 'Best Deals', icon: <Flame className="w-5 h-5 shrink-0" /> },
    { id: 'alerts', label: 'Price Drop Alerts', icon: <BellRing className="w-5 h-5 shrink-0" /> },
    { id: 'wishlist', label: 'Wishlist', icon: <Heart className="w-5 h-5 shrink-0" />, badge: wishlistCount > 0 ? wishlistCount : undefined },
    { id: 'offers', label: 'Coupon & Bank Offers', icon: <Tag className="w-5 h-5 shrink-0" /> },
    { id: 'assistant', label: 'AI Shopping Assistant', icon: <Sparkles className="w-5 h-5 shrink-0" /> },
    { id: 'all-shopping', label: 'All Shopping', icon: <ShoppingBag className="w-5 h-5 shrink-0" /> },
  ];

  const secondaryNavItems: { id: AppPage; label: string; icon: React.ReactNode; badge?: number | string }[] = [
    {
      id: 'notifications',
      label: 'Notifications',
      icon: <Bell className="w-5 h-5 shrink-0" />,
      badge: unreadCount > 0 ? unreadCount : undefined,
    },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5 shrink-0" /> },
  ];

  const handleItemClick = (page: AppPage) => {
    onNavigate(page);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        id="app-sidebar"
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-gradient-to-b from-white via-slate-50/90 to-blue-50/40 border-r border-slate-200/90 flex flex-col shadow-sm transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-6 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white/70 backdrop-blur-md">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleItemClick('dashboard')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-700 bg-clip-text text-transparent">
                ShopEase
              </span>
              <span className="text-[10px] block font-semibold text-indigo-600 tracking-wider uppercase -mt-0.5">
                India Store
              </span>
            </div>
          </div>

          <button
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 lg:hidden"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation Body */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1.5 scrollbar-thin">
          {/* Primary Nav Items */}
          <div className="space-y-1">
            {primaryNavItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50/90 text-blue-700 border-2 border-blue-500 shadow-sm font-semibold'
                      : 'text-slate-600 hover:text-slate-900 bg-transparent hover:bg-white/80 border border-transparent hover:border-slate-200/80 shadow-none'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? 'text-blue-600' : 'text-slate-500'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                        isActive
                          ? 'bg-blue-600 text-white'
                          : 'bg-indigo-100 text-indigo-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Divider */}
          <div className="py-2">
            <div className="h-px bg-slate-200/80" />
          </div>

          {/* Secondary Nav Items */}
          <div className="space-y-1">
            {secondaryNavItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50/90 text-blue-700 border-2 border-blue-500 shadow-sm font-semibold'
                      : 'text-slate-600 hover:text-slate-900 bg-transparent hover:bg-white/80 border border-transparent hover:border-slate-200/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? 'text-blue-600' : 'text-slate-500'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-rose-500 text-white animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Left-Side Demo Testing Controls (Bottom section) */}
        <div className="p-4 border-t border-slate-200/90 bg-slate-100/70 backdrop-blur-md shrink-0">
          <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-3.5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                Demo Testing Controls
              </span>
              <span className="text-[10px] font-medium text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                Test Mode
              </span>
            </div>

            {/* Simulate Checkout Failure Toggle */}
            <div className="flex items-center justify-between pt-1">
              <label
                htmlFor="toggle-failure"
                className="text-xs font-medium text-slate-700 flex items-center gap-1.5 cursor-pointer select-none"
              >
                <AlertTriangle
                  className={`w-3.5 h-3.5 ${
                    simulateCheckoutFailure ? 'text-rose-500' : 'text-slate-400'
                  }`}
                />
                <span>Simulate Checkout Failure</span>
              </label>
              <button
                type="button"
                id="toggle-failure"
                role="switch"
                aria-checked={simulateCheckoutFailure}
                onClick={onToggleSimulateFailure}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  simulateCheckoutFailure ? 'bg-rose-500' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    simulateCheckoutFailure ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Show Debug Information Toggle */}
            <div className="flex items-center justify-between">
              <label
                htmlFor="toggle-debug"
                className="text-xs font-medium text-slate-700 flex items-center gap-1.5 cursor-pointer select-none"
              >
                <Bug
                  className={`w-3.5 h-3.5 ${
                    showDebugInfo ? 'text-indigo-500' : 'text-slate-400'
                  }`}
                />
                <span>Show Debug Information</span>
              </label>
              <button
                type="button"
                id="toggle-debug"
                role="switch"
                aria-checked={showDebugInfo}
                onClick={onToggleDebugInfo}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  showDebugInfo ? 'bg-indigo-600' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    showDebugInfo ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Reset Demo Button */}
            <button
              id="reset-demo-btn"
              onClick={onResetDemo}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 transition-colors border border-slate-200/80 shadow-xs cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>Reset Demo State</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
