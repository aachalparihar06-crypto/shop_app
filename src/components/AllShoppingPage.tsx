import React, { useState } from 'react';
import type { Product } from '../types';
import { ProductCard } from './ProductCard';
import { ShoppingBag, LayoutGrid, List } from 'lucide-react';

interface AllShoppingPageProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  wishlistIds: number[];
  onToggleWishlist: (productId: number) => void;
  priceAlertIds: number[];
  onTogglePriceAlert: (productId: number) => void;
}

export const AllShoppingPage: React.FC<AllShoppingPageProps> = ({
  products,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
  priceAlertIds,
  onTogglePriceAlert,
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div id="all-shopping-view" className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-2">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Complete Store Catalog</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            All Shopping Products
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Browse our full 6-item curated collection with authentic warranties and Indian delivery.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200 shrink-0">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'grid'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
            title="Grid View"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'list'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
            title="List View"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Catalog Render */}
      <div
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
        }
      >
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
  );
};
