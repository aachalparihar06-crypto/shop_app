import React, { useState } from 'react';
import type { CartItem, Coupon, AppPage, CheckoutFormData, FormErrors, OrderDetails } from '../types';
import { formatINR } from '../utils/formatters';
import {
  AlertCircle,
  Truck,
  ArrowLeft,
  CreditCard,
  Lock,
} from 'lucide-react';

interface CheckoutPageProps {
  cartItems: CartItem[];
  activeCoupon: Coupon | null;
  simulateCheckoutFailure: boolean;
  onOrderSuccessful: (order: OrderDetails) => void;
  onNavigate: (page: AppPage) => void;
  formData: CheckoutFormData;
  onFormDataChange: (data: CheckoutFormData) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  cartItems,
  activeCoupon,
  simulateCheckoutFailure,
  onOrderSuccessful,
  onNavigate,
  formData,
  onFormDataChange,
}) => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [simulationErrorMessage, setSimulationErrorMessage] = useState<string | null>(null);

  // Financials
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const isFreeShipping = subtotal >= 999 || activeCoupon?.code === 'FREESHIP';
  const rawShipping = subtotal === 0 ? 0 : isFreeShipping ? 0 : 99;

  let discount = 0;
  if (activeCoupon && subtotal >= activeCoupon.minOrder) {
    if (activeCoupon.code === 'FREESHIP') {
      discount = 99;
    } else {
      const calculated = (subtotal * activeCoupon.discountPercentage) / 100;
      discount = activeCoupon.maxDiscount
        ? Math.min(calculated, activeCoupon.maxDiscount)
        : calculated;
    }
  }

  const finalTotal = Math.max(0, subtotal + rawShipping - discount);

  // Indian States preset
  const indianStates = [
    'Karnataka',
    'Maharashtra',
    'Delhi NCR',
    'Tamil Nadu',
    'Telangana',
    'Gujarat',
    'Uttar Pradesh',
    'West Bengal',
    'Kerala',
    'Rajasthan',
    'Punjab',
    'Haryana',
  ];

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.name.trim()) {
      errs.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }

    if (!formData.address.trim()) {
      errs.address = 'Street address is required';
    }

    if (!formData.city.trim()) {
      errs.city = 'City is required';
    }

    if (!formData.state.trim()) {
      errs.state = 'State is required';
    }

    if (!formData.zip.trim()) {
      errs.zip = '6-digit Indian PIN Code is required';
    } else if (!/^[1-9][0-9]{5}$/.test(formData.zip.trim())) {
      errs.zip = 'Please enter a valid 6-digit Indian PIN code (e.g. 560038)';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleInputChange = (field: keyof CheckoutFormData, value: string) => {
    onFormDataChange({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (simulationErrorMessage) {
      setSimulationErrorMessage(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSimulationErrorMessage(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      // Check if Simulate Checkout Failure is enabled
      if (simulateCheckoutFailure) {
        setSimulationErrorMessage(
          'Simulated Checkout Failure: Payment gateway returned transaction error (ERR_DEMO_FAILURE). Disable "Simulate Checkout Failure" toggle in the left sidebar to complete purchase.'
        );
        return;
      }

      // Successful order
      const orderId = `SE-IN-${Math.floor(100000 + Math.random() * 900000)}`;
      const order: OrderDetails = {
        orderId,
        items: [...cartItems],
        subtotal,
        discount,
        shipping: rawShipping,
        total: finalTotal,
        formData: { ...formData },
        date: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
        estimatedDelivery: 'Tuesday, 14 Oct by 7:00 PM • Express Courier',
      };

      onOrderSuccessful(order);
      onNavigate('confirmation');
    }, 600);
  };

  return (
    <div id="checkout-view" className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          id="checkout-back-to-cart-btn"
          onClick={() => onNavigate('cart')}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Shopping Cart</span>
        </button>

        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <Lock className="w-3.5 h-3.5 text-emerald-600" />
          <span>Secure Demo Checkout</span>
        </div>
      </div>

      {/* Simulated Failure Alert Banner */}
      {simulationErrorMessage && (
        <div
          id="checkout-error-banner"
          className="bg-rose-50 border-2 border-rose-400 rounded-2xl p-4.5 text-rose-900 shadow-md flex items-start gap-3.5 animate-fadeIn"
          role="alert"
        >
          <AlertCircle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="font-bold text-sm text-rose-950">
              Payment Processing Error (Simulated)
            </h3>
            <p className="text-xs leading-relaxed text-rose-800">
              {simulationErrorMessage}
            </p>
          </div>
        </div>
      )}

      {/* Main Grid: Form + Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Checkout Form (2 cols) */}
        <form
          onSubmit={handleSubmit}
          id="checkout-form"
          className="lg:col-span-2 bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6"
        >
          <div className="border-b border-slate-100 pb-4">
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              Shipping & Delivery Information
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Please enter your full delivery address in India for express courier dispatch.
            </p>
          </div>

          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label
                htmlFor="input-name"
                className="block text-xs font-bold text-slate-700 mb-1"
              >
                Full Name *
              </label>
              <input
                id="input-name"
                type="text"
                placeholder="e.g. Aachal Sharma"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 border transition-all ${
                  errors.name
                    ? 'border-rose-400 ring-2 ring-rose-100'
                    : 'border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
                }`}
              />
              {errors.name && (
                <p id="error-name" className="text-[11px] text-rose-600 font-semibold mt-1">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="input-email"
                className="block text-xs font-bold text-slate-700 mb-1"
              >
                Email Address *
              </label>
              <input
                id="input-email"
                type="email"
                placeholder="e.g. aachal@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 border transition-all ${
                  errors.email
                    ? 'border-rose-400 ring-2 ring-rose-100'
                    : 'border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
                }`}
              />
              {errors.email && (
                <p id="error-email" className="text-[11px] text-rose-600 font-semibold mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Street Address */}
            <div>
              <label
                htmlFor="input-address"
                className="block text-xs font-bold text-slate-700 mb-1"
              >
                Delivery Address (Flat / House No., Street, Area) *
              </label>
              <input
                id="input-address"
                type="text"
                placeholder="e.g. 402, Lotus Apartments, 12th Main, Indiranagar"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 border transition-all ${
                  errors.address
                    ? 'border-rose-400 ring-2 ring-rose-100'
                    : 'border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
                }`}
              />
              {errors.address && (
                <p id="error-address" className="text-[11px] text-rose-600 font-semibold mt-1">
                  {errors.address}
                </p>
              )}
            </div>

            {/* City, State & PIN Code */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label
                  htmlFor="input-city"
                  className="block text-xs font-bold text-slate-700 mb-1"
                >
                  City *
                </label>
                <input
                  id="input-city"
                  type="text"
                  placeholder="e.g. Bengaluru"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 border transition-all ${
                    errors.city
                      ? 'border-rose-400 ring-2 ring-rose-100'
                      : 'border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
                  }`}
                />
                {errors.city && (
                  <p id="error-city" className="text-[11px] text-rose-600 font-semibold mt-1">
                    {errors.city}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="input-state"
                  className="block text-xs font-bold text-slate-700 mb-1"
                >
                  State *
                </label>
                <select
                  id="input-state"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 border transition-all ${
                    errors.state
                      ? 'border-rose-400 ring-2 ring-rose-100'
                      : 'border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
                  }`}
                >
                  <option value="">Select State</option>
                  {indianStates.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
                {errors.state && (
                  <p id="error-state" className="text-[11px] text-rose-600 font-semibold mt-1">
                    {errors.state}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="input-zip"
                  className="block text-xs font-bold text-slate-700 mb-1"
                >
                  PIN Code * (6 digits)
                </label>
                <input
                  id="input-zip"
                  type="text"
                  maxLength={6}
                  placeholder="e.g. 560038"
                  value={formData.zip}
                  onChange={(e) => handleInputChange('zip', e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 border font-mono transition-all ${
                    errors.zip
                      ? 'border-rose-400 ring-2 ring-rose-100'
                      : 'border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
                  }`}
                />
                {errors.zip && (
                  <p id="error-zip" className="text-[11px] text-rose-600 font-semibold mt-1">
                    {errors.zip}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Payment Method Notice */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  Simulated Payment Method
                </span>
                <span className="text-[11px] text-slate-500">
                  Instant UPI / Net Banking / Credit Card (No real money charged)
                </span>
              </div>
            </div>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800">
              Demo Active
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            id="place-order-btn"
            disabled={isSubmitting}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-sm sm:text-base shadow-xl shadow-indigo-500/25 transition-all hover:scale-[1.01] active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
          >
            {isSubmitting ? (
              <span className="inline-flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing simulated checkout...
              </span>
            ) : (
              <span>Place Order • {formatINR(finalTotal)}</span>
            )}
          </button>
        </form>

        {/* Order Summary Sidebar (1 col) */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
          <h2 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3">
            Review Items ({cartItems.length})
          </h2>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {cartItems.map((item) => (
              <div key={item.product.id} className="flex items-center gap-3">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-12 h-12 rounded-xl object-cover bg-slate-100 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    {item.product.name}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Qty: {item.quantity} × {formatINR(item.product.price)}
                  </p>
                </div>
                <span className="text-xs font-extrabold text-slate-900 shrink-0">
                  {formatINR(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Items Subtotal</span>
              <span className="font-bold text-slate-800">{formatINR(subtotal)}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery Charges</span>
              <span className="font-bold">
                {rawShipping === 0 ? (
                  <span className="text-emerald-600 font-extrabold">FREE</span>
                ) : (
                  formatINR(rawShipping)
                )}
              </span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>Coupon Applied</span>
                <span>-{formatINR(discount)}</span>
              </div>
            )}

            <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
              <span className="text-sm font-black text-slate-900">Total Payable</span>
              <span className="text-lg font-black text-slate-900">
                {formatINR(finalTotal)}
              </span>
            </div>
          </div>

          <div className="pt-2 text-[11px] text-slate-400 flex items-center gap-1.5 justify-center">
            <Truck className="w-3.5 h-3.5 text-blue-500" />
            <span>Delivering via ShopEase Express Logistics</span>
          </div>
        </div>
      </div>
    </div>
  );
};
