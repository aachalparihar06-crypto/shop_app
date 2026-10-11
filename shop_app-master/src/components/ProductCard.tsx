import React from 'react';
import type { Product } from '../types';
import { formatINR } from '../utils/formatters';
import { Star, Heart, ShoppingCart, Bell, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: number) => void;
  hasPriceAlert: boolean;
  onTogglePriceAlert: (productId: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  hasPriceAlert,
  onTogglePriceAlert,
}) => {
  const [justAdded, setJustAdded] = React.useState(false);

  const handleAdd = () => {
    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div
      id={`product-card-${product.id}`}
      className="group rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 hover:border-indigo-300 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden relative"
    >
      {/* Badges & Actions */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {product.badge && (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-indigo-600 text-white shadow-sm">
            {product.badge}
          </span>
        )}
        <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          {discountPercent}% OFF
        </span>
      </div>

      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5">
        {/* Wishlist Heart */}
        <button
          id={`wishlist-btn-${product.id}`}
          onClick={() => onToggleWishlist(product.id)}
          className={`p-2 rounded-xl backdrop-blur-md border transition-all duration-200 shadow-sm ${
            isWishlisted
              ? 'bg-rose-50 text-rose-500 border-rose-200 scale-105'
              : 'bg-white/80 text-slate-400 hover:text-rose-500 border-white/60 hover:bg-white'
          }`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          aria-label={`Wishlist ${product.name}`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
        </button>

        {/* Price Drop Alert Bell */}
        <button
          id={`alert-toggle-${product.id}`}
          onClick={() => onTogglePriceAlert(product.id)}
          className={`p-2 rounded-xl backdrop-blur-md border transition-all duration-200 shadow-sm ${
            hasPriceAlert
              ? 'bg-amber-50 text-amber-600 border-amber-300'
              : 'bg-white/80 text-slate-400 hover:text-amber-500 border-white/60 hover:bg-white'
          }`}
          title={hasPriceAlert ? 'Price drop alert active' : 'Set price drop alert'}
          aria-label={`Price alert for ${product.name}`}
        >
          <Bell className={`w-4 h-4 ${hasPriceAlert ? 'fill-amber-500 text-amber-600' : ''}`} />
        </button>
      </div>

      {/* Product Image */}
      <div className="w-full h-52 bg-slate-100 overflow-hidden relative flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>

      {/* Product Information */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold uppercase tracking-wider text-[11px] text-indigo-600">
              {product.category}
            </span>
            <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-0.5 rounded-lg border border-amber-200/60 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-400 font-normal">({product.reviewsCount})</span>
            </div>
          </div>

          <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-1 group-hover:text-indigo-600 transition-colors">
            {product.name}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Pricing and Action */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-extrabold text-slate-900">
                {formatINR(product.price)}
              </span>
              <span className="text-xs text-slate-400 line-through">
                {formatINR(product.originalPrice)}
              </span>
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold block">
              Inclusive of all taxes
            </span>
          </div>

          <button
            id={`add-to-cart-${product.id}`}
            onClick={handleAdd}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer ${
              justAdded
                ? 'bg-emerald-600 text-white shadow-emerald-200'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-indigo-200 hover:shadow-md'
            }`}
            aria-label={`Add ${product.name} to Cart`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
