import { useState } from 'react';
import type {
  AppPage,
  Product,
  CartItem,
  Coupon,
  Store,
  NotificationItem,
  CheckoutFormData,
  OrderDetails,
} from './types';
import {
  INITIAL_PRODUCTS,
  INITIAL_COUPONS,
  INITIAL_STORES,
  INITIAL_NOTIFICATIONS,
} from './data/products';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { ProductSearchPage } from './components/ProductSearchPage';
import { NearbyStoresPage } from './components/NearbyStoresPage';
import { BestDealsPage } from './components/BestDealsPage';
import { PriceDropAlertsPage } from './components/PriceDropAlertsPage';
import { WishlistPage } from './components/WishlistPage';
import { CouponOffersPage } from './components/CouponOffersPage';
import { AIAssistantPage } from './components/AIAssistantPage';
import { AllShoppingPage } from './components/AllShoppingPage';
import { NotificationsPage } from './components/NotificationsPage';
import { SettingsPage } from './components/SettingsPage';
import { CartPage } from './components/CartPage';
import { CheckoutPage } from './components/CheckoutPage';
import { ConfirmationPage } from './components/ConfirmationPage';
import { DebugOverlay } from './components/DebugOverlay';

export default function App() {
  // Navigation State
  const [currentPage, setCurrentPage] = useState<AppPage>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Products and Cart State
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: INITIAL_PRODUCTS[0], quantity: 1 }, // 1 item initially in cart for instant demo
  ]);
  const [wishlistIds, setWishlistIds] = useState<number[]>([2, 4]); // Smart Watch & Running Shoes
  const [priceAlertIds, setPriceAlertIds] = useState<number[]>([1]); // Wireless Headphones
  const [coupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(INITIAL_COUPONS[0]); // FESTIVE20
  const [stores] = useState<Store[]>(INITIAL_STORES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Checkout and Order State
  const [lastOrder, setLastOrder] = useState<OrderDetails | null>(null);
  const [checkoutFormData, setCheckoutFormData] = useState<CheckoutFormData>({
    name: 'Aachal Sharma',
    email: 'aachal@example.com',
    address: '402, Lotus Residency, 12th Main Road, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    zip: '560038',
  });

  // Left Sidebar Demo Controls
  const [simulateCheckoutFailure, setSimulateCheckoutFailure] = useState(false);
  const [showDebugInfo, setShowDebugInfo] = useState(false);
  const [lastAction, setLastAction] = useState('App initialized');

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setLastAction(`Added "${product.name}" to cart`);
  };

  const handleUpdateQuantity = (productId: number, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
    setLastAction(`Updated quantity for product #${productId} (${delta > 0 ? '+1' : '-1'})`);
  };

  const handleRemoveFromCart = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    setLastAction(`Removed product #${productId} from cart`);
  };

  // Wishlist toggle
  const handleToggleWishlist = (productId: number) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(productId);
      const next = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      setLastAction(`${exists ? 'Removed' : 'Added'} product #${productId} ${exists ? 'from' : 'to'} wishlist`);
      return next;
    });
  };

  // Price Drop Alert toggle
  const handleTogglePriceAlert = (productId: number) => {
    setPriceAlertIds((prev) => {
      const exists = prev.includes(productId);
      const next = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      setLastAction(`${exists ? 'Disabled' : 'Enabled'} price drop alert for product #${productId}`);
      return next;
    });
  };

  // Coupons
  const handleApplyCoupon = (coupon: Coupon) => {
    setActiveCoupon(coupon);
    setLastAction(`Applied coupon: ${coupon.code}`);
  };

  const handleApplyCouponCode = (code: string): boolean => {
    const found = coupons.find((c) => c.code.toUpperCase() === code.toUpperCase());
    if (found) {
      setActiveCoupon(found);
      setLastAction(`Applied coupon code: ${found.code}`);
      return true;
    }
    setLastAction(`Failed to apply invalid coupon: ${code}`);
    return false;
  };

  const handleRemoveCoupon = () => {
    setActiveCoupon(null);
    setLastAction('Removed coupon');
  };

  // Notifications
  const handleMarkAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    setLastAction('Marked all notifications as read');
  };

  const handleToggleNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: !n.unread } : n))
    );
  };

  // Checkout & Order
  const handleOrderSuccessful = (order: OrderDetails) => {
    setLastOrder(order);
    setCartItems([]);
    setLastAction(`Order successfully created: ${order.orderId}`);
  };

  // Reset Demo
  const handleResetDemo = () => {
    setCartItems([{ product: INITIAL_PRODUCTS[0], quantity: 1 }]);
    setWishlistIds([2, 4]);
    setPriceAlertIds([1]);
    setActiveCoupon(INITIAL_COUPONS[0]);
    setSimulateCheckoutFailure(false);
    setShowDebugInfo(false);
    setSearchQuery('');
    setSelectedCategory('All');
    setCheckoutFormData({
      name: 'Aachal Sharma',
      email: 'aachal@example.com',
      address: '402, Lotus Residency, 12th Main Road, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      zip: '560038',
    });
    setLastOrder(null);
    setLastAction('Reset demo state to default');
    setCurrentPage('dashboard');
  };

  // Navigation helper
  const handleNavigate = (page: AppPage) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLastAction(`Navigated to ${page}`);
  };

  // Computed values
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const unreadNotificationsCount = notifications.filter((n) => n.unread).length;

  return (
    <div id="app-root" className="min-h-screen bg-slate-50 flex flex-col antialiased">
      {/* Fixed Left Sidebar on Desktop / Drawer on Mobile */}
      <Sidebar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        unreadCount={unreadNotificationsCount}
        wishlistCount={wishlistIds.length}
        simulateCheckoutFailure={simulateCheckoutFailure}
        onToggleSimulateFailure={() => {
          const next = !simulateCheckoutFailure;
          setSimulateCheckoutFailure(next);
          setLastAction(`Toggled checkout failure simulation: ${next ? 'ON' : 'OFF'}`);
        }}
        showDebugInfo={showDebugInfo}
        onToggleDebugInfo={() => {
          const next = !showDebugInfo;
          setShowDebugInfo(next);
          setLastAction(`Toggled debug inspector: ${next ? 'ON' : 'OFF'}`);
        }}
        onResetDemo={handleResetDemo}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area (offset by left sidebar width 72/18rem on desktop) */}
      <div className="lg:pl-72 flex-1 flex flex-col min-w-0 transition-all duration-300">
        {/* Top Header */}
        <Header
          currentPage={currentPage}
          onNavigate={handleNavigate}
          cartCount={cartCount}
          cartSubtotal={cartSubtotal}
          wishlistCount={wishlistIds.length}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
        />

        {/* Dynamic Page Views */}
        <main id="main-content" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {currentPage === 'dashboard' && (
            <Dashboard
              products={products}
              onAddToCart={handleAddToCart}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              priceAlertIds={priceAlertIds}
              onTogglePriceAlert={handleTogglePriceAlert}
              onNavigate={handleNavigate}
              cartCount={cartCount}
              cartSubtotal={cartSubtotal}
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                handleNavigate('search');
              }}
            />
          )}

          {currentPage === 'search' && (
            <ProductSearchPage
              products={products}
              onAddToCart={handleAddToCart}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              priceAlertIds={priceAlertIds}
              onTogglePriceAlert={handleTogglePriceAlert}
              initialQuery={searchQuery}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          )}

          {currentPage === 'nearby' && (
            <NearbyStoresPage stores={stores} />
          )}

          {currentPage === 'deals' && (
            <BestDealsPage
              products={products}
              onAddToCart={handleAddToCart}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              priceAlertIds={priceAlertIds}
              onTogglePriceAlert={handleTogglePriceAlert}
            />
          )}

          {currentPage === 'alerts' && (
            <PriceDropAlertsPage
              products={products}
              priceAlertIds={priceAlertIds}
              onTogglePriceAlert={handleTogglePriceAlert}
              onAddToCart={handleAddToCart}
            />
          )}

          {currentPage === 'wishlist' && (
            <WishlistPage
              products={products}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              onAddToCart={handleAddToCart}
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === 'offers' && (
            <CouponOffersPage
              coupons={coupons}
              activeCoupon={activeCoupon}
              onApplyCoupon={handleApplyCoupon}
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === 'assistant' && (
            <AIAssistantPage
              products={products}
              onAddToCart={handleAddToCart}
            />
          )}

          {currentPage === 'all-shopping' && (
            <AllShoppingPage
              products={products}
              onAddToCart={handleAddToCart}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              priceAlertIds={priceAlertIds}
              onTogglePriceAlert={handleTogglePriceAlert}
            />
          )}

          {currentPage === 'notifications' && (
            <NotificationsPage
              notifications={notifications}
              onMarkAllAsRead={handleMarkAllNotificationsAsRead}
              onToggleRead={handleToggleNotificationRead}
            />
          )}

          {currentPage === 'settings' && (
            <SettingsPage onResetDemo={handleResetDemo} />
          )}

          {currentPage === 'cart' && (
            <CartPage
              cartItems={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={handleRemoveFromCart}
              onNavigate={handleNavigate}
              activeCoupon={activeCoupon}
              onApplyCouponCode={handleApplyCouponCode}
              onRemoveCoupon={handleRemoveCoupon}
              coupons={coupons}
            />
          )}

          {currentPage === 'checkout' && (
            <CheckoutPage
              cartItems={cartItems}
              activeCoupon={activeCoupon}
              simulateCheckoutFailure={simulateCheckoutFailure}
              onOrderSuccessful={handleOrderSuccessful}
              onNavigate={handleNavigate}
              formData={checkoutFormData}
              onFormDataChange={setCheckoutFormData}
            />
          )}

          {currentPage === 'confirmation' && (
            <ConfirmationPage
              order={lastOrder}
              onNavigate={handleNavigate}
            />
          )}
        </main>

        {/* Footer */}
        <footer id="app-footer" className="bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white text-sm">ShopEase India</span>
              <span>— Premium Indian Shopping Hub</span>
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <span>Demo Platform</span>
              <span>•</span>
              <span>All prices in Indian Rupees (₹)</span>
              <span>•</span>
              <span>Compatible with HealTest</span>
            </div>
          </div>
        </footer>
      </div>

      {/* Floating Debug Inspector (when Show Debug Information is toggled) */}
      <DebugOverlay
        isOpen={showDebugInfo}
        onClose={() => setShowDebugInfo(false)}
        currentPage={currentPage}
        cartItems={cartItems}
        activeCoupon={activeCoupon}
        simulateCheckoutFailure={simulateCheckoutFailure}
        wishlistCount={wishlistIds.length}
        priceAlertsCount={priceAlertIds.length}
        formData={checkoutFormData}
        lastAction={lastAction}
      />
    </div>
  );
}
