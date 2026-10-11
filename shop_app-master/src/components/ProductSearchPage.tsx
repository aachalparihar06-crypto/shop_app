import React, { useState, useMemo } from 'react';
import type { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Search, Filter, ArrowUpDown } from 'lucide-react';

interface ProductSearchPageProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  wishlistIds: number[];
  onToggleWishlist: (productId: number) => void;
  priceAlertIds: number[];
  onTogglePriceAlert: (productId: number) => void;
  initialQuery?: string;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const ProductSearchPage: React.FC<ProductSearchPageProps> = ({
  products,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
  priceAlertIds,
  onTogglePriceAlert,
  initialQuery = '',
  selectedCategory,
  onSelectCategory,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(5000);

  const categories = ['All', 'Electronics', 'Footwear', 'Accessories', 'Fitness', 'Fashion'];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory =
          selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
        const matchesQuery =
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase());
        const matchesPrice = p.price <= maxPrice;
        return matchesCategory && matchesQuery && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [products, query, selectedCategory, maxPrice, sortBy]);

  return (
    <div id="product-search-view" className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-slate-200/80 shadow-xs">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Product Search & Catalog
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Explore all 6 curated Indian shopping products with instant filters and live search
        </p>

        {/* Search Bar */}
        <div className="mt-4 relative max-w-xl">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="search-input"
            type="text"
            placeholder="Search headphones, shoes, backpack, watch..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400 shrink-0 hidden sm:block" />
          {categories.map((cat) => (
            <button
              key={cat}
              id={`filter-cat-${cat.toLowerCase()}`}
              onClick={() => onSelectCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-200'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort and Price Filter */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-100 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-medium text-slate-700 focus:outline-none focus:border-indigo-500"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
            <span>Max: ₹{maxPrice}</span>
            <input
              type="range"
              min="500"
              max="5000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-20 accent-indigo-600"
            />
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Showing <strong>{filteredProducts.length}</strong> of {products.length} products
        </span>
        {(query || selectedCategory !== 'All' || maxPrice < 5000) && (
          <button
            onClick={() => {
              setQuery('');
              onSelectCategory('All');
              setMaxPrice(5000);
            }}
            className="text-indigo-600 hover:underline font-semibold"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
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
      ) : (
        <div className="bg-white/80 rounded-2xl p-12 text-center border border-slate-200/80 space-y-3">
          <p className="text-3xl">🔍</p>
          <h3 className="text-base font-bold text-slate-800">No matching products found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search terms or filters to find what you're looking for.
          </p>
          <button
            onClick={() => {
              setQuery('');
              onSelectCategory('All');
              setMaxPrice(5000);
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
          >
            View All Products
          </button>
        </div>
      )}
    </div>
  );
};
