import React from 'react';
import type { Product, AppPage } from '../types';
import { formatINR } from '../utils/formatters';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

interface WishlistPageProps {
  products: Product[];
  wishlistIds: number[];
  onToggleWishlist: (productId: number) => void;
  onAddToCart: (product: Product) => void;
  onNavigate: (page: AppPage) => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({
  products,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onNavigate,
}) => {
  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  const handleMoveToCart = (product: Product) => {
    onAddToCart(product);
    onToggleWishlist(product.id);
  };

  return (
    <div id="wishlist-view" className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
            <span>My Wishlist</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Items you've bookmarked for later. Move them to your cart anytime!
          </p>
        </div>

        <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 shrink-0">
          {wishlistedProducts.length} Saved Item{wishlistedProducts.length === 1 ? '' : 's'}
        </span>
      </div>

      {wishlistedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistedProducts.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 hover:border-rose-300 p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="w-full h-48 rounded-xl overflow-hidden bg-slate-100 relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => onToggleWishlist(product.id)}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/80 backdrop-blur-sm text-slate-400 hover:text-rose-600 transition-colors"
                    title="Remove from Wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-3">
                  <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                    {product.category}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm mt-0.5">{product.name}</h3>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-base font-extrabold text-slate-900">
                      {formatINR(product.price)}
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      {formatINR(product.originalPrice)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                <button
                  id={`wishlist-move-to-cart-${product.id}`}
                  onClick={() => handleMoveToCart(product)}
                  className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Move to Cart</span>
                </button>

                <button
                  onClick={() => onToggleWishlist(product.id)}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white/80 rounded-2xl p-12 text-center border border-slate-200/80 space-y-3">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Your wishlist is empty</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Explore our curated Indian shopping catalog and click the heart icon on items you love!
          </p>
          <button
            onClick={() => onNavigate('search')}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span>Explore Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
