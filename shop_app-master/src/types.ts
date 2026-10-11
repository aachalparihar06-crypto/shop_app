export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  category: 'Electronics' | 'Footwear' | 'Accessories' | 'Fitness' | 'Fashion';
  image: string;
  description: string;
  inStock: boolean;
  badge?: string;
  priceDropAlert?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type AppPage =
  | 'dashboard'
  | 'search'
  | 'nearby'
  | 'deals'
  | 'alerts'
  | 'wishlist'
  | 'offers'
  | 'assistant'
  | 'all-shopping'
  | 'notifications'
  | 'settings'
  | 'cart'
  | 'checkout'
  | 'confirmation';

export interface CheckoutFormData {
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

export type FormErrors = Partial<Record<keyof CheckoutFormData, string>>;

export interface Coupon {
  code: string;
  discountPercentage: number;
  maxDiscount?: number;
  minOrder: number;
  description: string;
  bankName?: string;
}

export interface Store {
  id: string;
  name: string;
  area: string;
  distance: string;
  address: string;
  openHours: string;
  phone: string;
  pickupAvailable: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  unread: boolean;
  type: 'deal' | 'order' | 'alert' | 'system';
}

export interface OrderDetails {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  formData: CheckoutFormData;
  date: string;
  estimatedDelivery: string;
}
